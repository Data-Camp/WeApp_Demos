//获取应用实例
var app = getApp()
Page({
  data: {
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      token: app.globalData.token,
      champion_id: options.champion_id
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/GetChampionDetail?champion_id='+this.data.champion_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        console.log(JSON.stringify(res))
        that.setData({
          champion: res.data.data[0]
        })
      }
    })

    
  }
})
