//获取应用实例
var app = getApp()
var fuzzy = require('../../../utils/fuzzy.js')
Page({
  data: {
    
  },
 
  onLoad: function() {
    var that = this
    this.setData({
      token: app.globalData.token
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/Free',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        var champions = []
        for(var i in res.data.data[0])
          champions.push(res.data.data[0][i])
        that.setData({
          champions_free: champions,
        })
      }
    })

    
  }
})
