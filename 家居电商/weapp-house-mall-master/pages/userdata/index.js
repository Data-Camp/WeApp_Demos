//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo){
         that.setData({
            userInfo:userInfo
          });
    })
    var allAddress = wx.getStorageSync('address');
    var address = '';
    for(var i=0;i<allAddress.length;i++){
         if( allAddress[i].checked){
           address = allAddress[i];
           break;
         }
    }
    if(address == '' && allAddress.length > 0){
        address = allAddress[0];
    }
    that.setData({
            address:address
    });
  },
  onShow:function (){
    sta();
      console.log("页面被重新加载");
  },
  address:function (){
     wx.navigateTo({ url: '/pages/address/index'});
  }
})
