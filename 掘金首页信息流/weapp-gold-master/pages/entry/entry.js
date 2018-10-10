//entry.js
var root = getApp()
root.globalData.timeline.data
Page({
  // data
  data: {
    item: {}
  },
  // lifecycle
  onLoad: function(options) {
    this.setData({
      item: root.globalData.timeline.data[Number(options.index)]    
    })
  },
  // methods

})
