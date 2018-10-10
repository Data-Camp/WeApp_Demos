
import config from '../../mars/conf/config'
var charts = require('../../mars/modules/charts')
var hiway = require('../../mars/modules/mars')

Page({
  data: {
    deviceH: 0,
    deviceW: 0,
  },
  onLoad: function (options) {
    let _this = this

    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          deviceH: res.windowHeight,
          deviceW: res.windowWidth,
        })
      }
    })
  },
  //初始化图表
  initGraph: function () {
    let params = {}
    params.canvas_id = 'pieGraph'
    params.data = [{
      name: '成交量1',
      data: 15,
    }, {
      name: '成交量2',
      data: 35,
    }, {
      name: '成交量3',
      data: 78,
    }, {
      name: '成交量4',
      data: 63,
    }]
    params.width = this.data.deviceW

    charts.shapePie(params)

    params.canvas_id = 'ringGraph'
    charts.shapeRing(params)

    params.canvas_id = 'lineGraph'
    params.ytitle = '成交金额 (万元)'
    params.xcate = ['2012', '2013', '2014', '2015', '2016', '2017']
    params.data = [{
        name: '成交量1',
        data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }, {
        name: '成交量2',
        data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
        format: function (val) {
            return val.toFixed(2) + '万';
        }
    }]
    charts.shapeLine(params)

  },

  onReady:function(){
    this.initGraph()
  }

})