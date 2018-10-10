var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
  },

  onLoad () {
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },

  formSubmit: function(e) {
    console.log(api.json2Form(e.detail.value))
    api.post('http://ios1.artand.cn/login/doLogin', api.json2Form(e.detail.value))
      .then(res => {
        console.log(res)
      })
  }
})
