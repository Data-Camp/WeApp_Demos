/**
 * /share/detail
 * 分享详情页
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    hideLoading: false,
    detail: ''
  },
  onLoad: function (options) {
    console.log(options.id)
    var that = this

    wx.getStorage({
      key: 'lastPage',
      success: function(res) {
        var data = res.data
        var pageUrl = data.pageUrl
        var id = data.id
        if (pageUrl == '/pages/share/detail') {
          that.fetchData(id)
        }
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  },
  fetchData: function(id) {
    var that = this
    // 发起一个网络请求
    wx.request({
      url:app.api.baseUrl + 'share/' + id,
      header:{
        'Content-Type': 'application/json',
        'appId': app.api.appId,
        'appSecret': app.api.appSecret,
      },
      success:function(res) {
        if (res.statusCode == 200) {
          var resposneData = res.data;
          if (resposneData.errorCode != 0) {
            //
          } else {
            that.setData({
              detail: resposneData.results
            })
          }
        }
      },
      fail:function() {
      },
      complete:function() {
        that.setData({
          hideLoading: true
        })
      }
    })
  }
})