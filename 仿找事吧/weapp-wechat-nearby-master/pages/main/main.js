//main.js
//获取应用实例
var app = getApp()
var count = 10;
var total = 0;
var code = "2";
Page({
    data: {
        title: "附近三公里",
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        loadingHidden: false,  // loading
        array: [{
            code: '1',
            id: 'icon_1',
            src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/7(1).png',
            text: '家政'
        }, {
                code: '2',
                id: 'icon_2',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/10(1).png',
                text: '药店'
            }, {
                code: '3',
                id: 'icon_3',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/9(2).png',
                text: '银行'
            }, {
                code: '4',
                id: 'icon_4',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/2(1).png',
                text: '维修'
            }, {
                code: '5',
                id: 'icon_5',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/1(1).png',
                text: '公厕'
            }, {
                code: '6',
                id: 'icon_6',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/8(6).png',
                text: '医院'
            }, {
                code: '7',
                id: 'icon_7',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/11(1).png',
                text: '加油站'
            }, {
                code: '8',
                id: 'icon_8',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/5(5).png',
                text: '汽车洗护'
            }, {
                code: '9',
                id: 'icon_9',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/5(1).png',
                text: '营业厅'
            }, {
                code: '10',
                id: 'icon_10',
                src: 'http://123.57.15.173:8089/userfiles/1/images/gatherType/img/2016/09/12(2).png',
                text: '停车场'
            }],
        dataArray: []
    },

    //事件处理函数
    swiperchange: function (e) {
        // 此处写 轮播 改变时会触发的 change 事件
    },

    // 轮播item点击事件
    itemclick: function (e) {
        wx.showToast({
            title: e.currentTarget.dataset.id + "",
            icon: 'success',
            duration: 2000
        })
    },

    // 分类item单击事件
    typeclick: function (e) {
        total = 0;
        code = e.currentTarget.dataset.code + "";
        var name = e.currentTarget.dataset.text + "";
        this.data.dataArray = [];

        this.setData({
            title: "附近三公里: " + name
        })

        this.periphery();
    },

    onLoad: function () {
        console.log('onLoad')
        var that = this

        count = 10;
        total = 0;

        //sliderList
        wx.request({
            url: 'http://192.168.1.137:80/app/guanggao',
            method: 'POST',
            data: {
                 type: "1"
            },
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                that.setData({
                    images: res.data.data.guanggao
                })
            }
        })

        this.periphery();
    },

    // 网络请求
    periphery: function () {
        var that = this
        //sliderList
        wx.request({
            url: 'http://192.168.1.137:80/app/periphery',
            method: 'POST',
            data: {
                city: "深圳",
                code: code,
                count: count + "",
                total: total + "",
                lat: app.globalData.latitude + "",
                lng: app.globalData.longitude + ""
            },
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                that.data.dataArray = that.data.dataArray.concat(res.data.data.list)
                that.setData({
                    dataArray: that.data.dataArray
                })

                setTimeout(function () {
                    that.setData({
                        loadingHidden: true
                    })
                }, 1000)
            }
        })
    },

    // 下拉刷新回调接口
    onPullDownRefresh: function () {
        total = 0;
        this.data.dataArray = [];
        this.periphery();
        wx.stopPullDownRefresh;
    },

    // 上拉加载回调接口
    onReachBottom: function () {

        total += count;
        this.periphery();

    },

    openmap: function (e) {

        wx.openLocation({
          latitude: e.currentTarget.dataset.lat , // 纬度，范围为-90~90，负数表示南纬
          longitude: e.currentTarget.dataset.lng, // 经度，范围为-180~180，负数表示西经
          scale: 28, // 缩放比例
          name: e.currentTarget.dataset.name, // 位置名
          address: e.currentTarget.dataset.address, // 地址的详细说明
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
})


