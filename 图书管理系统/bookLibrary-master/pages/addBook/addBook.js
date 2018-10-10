var util = require('../../utils/util');

Page({
  data:{
    isbn13:'9787115366474',
    isShowInputForm:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },
  addBook:function(){
    var that=this;


    //因为小程序暂时没有提供扫描二维码API，所以先hard code ISBN13，随机返回一个，模拟扫描效果
    this.data.isbn13=util.getISBN13();

    wx.navigateTo({
      url: "../detail/detail?id=" + that.data.isbn13+"&addBook=Y"
    });
  },
  //根据扫码录入控制手动输入的form是否显示
  screenInput:function(e){
    this.setData({
      isShowInputForm:!e.detail.value
    })
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
    
  }
})