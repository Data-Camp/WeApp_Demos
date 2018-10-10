/**
 * /post/index
 * 信息发布首页
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
      'title': '发布内容'
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    // 发起一个网络请求
    wx.request({
      url:'http://192.168.6.13.xip.io/v1/share/index',
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