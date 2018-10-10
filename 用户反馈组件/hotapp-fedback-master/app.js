/*
***HotApp云笔记，基于HotApp小程序统计云后台
***免费云后台申请地址 https://weixin.hotapp.cn/cloud
***API 文档地址：https://weixin.hotapp.cn/api
***小程序技术讨论QQ群：173063969
*/
var hotapp = require('utils/hotapp.js');
App({

  onLaunch: function () {

    //使用HotApp小程序统计，统计小程序新增，日活，留存，当日可查看统计结果
    //线上发布
    hotapp.init('hotapp2427615');
    // 输入debug错误日志, 建议生产环境不要开启
    hotapp.setDebug(true);
  },
  onError: function (msg) {
    //错误日志上传(开发中)
    hotapp.onError(msg,'1.0.0',function (err) {
      console.log(err)
    })
  },

  /**
   * 全局变量
   */
  globalData: {
    hotapp: hotapp // 这里作为一个全局变量, 方便其它页面调用
  }
})
