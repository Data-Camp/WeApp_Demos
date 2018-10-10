Page({
  data: {
    hidden: true
  },
  loadingChange: function() {
    this.setData({
      hidden: true
    })
  },
  loadingTap: function() {
    this.setData({
      hidden: false
    })

    var that = this
    setTimeout(function() {
      that.setData({
        hidden: true
      })
    }, 1500)
  }
})
