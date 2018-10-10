//index.js
var root = getApp()
Page({
  // data
  data: {
    timeLine: root.globalData.timeline.data
  },
  // lifecycle
  onLoad () {
    console.log('timeline onLoad')
  },
  // methods
  touchEntry (e) {
    wx.navigateTo({
      url: '../entry/entry?index=' + e.currentTarget.dataset.index
    })
  },
  contentLimit (text) {
    return text.substr(50)
  }
})
