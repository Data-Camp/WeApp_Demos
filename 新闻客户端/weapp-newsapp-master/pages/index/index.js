//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    welcome: "Get Latest News Now",
    "username": "hijiangtao",
    img: "http://tva4.sinaimg.cn/crop.0.0.1080.1080.180/0066Db0Pjw8erk3vg33raj30u00u0jt0.jpg"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../text/text'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  }
})
