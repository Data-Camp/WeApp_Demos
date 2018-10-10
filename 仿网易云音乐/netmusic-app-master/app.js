var bsurl=require('utils/bsurl.js');
App({
  onLaunch: function () {
    var that = this;
    //播放列表中下一首
    wx.onBackgroundAudioStop(function () {
      console.log("音乐停止")
      if (that.globalData.globalStop) {
        return;
      }
      if (that.globalData.playtype == 1) {
        that.nextplay(1);
      } else {
        that.nextfm();
      }
    });

    wx.onBackgroundAudioPause(function(){
      console.log("音乐暂停");
      that.globalData.globalStop=that.globalData.hide?true:false;
      wx.getBackgroundAudioPlayerState({
          complete: function (res) {
            that.globalData.currentPosition = res.currentPosition?res.currentPosition:0
          }
        })
    })

  },
  nextplay: function (t) {
    //播放列表中下一首
    this.preplay();
    var list = this.globalData.list_am;
    var index = this.globalData.index_am;
    if (t == 1) {
      index++;
    } else {
      index--;
    }
    index = index > list.length - 1 ? 0 : (index < 0 ? list.length - 1 : index);
    this.globalData.curplay = list[index] || {};
    this.globalData.index_am = index;
    this.seekmusic(1)
  },
  nextfm: function () {
    //下一首fm
    this.preplay()
    var that = this;
    var list = that.globalData.list_fm;
    var index = that.globalData.index_fm;
    index++;
    this.globalData.playtype = 2;
    if (index > list.length - 1) {
      that.getfm();

    } else {
      console.log("获取下一首fm")
      that.globalData.index_fm = index;
      that.globalData.curplay = list[index];
      that.seekmusic(2);
    }

  },
  preplay: function () {
    //歌曲切换 停止当前音乐
    this.globalData.globalStop = true;
    wx.stopBackgroundAudio();
  },
  getfm: function () {
    var that = this;
    wx.request({
      url: bsurl+'fm?t=' + (new Date()).getTime(),
      method: 'GET',
      success: function (res) {
        that.globalData.list_fm = res.data.data;
        that.globalData.index_fm = 0;
        that.globalData.curplay = res.data.data[0];
        that.seekmusic(2);
      }
    })
  },
  stopmusic: function (type, cb) {
    var that = this;
    wx.pauseBackgroundAudio();
    wx.getBackgroundAudioPlayerState({
      complete: function (res) {
        that.globalData.currentPosition = res.currentPosition?res.currentPosition:0
      }
    })
  },
  seekmusic: function (type, cb, seek) {
    var that = this;
    var m = this.globalData.curplay;
    this.globalData.playtype = type;
    // if (type == 1) {
    //   wx.request({
    //     url: 'https://n.sqaiyan.com/song?id=' + that.globalData.curplay.id,
    //     success: function (res) {
    //       if (!res.data.songs[0].mp3Url) {
    //         that.nextplay(1);
    //       }
    //     }
    //   })
    // }
    wx.playBackgroundAudio({
      dataUrl: m.mp3Url,
      title: m.name,
      success: function (res) {
        if (seek != undefined) {
          wx.seekBackgroundAudio({ position: seek })
        };
        that.globalData.globalStop = false;
        cb && cb();
      },
      fail: function () {
        if (type == 1) {
          that.nextplay(1)
        } else {
          that.nextfm();
        }
      }
    })
  },
  shuffleplay: function (shuffle) {
    //播放模式shuffle，1顺序，2单曲，3随机
    var that = this;
    that.globalData.shuffle = shuffle;
    if (shuffle == 1) {
      that.globalData.list_am = that.globalData.list_sf;
    }
    else if (shuffle == 2) {
      that.globalData.list_am = [that.globalData.curplay]
    }
    else {
      that.globalData.list_am = [].concat(that.globalData.list_sf);
      var sort = that.globalData.list_am;
      sort.sort(function () {
        return Math.random() - (0.5) ? 1 : -1;
      })

    }
    for (let s in that.globalData.list_am) {
      if (that.globalData.list_am[s].id == that.globalData.curplay.id) {
        that.globalData.index_am = s;
      }
    }
  },
  onShow: function () {
    console.log(bsurl);
    this.globalData.hide=false
  },
  onHide: function () {
    this.globalData.hide=true
    wx.setStorageSync('globalData', this.globalData);
  },
  globalData: {
    hasLogin: false,
    hide:false,
    list_am: [],
    list_fm: [],
    list_sf: [],
    index_fm: 0,
    index_am: 0,
    playtype: 1,
    curplay: {},
    shuffle: 1,
    globalStop: true,
    currentPosition: 0
  }
})
