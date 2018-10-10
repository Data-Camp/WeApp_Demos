var util = require('../../utils/util');

Page({
  data: {
    recommendSources: null,
    importCar: null,
    hotCar: null,
    commonCar: null,
  },
  /**
   * 热门车型和主品牌
   */
  fetchData: function () {
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/car/brand_list', function (data) {
      let brandList = [];
      let common = data.data.common;
      for (let k in common) {
        brandList.push(common[k]);
      }
      that.setData({
        hotCar: data.data.hot,
        commonCar: brandList
      });
    });
  },
  onLoad: function (options) {
    let that = this;
    that.fetchData();
  }
})