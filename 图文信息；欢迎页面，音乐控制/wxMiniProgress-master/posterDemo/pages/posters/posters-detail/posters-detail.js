// pages/posters/posters-detail/posters-detail.js
var poster_data = require("../../../data/posters_data.js");

var app = getApp();


Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    this.data.currentPostId = postId;
    this.data.isPaly = false;
    this.data.posterData = poster_data.posterData[postId];
    // 利用本地缓存来设置文章是否搜藏,约定形式如下所示
    /*    var postCollected ={
          0:"true",
          1:"false",
          ...
        }*/

    var postCollected = wx.getStorageSync('postCollected');
    if (postCollected) { //取到缓存,设置相应的状态
      var collection = postCollected[postId];
      this.setData({ collected: collection });
    } else {//没有取到缓存
      postCollected = {};
      postCollected[postId] = false;
      wx.setStorageSync('postCollected', postCollected);
    }
    //这里来控制音乐总的播放,如果有音乐播放，设置isPlay是正在播放，没有播放就算了，默认就是false
    //同时在下面监听中去改变这个全局的值。播放了，就为true,没有播放为false，结合播放的位置，得到对应播放
    if(app.globalData.g_isMusicPlayed  && app.globalData.g_currentMusicIndex == postId){
      this.setData({isPlay:true});
    }
    this.onMusicMonitor();

  },

  onMusicMonitor:function(){
    //在onLoad里监听音乐的播放，这里是监听总框架的事件,在回调函数里处理，从而改变背景图片与音乐图片的切换
    var that = this;
    wx.onBackgroundAudioPlay(function() {//监听到音乐正在播放
      that.setData({
        isPlay:true
      });
      app.globalData.g_isMusicPlayed =true;
      app.globalData.g_currentMusicIndex = that.data.currentPostId;
    })
    wx.onBackgroundAudioPause(function() {//监听到音乐已经暂停
      that.setData({
        isPlay:false
      });
      app.globalData.g_isMusicPlayed =false;
      app.globalData.g_currentMusicIndex = null;
    })
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
  onCollectedTap: function (event) {
    var that = this;
    //收藏页面
    //var postCollected = wx.getStorageSync('postCollected');
    //var collection = postCollected[this.data.currentPostId];
    //切换取消收藏与取消收藏

    //this.showToast(collection,postCollected);
    //this.showModal(collection,postCollected);


    //异步获取缓存数据
    wx.getStorage({
      key: 'postCollected',
      success: function (res) {
        var postCollected = res.data;
        var collection = postCollected[that.data.currentPostId];
        that.showToast(collection, postCollected);
      }
    })
    var collection = postCollected[this.data.currentPostId];
    //切换取消收藏与取消收藏

    this.showToast(collection, postCollected);
    //this.showModal(collection,postCollected);


  },

  showToast: function (collection, postCollected) {
    wx.showToast({
      title: collection ? "取消成功" : "收藏成功",
      icon: 'success',
      duration: 1000
    });
    collection = !collection;
    postCollected[this.data.currentPostId] = collection;
    //更新缓存
    wx.setStorageSync('postCollected', postCollected);
    //同步数据
    this.setData({ collected: collection });
  },

  showModal: function (collection, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: collection ? '是否取消收藏？' : "是否确定收藏？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#666",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          collection = !collection;
          postCollected[that.data.currentPostId] = collection;
          wx.setStorageSync('postCollected', postCollected);
          that.setData({ collected: collection });
        }
      }
    })
  },

  onShareTap: function (event) {
    var itemList = ["分享到微信好友", "分享到朋友圈", "分享到QQ", "分享到微博"];

    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //两个参数，一个是res.cancle,boolean判断用户是否点击了取消按钮
        // res.tapIndex表示参数的索引，从0开始
        if (!res.cancel) {
          wx.showModal({
            title: "用户" + itemList[res.tapIndex],
            content: "用户是否取消？" + res.cancle + "\n现在暂时不支持用户的分享功能?什么时候能够支持呢？"
          });
        }
      }
    });
  },

  onMusicTap: function (event) {
    var isPlayed = this.data.isPlay;
    var musicDataData = this.data.posterData.music;
    if (isPlayed) {//如果是正在播放，则暂停播放；
      wx.pauseBackgroundAudio();
      //这里不能用this.data.isPlay;
      this.setData({ isPlay: false });
    } else {//如果是暂停播放，则启动播放器
      wx.playBackgroundAudio({
        dataUrl: musicDataData.url,
        title: musicDataData.title,
        coverImgUrl: musicDataData.coverImg
      })
      this.setData({ isPlay: true });
    }
  }

})