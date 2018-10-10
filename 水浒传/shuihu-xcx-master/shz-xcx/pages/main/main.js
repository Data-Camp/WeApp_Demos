var app = getApp()
Page({
  data: {
    motto: '水浒',
    userInfo: {}
  },
  onButtonTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    setTimeout(()=>{
      wx.navigateTo({
        url:'./../index/index'
      })
    },1000)
  	//登录
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({userInfo: res.userInfo})
            that.update()
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    });
  }
})
