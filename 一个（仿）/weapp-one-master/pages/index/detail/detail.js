import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    detail: []
  },
  onLoad: function (options) {
    api.getVolDetailById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let detail = res.data.data
          detail.hp_makettime = util.formatMakettime(detail.hp_makettime)
          this.setData({ detail })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '图文'
    })
  }
})