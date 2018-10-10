Page({
  onItemClick: function (e) {
    var targetUrl = '/pages/qrcode/qrcode?pay=' + e.currentTarget.dataset.pay
    wx.navigateTo({
      url: targetUrl
    })
  },

  login () {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})
