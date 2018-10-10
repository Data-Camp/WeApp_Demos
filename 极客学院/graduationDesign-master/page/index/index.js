var app = getApp();
var bookData = require('../../util/booklist.js');
Page({
  data: {
    dataList:null,
  },
  onLoad: function () {
    var that = this
    console.log('onLoad')
    that.setData({
      dataList:bookData.bookList
    })
  },
  previewId:function(e){
    var id = e.currentTarget.dataset.id

    app.globalData.wikiId = id;

    wx.navigateTo({
      url: './../catalog/catalog'
    })
  }
})