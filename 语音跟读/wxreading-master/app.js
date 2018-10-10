//app.js
App({
    onLaunch: function () {
        //存储数据，测试使用
    },
    setUserInfo: function (userInfo) {
        var that = this;
        that.globalData.userInfo = userInfo;
        that.globalData.hasLogin = true;
    },
    getUserInfo: function () {
        var that = this;
        return that.globalData.userInfo;
    },
    checkLogin: function () {
        var that = this;
        if (that.globalData.hasLogin) {
            return true;
        } else {
            return false;
        }
    },
    loginOut: function (obj) {
        var that = this;
        that.globalData.userInfo = null;
        that.globalData.hasLogin = false;
        wx.removeStorage({
            key: 'utoken',
            success: function () {
                wx.navigateTo({
                    url: '../login/login'
                });
            }
        })
    },
    globalData: {
        userInfo: null,
        hasLogin: false
    }
});