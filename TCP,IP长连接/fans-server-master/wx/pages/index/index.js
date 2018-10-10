//index.js
//获取应用实例
var app = getApp()
var decoder = require('../../utils/encoding.js')
Page({
  data: {
    motto: 'Chat Room',
    userInfo: {},
    message:'...'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.connectSocket({
    url:"ws://120.24.229.18:3564/",
    })
    wx.onSocketMessage(function(res){
    console.log("收到服务器内容1：" + res.data)
    decoder.decode(res.data,that)
    })
  }
})
