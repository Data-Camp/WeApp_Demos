//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util');

Page({
  data: {
    banner: null,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    txtAds: null,
    advertise: null
  },
  /*
  * 首页banner
  */
  setBanner: function () {
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/banner', function (data) {
      that.setData({
        banner: data.data
      });
    });
  },
  /**
   * 首页文字广告
   */
  setTxtAds: function(){
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/roll', function (data) {
      that.setData({
        txtAds: data.data[0]
      });
    });
  },
  /**
   * 首页两块子banner
   */
  setSubBanner: function(){
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/event/advertise/index', function (data) {
      that.setData({
        advertise: data.data
      });
    });
  },
  /**
   * 模块入口
   */
  setModule: function(){

  },
  /**
   * 入口
   */
  onLoad: function () {
    var that = this;
    that.setBanner();
    that.setTxtAds();
    that.setSubBanner();
    that.setModule();
  }
});