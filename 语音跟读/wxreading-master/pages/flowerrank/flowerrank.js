//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        flowerData: {},
        firstLineRank: [],
        mainRankList: [],
        defaultLoadContent : '数据已经全部加载完成.'
    },

    onLoad: function () {
        var that = this;
        that.getFlowerRankList(function (data) {
            var flowerList = data.flower_list;
            var firstLineRank = flowerList.slice(0, 3);
            var mainRankList = flowerList.slice(3);
            that.setData({
                flowerData: data,
                firstLineRank: firstLineRank,
                mainRankList: mainRankList
            });
        });
    },
    getFlowerRankList: function (cal) {
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/getflowerranklist',
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
    //下拉刷新
    onPullDownRefresh: function () {
        this.pullUpdateFlowerRankList();
    },
    pullUpdateFlowerRankList: function () {
        var that = this;
        wx.showNavigationBarLoading();
        that.getFlowerRankList(function (data) {
            var flowerList = data.flower_list;
            var firstLineRank = flowerList.slice(0, 3);
            var mainRankList = flowerList.slice(3);
            that.setData({
                flowerData: data,
                firstLineRank: firstLineRank,
                mainRankList: mainRankList
            });
            wx.stopPullDownRefresh();
            setTimeout(function () {
                wx.hideNavigationBarLoading();
            },1000);
        });
    },
    //上滑加载更多
    onReachBottom : function (e) {
        var that = this;
        var mainRankList = that.data.mainRankList;
        var updateFlowerData = that.data.flowerData;
        if(updateFlowerData.has_more == 0){
            console.log("已经没有更多数据.");
        }else {
            that.loadMoreRankInfo(function (data) {
                //
                var newmainRankList = mainRankList.concat(data.flower_list);

                updateFlowerData['last_id'] = data.last_id;
                updateFlowerData['has_more'] = data.has_more;
                that.setData({
                    mainRankList : newmainRankList,
                    flowerData : updateFlowerData
                });
            });
        }
    },
    loadMoreRankInfo: function (cal) {
        var that = this;
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/getflowerranklist',
            param : {
                last_id : that.data.flowerData.last_id
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
    }

});
