//获取应用实例
var app = getApp()
Page({
  data: {
  },
  
  onLoad: function(options) {
    var that = this
    this.setData({
      token: app.globalData.token,
      champion:options.champion_id
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/ChampionRank?championid='+this.data.champion+'&p=1',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        
        that.setData({
          rank: res.data.data[0]
        })
      }
    })

    
  }
})
