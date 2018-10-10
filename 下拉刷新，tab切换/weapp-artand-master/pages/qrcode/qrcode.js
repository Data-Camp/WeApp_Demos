Page({
  data: {
    img: '/images/wechat-qrcode.jpg'
  },

  onLoad: function (options) {
    if (options.pay == 'wechat') {
      this.data.img = '/images/wechat-qrcode.jpg'
    } else {
      this.data.img = '/images/alipay-qrcode.jpg'
    }
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})
