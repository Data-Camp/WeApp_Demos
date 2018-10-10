//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
    data: {
        login: false,
        userInfo: {}
    },
    onLoad: function () {

    },
    onPullDownRefresh: function () {
        this.pullUpdateUserInfo();
    },
    pullUpdateUserInfo: function () {
        var that = this;
        wx.showNavigationBarLoading();
        that.getPersonalUserInfo(function (data) {
            wx.stopPullDownRefresh();
            setTimeout(function () {
                wx.hideNavigationBarLoading();
            }, 1000);

            if (data && data.personalInfo.user_info) {
                //存储个人信息
                app.setUserInfo(data.personalInfo.user_info);
                that.setData({
                    userInfo: data.personalInfo.user_info
                });
            }
        });

    },
    onShow: function () {
        var that = this;
        var appUserInfo = app.getUserInfo();
        if (appUserInfo) {
            var user_name = appUserInfo.user_name;
        }
        if (appUserInfo) {
            that.setData({
                userInfo: appUserInfo
            })
        } else {
            that.getPersonalUserInfo(function (data) {
                if (data && data.personalInfo.user_info) {
                    //存储个人信息
                    app.setUserInfo(data.personalInfo.user_info);
                    that.setData({
                        userInfo: data.personalInfo.user_info
                    })
                }
            });
        }
    },
    getPersonalUserInfo: function (cal) {
        //获取用户信息，没有获取到，跳转登录页面
        util.JFrequest({
            url: 'https://t.superabc.cn/c/s/userMainPage',
            method: 'POST',
            success: function (res) {
                if (res && res.statusCode == 200 && res.data && res.data.code == 0) {
                    if (typeof cal == 'function') {
                        cal(res.data.data);
                    }
                }
            },
            complete: function (res) {
                console.log(res);
            }
        });

    },
    tapLogOut: function (e) {
        app.loginOut(e);
    },
});
