var config = require('../../config.js')
var http = require('../..//utils/httpHelper.js')
//index.js
//获取应用实例
var app = getApp()
var sta = require("../../utils/statistics.js");
Page({
  data: {
    allAddress: [],//地址列表
  },
  onLoad: function () {
    var that = this
    var that = this;
    app.getUserInfo(function (userInfo){
        that.setData({userInfo:userInfo});
    })
  },
  onShow:function(){
      sta();
      this.getAllAddressList();
      
  },
  getAllAddressList:function(){
        var that = this;
        var data = {appid:config.APPID,userid:this.data.userInfo.id};
        http.httpGet("?c=user&a=getAddrList" ,data,function(res){
            if(res.code == '200' && res.msg == 'success'){
                that.setData({allAddress:res.data.list});
            }
        });
  },
  radioChange:function(e){
      console.log(e);
      var id = e.detail.value;
      /*var allAddress = this.data.allAddress;
      for(var i=0;i<allAddress.length;i++){
          if(id == allAddress[i].id){
              allAddress[i].checked = true;
          }else{
              allAddress[i].checked = false;
          }
      }*/
      var data = {appid:config.APPID,userid:this.data.userInfo.id,id:id,isfirst:1}
          http.httpGet("?c=user&a=editAddress" ,data,function(res){
                 if(res.code == '200' && res.msg == 'success'){
                        console.log("设置默认地址成功");
                 }else{
                        console.log("设置默认地址失败");
                 }
      });
      //this.setData({allAddress:allAddress});
    //return false;
  },
  addrss:function (e){
        wx.navigateTo({url:"/pages/address/addto/index?id="})
  },
  addto:function (e){
        var id = e.currentTarget.dataset.id;
        console.log(id);
        wx.navigateTo({url:"/pages/address/addto/index?id="+id})
  }
})
