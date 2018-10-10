var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
    systemInfo: {},
    _api: {},
    imgList: [
      '/images/discover/image_artist@2x.png',
      '/images/discover/dailySelection@2x.png',
      '/images/discover/image_fans@2x.png',
    ],
    imgListTwo: [
      [
        '/images/discover/image_preson@2x.png',
        '/images/discover/image_read@2x.png'
      ],
      [
        '/images/discover/image_collect@2x.png',
        '/images/discover/image_appreciate@2x.png'
      ]
    ]
  },

  onLoad: function (options) {
    var that = this
    app.getSystemInfo(function(res) {
      that.setData({
        systemInfo: res
      })
    })

    that.setData({
      _api: api
    })
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
})
