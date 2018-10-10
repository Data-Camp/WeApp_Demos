/**
 * @fileOverview 演示会话服务和 WebSocket 信道服务的使用方式
 */

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

/**
 * 使用 Page 初始化页面，具体可参考微信公众平台上的文档
 */
Page({

    /**
     * 初始数据，我们把服务地址显示在页面上
     */
    data: {
        loginUrl: config.service.loginUrl,
        requestUrl: config.service.requestUrl,
        tunnelUrl: config.service.tunnelUrl,
        tunnelStatus: 'closed',
        tunnelStatusText: {
            closed: '已关闭',
            connecting: '正在连接...',
            connected: '已连接'
        }
    },

    /**
     * 点击「登录」按钮，测试登录功能
     */
    doLogin() {
        showBusy('正在登录');

        // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
        qcloud.login({
            success(result) {
                showSuccess('登录成功');
                console.log('登录成功', result);
            },

            fail(error) {
                showModel('登录失败', error);
                console.log('登录失败', error);
            }
        });
    },

    /**
     * 点击「清除会话」按钮
     */
    clearSession() {
        // 清除保存在 storage 的会话信息
        qcloud.clearSession();
        showSuccess('会话已清除');
    },

    /**
     * 点击「请求」按钮，测试带会话请求的功能
     */
    doRequest() {
        showBusy('正在请求');

        // qcloud.request() 方法和 wx.request() 方法使用是一致的，不过如果用户已经登录的情况下，会把用户的会话信息带给服务器，服务器可以跟踪用户
        qcloud.request({
            // 要请求的地址
            url: this.data.requestUrl,

            // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
            login: true,

            success(result) {
                showSuccess('请求成功完成');
                console.log('request success', result);
            },

            fail(error) {
                showModel('请求失败', error);
                console.log('request fail', error);
            },

            complete() {
                console.log('request complete');
            }
        });
    },

    switchTunnel(e) {
        const turnedOn = e.detail.value;

        if (turnedOn && this.data.tunnelStatus == 'closed') {
            this.openTunnel();

        } else if (!turnedOn && this.data.tunnelStatus == 'connected') {
            this.closeTunnel();
        }
    },

    /**
     * 点击「打开信道」，测试 WebSocket 信道服务
     */
    openTunnel() {
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new qcloud.Tunnel(this.data.tunnelUrl);

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
            console.log('WebSocket 信道已连接');
            this.setData({ tunnelStatus: 'connected' });
        });

        tunnel.on('close', () => {
            console.log('WebSocket 信道已断开');
            this.setData({ tunnelStatus: 'closed' });
        });

        tunnel.on('reconnecting', () => {
            console.log('WebSocket 信道正在重连...')
            showBusy('正在重连');
        });

        tunnel.on('reconnect', () => {
            console.log('WebSocket 信道重连成功')
            showSuccess('重连成功');
        });

        tunnel.on('error', error => {
            showModel('信道发生错误', error);
            console.error('信道发生错误：', error);
        });

        // 监听自定义消息（服务器进行推送）
        tunnel.on('speak', speak => {
            showModel('信道消息', speak);
            console.log('收到说话消息：', speak);
        });

        // 打开信道
        tunnel.open();

        this.setData({ tunnelStatus: 'connecting' });
    },

    /**
     * 点击「发送消息」按钮，测试使用信道发送消息
     */
    sendMessage() {
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (this.tunnel && this.tunnel.isActive()) {
            // 使用信道给服务器推送「speak」消息
            this.tunnel.emit('speak', {
                'word': 'I say something at ' + new Date(),
            });
        }
    },

    /**
     * 点击「测试重连」按钮，测试重连
     * 也可以断开网络一段时间之后再连接，测试重连能力
     */
    testReconnect() {
        // 不通过 SDK 关闭连接，而是直接用微信断开来模拟连接断开的情况下，考察 SDK 自动重连的能力
        wx.closeSocket();
    },

    /**
     * 点击「关闭信道」按钮，关闭已经打开的信道
     */
    closeTunnel() {
        if (this.tunnel) {
            this.tunnel.close();
        }

        this.setData({ tunnelStatus: 'closed' });
    },

    /**
     * 点击「聊天室」按钮，跳转到聊天室综合 Demo 的页面
     */
    openChat() {
        // 微信只允许一个信道再运行，聊天室使用信道前，我们先把当前的关闭
        this.closeTunnel();
        wx.navigateTo({ url: '../chat/chat' });
    },
    openDrawguess() {
        this.closeTunnel();
        wx.navigateTo({ url: '../drawguess/index' });
    },
    openUpload() {
        wx.navigateTo({ url: '../upload/index' });
    }
});
