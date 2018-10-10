
var mars = require('../../../mars/modules/mars')
var articleApi = require('../../../mars/services/articleApi')

Page({
  data: {

  },
  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
    this.initArticle(options.aid)
  },
  initArticle: function (aid) {
    let _this = this
    let params = {
      data: {
        nid: aid,
      }
    }
    articleApi.ArticleDetail(params, _this.articleBack)
  },
  articleBack: function (res) {
    let _this = this
    if (res.Code == '0000') {
      let tempdata = res.NewsInfo[0]
      //html2json未处理转义字符，可自行使用正则转义后再使用html2json
      tempdata.content = mars.html2json(tempdata.NContent)
      console.log(tempdata)
      _this.setData({
        articleInfo: tempdata,
      })
    }
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
  }
})