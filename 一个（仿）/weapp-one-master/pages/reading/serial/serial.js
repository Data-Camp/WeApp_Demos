import api from '../../../api/api.js'
import util from '../../../utils/util.js'

Page({
  data: {
    serial: {}
  },
  onLoad: function (options) {    
    api.getSerialById({
      query: {
        id: options.id
      },
      success: (res) => {
        if (res.data.res === 0) {
          let serial = res.data.data
          serial.content = util.filterContent(serial.content)
          serial.maketime = util.formatMakettime(serial.maketime)
          this.setData({ serial })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '连载'
    })
  }
})