/**
 * Page() 快速打卡页
 *   
 * @author marsliang <marsliang@tencent.com>
 * @date   2016‎-11-‎14 ‎20:07:04
 * @update 2016-11-30
 */
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    // 是否有签到任务
    flag: false,

    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 400,
    current: 0,

    tasks: [],
    quickTasks: [],
    userInfo: {},
    openId: '',

    currentState: 0,
    currentTimeFlag: 0,

    currentLeaveStart: '',
    currentLeaveEnd: '',

    curTask: {},
    
    // 倒计时
    clock: {
      hour: '00',
      min: '00'
    },

    // 打卡按钮状态 0:未按压 1：按压 2：完成
    btn: 0,
    btnPress: false,
    
    updateAddres: false,

    // 提示框默认隐藏
    modalHidden: true,
    modalText: '',
    leaveHidden: true,
    
    // 默认心情为空
    humor: '',
    humorAble: false,
    // 请假事由
    reason: ''
  },

  // 显示请假面板
  showLeavePanel: function () {
    this.setData({
      leaveHidden: false
    })
  },

  // 关闭请假面板
  HideLeavePanel: function () {
    this.setData({
      leaveHidden: true
    })
  },

  // 当前请假任务开始时间
  startDateChange: function (e) {
    this.setData({
      currentLeaveStart: e.detail.value
    })
  }, 

  // 当前请假任务结束时间
  endDateChange: function (e) {
    this.setData({
      currentLeaveEnd: e.detail.value
    })
  },

  inputReason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },

  // 发送请假请求
  leaveSubmit: function () {
    var openId = wx.getStorageSync('openId');
    var d = this.data;

    wx.showToast({
      title: '请假中',
      icon: 'success',
      duration: 2000
    })

    wx.request({
      url: 'https://www.cpcsign.com/api/leave',
      data: {
        taskID: d.curTask._id,
        openId: openId,
        startDate: d.currentLeaveStart,
        endDate: d.currentLeaveEnd,
        reason: d.reason
      },
      method: 'POST',
      success: function(res){
        // success
        that.HideLeavePanel();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },


  // 更新距离
  updateDistance: function () {
    var openId = wx.getStorageSync('openId');
    var that = this;

    this.setData({
      updateAddres: true
    });

    setTimeout(function () {
      that.setData({
        updateAddres: false
      });
    }, 1000);

    this.updateTask(openId);
  },
  
  // 获取任务
  updateTask: function (openId) {
    var that = this;

    wx.request({
      url: 'https://www.cpcsign.com/api/task',
      data: {
        'openId': openId
      },
      method: 'GET', 
      success: function(res){
        // success
        var tasks = res.data.data.sort(function (a, b) {
          return a.state - b.state
        });
        var tmpTasks = [];

        for (var j = 0, len = tasks.length; j < len; ++j) {
          if (tasks[j].state == 0 || tasks[j].state == 1 || tasks[j].state == 2 ) {
            tmpTasks.push(tasks[j]);
          }
        }
        
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function(res){
            
            var my = {
              latitude: res.latitude,
              longitude: res.longitude
            }

            for (var i = 0, len = tmpTasks.length; i < len; ++i) {
              var d = that.getDistance(my.latitude, my.longitude, tmpTasks[i].latitude, tmpTasks[i].longitude);
              tmpTasks[i].distance = '距离还有' + d + '公里';
            }

            
            that.setData({
              flag: true,
              tasks: tmpTasks,
              currentState: tmpTasks[that.data.current].state,
              curTask: tmpTasks[that.data.current],
              currentLeaveStart: tmpTasks[that.data.current].startTime,
              currentLeaveEnd: tmpTasks[that.data.current].endTime,
              humorAble: tmpTasks[that.data.current].state == 0 ? true : false
            })

            // 时间
            var sign;
            var now = new Date();
            var nowDate = util.getYMD(now);
            var time_str = nowDate + ' ' + tmpTasks[that.data.current].signTime + ':00';
            
            sign = new Date(time_str.replace(/-/g, '/'));

            if (now.getTime() < sign.getTime()) {
                // 倒计时状态
                that.setData({
                  currentTimeFlag: 0
                })
            } else {
                // 已迟到状态
                that.setData({
                  currentTimeFlag: 1
                })
            }

            var disTime = Math.abs(now.getTime() - sign.getTime());

            that.setData({
              'clock.hour': util.formatNumber(Math.floor(disTime/(3600*1000))),
              'clock.min': util.formatNumber(Math.floor(disTime%(3600*1000)/(60*1000)))
            })
          }
        })
      }
    })
  },

  // 切换滑块
  changeSwiper: function (e) {
    var that = this;
    var sign;
    var now = new Date();
    var nowDate = util.getYMD(now);
    var time_str = nowDate + ' ' + this.data.tasks[e.detail.current].signTime + ':00';

    this.setData({
      current: e.detail.current
    })

    sign = new Date(time_str.replace(/-/g, '/'));

    if (now.getTime() < sign.getTime()) {
        // 倒计时状态
        that.setData({
          currentTimeFlag: 0
        })
    } else {
        // 已迟到状态
        that.setData({
          currentTimeFlag: 1
        })
    }

    var disTime = Math.abs(now.getTime() - sign.getTime());

    that.setData({
      'clock.hour': util.formatNumber(Math.floor(disTime/(3600*1000))),
      'clock.min': util.formatNumber(Math.floor(disTime%(3600*1000)/(60*1000)))
    })

    this.setData({
      currentState: this.data.tasks[e.detail.current].state,
      curTask: this.data.tasks[e.detail.current],
      currentLeaveStart: this.data.tasks[e.detail.current].startTime,
      currentLeaveEnd: this.data.tasks[e.detail.current].endTime
    })
    
  },

  // 计算距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    function rad(d) {
      return d * Math.PI / 180.0
    }

    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s * 6378.137 ;// EARTH_RADIUS;
    s = (Math.round(s * 10000) / 10000).toFixed(2);
    return s;

  },

  // 签到打卡
  signTask: function () {
    var that = this;
    var d;

    if (!this.data.btnPress) {
      wx.showToast({
        title: '请求中',
        icon: 'loading',
        duration: 1000
      })

      this.setData({
        'btn': 1,
        'btnPress': true
      });

      setTimeout(function () {
        that.setData({
          'btn': 0,
          'btnPress': false
        });
      }, 500);
      
      wx.getLocation({
        type: 'wgs84', 
        success: function(res){
          var openId = wx.getStorageSync('openId');
          var my = {
            latitude: res.latitude,
            longitude: res.longitude
          };

          var curTask = that.data.tasks[that.data.current];
          var d = that.getDistance(my.latitude, my.longitude, curTask.latitude, curTask.longitude);

          if (d < 2) {

            if (that.data.currentTimeFlag == 0 && parseInt(that.data.clock.hour) > 2) {
              that.setData({
                modalText: '您来的太早了',
                modalHidden: false
              })
            } else {
              
              wx.request({
                url: 'https://www.cpcsign.com/api/sign?time='+ (new Date()).getTime(),
                data: {
                  openId: openId,
                  taskID: curTask._id,
                  longitude: curTask.longitude,
                  latitude: curTask.latitude,
                  say: that.data.humor
                },
                method: 'POST',
                success: function(res){
                  // success
                  that.updateTask(openId);
                  wx.showToast({
                    title: '签到成功',
                    icon: 'success',
                    duration: 1000
                  });
                  that.setData({
                    modalHidden: true
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

            
          } else {
            wx.hideToast()
            that.setData({
              'modalText': '您还没有到达任务地点附近',
              'modalHidden': false
            });
          }

          // success
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

  // 隐藏弹出框
  modalChange: function () {
    this.setData({
      'modalHidden': true
    });
  },

  // 监听输入框
  bindKeyInput: function (e) {
    this.setData({
      humor: e.detail.value
    })
  },

  onReady: function () {
  },

  // 监听页面显示
  onShow: function () {
    var that = this;
    var openId, Timer;

    Timer = setInterval(function () {
      if (wx.getStorageSync('openId')) {
        clearInterval(Timer);
        openId = wx.getStorageSync('openId');
        that.updateTask(openId);
      }
    }, 30);
  },

  // 初始化
  onLoad: function () {
    var that = this, openId;
    app.getUserInfo(function(userInfo){
      
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
  }
});