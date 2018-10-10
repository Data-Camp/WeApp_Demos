var API = require('../../utils/api.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    query:'php',
    page:1,
    books:[],
    hidden:false,
  },
  onLoad: function () {
    this.fetchBookData()
  	//调用应用实例的方法获取全局数据
  },
  bindKeyInput: function(e) {
    this.setData({
      query: e.detail.value
    })
  },
  redirectToDetail: function(e){
    var id = e.currentTarget.id,
        url = '../book/book?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  //获取微信精选
  fetchBookData: function(query){
    var self = this;
    self.setData({
      hidden: false
    })
    var query = self.data.query;
    var page = self.data.page;
    wx.request({ 
      url: API.ebooklist(query, page),
      success: function (res) {
        self.setData({
          books:res.data.Books,
          hidden: true
        })
      }
    });
  }
})
