//logs.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        cs_id: 0,
        navTitle: '',
        courseList: {}
    },
    onPullDownRefresh: function () {
        var that = this;
        that.pullUpdateCourseList();
    },
    pullUpdateCourseList: function () {
        var that = this;
        wx.showNavigationBarLoading();
        that.getCourseList(function (data) {
            that.setData({
                courseList: data
            });
            wx.stopPullDownRefresh();
            setTimeout(function () {
                wx.hideNavigationBarLoading();
            }, 1000);
        });
    },
    onReady: function () {
        var that = this;
        wx.setNavigationBarTitle({title: that.data.navTitle});

        //
        if (app.checkLogin()) {
            that.getCourseList(function (data) {
                console.log('****getCourseList****');
                console.log(data);
                that.setData({
                    courseList: data
                })
            })
        } else {
            //记录当前页面
            var pageInfo = getCurrentPages();
            var fromPage = pageInfo[0].__route__;
            setTimeout(function () {
                wx.navigateTo({
                    url: '../login/login?fromPage=' + fromPage
                });
            },100);

        }

    },
    onShow: function () {
        var that = this;

    },
    onLoad: function (obj) {
        var that = this;
        //接收上一个页面传过来的参数
        if (obj && obj.cs_id) {
            this.setData({
                cs_id: obj.cs_id,
                navTitle: obj.material || '课程安排'
            })
        }

    },
    getCourseList: function (cal) {
        var that = this;
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/getcourselist',
            param: {
                'cs_id': that.data.cs_id
            },
            success: function (res) {
                if (res && res.statusCode == 200 && res.data && res.data.code == 0) {
                    if (typeof cal == 'function') {
                        cal(res.data.data);
                    }
                } else {
                    console.log("请求数据失败，读取缓存");
                    //
                }
            }
        });
    },
    tapCsPlanItem: function (e) {
        var that = this;
        var status = e.currentTarget.dataset.status;
        var sub_cs_id = e.currentTarget.dataset.sub_cs_id;
        var record_id = e.currentTarget.dataset.relate_record_id;
        if (status == 1) {
            wx.showToast({
                title: '该天暂时无法跟读',
                icon: 'success',
                duration: 500
            });
            return false;
        }
        //已经跟读过的，跳转到结果页
        if (status == 4 || status == 5) {
            wx.navigateTo({
                url: '../result/result?record_id=' + record_id
            })
        } else {
            wx.navigateTo({
                url: '../courseintro/courseintro?sub_cs_id=' + sub_cs_id + '&cs_id=' + that.data.cs_id + '&status=' + status
            })
        }
    }
});
