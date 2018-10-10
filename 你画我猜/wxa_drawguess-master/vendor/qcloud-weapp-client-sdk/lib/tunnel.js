var requestLib = require('./request');
var wxTunnel = require('./wxTunnel');

/**
 * 当前打开的信道，同一时间只能有一个信道打开
 */
var currentTunnel = null;

// 信道状态枚举
var STATUS_CLOSED = Tunnel.STATUS_CLOSED = 'CLOSED';
var STATUS_CONNECTING = Tunnel.STATUS_CONNECTING = 'CONNECTING';
var STATUS_ACTIVE = Tunnel.STATUS_ACTIVE = 'ACTIVE';
var STATUS_RECONNECTING = Tunnel.STATUS_RECONNECTING = 'RECONNECTING';

// 错误类型枚举
var ERR_CONNECT_SERVICE = Tunnel.ERR_CONNECT_SERVICE = 1001;
var ERR_CONNECT_SOCKET = Tunnel.ERR_CONNECT_SOCKET = 1002;
var ERR_RECONNECT = Tunnel.ERR_RECONNECT = 2001;
var ERR_SOCKET_ERROR = Tunnel.ERR_SOCKET_ERROR = 3001;

// 包类型枚举
var PACKET_TYPE_MESSAGE = 'message';
var PACKET_TYPE_PING = 'ping';
var PACKET_TYPE_PONG = 'pong';
var PACKET_TYPE_TIMEOUT = 'timeout';
var PACKET_TYPE_CLOSE = 'close';

// 断线重连最多尝试 5 次
var DEFAULT_MAX_RECONNECT_TRY_TIMES = 5;

// 每次重连前，等待时间的增量值
var DEFAULT_RECONNECT_TIME_INCREASE = 1000;

