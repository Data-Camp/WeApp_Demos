var util = require('../../utils/util.js')
Page({
  data: {
    dateList: [],
    types: [
      {
        type: 'essay',
        name: '短篇'
      },
      {
        type: 'serialcontent',
        name: '连载'
      },
      {
        type: 'question',
        name: '问题'
      }
    ],
    page: 'index',
    type: 'essay'
  },
  onLoad: function (options) {
    let page = options.page
    let dateList = util.getDateList(page)
    this.setData({
      page: page,
      dateList: dateList
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '往期列表'
    })
  },
  setType: function (e) {
    let type = e.target.dataset.type
    let dateList = util.getDateList(type)
    this.setData({
      dateList: dateList,
      type: type
    })
  },
  getMonthly: function (e) {
    let month = e.target.dataset.month
    let title = e.target.dataset.title
    let page = this.data.page
    let type = this.data.type
    wx.navigateTo({
      url: `../${page}/monthly/monthly?type=${type}&title=${title}&month=${month}`
    })
  }
})