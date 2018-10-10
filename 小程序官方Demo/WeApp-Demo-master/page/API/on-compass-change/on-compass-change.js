Page({
  data: {
    direction: 0
  },
  onReady: function () {
    var that = this
    wx.onCompassChange(function (res) {
      that.setData({
        direction: parseInt(res.direction)
      })
    })
  }
})
