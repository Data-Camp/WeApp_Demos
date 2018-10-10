let app = getApp()
Page({
  data:{
    userInfo: {}
  },
  onLoad() {
    app.getUserInfo(userInfo => {
      userInfo.gender = userInfo.gender === 1 ? 'Male' : 'Female'
      this.setData({
        userInfo: userInfo
      })
    })
  }
})