function Tunnel(serviceUrl) {
    if (currentTunnel && currentTunnel.status !== STATUS_CLOSED) {
        throw new Error('当前有未关闭的信道，请先关闭之前的信道，再打开新信道');
    }

    currentTunnel = this;

    // 等确认微信小程序全面支持 ES6 就不用那么麻烦了
    var me = this;

    //=========================================================================
    // 暴露实例状态以及方法
    //=========================================================================
    this.serviceUrl = serviceUrl;
    this.socketUrl = null;
    this.status = null;

    this.open = openConnect;
    this.on = registerEventHandler;
    this.emit = emitMessagePacket;
    this.close = close;

    this.isClosed = isClosed;
    this.isConnecting = isConnecting;
    this.isActive = isActive;
    this.isReconnecting = isReconnecting;


    //=========================================================================
    // 信道状态处理，状态说明：
    //   closed       - 已关闭
    //   connecting   - 首次连接
    //   active       - 当前信道已经在工作
    //   reconnecting - 断线重连中
    //=========================================================================
    function isClosed() { return me.status === STATUS_CLOSED; }
    function isConnecting() { return me.status === STATUS_CONNECTING; }
    function isActive() { return me.status === STATUS_ACTIVE; }
    function isReconnecting() { return me.status === STATUS_RECONNECTING; }

    function setStatus(status) {
        var lastStatus = me.status;
        if (lastStatus !== status) {
            me.status = status;
        }
    }

    // 初始为关闭状态
    setStatus(STATUS_CLOSED);


    //=========================================================================
    // 信道事件处理机制
    // 信道事件包括：
    //   connect      - 连接已建立
    //   close        - 连接被关闭（包括主动关闭和被动关闭）
    //   reconnecting - 开始重连
    //   reconnect    - 重连成功
    //   error        - 发生错误，其中包括连接失败、重连失败、解包失败等等
    //   [message]    - 信道服务器发送过来的其它事件类型，如果事件类型和上面内置的事件类型冲突，将在事件类型前面添加前缀 `@`
    //=========================================================================
    var preservedEventTypes = 'connect,close,reconnecting,reconnect,error'.split(',');
    var eventHandlers = [];

    /**
     * 注册消息处理函数
     * @param {string} messageType 支持内置消息类型（"connect"|"close"|"reconnecting"|"reconnect"|"error"）以及业务消息类型
     */
    function registerEventHandler(eventType, eventHandler) {
        if (typeof eventHandler === 'function') {
            eventHandlers.push([eventType, eventHandler]);
        }
    }

    /**
     * 派发事件，通知所有处理函数进行处理
     */
    function dispatchEvent(eventType, eventPayload) {
        eventHandlers.forEach(function (handler) {
            var handleType = handler[0];
            var handleFn = handler[1];

            if (handleType === '*') {
                handleFn(eventType, eventPayload);
            } else if (handleType === eventType) {
                handleFn(eventPayload);
            }
        });
    }

    /**
     * 派发事件，事件类型和系统保留冲突的，事件名会自动加上 '@' 前缀
     */
    function dispatchEscapedEvent(eventType, eventPayload) {
        if (preservedEventTypes.indexOf(eventType) > -1) {
            eventType = '@' + eventType;
        }

        dispatchEvent(eventType, eventPayload);
    }


    //=========================================================================
    // 信道连接控制
    //=========================================================================
    var isFirstConnection = true;
    var isOpening = false;

    /**
     * 连接信道服务器，获取 WebSocket 连接地址，获取地址成功后，开始进行 WebSocket 连接
     */
    function openConnect() {
        if (isOpening) return;
        isOpening = true;

        // 只有关闭状态才会重新进入准备中
        setStatus(isFirstConnection ? STATUS_CONNECTING : STATUS_RECONNECTING);

        requestLib.request({
            url: serviceUrl,
            method: 'GET',
            success: function (response) {
                if (response.statusCode === 200 && response.data && response.data.url) {
                    openSocket(me.socketUrl = response.data.url);
                } else {
                    dispatchConnectServiceError(response);
                }
            },
            fail: dispatchConnectServiceError,
            complete: () => isOpening = false,
        });

        function dispatchConnectServiceError(detail) {
            if (isFirstConnection) {
                setStatus(STATUS_CLOSED);

                dispatchEvent('error', {
                    code: ERR_CONNECT_SERVICE,
                    message: '连接信道服务失败，网络错误或者信道服务没有正确响应',
                    detail: detail || null,
                });

            } else {
                startReconnect(detail);
            }
        }
    }

    /**
     * 打开 WebSocket 连接，打开后，注册微信的 Socket 处理方法
     */
    function openSocket(url) {
        wxTunnel.listen({
            onOpen: handleSocketOpen,
            onMessage: handleSocketMessage,
            onClose: handleSocketClose,
            onError: handleSocketError,
        });

        wx.connectSocket({ url: url });
        isFirstConnection = false;
    }


    //=========================================================================
    // 处理消息通讯
    //
    // packet           - 数据包，序列化形式为 `${type}` 或者 `${type}:${content}`
    // packet.type      - 包类型，包括 message, ping, pong, close
    // packet.content?  - 当包类型为 message 的时候，会附带 message 数据
    //
    // message          - 消息体，会使用 JSON 序列化后作为 packet.content
    // message.type     - 消息类型，表示业务消息类型
    // message.content? - 消息实体，可以为任意类型，表示消息的附带数据，也可以为空
    //
    // 数据包示例：
    //  - 'ping' 表示 Ping 数据包
    //  - 'message:{"type":"speak","content":"hello"}' 表示一个打招呼的数据包
    //=========================================================================

    // 连接还没成功建立的时候，需要发送的包会先存放到队列里
    var queuedPackets = [];

    /**
     * WebSocket 打开之后，更新状态，同时发送所有遗留的数据包
     */
    function handleSocketOpen() {
        /* istanbul ignore else */
        if (isConnecting()) {
            dispatchEvent('connect');

        }
        else if (isReconnecting()) {
            dispatchEvent('reconnect');
            resetReconnectionContext();
        }

        setStatus(STATUS_ACTIVE);
        emitQueuedPackets();
        nextPing();
    }

    /**
     * 收到 WebSocket 数据包，交给处理函数
     */
    function handleSocketMessage(message) {
        resolvePacket(message.data);
    }

    /**
     * 发送数据包，如果信道没有激活，将先存放队列
     */
    function emitPacket(packet) {
        if (isActive()) {
            sendPacket(packet);
        } else {
            queuedPackets.push(packet);
        }
    }

    /**
     * 数据包推送到信道
     */
    function sendPacket(packet) {
        var encodedPacket = [packet.type];

        if (packet.content) {
            encodedPacket.push(JSON.stringify(packet.content));
        }

        wx.sendSocketMessage({
            data: encodedPacket.join(':'),
            fail: handleSocketError,
        });
    }

    function emitQueuedPackets() {
        queuedPackets.forEach(emitPacket);

        // empty queued packets
        queuedPackets.length = 0;
    }

    /**
     * 发送消息包
     */
    function emitMessagePacket(messageType, messageContent) {
        var packet = {
            type: PACKET_TYPE_MESSAGE,
            content: {
                type: messageType,
                content: messageContent,
            },
        };

        emitPacket(packet);
    }

    /**
     * 发送 Ping 包
     */
    function emitPingPacket() {
        emitPacket({ type: PACKET_TYPE_PING });
    }

    /**
     * 发送关闭包
     */
    function emitClosePacket() {
        emitPacket({ type: PACKET_TYPE_CLOSE });
    }

    /**
     * 解析并处理从信道接收到的包
     */
    function resolvePacket(raw) {
        var packetParts = raw.split(':');
        var packetType = packetParts.shift();
        var packetContent = packetParts.join(':') || null;
        var packet = { type: packetType };

        if (packetContent) {
            try {
                packet.content = JSON.parse(packetContent);
            } catch (e) {}
        }

        switch (packet.type) {
        case PACKET_TYPE_MESSAGE:
            handleMessagePacket(packet);
            break;
        case PACKET_TYPE_PONG:
            handlePongPacket(packet);
            break;
        case PACKET_TYPE_TIMEOUT:
            handleTimeoutPacket(packet);
            break;
        case PACKET_TYPE_CLOSE:
            handleClosePacket(packet);
            break;
        default:
            handleUnknownPacket(packet);
            break;
        }
    }

    /**
     * 收到消息包，直接 dispatch 给处理函数
     */
    function handleMessagePacket(packet) {
        var message = packet.content;
        dispatchEscapedEvent(message.type, message.content);
    }


    //=========================================================================
    // 心跳、断开与重连处理
    //=========================================================================

    /**
     * Ping-Pong 心跳检测超时控制，这个值有两个作用：
     *   1. 表示收到服务器的 Pong 相应之后，过多久再发下一次 Ping
     *   2. 如果 Ping 发送之后，超过这个时间还没收到 Pong，断开与服务器的连接
     * 该值将在与信道服务器建立连接后被更新
     */
    let pingPongTimeout = 15000;
    let pingTimer = 0;
    let pongTimer = 0;

    /**
     * 信道服务器返回 Ping-Pong 控制超时时间
     */
    function handleTimeoutPacket(packet) {
        var timeout = packet.content * 1000;
        /* istanbul ignore else */
        if (!isNaN(timeout)) {
            pingPongTimeout = timeout;
            ping();
        }
    }

    /**
     * 收到服务器 Pong 响应，定时发送下一个 Ping
     */
    function handlePongPacket(packet) {
        nextPing();
    }

    /**
     * 发送下一个 Ping 包
     */
    function nextPing() {
        clearTimeout(pingTimer);
        clearTimeout(pongTimer);
        pingTimer = setTimeout(ping, pingPongTimeout);
    }

    /**
     * 发送 Ping，等待 Pong
     */
    function ping() {
        /* istanbul ignore else */
        if (isActive()) {
            emitPingPacket();

            // 超时没有响应，关闭信道
            pongTimer = setTimeout(handlePongTimeout, pingPongTimeout);
        }
    }

    /**
     * Pong 超时没有响应，信道可能已经不可用，需要断开重连
     */
    function handlePongTimeout() {
        startReconnect('服务器已失去响应');
    }

    // 已经重连失败的次数
    var reconnectTryTimes = 0;

    // 最多允许失败次数
    var maxReconnectTryTimes = Tunnel.MAX_RECONNECT_TRY_TIMES || DEFAULT_MAX_RECONNECT_TRY_TIMES;

    // 重连前等待的时间
    var waitBeforeReconnect = 0;

    // 重连前等待时间增量
    var reconnectTimeIncrease = Tunnel.RECONNECT_TIME_INCREASE || DEFAULT_RECONNECT_TIME_INCREASE;

    var reconnectTimer = 0;

    function startReconnect(lastError) {
        if (reconnectTryTimes >= maxReconnectTryTimes) {
            close();

            dispatchEvent('error', {
                code: ERR_RECONNECT,
                message: '重连失败',
                detail: lastError,
            });
        }
        else {
            wx.closeSocket();
            waitBeforeReconnect += reconnectTimeIncrease;
            setStatus(STATUS_RECONNECTING);
            reconnectTimer = setTimeout(doReconnect, waitBeforeReconnect);
        }

        if (reconnectTryTimes === 0) {
            dispatchEvent('reconnecting');
        }

        reconnectTryTimes += 1;
    }

    function doReconnect() {
        openConnect();
    }

    function resetReconnectionContext() {
        reconnectTryTimes = 0;
        waitBeforeReconnect = 0;
    }

    /**
     * 收到服务器的关闭请求
     */
    function handleClosePacket(packet) {
        close();
    }

    function handleUnknownPacket(packet) {
        // throw away
    }

    var isClosing = false;

    /**
     * 收到 WebSocket 断开的消息，处理断开逻辑
     */
    function handleSocketClose() {
        /* istanbul ignore if */
        if (isClosing) return;

        /* istanbul ignore else */
        if (isActive()) {
            // 意外断开的情况，进行重连
            startReconnect('链接已断开');
        }
    }

    function close() {
        isClosing = true;
        closeSocket();
        setStatus(STATUS_CLOSED);
        resetReconnectionContext();
        isFirstConnection = false;
        clearTimeout(pingTimer);
        clearTimeout(pongTimer);
        clearTimeout(reconnectTimer);
        dispatchEvent('close');
        isClosing = false;
    }

    function closeSocket(emitClose) {
        if (isActive() && emitClose !== false) {
            emitClosePacket();
        }

        wx.closeSocket();
    }


    //=========================================================================
    // 错误处理
    //=========================================================================

    /**
     * 错误处理
     */
    function handleSocketError(detail) {
        switch (me.status) {
        case Tunnel.STATUS_CONNECTING:
            dispatchEvent('error', {
                code: ERR_SOCKET_ERROR,
                message: '连接信道失败，网络错误或者信道服务不可用',
                detail: detail,
            });
            break;
        }
    }

}

module.exports = Tunnel;