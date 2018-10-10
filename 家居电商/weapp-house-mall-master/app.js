var config = require('config.js')
var http = require('./utils/httpHelper.js')
var util = require('./utils/util.js')
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    this.getUserInfo(null);
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
        typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
        //调用登录接口
        wx.login({
            success: function(res) {
                if (res.code) {
                    var code = res.code;
                    wx.getUserInfo({
                        success: function (res) {
                            //发起网络请求
                            var userInfo = res.userInfo;
                            that.globalData.userInfo = userInfo;
                            var data  ={ username:userInfo.nickName,avatar:userInfo.avatarUrl,code: code,appid:config.APPID}
                            http.httpGet("?c=user&a=wxlogin" ,data,function(res){
                                if(res.code == '200' && res.msg == 'success'){
                                    userInfo.id = res.data.id;
                                    that.globalData.userInfo = userInfo;
                                    typeof cb == "function" && cb(userInfo)
                                }
                            });  
                        }
                     });
                } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    }
  },
  getAppInfo:function(cb){
    //获取商品信息
    var that = this;
    if(this.globalData.appInfo){
        typeof cb == "function" && cb(this.globalData.appInfo)
    }else{
        var data = {appid:config.APPID}
        http.httpGet("?c=myapp&a=getmyapp" ,data,function(res){
            if(res.code == '200' && res.msg == 'success'){
                that.globalData.appInfo = res.data;
                typeof cb == "function" && cb(that.globalData.appInfo)
            }
        });
    }
  },
  globalData:{
    userInfo:null,
    appInfo:null,
  }
})