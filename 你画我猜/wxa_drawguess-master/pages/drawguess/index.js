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
Page({
  data: {
    setShow: false,
    waiting: true,    // 是否是等待人员加入状态
    messages: [],
    peoples: []
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (e) {
    wx.setNavigationBarTitle({ title: '你猜我画' });
    if (!this.pageReady) {
        this.pageReady = true;
        this.enter();
    }
      this.context = wx.createContext()
      this.context.setStrokeStyle("#000000")
      this.context.setLineWidth(2)
      this.context.setLineCap('round') // 让线条圆润
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
    set: function () {
        this.setData({
            'setShow': true
        });
    },
    hideFix: function () {
        this.setData({
            'setShow': false
        });
    },
    stop: function () {
    },
    /**
     * 启动聊天室
     */
    enter() {
        console.log('正在登录...');

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
    start: function () {
        this.tunnel.emit('changestatus', {'status': 1});
    },
    addPeople: function (people) {
        // 判断是否存在
        var have = false;
        var len = this.data.peoples.length;
        for (var i = 0; i < len; i++) {
            var item = this.data.peoples[i];
            if (item.openId === people.openId) {
                have = true;
            }
        }
        if (!have) {
            this.data.peoples.push(people);
            this.setData({
                'peoples': this.data.peoples
            });
        }
    },
    delPeople: function (people) {
        var len = this.data.peoples.lenght;
        for (var i = 0; i < len; i++) {
            var item = this.data.peoples[i];
            if (item.openId === people.openId) {
                delete this.data.peoples[i];
            }
        }
        this.setData({
            'peoples': this.data.peoples
        });
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
            var connectedTunnelIds = people.people.connectedTunnelIds,
            len = connectedTunnelIds.length;
            for (var i = 0; i < len; i++) {
                var item = connectedTunnelIds[i];
                var peopleNew = people.people.userMap[item];
                peopleNew['status'] = 0;
                this.data.peoples.push(peopleNew);
            }
            this.setData({
                'peoples': this.data.peoples
            });
            if (enter) {
                this.addPeople(enter);
                this.pushMessage(createSystemMessage(`${enter.nickName}已加入群聊，当前共 ${total} 人`));
            } else {
                this.delPeople(leave);
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

        tunnel.on('drawstart', draw => {
            const { x, y, who } = draw;
            if (who.openId !== this.me.openId) {
                this.context.beginPath()
                this.context.moveTo(x, y)
            }
        });
        tunnel.on('drawend', draw => {
            const { drawarr, who } = draw;
            if (who.openId !== this.me.openId) {
                var len = drawarr.length;
                for (var i = 0; i < len; i++) {
                    var item = drawarr[i];
                    this.context.lineTo(item.x, item.y)
                    this.context.stroke()
                }
                this.context.closePath()
                wx.drawCanvas({
                canvasId: 'firstCanvas',
                reserve: true,
                actions: this.context.getActions() // 获取绘图动作数组
                })
                this.context.clearActions();
            }
        });
        tunnel.on('changestatus', draw => {
            const { status, who } = draw;
            // 修改状态
            var len = this.data.peoples.length;
            for (var i = 0; i < len; i++) {
                var item = this.data.peoples[i];
                if (who.openId === item.openId) {
                    this.data.peoples[i]['status'] = status;
                }
            }
            this.setData({
                'peoples': this.data.peoples
            });
        });
        tunnel.on('start', () => {
            console.log('开始游戏');
            this.setData({
                'waiting': false
            });
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
  startX: 0,
  startY: 0,
  begin: false,
  drawArr: [],
  touchStart: function (e) {
      this.startX = e.touches[0].x
      this.startY = e.touches[0].y
      this.begin = true;
      this.context.beginPath()
      this.tunnel.emit('drawstart', { x: this.startX, y: this.startY });
  },
  touchMove: function (e) {
      if (this.begin) {
        this.context.moveTo(this.startX, this.startY)
        this.startX = e.touches[0].x
        this.startY = e.touches[0].y
        this.context.lineTo(this.startX, this.startY)
        this.context.stroke()
        this.context.closePath()
        wx.drawCanvas({
            canvasId: 'firstCanvas',
            reserve: true,
            actions: this.context.getActions() // 获取绘图动作数组
        })
        this.context.clearActions();
        this.drawArr.push({
            x: this.startX,
            y: this.startY
        })
      }
  },
  touchEnd: function () {
      this.tunnel.emit('drawend', { drawarr: this.drawArr });
      this.drawArr = [];
      this.begin = false;
  }
});