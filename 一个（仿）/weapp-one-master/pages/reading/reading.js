import api from '../../api/api.js'

Page({
  data: {
    carousel: [],
    articles: {},
    current: 0
  },
  onLoad: function () {
    api.getCarousel({
      success: (res) => {
        if (res.data.res === 0) {
          let carousel = res.data.data
          this.setData({ carousel })
        }
      }
    })
    
    api.getLastArticles({
      success: (res) => {
        if (res.data.res === 0) {
          let articles = res.data.data
          this.setData({ articles })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '阅读'
    })
  },
  tapEssay: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'essay/essay?id=' + id
    })
  },
  tapSerial: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'serial/serial?id=' + id
    })
  },
  tapQuestion: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'question/question?id=' + id
    })
  },
  handleChange: function (e) {
    let current = e.detail.current
    let length = this.data.articles.essay.length

    if (current === length) {
      this.setData({
        current: length
      })
      wx.navigateTo({
        url: '../history/history?page=reading',
        success: () => {
          this.setData({
            current: length - 1
          })
        }
      })
    }
  }
})