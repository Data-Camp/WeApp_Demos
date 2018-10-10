Page({
  setNaivgationBarTitle: function (e) {
    var title = e.detail.value.title
    console.log(title)
    wx.setNavigationBarTitle({
      title: title
    })
  }
})
