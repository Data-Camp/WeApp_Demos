/**
 * /share/index
 * 分享首页，获取活动列表
 * 
 * [@xialu](https://github.com/xialu)
 * [@railay](https://github.com/railay)
 */

//获取应用实例
var app = getApp()
Page({
  data: {
    hideLoading: false,
    hideToast: true,
    title: 'Share Index',
    motto: 'Hello World',
    pageInfo: {
      'title': '分享首页'
    },
    noData: true,
    items:[],
    hasNext: false,
    location: {
      latitude: 0.0,
      longitude: 0.0
    }
  },
  tappedImage: function(event) {
    var id = event.target.dataset.id
    this.saveCacheData('lastPage', {'pageUrl':'/pages/share/detail', 'id':id})
    wx.navigateTo({
      url: 'detail?id=' + id
    })
  },
  tappedLove: function() {
    this.setData({
      hideToast: false
    })
  },
  tappedComment: function() {
    this.setData({
      hideToast: false
    })
  },
  hideToast: function() {
    this.setData({
      hideToast: true
    })
  },
  onLoad: function () {
    var that = this
    // 获取经纬度
    wx.getLocation({
      type: 'gcj02', // 火星坐标gcj02,GPS坐标wgs84
      success: function(loc) {
        if (loc.errMsg == 'getLocation:ok') {
          var locData = {
            latitude: loc.latitude,
            longitude: loc.longitude
          }
          that.setData({
            location: locData
          })
          that.saveCacheData('location', locData)
        }
      },
      fail: function(e) {
      },
      complete: function() {
      }
    })

    // 发起一个网络请求
    wx.request({
      url:app.api.baseUrl + 'Room/GetNewRoomOnline',
      data:{
        page: 1
      },
      header:{
        'Content-Type': 'application/json',
        'appId': app.api.appId,
        'appSecret': app.api.appSecret,
      },
      success:function(res) {
        if (res.statusCode == 200) {
          var resposneData = res.data;
          if (resposneData.code != 100) {
            //
          } else {
            var dataLength = resposneData.data.list.length;
            if (dataLength > 0) {
              console.log(resposneData.data.list)
              that.setData({
                noData: false,
                items: resposneData.data.list
              })
            }
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
  },

  // 存储数据
  saveCacheData:function(key, data) {
    wx.setStorage({
      key: key,
      data: data,
      success: function() {
        return true
      },
      fail: function() {
        return false
      },
      complete: function() {
      }
    })
  },

  // 读取数据 ...目前无调用
  getCachedData: function(key) {
    wx.getStorage({
      key: key,
      success: function(res) {
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  }
})