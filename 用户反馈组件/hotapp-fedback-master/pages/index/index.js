//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../feedback/index'
    })
  },
  //扫一扫
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
       
        this.setData({
          userInfo: res.result
        })
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/user?id=123'
    }
  },
  onLoad: function (option) {

     // 页面监控
     // app.globalData.hotapp.count(this)
    //加载
    wx.showNavigationBarLoading()
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 3000)
    
  },
  onReady: function () {

    // 生命周期函数--监听页面初次渲染完成
    // api错误测试
    // wx.request({
    //   url: 'error.php', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    //测试getStorage
    // wx.getStorage({
    //   key: 'key',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    //测试getStorage
    // wx.getStorage({
    //   key: 'key',
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
    //主动抛出异常
    //throw Error('主动抛出异常!');
    //  语法错误a + 0;
    //  a + 0;
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
   
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏


  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },

})
