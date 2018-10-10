var app = getApp();
var socketOpen = false;
Page({
  data:{
    // text:"这是一个页面"
    value:"",
    message:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var _self = this;
    wx.onSocketOpen(function(res) {
        socketOpen=true;
        console.log('WebSocket连接已打开！')
    })
    wx.onSocketError(function(res){
        socketOpen=false;
        console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function(res) {
        var t = _self.data.message;
        t.push(res.data)
        _self.setData({
          message : t
        })
    })
    wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
      socketOpen = false;
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  connect:function(){
    wx.connectSocket({
        url: app.globalData.wsip
    })
  },
  stopws:function(){
    if (socketOpen) {
      wx.closeSocket()
    }else{
      console.log("请先建立连接")
    }
  },
  msg:function(){
    var _self = this;
    sendSocketMessage(_self.data.value)
  },
  inputfun:function(e){
    this.setData({
        value:e.detail.value
    })
  }
})

function sendSocketMessage(msg) {
  if (socketOpen) {
    wx.sendSocketMessage({
      data:msg,
      success:function(data){
        console.log(data);
      }
    })
  } else {
     console.log("请先建立连接")
  }
}