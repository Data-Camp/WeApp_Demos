var api = require('../../utils/api.js')
var app = getApp()

Page({
  data: {
    systemInfo: {},
    _api: {},
    work: {},
    owner: {},
    likes: []
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
    if (options === null || options.rowId === null) {
      // this.setData({hidden: true, toastHidden: false});
      return
    } else {
      api.get(`${api.HOST_IOS}artid/${options.rowId}`)
        .then(res => {
          that.setData({
            work: res.data.work,
            owner: res.data.owner,
            likes: res.data.likes
          })
        })
    }
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})
