const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
     smryHeight:"4.5rem",
     id:""
  },
  extendBox:function(){
    if(this.data.smryHeight=="4.5rem"){
      this.setData({smryHeight:"auto"});
    }else{
      this.setData({smryHeight:"4.5rem"});
    }   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    that.setData({ id:options.id});
    wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        })
    request.getBookById(that.data.id,function(res){
      that.setData({bookInfo:res.data.data});
    });
  },
  onReady:function(){
    // 页面渲染完成
    wx.hideToast();
  },
  onShow:function(){
    // 页面显示
    console.log("显示");
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})