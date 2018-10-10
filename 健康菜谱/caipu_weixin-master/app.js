//app.js
App({
    //生命周期函数--监听小程序初始化
    //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    onLaunch: function() {
        // //调用API从本地缓存中获取数据
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
    },
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
    globalData: {
        // userInfo:null
        globalUrl: "http://www.tngou.net/api/cook/",
        listName: null,
        listId: null,
        contentName:null,
        contentId: null,
        result:[]

    }
})
