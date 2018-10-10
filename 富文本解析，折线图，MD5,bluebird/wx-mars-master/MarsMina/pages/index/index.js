
var articleApi = require('../../mars/services/articleApi')

Page({
  data: {
    articlelist: [],
    loading: true,
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    this.initArticleList()

  },
  initArticleList: function () {
    let _this = this
    let params = {
      data: {
        pageIndex: 1,
        pageSize: 10,
      }
    }
    articleApi.ArticleList(params, _this.articleBack)
  },
  articleBack: function (res) {
    let _this = this
    if (res.Code == '0000') {
      //为显示加载动画添加3秒延时
      setTimeout(function () {
        _this.setData({
          articlelist: res.Row,
          loading: !_this.data.loading,
        })
      }, 2000)
    }
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },
  // 生命周期函数--监听页面显示
  onShow: function () {

  },
  // 生命周期函数--监听页面隐藏
  onHide: function () {

  },
  // 生命周期函数--监听页面卸载
  onUnload: function () {

  },

})