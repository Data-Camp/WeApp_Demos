//index.js
//获取应用实例
//获取应用实例
const util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    /**
         * 页面配置
         */
    winWidth: 0,
    winHeight: 0,
    // 精选数据
    datalist: [],
    // 日报数据
    dataThemes: [],

    dataListDateCurrent: 20161106,      // 当前日期current
    dataListDateCount: 0,
    imagesHeightList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    /**
    * 获取系统信息
    */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    that.loadData();
  },
  loadData: function () {
    /**
    * 发送请求数据
    */
    var that = this

    var currentDate = this.data.dataListDateCurrent;
    util.AJAX("news/before/" + currentDate, function (res) {

      var arr = res.data;
      var format = util.getFormatDate(arr.date);

      // 格式化日期方便加载指定日期数据
      // 格式化日期获取星期几方便显示
      arr["dateDay"] = format.dateDay;

      // 获取当前数据进行保存
      var list = that.data.datalist;
      // 然后重新写入数据
      that.setData({
        datalist: list.concat(arr),                              // 存储数据
        dataListDateCurrent: arr.date,
        dataListDateCount: that.data.dataListDateCount + 1      // 统计加载次数
      });
    });
  },
  /**
     * 事件处理
     * scrolltolower 自动加载更多
     */
  scrolltolower: function (e) {

    var that = this;

    // 加载更多 loading
    that.setData({
      hothidden: true
    })

    var currentDate = this.data.dataListDateCurrent;

    // 如果加载数据超过10条
    if (this.data.dataListDateCount >= 8) {

      // 加载更多 loading
      that.setData({
        hothidden: false
      });

    } else {

      /**
       * 发送请求数据
       */
      util.AJAX("news/before/" + currentDate, function (res) {

        var arr = res.data;
        var format = util.getFormatDate(arr.date);

        // 格式化日期方便加载指定日期数据
        // 格式化日期获取星期几方便显示
        arr["dateDay"] = format.dateDay;

        // 获取当前数据进行保存
        var list = that.data.datalist;
        // 然后重新写入数据
        that.setData({
          datalist: list.concat(arr),                              // 存储数据
          dataListDateCurrent: arr.date,
          dataListDateCount: that.data.dataListDateCount + 1      // 统计加载次数
        });
      });
    }
  },
  WxMasonryImageLoad: function (e) {
    var that = this;
    console.log(e.detail.height);
    // var colWidth = (that.data.winWidth - 20) / 2;
    // var imageId = e.target.id;
    // var imageOWidth = e.detail.width;
    // var imageOHeight = e.detail.height;

    // var colImageHeight = imageOWidth * colWidth / imageOHeight;
    // var temImagesHeightList = that.imagesHeightList;
    // temImagesHeightList[imageId] = { width: colWidth, height: colImageHeight }
    // that.setData({
    //   imagesHeightList: temImagesHeightList
    // });

  }

})
