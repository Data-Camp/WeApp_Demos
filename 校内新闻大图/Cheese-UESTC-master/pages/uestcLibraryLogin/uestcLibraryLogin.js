var app = getApp()
Page({
  data: {
    motto: '欢迎登录图书馆',
    userName: '',
    userPassword: '',
    loginStyle: '',
    librarySearchInputValue: ''
  },
  onLoad: function (options) {

    // 获取缓存信息
    var values = wx.getStorageSync('LibraryUserInfo')
    if (values != null) {
      values = values.split('&');
      var userName = values[0]
      var userPassword = values[1]
      var loginStyle = values[2]
      this.setData({
        userName: userName,
        userPassword: userPassword,
        loginStyle: loginStyle,
        librarySearchInputValue: '馆藏搜索',
      })
    }
    that = this;
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
  // 登陆
  formBindsubmit: function (e) {
    if (e.detail.value.userName.length == 0 || e.detail.value.userPassword.length == 0) {
      this.setData({
        tip: '提示：用户名和密码不能为空！',
      })
    } else {
      this.setData({
        tip: '',
        userName: e.detail.value.userName,
        userPassword: e.detail.value.userPassword,

        loginStyle: e.detail.value.gender,
      })

      wx.setStorageSync('LibraryUserInfo', this.data.userName + '&' + this.data.userPassword + '&' + this.data.loginStyle)

      this.logIn(this);
    }
  },
  // 重置
  formReset: function () {
    this.setData({
      tip: '',
      userName: '',
      userPassword: '',
    })
    wx.clearStorageSync()

  },

  logIn: function (that) {
    var that = that
    wx.request({
      //连到服务器 获取json格式的文档
      url: Constant.SERVER_ADDRESS + "/libraryLogin",
      data: {
        username: that.data.userName,
        password: that.data.userPassword,
        loginstyle: that.data.loginStyle,
      },
      method: 'GET',
      success: function (res) {

        if (res.data.returnString == 'success') {
          var userName = that.data.userName;
          var userPassword = that.data.userPassword;

          var loginStyle = that.data.loginStyle;

          wx.navigateTo({
            url: "/pages/uestcLibrary/uestcLibrary" + '?userName=' + userName + '&userPassword=' + userPassword + '&loginStyle=' + loginStyle
          })
          // console.log(res.data);  
          that.setData({
            // tip:'登录成功，立即跳转',
            tip: '',
          })
        }
        else {
          that.setData({
            tip: '登录失败，账号或密码错误，或更改登录方式',

          })
        }

      },
      fail: function (res) {
        // console.log(res.data);  
        // console.log('is failed') 
        that.setData({
          tip: '登录失败，账号或密码错误，或更改登录方式',
        })
      }
    })
  },

  // 保存 搜索框中的值
  librarySearchInput: function (e) {
    this.setData({
      librarySearchInputValue: e.detail.value
    })
  },

  wxSearchButton: function (e) {
    //WxSearch.wxSearchAddHisKey(that);
    if (this.data.librarySearchInputValue == ""
      | this.data.librarySearchInputValue == "馆藏搜索"
      | this.data.librarySearchInputValue == "请输入有效的内容") {

      that.setData({
        librarySearchInputValue: '请输入有效的内容',
      })
      return;
    } else {
      var searchInput = that.data.librarySearchInputValue;
      wx.navigateTo({
        url: "/pages/uestcLibrarySearch/uestcLibrarySearch" + '?librarySearchInputValue=' + searchInput
      })
    }
  }

})
var that;
//获取配置的的 全局常量
var Constant = require('../../utils/constant.js');