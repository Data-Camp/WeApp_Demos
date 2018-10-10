// pages/main/index.js
var wxlocker = require("../../utils/wxlocker.js");
Page({
  data:{
     title:'请设置手势密码',
     resetHidden:false,
     titleColor:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    wxlocker.lock.init();
    this.initState();
  },
  onReady:function(){
    
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
  //设置提示语与重置按钮
  initState:function(){
    var resetHidden = wxlocker.lock.resetHidden;
    var title = wxlocker.lock.title;
    var titleColor = wxlocker.lock.titleColor;
    this.setData({
      resetHidden:resetHidden,
      title:title,
      titleColor:titleColor
    });
  },
  touchS:function(e){//touchstart事件绑定
    wxlocker.lock.bindtouchstart(e);
  },
  touchM:function(e){//touchmove事件绑定
    wxlocker.lock.bindtouchmove(e);
  },
  touchE:function(e){//touchend事件绑定
    wxlocker.lock.bindtouchend(e,this.lockSucc);
    this.initState();
  },
  lockSucc:function(){//解锁成功的回调函数
    console.log("解锁成功！");
    //do something
  },
  lockreset:function(){
    wxlocker.lock.updatePassword();
    this.initState();
  }
})