Page({
  data:{
    loginIn:false //登录状态
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if(!that.data.loginIn){
      wx.navigateTo({
        url:'../login/login'
      });
    }
  }
})