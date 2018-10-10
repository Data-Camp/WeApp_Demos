//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
     imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    contentItems:['','','',''],
    listItems:['','','']
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
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
  handleTapImage:function (event) {
    //图片点击、
    console.log(event);
    wx.navigateTo({
      url:'../../pages/posts/posts',
      success:function(res){

      },
      fail:function(){

      },
      complete:function(){

      }
    })
  }
})