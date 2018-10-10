import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    title: '',
    monthly: []
  },
  onLoad: function (options) {
    this.setData({ 
      title: options.title
    })
    api.getVolsByMonth({
      query: {
        month: options.month
      },
      success: (res) => {
        if (res.data.res === 0) {
          let monthly = res.data.data

          monthly.map((vol) => {
            vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
          })
          this.setData({ monthly })
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
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})