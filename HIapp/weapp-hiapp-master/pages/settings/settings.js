let app = getApp()
Page({
  data:{
    userInfo: {}
  },
  onLoad() {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      })
    })
  },
  navToPage(event) {
    let route = event.currentTarget.dataset.route
    wx.navigateTo({
      url: route
    })
  }
})