//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    const logs = wx.getStorageSync('logs') || []
    this.setData({
      logs: logs.map(log => util.formatTime(new Date(log)))
    })
  }
})
