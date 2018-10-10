import api from '../../api/api.js'


Page({
    data: {
        feed: {},
        carousels: [],   // 轮播图
        recommendeds: [], //推荐活动类型
        acts: [],  //首页货架模板
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        that.loadData();
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
    loadData: function () {
        //获取首页轮播图
        var that = this;
        api.getAppLayoutamend({
            data: {
                parameters: { version: "4.3.0", source: "I" }
            },
            success: (res) => {
                console.log(res)
                if (res.data.data && res.data.data != {}) {
                    // success
                    that.setData({
                        feed: res.data,
                        carousels: res.data.data.carousel,
                        recommendeds: res.data.data.recommendedContent["0"].items
                    });
                }
            }
        });
        api.getActsamend({
            data: {
                parameters: { version: "4.3.0", source: "I" }
            },
            success: (res) => {
                console.log(res)
                if (res.data.data && res.data.data != {}) {
                    // success
                    that.setData({
                    acts: res.data.data.acts
                });
                }
            }
        });

    },
    refresh: function () {
        this.loadData();
    },
    upper: function () {
        this.refresh();
    },
    lower: function () {

    }
})