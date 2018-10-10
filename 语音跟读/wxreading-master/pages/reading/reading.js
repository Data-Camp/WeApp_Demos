//logs.js
var util = require('../../utils/util.js')
Page({
    progressTimer: null,
    data: {
        cs_id: 0,
        sub_cs_id: 0,
        readingInfo: [],
        '---音频相关---': '----',
        JFAudio: [],
        recording: false,
        currentProgress: 0
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    onLoad: function (obj) {
        //接收上一个页面传过来的参数
        if (obj && obj.sub_cs_id) {
            this.setData({
                cs_id: obj.cs_id,
                sub_cs_id: obj.sub_cs_id
            })
        }
    },
    onShow: function () {
        var that = this;
        that.getReadingInfo(function (data) {
            that.setData({
                readingInfo: data.readingInfo
            })
        })
    },
    getReadingInfo: function (cal) {
        var that = this;
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/getreadinginfo',
            param : {
                'sub_cs_id': that.data.sub_cs_id,
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
    //点击提交作业
    tapSubmitReadingResult: function (e) {
        var that = this;
        var jfAudio = that.data.JFAudio;
        var audioUrlList = [];
        var len = jfAudio.length, successNum = 0;
        //如果音频数目不够，不让提交
        if (len < that.data.readingInfo.length) {
            wx.showToast({
                title: '请完成所有跟读再提交作业！',
                icon: 'success',
                duration: 1000
            });
            return false;
        }
        wx.showToast({
            title: '正在提交作业……',
            icon: 'loading',
            duration: 5000
        });
        for (var i = 0; i < len; i++) {
            (function (i) {
                console.log(jfAudio[i].tempFilePath);
                util.JFuploadfile({
                    url: 'https://t.superabc.cn/c/s/uploadwxappfile',
                    filePath: jfAudio[i].tempFilePath || '',
                    name: 'wx_file_' + i,
                    formData: {
                        'part_index': i,
                        'file_type': 3,
                        'file_prefix': 'wx_file_'
                    },
                    success: function (res) {
                        console.log(res);
                        var retData = JSON.parse(res.data);
                        if (retData && retData.code == 0) {
                            audioUrlList[i] = retData.data.url;
                            successNum++;
                        } else {
                            console.warn("上传失败！");
                        }
                        if (successNum == len) {
                            //加入跟读（报名 + 提交作业）
                            that.joinReading(audioUrlList, function (data) {
                                //提交作业成功，跳转到结果页
                                var record_id = data.joinRes.record_id;
                                wx.hideToast();
                                setTimeout(function () {
                                    wx.redirectTo({
                                        url: '../result/result?record_id=' + record_id
                                    });
                                },300);

                            });
                        }
                    }
                })
            })(i);
        }
    },
    //加入跟读
    joinReading: function (audioUrlList, cal) {
        var that = this;
        console.log(that.data.JFAudio);
        console.log(audioUrlList);
        util.JFrequest({
            url: 'https://t.superabc.cn/c/os/reading/joinreading',
            param: {
                'cs_id': that.data.cs_id,
                'sub_cs_id': that.data.sub_cs_id,
                'audio_list': audioUrlList
            },
            success: function (res) {
                if (res && res.statusCode == 200 && res.data && res.data.code == 0) {
                    if (typeof cal == 'function') {
                        cal(res.data.data);
                    }
                }else {
                    if(res.data.code == 600004){
                        wx.showToast({
                            title: res.data.err_msg,
                            icon: 'success',
                            duration: 500
                        });
                        setTimeout(function () {
                            wx.redirectTo({
                                url: '../course/course?cs_id=' + that.data.cs_id
                            });
                        },800);

                    }
                }
            },
            complete: function (res) {
                console.log(res);
            }
        });
    },
    //播放标准片段音
    tapPlayPartAudio: function (e) {
        var thisAudioId = 'partaudio-' + e.currentTarget.id;
        var thisAudioCtx = wx.createAudioContext(thisAudioId);
        thisAudioCtx.play();
    },
    emptyAudio: {
        'recording': null,
        'playing': null,
        'hasRecord': false,
        'tempFilePath': ''
    },
    //录音
    tapCompleteUserAudio: function (e, itemIndex) {
        var that = this;
        var readingItem;
        if (itemIndex) {
            readingItem = itemIndex;
        } else {
            readingItem = e.currentTarget.dataset.reading_item;
        }
        wx.stopRecord();
        that.updateJFAudio(readingItem, 'recording', false);
        that.setData({
            recording: false
        });
        clearInterval(that.progressTimer);
    },
    tapRecordUserAudio: function (e) {
        var that = this;
        var readingItem = e.currentTarget.dataset.reading_item;
        //当前所在页面
        var jfAudio = that.data.JFAudio;
        var curAudioModel = that.updateJFAudioModel(readingItem, jfAudio[readingItem]);
        //
        wx.showToast({
            title: '开始录音',
            icon: 'success',
            duration: 500
        });

        that.updateJFAudio(readingItem, 'recording', true);
        that.setData({
            recording: true
        });
        //更新进度条
        var size = 100;
        that.setData({
            currentProgress: 0
        });
        that.progressTimer = setInterval(function () {
            var num = Math.ceil(parseFloat(that.data.readingInfo[readingItem]['audio_duration']) * 1000);
            var newPro = that.data.currentProgress;
            newPro += size / num * 100;
            if (newPro >= 100) {
                that.setData({
                    currentProgress: 100
                });
                that.tapCompleteUserAudio(null, readingItem);
            } else {
                that.setData({
                    currentProgress: newPro
                });
            }

        }, size);
        //
        wx.startRecord({
            success: function (res) {
                that.updateJFAudio(readingItem, 'tempFilePath', res.tempFilePath);
                that.updateJFAudio(readingItem, 'hasRecord', true);
                //
                that.setData({
                    recording: false
                });
            },
            complete: function () {
                that.updateJFAudio(readingItem, 'recording', false);
                that.setData({
                    recording: false
                });
                clearInterval(that.progressTimer);
            },
            fail: function (err) {
                console.log(err);
            }
        })
    },
    //回放
    tapRePlayUserAudio: function (e) {
        var that = this;
        var readingItem = e.currentTarget.dataset.reading_item;
        //当前所在页面
        var jfAudio = that.data.JFAudio;
        wx.playVoice({
            filePath: jfAudio[readingItem].tempFilePath,
            success: function () {
                that.updateJFAudio(readingItem, 'playing', false);
            }
        })
    },

    //****封装一下**** start
    updateJFAudio: function (index, key, value) {
        var that = this;
        var jfAudio = that.data.JFAudio;
        jfAudio[index][key] = value;
        that.setData({
            JFAudio: jfAudio
        });
        return jfAudio;
    },
    updateJFAudioModel: function (index, model) {
        var that = this;
        var jfAudio = that.data.JFAudio;
        var _model = model || that.emptyAudio;
        jfAudio[index] = _model;
        that.setData({
            JFAudio: jfAudio
        });

        return _model;
    }
    //****封装一下**** end
});
