// hotest.js
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '最热话题',
    hotest: [],
    hidden: false
  },
  // 事件处理函数
  redictDetail: function(e) {
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
      
    wx.navigateTo({
      url: url
    })
  },
  fetchData: function() {
    var that = this;
    wx.request({
      url: Api.getHotestTopic({
        p: null
      }),
      success: function(res) {
        console.log(res);
        that.setData({
          hotest: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function () {
    this.setData({
      hidden: false
    })
    this.fetchData();
  }
})
