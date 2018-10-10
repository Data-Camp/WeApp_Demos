//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        materialList: [],
        userInfo: {}
    },
    //事件处理函数
    tapMaterialItem: function (e) {
        var cs_id = e.currentTarget.id;
        var material = e.currentTarget.dataset.material;
        wx.navigateTo({
            url: '../course/course?cs_id=' + cs_id + '&material=' + material
        })
    },
    onLoad: function () {
        var that = this;
        that.getMaterialList(function (data) {
            that.setData({
                materialList: data.materialList
            })
        });
    },
    onPullDownRefresh: function () {
        this.pullUpdateMaterialList();
    },
    pullUpdateMaterialList: function () {
        var that = this;
        wx.showNavigationBarLoading();
        that.getMaterialList(function (data) {
            that.setData({
                materialList: data.materialList
            });
            wx.stopPullDownRefresh();
            setTimeout(function () {
                wx.hideNavigationBarLoading();
            },1000);

        });
    },
    getMaterialList: function (cal) {
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/getcoursemateriallist',
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
    tapShowFlowerRank : function () {
        wx.navigateTo({
            url: '../flowerrank/flowerrank'
        })
    }

});
