var API = require('../../utils/api.js');
//获取应用实例
Page({
  data: {
    info:{},
    hidden:false
  },
  onLoad: function (e) {
    console.log(e)
    this.fetchBookData(e.id)
  },
  //获取微信精选
  fetchBookData: function(id){
    let self = this;
    wx.request({
        url: API.ebookinfo(id),
        success: function (res) {
          self.setData({
            info:res.data,
            hidden: true
          })
        }
    })
  }
})
