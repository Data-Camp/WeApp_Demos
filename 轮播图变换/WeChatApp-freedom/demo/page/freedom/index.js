//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello WeChatApp',
    userInfo: {}
  },
  goDemos: function() {
    wx.navigateTo({
      url: '../component/index'
    })
  },
  goSWiper: function() {
    wx.navigateTo({
      url: '../component/component-pages/swiper/swiper'
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
  }
})
