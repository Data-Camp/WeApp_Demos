var app = getApp();

Page({
  data: {
    task: {},
    userInfo: {},
    openId: '',
    added: false,
    btnTxt: '加入打卡'
  },

  // 获取任务详情
  getTask: function (taskId) {
    var that = this;

    wx.request({
      url: 'https://www.cpcsign.com/api/task',
      data: {
        taskID: taskId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        var openId = wx.getStorageSync('openId');
        var userList = res.data.data.userList;
        // success
        that.setData({
          'task': res.data.data 
        });

        wx.setNavigationBarTitle({
          title: res.data.data.name
        });
        

        // 判断是否已经加入
        for (var i = 0, len = userList.length; i < len; i++) {
          if (userList[i].openId == openId) {
            that.setData({
              added: true,
              btnTxt: '已加入'
            })
            break;
          }
        }
        

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 加入任务
  addtask: function (e) {
    var openId = wx.getStorageSync('openId');
    var taskId = e.currentTarget.id.split('_')[1];
    var userInfo = this.data.userInfo;
    var that = this;

    wx.showToast({
      title: '请求中',
      icon: 'loading',
      duration: 10000
    });


    if (!this.data.added) {
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

          that.getTask(taskId);
          wx.hideToast();
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

  // 初始化设置
  onLoad: function (options) {
    var that = this;
    var openId = wx.getStorageSync('openId');
    var taskId = options.taskID;

    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });

      that.setData({
        openId: openId
      })
    });

    that.getTask(taskId);
    
  }
})