let app = getApp();
let level = 1;
Page({
  data: {
  },

  onLoad(params){
    level = params.level;
    this.setData({
      errMsg: app.globalData.errMsg
    })
  },

  onUnload(){
    app.globalData.errMsg = '很抱歉，所选日期产品目前资源不足，请重新选择！';
  },

  rebackIndex(){
    wx.navigateBack({
      delta: level*1
    })
  }
})
