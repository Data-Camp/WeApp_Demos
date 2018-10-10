//home.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    topNews:[],
    techNews:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    console.log(app.globalData);
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    wx.request({
      url:'http://v.juhe.cn/toutiao/index',
      data:{
        type:'topNews',
        key:'482e213ca7520ff1a8ccbb262c90320a'
      },
      header:{
        'contentType':'application/json'
      },
      success:function(res){
        console.log(res.data)
        if(res.data.error_code == 0) {
          that.setData({
            topNews:res.data.result.data
          })
        } else {
          console.log('fail');
        }
      }
    })
    wx.request({
      url:'http://v.juhe.cn/toutiao/index',
      data:{
        type:'techNews',
        key:'482e213ca7520ff1a8ccbb262c90320a'
      },
      header:{
        'contentType':'application/json'
      },
      success:function(res){
        console.log(res.data)
        if(res.data.error_code == 0) {
          that.setData({
            techNews:res.data.result.data
          })
        } else {
          console.log('fail');
        }
      }
    })
  },
  onPullDownRefresh:function(){
    console.log('onPullDownRefresh');
    wx.request({
      url:'http://v.juhe.cn/toutiao/index',
      data:{
        type:'',
        key:'482e213ca7520ff1a8ccbb262c90320a'
      },
      header:{
        'contentType':'application/json'
      },
      success:function(res){
        console.log(res.data)
      }
    });
    
    wx.stopPullDownRefresh;
  }
})
