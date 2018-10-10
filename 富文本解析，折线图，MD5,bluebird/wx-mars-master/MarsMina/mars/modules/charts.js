
var _charts = require('../plugins/charts')

var CHARTS = function () { }

//形成饼图
CHARTS.shapePie = function (params) {
    new _charts({
        canvasId: params.canvas_id,
        type: 'pie',
        series: params.data,
        width: params.width,
        height: 300,
        dataLabel: true
    });
}

//形成折线图
CHARTS.shapeLine = function (params) {
    new _charts({
        canvasId: params.canvas_id,
        type: 'line',
        categories: params.xcate,
        series: params.data,
        yAxis: {
            title: params.ytitle,
            format: function (val) {
                return val.toFixed(2);
            },
            min: 0
        },
        width: params.width,
        height: 200
    });
}

//形成环形图
CHARTS.shapeRing = function (params) {
    new _charts({
        canvasId: params.canvas_id,
        type: 'ring',
        series: params.data,
        width: params.width,
        height: 300,
        dataLabel: true
    });
}

module.exports = CHARTS;