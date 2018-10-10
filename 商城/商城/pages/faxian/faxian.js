var WxAutoImage = require("../../js/wxAutoImageCal.js");
var app = getApp();

Page({
    data: {

    },
    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    }
})