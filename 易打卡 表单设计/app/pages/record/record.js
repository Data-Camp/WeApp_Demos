var util = require('../../utils/util.js');

Page({
  data: {
    openId: '',     
    taskID: '',       //任务ID
    taskName: '',     //任务名称
    taskStartDate: '',
    taskEndDate: '',
    currentTime: '',  //设置当前时间

    tabIndex: 0,      //页卡索引

    aontime: 0,       //全员准时签到的人数
    alate: 0,         //全员到签到的人数
    aleave: 0,        //全员请假的人数
    absent: 0,        //全员未打卡的人数
    aStartDay: '2016-12-01',     //任务开始时间
    aEndDay: '2017-12-01',       //任务结束时间
    aRecordList: [],

    sontime: 0,       //个人准时签到的人数
    slate: 0,         //个人到签到的人数
    sleave: 0,        //个人请假的人数
    sbsent: 0,        //个人未打卡的人数
    sStartDay: '2016-12-01',     //个人开始时间
    sEndDay: '2017-12-01',       //个人结束时间
    sLateList: [],
    sLeaveList: [],
    sAbsentList: [],
    sOntimeList: [],

    sMenuIndex: 0
  },

  // 切换
  changeTab: function (e) {
    var id = e.currentTarget.id;
    var now = new Date();
    var d = this.data;
    var that = this;

    // 点击全体页卡时
    if (id == 'all') {
      this.setData({
        tabIndex: 0
      })

       // 请求当天全体统计记录
      this.getAllTotal(d.taskID, util.getYMD(now), util.getYMD(now));

      // 请求当天全体详细记录
      this.getAllRecord(d.taskID, d.aStartDay, d.aEndDay)
    }

    // 点击个人页卡时
    if (id == 'single') {
      this.setData({
        tabIndex: 1
      })

      // 加载数据
      this.getSingleTotal(d.openId, d.taskID, d.aStartDay, d.aEndDay);
      this.getSingleRecord(d.openId, d.taskID, d.aStartDay, d.aEndDay, ['late', 'leave', 'absent', 'ontime'][d.sMenuIndex]);
    }
  },

  // 切换
  changeSTab: function (e) {
    var id = e.currentTarget.id;
    var d = this.data;
    var that = this;

    // 点击迟到
    if (id == 'late') {
      this.setData({
        sMenuIndex: 0
      })
    }

    // 点击请假
    if (id == 'leave') {
      this.setData({
        sMenuIndex: 1
      })
    }

    // 点击未打卡
    if (id == 'absent') {
      this.setData({
        sMenuIndex: 2
      })
    }

    // 点击已打卡
    if (id == 'ontime') {
      this.setData({
        sMenuIndex: 3
      })
    }

    this.getSingleRecord(d.openId, d.taskID, d.aStartDay, d.aEndDay, id);

  },

  // 全体查询开始日期
  aStartDateChange: function (e) {
    var d = this.data;

    this.setData({
      aStartDay: e.detail.value
    })

    this.getAllRecord(d.taskID, d.aStartDay, d.aEndDay);
  },

  // 全体查询结束日期
  aEndDateChange: function (e) {
    var d = this.data;

    this.setData({
      aEndDay: e.detail.value
    })
    this.getAllRecord(d.taskID, d.aStartDay, d.aEndDay);
  }, 

  // 全体查询统计数
  getAllTotal: function (taskID, startDay, endDay) {
    var that = this;

    wx.request({
      url: 'https://www.cpcsign.com/api/sign?type=daily&taskID=' + taskID + '&startDate=' + startDay + '&endDate='+ endDay,
      method: 'GET',
      success: function(res){
        // success
        var d = res.data.data;
        console.log(res);
        that.setData({
          'aontime': d.ontime,
          'alate': d.late,
          'aleave': d.leave,
          'absent': d.absent
        })
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '请输入有效日期',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function() {
        // complete
      }
    })

  },

  // 全体查询详细
  getAllRecord: function (taskID, startDay, endDay) {
    var that = this;
    
     wx.request({
      url: 'https://www.cpcsign.com/api/sign?type=all&taskID=' + taskID + '&startDate=' + startDay + '&endDate='+ endDay,
      method: 'GET', 
      success: function(res){
        // success
        console.log(1111);
        console.log(res)
      
        that.setData({
          aRecordList: res.data.data
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

  // 个人查询开始日期
  sStartDateChange: function (e) {
    var d = this.data;

    this.setData({
      sStartDay: e.detail.value
    })

    this.getSingleTotal(d.openId, d.taskID, d.sStartDay, d.sEndDay);
    this.getSingleRecord(d.openId, d.taskID, d.sStartDay, d.sEndDay, ['late', 'leave', 'absent', 'ontime'][d.sMenuIndex]);
  },

  // 个人查询结束日期
  sEndDateChange: function (e) {
    var d = this.data;

    this.setData({
      sEndDay: e.detail.value
    })
    this.getSingleRecord(d.openId, d.taskID, d.sStartDay, d.sEndDay);
    this.getSingleRecord(d.openId, d.taskID, d.sStartDay, d.sEndDay, ['late', 'leave', 'absent', 'ontime'][d.sMenuIndex]);
  },

  // 个人查询统计
  getSingleTotal: function (openId, taskID, startDay, endDay) {
    var that = this;

    wx.request({
      url: 'https://www.cpcsign.com/api/sign?type=individual&detail=simple&openId=' + openId + '&taskID=' + taskID + '&startDate=' + startDay + '&endDate='+ endDay,
      method: 'GET',
      success: function(res){
        // success
        var d = res.data.data;
        console.log(res);
        that.setData({
          'sontime': d.ontime,
          'slate': d.late,
          'sleave': d.leave,
          'sbsent': d.absent
        })
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '请输入有效日期',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function() {
        // complete
      }
    })
  },

  // 个人查询详细
  getSingleRecord: function (openId, taskID, startDay, endDay, detail) {
    var that = this;

    wx.request({
      url: 'https://www.cpcsign.com/api/sign?type=individual&openId=' + openId + '&taskID=' + taskID + '&startDate=' + startDay + '&endDate='+ endDay + '&detail=' + detail,
      method: 'GET',
      success: function(res){
        // success
        var d = res.data.data;
        console.log(d);
        
        switch (detail) {
          case 'late':
            that.setData({
              sLateList: d
            })
            break;
          case 'leave':
            that.setData({
              sLeaveList: d  
            })
            break;
          case 'absent':
            that.setData({
              sAbsentList: d
            })
            break;
          case 'ontime':
            that.setData({
              sOntimeList: d
            })
            break;
        }

      },
      fail: function() {

      },
      complete: function() {
        // complete
      }
    })
  },

  // onShow: function () {
  //   wx.setNavigationBarTitle({
  //     title: this.data.taskName
  //   })
  // },

  onLoad: function (options) {
    var that = this;
    var now = new Date();
    var d = this.data;
    
    console.log(options);
    
    //保存taskID,taskName，并设置当前时间currentTime
    this.setData({
      openId: wx.getStorageSync('openId'),
      taskID: options.taskID,
      taskName: options.taskName,
      taskStartDate: options.taskStart,
      taskEndDate: options.taskEnd,
      currentTime: util.getYMD(now) + ' ' + util.getHM(now) + ' ' + util.getW(now),

      sStartDay: options.taskStart,
      sEndDay: options.taskEnd

    })

    // 初始化全体统计日期
    this.setData({
      aStartDay: util.getYMD(now),
      aEndDay: util.getYMD(now)
    })

    //设置任务名称
    wx.setNavigationBarTitle({
      title: options.taskName
    })

    // 请求当天全体统计记录
    this.getAllTotal(options.taskID, util.getYMD(now), util.getYMD(now));

    // 请求当天全体详细记录
    this.getAllRecord(options.taskID, d.aStartDay, d.aEndDay)


  }
})