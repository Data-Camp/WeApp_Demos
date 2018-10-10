import api from '../../../api/api.js'

Page({
  data: {
    title: '',
    musics: []
  },
  onLoad: function (options) {
    this.setData({ 
      title: options.title
    })
    api.getMusicsByMonth({
      query: {
        month: options.month
      },
      success: (res) => {
        if (res.data.res === 0) {
          let musics = res.data.data
          this.setData({ musics })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  handleTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})