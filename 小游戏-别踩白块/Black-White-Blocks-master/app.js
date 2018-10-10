//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getHeighestScore: function(scoreName, cb){
    this.globalData[scoreName] = wx.getStorageSync(scoreName);
    typeof cb == "function" && cb(this.globalData[scoreName])
  },
  globalData:{
    userInfo: null,
    currentScore: 0,
    endlessScore: null,
    timeScore: null,
    speedScore: null
  }
})