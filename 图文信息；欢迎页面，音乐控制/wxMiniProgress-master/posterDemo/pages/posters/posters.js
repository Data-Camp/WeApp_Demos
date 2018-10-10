// pages/posters/posters.js
var poster_data = require("../../data/posters_data.js");

Page({
  data:{
    likeImgPath:{
      likeView:"../../images/icon/chat1.png",
      likeCollection:"../../images/icon/view.png"
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.data.posterData = poster_data.posterData;
  },
  onReady:function(){
    // 页面渲染完成
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
  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({url: "./posters-detail/posters-detail?id=" + postId});
  }
})