//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '活动让生活更美好!',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.getUserInfo(userInfo => this.setData({ userInfo }))
  }
})
