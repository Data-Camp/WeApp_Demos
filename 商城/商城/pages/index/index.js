var WxAutoImage = require('../../js/wxAutoImageCal.js');
var app = getApp();

Page({
    data: {
        imgUrls: [
            '../../image/swiper1.jpg',
            '../../image/swiper1.jpg',
            '../../image/swiper1.jpg'
        ],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1200,
        iconArray: [
            {
                "iconUrl": '../../image/icon-qiandao.png',
                "iconText": '签到'
            },
            {
                "iconUrl": '../../image/icon-fujin.png',
                "iconText": '附近'
            },
            {
                "iconUrl": '../../image/icon-zhanhui.png',
                "iconText": '游展'
            },
            {
                "iconUrl": '../../image/icon-fuli.png',
                "iconText": '福利'
            },
            {
                "iconUrl": '../../image/icon-muma.png',
                "iconText": '玩乐'
            },
            {
                "iconUrl": '../../image/icon-xingxing.png',
                "iconText": '周边'
            },
            {
                "iconUrl": '../../image/icon-tiyu.png',
                "iconText": '体育'
            },
            {
                "iconUrl": '../../image/icon-qinzi.png',
                "iconText": '亲子'
            }
        ],
        itemArray: [
            {
                "itemUrl": '../../image/huaju.jpeg',
                "itemText": '11月20日话剧《风声》'
            },
            {
                "itemUrl": '../../image/huaju.jpeg',
                "itemText": '11月20日话剧《原野》'
            },
            {
                "itemUrl": '../../image/huaju.jpeg',
                "itemText": '11月28日“夜店”演唱会'
            },
        ]
    },
    cusImageLoad: function(e){
        var that = this;
        that.setData(WxAutoImage.wxAutoImageCal(e));
    }
})