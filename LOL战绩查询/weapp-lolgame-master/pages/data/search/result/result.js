//获取应用实例
var app = getApp()
Page({
  data: {
    contentShow:false,
    result:null,
    area: null
  },
  widgetsToggle: function() {
    var show = this.data.contentShow
    show = !show
    this.setData({
      contentShow: show
    })

  },
  onLoad: function() {
    this.setData({
      result: app.globalData.search_result.data.data,
      area: app.globalData.area
    })
  }
  
})
