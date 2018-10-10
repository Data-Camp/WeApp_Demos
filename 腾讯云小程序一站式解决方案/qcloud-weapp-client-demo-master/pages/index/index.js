var qcloud = require('../../bower_components/qcloud-weapp-client-sdk/index');
var config = require('../../config');

Page({
    data: {
        loginUrl: 'https://www.qcloud.la/login',
        requestUrl: 'https://www.qcloud.la/user',
        tunnelServiceUrl: 'https://www.qcloud.la/tunnel',
    },

    doLogin: function () {
        qcloud.setLoginUrl(this.data.loginUrl);
        qcloud.login({
            success: function () {
                console.log('login success', arguments);
            },

            fail: function () {
                console.log('login fail', arguments);
            }
        });
    },

    clearSession: function () {
        wx.clearStorageSync();
    },

    doRequest: function () {
        qcloud.setLoginUrl(this.data.loginUrl);
        qcloud.request({
            url: this.data.requestUrl,

            success: function () {
                console.log('request success', arguments);
            },

            fail: function () {
                console.log('request fail', arguments);
            },

            complete: function () {
                console.log('request complete');
            }
        });
    },

    openTunnel: function () {
        qcloud.setLoginUrl(this.data.loginUrl);
        var tunnel = this.tunnel = new qcloud.Tunnel(this.data.tunnelServiceUrl);
        tunnel.open();
        tunnel.on('*', function (type, args) {
            switch(type) {
            case 'connect':
                console.log('连接已建立');
                break;
            case 'close':
                console.log('连接已断开');
                break;
            case 'reconnecting':
                console.log('正在重连');
                break;
            case 'reconnect':
                console.log('重连成功');
                break;
            case 'error':
                console.error(args);
                break;
            default:
                console.log(type, args);
                break;
            }
        });
    },

    closeTunnel: function () {
        if (this.tunnel) {
            this.tunnel.close();
        }
    },

    sendMessage: function () {
        if (this.tunnel) {
            this.tunnel.emit('speak', {
                'word': Math.random().toString(32).slice(2),
            });
        }
    },
});
