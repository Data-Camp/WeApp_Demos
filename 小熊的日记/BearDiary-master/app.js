// app.js

const config = require('config');
const diaries = require('demo/diaries');

App({

  onLaunch: function () {
  },

  // 获取用户信息
  getUserInfo: function(cb) {
    var that = this;

    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      // 先登录
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: (res) => {
              that.globalData.userInfo = res.userInfo;
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  // 获取本地全部日记列表
  getDiaryList(cb) {
    var that = this;

    if (this.globalData.diaryList) {
      typeof cb == 'function' && cb(this.globalData.diaryList);
    } else {
      let list = [];

      this.getLocalDiaries(storage => {
        // 本地缓存数据
        for (var k in storage) {
          list.push(storage[k]);
        }
      });

      // 本地假数据
      list.push(...diaries.diaries);
      that.globalData.diaryList = list;
      typeof cb == 'function' && cb(that.globalData.diaryList)
    }
  },

  // 获取本地日记缓存
  getLocalDiaries(cb) {
    var that = this;

    if (this.globalData.localDiaries) {
      typeof cb == 'function' && cb(this.globalData.localDiaries);
    } else {
      wx.getStorage({
        key: config.storage.diaryListKey,
        success: (res) => {
          that.globalData.localDiaries = res.data;
          typeof cb == 'function' && cb(that.globalData.localDiaries);
        },
        fail: (error) => {
          that.globalData.localDiaries = {};
          typeof cb == 'function' && cb(that.globalData.localDiaries);
        }
      });
    }
  },

  // 获取当前设备信息
  getDeviceInfo: function(callback) {
    var that = this;

    if (this.globalData.deviceInfo) {
      typeof callback == "function" && callback(this.globalData.deviceInfo)
    } else {
      wx.getSystemInfo({
        success: function(res) {
          that.globalData.deviceInfo = res;
          typeof callback == "function" && callback(that.globalData.deviceInfo)
        }
      })
    }
  },

  globalData: {
    // 设备信息，主要用于获取屏幕尺寸而做适配
    deviceInfo: null,

    // 本地日记缓存列表 + 假数据
    // TODO 真实数据同步至服务端，本地只做部分缓存
    diaryList: null,

    // 本地日记缓存
    localDiaries: null,

    // 用户信息
    userInfo: null,
  }

})
