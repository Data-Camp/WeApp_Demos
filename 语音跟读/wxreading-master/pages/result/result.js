//logs.js
var util = require('../../utils/util.js')
Page({
    data: {
        sub_cs_id : 0,
        record_id : 0,
        readingResult: {},
        recordList: [],
        has_more: 0
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    onLoad: function (obj) {
        //接收上一个页面传过来的参数
        var that = this;
        if (obj && obj.record_id) {
            that.setData({
                record_id: obj.record_id
            })
        }
    },
    onShow: function () {
        var that = this;
        that.getReadingResult(function (data) {
            console.log(data);
            that.setData({
                readingResult: data.readingResult,
                recordList : data.recordList,
                sub_cs_id : data.readingResult.sub_cs_id
            })
        })
    },
    getReadingResult: function (cal) {
        var that = this;
        wx.request({
            url: 'https://t.superabc.cn/c/os/reading/recordresult',
            data: {
                'record_id': that.data.record_id || 46
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
    //播放用户跟读记录
    tapPlayUserRecord: function (e) {
        console.log(e);
        var thisAudioId = 'reaudio-' + e.currentTarget.id;
        var thisAudioCtx = wx.createAudioContext(thisAudioId);
        thisAudioCtx.play();
    },
    tapBackToCourseIntro : function (e) {
        // var sub_cs_id = e.currentTarget.dataset.sub_cs_id;
        var that = this;
        wx.navigateTo({
            url: '../courseintro/courseintro?record_id=' + that.data.record_id + '&sub_cs_id=' + that.data.sub_cs_id
        });
    }
});
