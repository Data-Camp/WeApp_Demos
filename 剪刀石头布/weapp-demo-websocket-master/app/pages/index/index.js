//share.js
//分享页

var app = getApp()
Page({
  //前往游戏界面
  gotoGame: function() {
    wx.navigateTo({
      url: '../game/game'
    })
  }
})

