var app = getApp()
Page({
  data: {
    motto: '欢迎回来',
    userInfo: {}
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
  },
  onShow:function(){
    setTimeout(function(){
      wx.redirectTo({
        url: './../index/index'
      })
    },2000)
  }
})