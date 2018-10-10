// pages/uestcNews/uestcNews.js
//获取应用实例
var app = getApp()
Page({
  data: {
    newList: [],
    userName:'',  
    userPassword:'',  
    loginStyle:'',
    testString:'testString',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
          userName:options.userName,
          userPassword:options.userPassword,
          loginStyle:options.loginStyle,
    });


    var that = this;
    requestData(that, "");
    // 获取缓存信息
    var values = wx.getStorageSync('LibraryUserInfo')
    if(values!=null){
      values=values.split('&');
      var userName=values[0]
      var userPassword=values[1]
      var loginStyle=values[2]
       this.setData({
          userName:userName,  
          userPassword:userPassword,  
          loginStyle:loginStyle,
       })
    }
   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },


  onItemClick: function (event) {
    var targetUrl = "/pages/uestcNoticeDetail/uestcNoticeDetail"
    if (event.currentTarget.dataset.detailHref != null)
      targetUrl = targetUrl + "?navigateURL=" + event.currentTarget.dataset.detailHref.substr(2);

    wx.navigateTo({
      url: targetUrl
    });
  }
})


/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
  wx.request({
    //连到服务器 获取json格式的文档
    url: Constant.SERVER_ADDRESS + "/library",
    data: {  
        username: that.data.userName,  
        password: that.data.userPassword,  
        loginstyle:that.data.loginStyle,
      },  
    method: 'GET',  
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res == null) {
        console.error(Constant.ERROR_DATA_IS_NULL);
        return;
      }
      // for (var i = 0; i <= res.data.htmlBody.length; i++) {
      //   _body: res.data.htmlBody
      // }
      that.setData({
        newList: res.data.htmlBody,
        testString:res.data.testString
      })

    }
  });
}


//获取配置的的 全局常量
var Constant = require('../../utils/constant.js');