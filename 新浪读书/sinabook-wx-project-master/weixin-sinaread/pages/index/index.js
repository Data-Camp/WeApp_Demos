//index.js

const app=getApp();
const request=require("../../utils/requests");
const utils=require("../../utils/util");

Page({
  data: {
    userInfo: {},
    imgUrls:["../../img/banner1.jpg","../../img/banner2.jpg","../../img/banner3.png","../../img/banner4.jpg"]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //处理滑动图，图片
  goToDetail:function(event){
    wx.navigateTo({
      url:'../search/index'
    })
  },
  searchHander:function(event){
    //获取列表
    request.getBooklist("",function(res){
      if(res.data.count==0){return;}
      that.setData({bookList:res.data.data,count:that.data.count+res.data.count});
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    }),
    //获取列表
    request.getBooklist("",function(res){
      if(res.data.count==0){return;}
      that.setData({bookList:res.data.data,count:that.data.count+res.data.count});
    })
  }
})
