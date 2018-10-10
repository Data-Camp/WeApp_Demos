var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    tabIndex: 0,
    myTasks: [],
    hotTasks: [],
    userInfo: {},
    openId: ''
  },

  // tab menu 切换
  changeTab: function (e) {
    var id = e.currentTarget.id;
    var that = this;

    if (id == 'myTask') {
      this.setData({
        tabIndex: 0
      })
    }

    if (id == 'hotTask') {
      this.setData({
        tabIndex: 1
      })
    }
  },

  // 跳转输入口令
  inputCode: function () {
    wx.navigateTo({
      url: '/pages/invitation/invitation',
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

  // 更新我的任务列表
  updateTask: function (openId) {
    var that = this;

    wx.request({
      url: 'https://www.cpcsign.com/api/task',
      data: {
        openId: openId 
      },
      method: 'GET', 
      success: function(res){
        // success
        var now = new Date();
        var tasks = res.data.data.sort(function (a, b) {
          return a.state - b.state
        });

        console.log(tasks);

        for (var i = 0, len = tasks.length; i < len; ++i) {          
          if (tasks[i].state == 0) {
            
            var sign;
            var nowDate = util.getYMD(now);
            var time_str = nowDate + ' ' + tasks[i].signTime + ':00';
            
            sign = new Date(time_str.replace(/-/g, '/'));
            var disTime = Math.abs(now.getTime() - sign.getTime());

            // 倒计时状态 : // 已迟到状态
            tasks[i].disTime = (now.getTime() < sign.getTime() ? '距离签到还有': '您已经迟到') + (Math.floor(disTime/(3600*1000)) > 0 ? 
            (util.formatNumber(Math.floor(disTime/(3600*1000))) + '小时' + util.formatNumber(Math.floor(disTime%(3600*1000)/(60*1000))) +　'分钟') : 
            (util.formatNumber(Math.floor(disTime%(3600*1000)/(60*1000))) +　'分钟'))
          }
          if (tasks[i].state == 3) {
            tasks[i].disTime = Math.floor(disTime/(3600*1000*24))
          }
        }

        that.setData({
          myTasks: tasks
        });
      }
    })
  },
  

  // 删除任务
    taskDelete: function (e) {
    var taskid = e.currentTarget.id.split('_')[1];
    var openId = wx.getStorageSync('openId');
    var deleteUrl = 'https://www.cpcsign.com/api/task/' + taskid + '/' + openId;
    var that = this;

      wx.showModal({
        title: '删除操作',
        content: '您确定要删除这条打卡任务吗？',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: deleteUrl,
              data: {},
              method: 'DELETE',
              success: function(res){
                // success
                that.updateTask(openId);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                })
              }
            })
          }
        }
      });
  },

  // 显示控制面板
  taskToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.myTasks;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i]._id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      myTasks: list
    });
  },

  // 分享任务
  shareTask: function (e) {
    var taskId = e.currentTarget.id.split('_')[1];

    wx.navigateTo({
      url: '/pages/task/share/share?taskID=' + taskId,
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

  // 跳转到记录页
  showRecord: function (e) {
    var taskId = e.currentTarget.id.split('_')[1];
    var dataset = e.currentTarget.dataset;
    var taskName = dataset.taskname;
    var taskStart = dataset.taskstart;
    var taskEnd = dataset.taskend;

    console.log(e);

    wx.navigateTo({
      url: '/pages/record/record?taskID=' + taskId + '&taskName='+ taskName + '&taskStart='+ taskStart +'&taskEnd='+ taskEnd,
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

  // 跳转我的任务详情页
  myDeatil: function (e) {
    var taskId = e.currentTarget.id.split('_')[1];

    wx.navigateTo({
      url: '/pages/detail/detail?taskID=' + taskId,
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

  // 跳转热门任务详情页
  hotDeatil: function (e) {
    var taskId = e.currentTarget.id.split('_')[1];

    wx.navigateTo({
      url: '/pages/add/add?taskID=' + taskId,
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

  // 热门任务
  haddleHotTask: function (e) {
    var openId = wx.getStorageSync('openId');
    var userInfo = this.data.userInfo;
    var id = e.currentTarget.id;
    var index = id.split('_')[0];
    var taskId = id.split('_')[1];
    var list = this.data.hotTasks;
    var that = this;
    
    wx.showToast({
      title: '请求中',
      icon: 'loading',
      duration: 10000
    });

    if (list[index].added) {
      wx.request({
        url: 'https://www.cpcsign.com/api/task/' + taskId + '/' + openId,
        data: {},
        method: 'DELETE',
        success: function(res){
          for (var i = 0, len = list.length; i < len; ++i) {
            if (index == i) {
              list[i].added = !list[i].added;
            }
          }
          that.setData({
            hotTasks: list
          })
          wx.showToast({
            title: '您已加入',
            icon: 'success',
            duration: 1000
          })
        }
      })
    } else {
      wx.request({
        url: 'https://www.cpcsign.com/api/task/' + taskId,
        data: {
          openId: openId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        },
        method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          for (var i = 0, len = list.length; i < len; ++i) {
            if (index == i) {
              list[i].added = !list[i].added;
            }
          }
          that.setData({
            hotTasks: list
          })
          wx.showToast({
            title: '您已退出',
            icon: 'success',
            duration: 1000
          })

        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }

    
  },

  onShow: function () {
    var that = this;
    this.updateTask(this.data.openId);
    
  },

  // 初始化设置
  onLoad: function () {
    var that = this;
    var openId = wx.getStorageSync('openId');
    var hotTasks = this.data.hotTasks;

    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });

      that.setData({
        openId: openId
      })
    });

    for (var i = 0, len = hotTasks.length; i < len; ++i) {
        hotTasks[i].added = false;
        for (var j = 0, l = hotTasks[i].userList.length; j < l; ++j) {
          if (hotTasks[i].userList[j].openId == openId) {
            hotTasks[i].added = true;
            break;
          }
        }
      }

    that.setData({
      hotTasks: hotTasks
    })
  }

})