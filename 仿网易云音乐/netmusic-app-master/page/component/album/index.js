var appInstance = getApp();
var bsurl=require('../../../utils/bsurl.js');
var common = require('../../../utils/util.js');
Page({
  data: {
    result:{},
    curplay:0,
    loading: true
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: bsurl+'album?id=' + options.pid,
      success: function (res) {
        var re=res.data.album;
        re.publishTime=common.formatTime(re.publishTime)
        that.setData({
          result:re
        });
        wx.setNavigationBarTitle({
          title: res.data.album.name
        })
      }, fail: function (res) {
        wx.navigateBack({
          delta: 1
        })
      }
    });
  },
  onShow: function () {
    this.setData({
      curplay: appInstance.globalData.curplay.id
    })
  },
  artlist:function(e){
    var userid=e.currentTarget.dataset.userid;
    wx.redirectTo({
      url: '../artist/index?id='+userid
    })
  },
  playall: function (event) {
    var that = this;
    var playlist = that.data.result.songs
    wx.playBackgroundAudio({
      dataUrl: playlist[0].mp3Url,
      title: playlist[0].name,
      coverImgUrl: playlist[0].album.picUrl,
      success: function () {
        console.log("开始播放全部");
        that.setplaylist(playlist, playlist[0], 0)
      }
    })
  },
  setplaylist: function (list, music, index) {
    //设置播放列表，设置当前播放音乐，设置当前音乐在列表中位置
    appInstance.globalData.curplay = music;
    appInstance.globalData.index_am = index;//event.currentTarget.dataset.idx;
    appInstance.globalData.playtype = 1;
    appInstance.globalData.globalStop=false;
    var shuffle = appInstance.globalData.shuffle;
    appInstance.globalData.list_sf = list;//this.data.list.tracks;
    appInstance.shuffleplay(shuffle);
    this.setData({
      curplay: music.id
    })
  },
  mv: function (e) {
    var id = e.currentTarget.dataset.mvid;
    wx.navigateTo({
      url: '../mv/index?id=' + id
    })
  },
  playmusic: function (event) {
    var that = this;
    let music = event.currentTarget.dataset.idx;
    music = this.data.result.songs[music];
    if (music.id == appInstance.globalData.curplay.id) {
      wx.navigateTo({ url: '../playing/index?id=' + music.id })
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.mp3Url,
        title: music.name,
        author: music.artists[0].name,
        coverImgUrl: music.album.picUrl,
        success: function () {
          console.log("开始播放", music.name);
          that.setplaylist(that.data.result.songs, music, event.currentTarget.dataset.idx)
          wx.navigateTo({
            url: '../playing/index?id=' + music.id
          });
        }, fail: function (e) {
          wx.showModal({
            title: '提示',
            content: '歌曲已下架，无法播放',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      })
    }
  }
});