//logs.js
var util = require('../../utils/util.js')
Page({
    audioCtx: null,
    data: {
        courseInfo: {},
        cs_id: 0,
        sub_cs_id: 0,
        course_status : 0
    },
    onReady: function () {
        this.audioCtx = wx.createAudioContext('courseIntroAudio');
    },
    onLoad: function (obj) {
        //接收上一个页面传过来的参数
        console.log(obj);
        if (obj && obj.sub_cs_id) {
            this.setData({
                cs_id: obj.cs_id,
                sub_cs_id: obj.sub_cs_id,
                course_status : obj.status
            })
        }
        console.log(this.data);
    },
    onShow: function () {
        var that = this;
        that.getCourseIntro(function (data) {
            that.setData({
                courseInfo: data
            })
        })
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },

    getCourseIntro: function (cal) {
        var that = this;
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/getcourseintro',
            param : {
                'sub_cs_id' : that.data.sub_cs_id
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

    //播放课程介绍
    tapPlayIntroAudio: function (e) {
        this.audioCtx.play();
    },
    //播放重点单词
    tapPlayWordAudio: function (e) {
        var thisAudioId = 'audio-' + e.currentTarget.id;
        var thisAudioCtx = wx.createAudioContext(thisAudioId);
        thisAudioCtx.play();
    },
    //播放用户跟读记录
    tapPlayUserRecord: function (e) {
        console.log(e);
        var thisAudioId = 'reaudio-' + e.currentTarget.id;
        var thisAudioCtx = wx.createAudioContext(thisAudioId);
        thisAudioCtx.play();
    },
    tapJoinReadingBtn: function () {
        var that = this;
        console.log(that);
        wx.navigateTo({
            url: '../reading/reading?cs_id=' + that.data.cs_id + '&sub_cs_id=' + that.data.sub_cs_id
        })
    }
});
