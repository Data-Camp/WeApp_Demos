const StringUtil = require('../../utils/StringUtil.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    result: '0',
    operator: '',
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  // 百分百
  tapPercent: function() {

  },

  // 数字
  tapNumber: function(e) {
    // console.log('数字按钮：', e);
    const num = e.currentTarget.dataset['value'];
    if (num) {
      this.data.result += num;

      const fmtNumber = StringUtil.formatNumber(this.data.result);

      // 限制最大长度
      if (fmtNumber.length > 11)
        return;
 
      this.setData({
        result: fmtNumber
      });
    } else {
      console.warn('对应的 data-value 属性异常！');
    }
  },

  // 加减乘除
  tapOperator: function(e) {
    console.log('tap: ', e);
    const opt = e.currentTarget.dataset['value'];
    if (opt) {
      this.setData({
        operator: opt
      });
    }
  },

  // 等于
  tapCalculate: function() {
    console.log('等于：');
  }
})
