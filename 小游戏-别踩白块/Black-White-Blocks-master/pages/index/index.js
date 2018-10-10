//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    heighestScore: 0,
    longestTime: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goGame: function(event){
    var gameType = event.target.id;
    wx.redirectTo({
      url: '../'+gameType+'/play'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    // 最高分数
    app.getHeighestScore('endlessScore', function(heighestScore){
      app.globalData.endlessScore = heighestScore || 0;
      that.setData({
        heighestScore: heighestScore || 0
      })
    });
    // 最长时间
    app.getHeighestScore('timeScore', function(heighestScore){
      app.globalData.timeScore = heighestScore || 0;
      that.setData({
        longestTime: heighestScore || 0
      })
    });
  }
})
