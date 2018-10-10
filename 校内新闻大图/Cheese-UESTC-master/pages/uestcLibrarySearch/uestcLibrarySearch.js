// pages/uestcLibrarySearch/uestcLibrarySearch.js
Page({
  data: {
    librarySearchInputValue: '',
    bookSearch: [],
    tip: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({

      librarySearchInputValue: options.librarySearchInputValue
    });
    this.getDataFromServer(this);

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getDataFromServer: function (that) {
    var that = that
    wx.request({
      //连到服务器 获取json格式的文档
      url: Constant.SERVER_ADDRESS + "/librarySearch",
      data: {

        librarySearchInputValue: that.data.librarySearchInputValue,
      },
      method: 'GET',
      success: function (res) {
        if (res.data.htmlBody == '_no_search_result_') {
          that.setData({
              tip: '无搜索结果'
            })
        } else {
          if (res.data.htmlBody.length > 0) {
            that.setData({
              bookSearch: res.data.htmlBody
            })
          }
          else {
            that.setData({
              tip: '无搜索结果'
            })
          }
        }




      },
      fail: function (res) {

        that.setData({
          tip: '无搜索结果'
        })
      },
    })
  }
})
//获取配置的的 全局常量
var Constant = require('../../utils/constant.js');