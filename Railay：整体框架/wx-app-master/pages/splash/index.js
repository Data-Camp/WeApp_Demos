/**
 * /splash/index
 * 启动页（闪屏），定时跳转到内页
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    src: 'http://imgsrc.baidu.com/forum/w%3D580/sign=a01054492ff5e0feee1889096c6034e5/88c5a1c27d1ed21b5efb75b5af6eddc451da3f04.jpg'
  },
  onLoad: function () {
    var that = this

    /** 
     * 循环计时器，定时向服务器发送数据
    setInterval(function() {
      console.log('Hello, baby-----')
    }, 1000)
     */

    // 定时执行一次脚本
    setTimeout(function() {
      console.log('Hello, baby-----')
      wx.redirectTo({
        url: '/pages/share/index',
        success: function() {
          console.log('大家闪开，我要跳转了！')
        },
        fail: function() {
          console.log('卧槽，跳转失败')
        },
        complete: function() {
          console.log('预备，跳')
        }
      })
    }, 3000)

    wx.getStorage({
      key: 'loginInfo',
      success: function(res) {
        var token = res.data.token
        var uid = res.data.uid
        that.fetchData(token, uid)
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  },
  
  fetchData: function(token, uid) {
    // 发起一个网络请求
    wx.request({
      url:app.api.baseUrl + 'me/index',
      data:{
        uid: uid
      },
      header:{
        'Content-Type': 'application/json',
        'appId': app.api.appId,
        'appSecret': app.api.appSecret,
        'token': token
      },
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