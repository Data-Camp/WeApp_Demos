// topicList.js
var Api = require('../../utils/api.js');

Page({
  data: {
    title: '话题列表',
    topics: [],
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
  fetchData: function(id) {
    var that = this;
    that.setData({
      hidden: false
    })
    wx.request({
      url: Api.getTopicInfo({
        node_id: id
      }),
      success: function(res) {
        that.setData({
          topics: res.data
        })
        setTimeout(function() {
          that.setData({
            hidden: true
          })
        }, 300)
      }
    })
  },
  onLoad: function (options) {
    this.fetchData(options.id);
  }
})
