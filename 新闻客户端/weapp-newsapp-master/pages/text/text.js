//text.js
var util = require('../../utils/util.js')
var root = getApp()

Page({
  data: {
    data: root.globalData.news.data,
    icontype: ["info_circle", "info"],
    modalHidden: true,
    modalContent: {}
  },
  onLoad: function () {
    var self= this, tmpObjData = root.globalData.news.data
    console.log("onLoad news")

    this.setData({
      data: {
        hotwords: tmpObjData.hotwords.concat(tmpObjData.topwords),
        hotnews: tmpObjData.hotnews1.concat(tmpObjData.hotnews2),
        topnews: tmpObjData.topnews,
        fakeUrl: "http://mp.weixin.qq.com/s?_biz="
      }
    })
  },
  modalTap: function (e) {
    var self = this
    console.log(e.currentTarget.dataset)

    this.setData({
      modalContent: self.data.data.hotnews[Number(e.currentTarget.dataset.index)],
      modalHidden: false
    })
  },
  modalHide: function(e) {
    this.setData({
      modalHidden: true
    })
  }
  // contentLimit: function(content) {
  //   return content.substr(20)
  // }
})
