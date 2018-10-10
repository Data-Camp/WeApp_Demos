//index.js
var config = require('../../config.js')
var http = require('../../utils/httpHelper.js')
var sta = require("../../utils/statistics.js");
//获取应用实例
var app = getApp()
Page({
  data: {
    orderList:[],
  },
 onLoad: function () {
    var that = this;
    app.getUserInfo(function (userInfo){
            that.setData({
                  userInfo:userInfo
              });
    })
   
  },
  onShow:function(){
    sta();
      this.getlist();
  },
  getlist:function(){
    var that = this;
    var data = {appid:config.APPID,userid:this.data.userInfo.id/*,page:'',pageSize:'',order:'id'*/}
    http.httpGet("?c=order&a=getOrderList" ,data,function(res){
            if(res.code == '200' && res.msg == 'success'){
                 var orderList = res.data.list;
                 that.setData({orderList:orderList});
            }
    });
  },
  pay:function(e){

      wx.showToast({
        title: '订单支付成功!',
        icon: 'success',
        duration: 1000
      })
      //支付成功订单
      var orderid = e.target.id;
      this.updateOrderInfo(orderid,1);
  },
  cancelOrder:function (e){
     wx.showToast({
        title: '取消订单成功!',
        icon: 'success',
        duration: 1000
      })
    //取消订单
     var orderid = e.target.id;
     this.updateOrderInfo(orderid,9);
    
  },
  updateOrderInfo:function(orderid,status){
            var that = this;
            var data = {appid:config.APPID,userid:this.data.userInfo.id,status:status,id:orderid}
            http.httpGet("?c=order&a=updateOrder" ,data,function(res){
                    if(res.code == '200' && res.msg == 'Edit success'){
                        var orderList = that.data.orderList;
                        for(var i= 0 ;i<orderList.length;i++){
                              if(orderList[i].id == orderid){
                                  orderList[i].status = status;
                                  break;
                              }
                        }
                        that.setData({orderList:orderList});
                    }
            });
  }
})
