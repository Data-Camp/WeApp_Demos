/**
 * @fileOverview 聊天室综合 Demo 示例
 */


// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');

/**
 * 生成一条聊天室的消息的唯一 ID
 */
function msgUuid() {
    if (!msgUuid.next) {
        msgUuid.next = 0;
    }
    return 'msg-' + (++msgUuid.next);
}

/**
 * 生成聊天室的系统消息
 */
function createSystemMessage(content) {
    return { id: msgUuid(), type: 'system', content };
}

/**
 * 生成聊天室的聊天消息
 */
function createUserMessage(content, user, isMe) {
    return { id: msgUuid(), type: 'speak', content, user, isMe };
}

// 声明聊天室页面
Page({

    /**
     * 聊天室使用到的数据，主要是消息集合以及当前输入框的文本
     */
    data: {
        messages: [],
        inputContent: '大家好啊',
        lastMessageId: 'none',
    },

    /**
     * 页面渲染完成后，启动聊天室
     * */
    onReady() {
        wx.setNavigationBarTitle({ title: '三木聊天室' });

        if (!this.pageReady) {
            this.pageReady = true;
            this.enter();
        }
    },

    /**
     * 后续后台切换回前台的时候，也要重新启动聊天室
     */
    onShow() {
        if (this.pageReady) {
            this.enter();
        }
    },

    /**
     * 页面卸载时，退出聊天室
     */
    onUnload() {
        this.quit();
    },

    /**
     * 页面切换到后台运行时，退出聊天室
     */
    onHide() {
        this.quit();
    },

    /**
     * 启动聊天室
     */
    enter() {
        this.pushMessage(createSystemMessage('正在登录...'));

        // 如果登录过，会记录当前用户在 this.me 上
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

    /**
     * 连接到聊天室信道服务
     */
    connect() {
        this.amendMessage(createSystemMessage('正在加入群聊...'));

        // 创建信道
        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl);

        // 连接成功后，去掉「正在加入群聊」的系统提示
        tunnel.on('connect', () => this.popMessage());

        // 聊天室有人加入或退出，反馈到 UI 上
        tunnel.on('people', people => {
            const { total, enter, leave } = people;

            if (enter) {
                this.pushMessage(createSystemMessage(`${enter.nickName}已加入群聊，当前共 ${total} 人`));
            } else {
                this.pushMessage(createSystemMessage(`${leave.nickName}已退出群聊，当前共 ${total} 人`));
            }
        });

        // 有人说话，创建一条消息
        tunnel.on('speak', speak => {
            const { word, who } = speak;
            this.pushMessage(createUserMessage(word, who, who.openId === this.me.openId));
        });

        // 信道关闭后，显示退出群聊
        tunnel.on('close', () => {
            this.pushMessage(createSystemMessage('您已退出群聊'));
        });

        // 重连提醒
        tunnel.on('reconnecting', () => {
            this.pushMessage(createSystemMessage('已断线，正在重连...'));
        });

        tunnel.on('reconnect', () => {
            this.amendMessage(createSystemMessage('重连成功'));
        });

        // 打开信道
        tunnel.open();
    },

    /**
     * 退出聊天室
     */
    quit() {
        if (this.tunnel) {
            this.tunnel.close();
        }
    },

    /**
     * 通用更新当前消息集合的方法
     */
    updateMessages(updater) {
        var messages = this.data.messages;
        updater(messages);

        var lastMessageId = messages.length && messages[messages.length - 1].id;
        this.setData({ messages, lastMessageId });
    },

    /**
     * 追加一条消息
     */
    pushMessage(message) {
        this.updateMessages(messages => messages.push(message));
    },

    /**
     * 替换上一条消息
     */
    amendMessage(message) {
        this.updateMessages(messages => messages.splice(-1, 1, message));
    },

    /**
     * 删除上一条消息
     */
    popMessage() {
        this.updateMessages(messages => messages.pop());
    },

    /**
     * 用户输入的内容改变之后
     */
    changeInputContent(e) {
        this.setData({ inputContent: e.detail.value });
    },

    /**
     * 点击「发送」按钮，通过信道推送消息到服务器
     **/
    sendMessage(e) {
        // 信道当前不可用
        if (!this.tunnel || !this.tunnel.isActive()) {
            this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
            if (this.tunnel.isClosed()) {
                this.enter();
            }
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