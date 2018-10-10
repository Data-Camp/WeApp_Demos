const emitter = require('./emitter.js');

/** socket.io 协议常量 */
var packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};
var events = { 
    CONNECT: 0,
    DISCONNECT: 1,
    EVENT: 2,
    ACK: 3,
    ERROR: 4,
    BINARY_EVENT: 5,
    BINARY_ACK: 6
};

const PING_CHECK_INTERVAL = 2000;


class WxSocketIO {
    connect(url) {
        return new Promise((resolve, reject) => {
            wx.onSocketOpen((response) => {
                this.isConnected = true;
                //this.ping();
                resolve(response);
            });
            wx.onSocketError(error => {
                if (this.isConnected) {
                    this.fire('error', error);
                } else {
                    reject(error);
                }
            });
            wx.onSocketMessage(message => this._handleMessage(message));
            wx.onSocketClose(result => {
                if (this.isConnected) {
                    this.fire('error', new Error("The websocket was closed by server"));
                } else {
                    this.fire('close');
                }
                this.isConnected = false;
                this.destory();
            });
            wx.connectSocket({
                url: `${url}/?EIO=3&transport=websocket`
            });
        });
    }
    ping() {
        setTimeout(() => {
            if (!this.isConnected) return;
            wx.sendSocketMessage({
                data: [packets.ping, 'probe'].join('')
            });
        }, PING_CHECK_INTERVAL);
    }
    close() {
        return new Promise((resolve, reject) => {
            if (this.isConnected) {
                this.isConnected = false;
                wx.onSocketClose(resolve);
                wx.closeSocket();
            } else {
                reject(new Error('socket is not connected'));
            }
        });
    }
    emit(type, ...params) {
        const data = [type, ...params];
        wx.sendSocketMessage({
            data: [packets.message, events.EVENT, JSON.stringify(data)].join("")
        });
    }
    destory() {
        this.removeAllListeners();
    }
    _handleMessage({ data }) {
        const [match, packet, event, content] = /^(\d)(\d?)(.*)$/.exec(data);
        if (+event === events.EVENT) {
            switch (+packet) {
                case packets.message:
                    let pack;
                    try {
                        pack = JSON.parse(content);
                    } catch (error) {
                        console.error('解析 ws 数据包失败：')
                        console.error(error);
                    }
                    const [type, ...params] = pack;
                    this.fire(type, ...params);
                    break;
            }
        }
        else if (+packet == packets.pong) {
            this.ping();
        }
    }
};

emitter.setup(WxSocketIO.prototype);

module.exports = WxSocketIO;