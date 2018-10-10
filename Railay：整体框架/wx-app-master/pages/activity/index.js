/**
 * /activity/index
 * 活动首页，获取活动列表
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    pageInfo: {
      'title': '活动首页'
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    // 发起一个网络请求
    wx.request({
      url: app.api.baseUrl + 'activity/index',
      data:{
        page: 1
      },
      header:{},
      success:function(res) {
        console.log(res.data)
      },
      fail:function() {
        console.log()
      },
      complete:function() {
        console.log('request complete')
      }
    })
  }
})