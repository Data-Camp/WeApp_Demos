var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    task: {
      name: '',
      address: '点击选择地点',
      signTime: '00:00',
      signEarlyTime: '00:00',
      startDay: '2016-11-00',
      endDay: '2016-11-00',
      repeat: {
        'monday': 1,
        'tuesday': 1,
        'wednesday': 1,
        'thursday': 1,
        'friday': 1,
        'saturday': 0,
        'sunday': 0
      }
    },
    openId: '',
    userInfo: {},
    creating: false,
    button: {
      txt: '新建'
    },
    modalHidden: true
  },

  // 设置任务名称
  bindKeyInput: function (e) {
    this.setData({
      'task.name': e.detail.value
    });
  },

  // 设置任务地点
  chooseLocation: function () {
    var that = this;

    wx.chooseLocation({
      success: function(res){
        that.setData({
          'task.address': res.address,
          'task.latitude': res.latitude,
          'task.longitude': res.longitude
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 设置打卡时间
  setSignTime: function (e) {
    var that = this;
    var hour = ((+e.detail.value.slice(0, 2) + 24 - 2) % 24).toString();
    that.setData({
      'task.signTime': e.detail.value,
      'task.signEarlyTime': (hour[1] ? hour : '0' + hour) + ':' + e.detail.value.slice(3, 5)
    });
  },
  
  // 设置开始日期
  startDateChange: function (e) {
    this.setData({
      'task.startDay': e.detail.value
    })
  },

  // 设置结束日期
  endDateChange: function (e) {
    this.setData({
      'task.endDay': e.detail.value
    })
  },

  // 设置重复日
  changeMonday: function (e) {
    var state = this.data.task.repeat.monday;
    this.setData({
      'task.repeat.monday': (state == 1 ? 0 : 1) 
    });
  },
  changeTuesday: function (e) {
    var state = this.data.task.repeat.tuesday;
    this.setData({
      'task.repeat.tuesday': (state == 1 ? 0 : 1) 
    });
  },
  changeWednesday: function (e) {
    var state = this.data.task.repeat.wednesday;
    this.setData({
      'task.repeat.wednesday': (state == 1 ? 0 : 1) 
    });
  },
  changeThursday: function (e) {
    var state = this.data.task.repeat.thursday;
    this.setData({
      'task.repeat.thursday': (state == 1 ? 0 : 1) 
    });
  },
  changeFriday: function (e) {
    var state = this.data.task.repeat.friday;
    this.setData({
      'task.repeat.friday': (state == 1 ? 0 : 1) 
    });
  },
  changeSaturday: function (e) {
    var state = this.data.task.repeat.saturday;
    this.setData({
      'task.repeat.saturday': (state == 1 ? 0 : 1) 
    });
  },
  changeSunday: function (e) {
    var state = this.data.task.repeat.sunday;
    this.setData({
      'task.repeat.sunday': (state == 1 ? 0 : 1) 
    });
  },

  // 隐藏提示弹层
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },

  // 创建任务
  createTask: function () {
    var that = this;
    var task = this.data.task;
    var openId = this.data.openId;
    var userInfo = this.data.userInfo;

    wx.showToast({
      title: '新建中',
      icon: 'loading',
      duration: 10000
    });

    wx.request({
      url: 'https://www.cpcsign.com/api/task',
      data: {
        name: task.name,
        address: task.address,
        startTime: task.startDay,
        endTime: task.endDay,
        signTime: task.signTime,
        latitude: task.latitude,
        longitude: task.longitude,
        repeat: {
          'monday': task.repeat.monday,
          'tuesday': task.repeat.tuesday,
          'wednesday': task.repeat.wednesday,
          'thursday': task.repeat.thursday,
          'friday': task.repeat.friday,
          'saturday': task.repeat.saturday,
          'sunday': task.repeat.sunday
        },
        userInfo: {
          openId: openId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl

        }
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function(res){
        // success

        wx.hideToast();
        
        var command = res.data.taskID;

        wx.navigateTo({
          url: '/pages/new/success/success?command=' + command,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 提交、检验
  bindSubmit: function (e) {
    var that = this;
    var task = this.data.task;
    var creating = this.data.creating;

    if (task.name == '' || task.address == '点击选择地点' ) {
      this.setData({
        modalHidden: false
      });
    } else {
      if (!creating) {
        this.setData({
          'creating': true
        });
        that.createTask();
      }
    }
  },
  
  onShow: function () {
    // 恢复新建按钮状态
    this.setData({
      'creating': false
    });
  },

  onHide: function () {
  },

  // 初始化设置
  onLoad: function () {
    var that = this;
    var now = new Date();
    var openId = wx.getStorageSync('openId');

    // 初始化打卡时间
    that.setData({
      'task.signTime': util.getHM(now),
      'task.signEarlyTime': util.getHM(new Date(now.getTime() - 1000 * 3600 * 2))
    });
    
    // 初始化日期
    that.setData({
      'task.startDay': util.getYMD(now),
      'task.endDay': util.getYMD(now)
    });


    // 初始化昵称
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });

      that.setData({
        openId: openId
      })
    });

  }  
})