//index.js
//获取应用实例
var app = getApp()
//console.log(app);
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindTestTap:function(){
     wx.navigateTo({
      url: '../test/test'
    })
  },
  onLoad: function () {
    console.log(app.getNet(this))
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
