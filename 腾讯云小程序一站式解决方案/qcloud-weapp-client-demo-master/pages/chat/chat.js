var qcloud = require('../../bower_components/qcloud-weapp-client-sdk/index');
var config = require('../../config');

var githubHead = n => `https://avatars1.githubusercontent.com/u/${n}?v=3&s=160`;

var nextMsgUuid = 0;
function msgUuid() {
    return 'msg_' + ++nextMsgUuid;
}

function createSystemMessage(content) {
    return { id: msgUuid(), type: 'system', content };
}

function createUserMessage(content, user, me) {
    return { id: msgUuid(), type: 'speak', content, user, me };
}

Page({
    data: {
        messages: [],
        inputContent: '大家好啊',
        lastMessageId: 'none',
    },

    onReady() {
        wx.setNavigationBarTitle({ title: '三木聊天室' });
    },

    onShow() {
        this.pushMessage(createSystemMessage('正在登陆...'));
        qcloud.setLoginUrl(config.service.loginUrl);
        if (!this.me) {
            qcloud.request({
                url: `https://${config.service.host}/user`,
                login: true,
                success: (response) => {
                    this.me = response.data.data.userInfo;
                    this.connect();
                }
            });
        } else {
            this.connect();
        }
    },

    onHide() {
        if (this.tunnel) {
            this.tunnel.close();
        }
    },

    connect() {
        this.amendMessage(createSystemMessage('正在加入群聊...'));

        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl);
        tunnel.open();

        tunnel.on('connect', () => {
            this.popMessage();
        });

        tunnel.on('people', people => {
            const { total, enter, leave } = people;
            if (enter) {
                this.pushMessage(createSystemMessage(`${enter.nickName}已加入群聊，当前共 ${total} 人`));
            } else {
                this.pushMessage(createSystemMessage(`${leave.nickName}已退出群聊，当前共 ${total} 人`));
            }
        });

        tunnel.on('speak', speak => {
            const { word, who } = speak;
            this.pushMessage(createUserMessage(word, who, who.openId == this.me.openId));
        });

        tunnel.on('close', () => {
            this.pushMessage(createSystemMessage('您已退出群聊'));
        });

        tunnel.on('reconnecting', () => {
            this.pushMessage(createSystemMessage("已断线，正在重连..."));
        });

        tunnel.on('reconnect', () => {
            this.amendMessage(createSystemMessage("重连成功"));
        });

        tunnel.on('*', function(type, args) {
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
                //console.log(type, args);
                break;
            }
        });
    },

    updateMessages(updater) {
        var messages = this.data.messages;
        updater(this.data.messages);
        this.setData({
            messages,
            lastMessageId: messages.length && messages[messages.length - 1].id
        });
    },

    pushMessage(message) {
        this.updateMessages(messages => messages.push(message));
    },

    amendMessage(message) {
        this.updateMessages(messages => messages.splice(-1, 1, message));
    },

    popMessage() {
        this.updateMessages(messages => messages.pop());
    },

    changeInputContent(e) {
        this.setData({ inputContent: e.detail.value });
    },

    sendMessage(e) {
        if (!this.tunnel || !this.tunnel.isActive()) {
            this.pushMessage(createSystemMessage("您还没有加入群聊，请稍后重试"));
            return;
        }
        setTimeout(() => {
            if (this.data.inputContent && this.tunnel) {
                this.tunnel.emit('speak', { word: this.data.inputContent });
                this.setData({ inputContent: '' });
            }
        });
    },
});