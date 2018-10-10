Page({
  data: {
    hasNetworkType: false
  },
  getNetworkType: function () {
    var that = this
    wx.getNetworkType({
      success: function (res) {
        console.log(res)
        that.setData({
          hasNetworkType: true,
          networkType: res.subtype || res.networkType
        })
        that.update()
      }
    })
  },
  clear: function () {
    this.setData({
      hasNetworkType: false,
      networkType: ''
    })
  }
})
