//app.js
App({
  // onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var cnbeta = wx.getStorageSync('cnbeta')
  //   if(!cnbeta){
  //     wx.request({
  //       url: 'https://secure-lake-38991.herokuapp.com/?page=1',
  //       // method
  //       header: {
  //         'Content-Type': 'application/json'
  //       },
  //       success: function(res){
  //         console.log(res)
  //       }
  //     })
  //   }
  // },
  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData:{
  //   userInfo:null
  // }
    onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
})