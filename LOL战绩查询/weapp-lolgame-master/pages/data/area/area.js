//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    token:null,
    area:null,
    game: []
  },
  refresh: function(){
    var that = this
    var l_token = getApp().globalData.token
    this.setData({
      token: l_token
    })

    wx.request({
      url: 'http://lolapi.games-cube.com/Area',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": l_token
      },
      success: function(res) {
        app.globalData.area = res.data.data
        that.setData({
          area: res.data.data
        })
      }
    })
  },
  onLoad: function() {
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
    wx.stopPullDownRefresh()
  }
  
})
