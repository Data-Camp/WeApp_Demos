//index.js
//获取应用实例
var app = getApp()
var DateOpt = require("../../../utils/util.js")
Page({
  data: {
    token:null,
    token_video: null,
    
  },
  videoErrorCallback: function (e) {
      console.log('视频错误信息:');
      console.log(e.detail.errMsg);
  },
  onLoad: function() {
    this.setData({
      token_video: app.globalData.token_video,
      token: app.globalData.token,
      path: app.globalData.video_path
    })
  }
  
})
