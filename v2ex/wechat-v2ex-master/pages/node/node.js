// latest.js
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '全部节点',
    nodes: [],
    hidden: false
  },
  fetchData: function() {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getAllNode(),
      success: function(res) {
        console.log(res);
        that.setData({
          nodes: res.data
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
    this.fetchData();
  }
})
