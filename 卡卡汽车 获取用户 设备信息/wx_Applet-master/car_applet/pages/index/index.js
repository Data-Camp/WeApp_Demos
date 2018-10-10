//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    img_urls: [
      "http://d1.xcar.com.cn/attached/image/20160929/20160929155858_35240.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929160029_26399.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929155928_68103.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929160201_31895.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929160229_19490.jpg"
    ],
    interval: 5000,
    duration: 2000,

    contents : [0, 1, 2, 3, 4, 5],
    items: [
      "智能大过电能 简析奔驰Generation EQ",
      "下得了赛道送得了葬 特斯拉已无所不能",
      "全能探险家 全新一代路虎发现技术解析",
      "科技至上 林肯MKZ车机与主动安全体验",
      "燃料电池VS纯电动 谁会是新能源一哥？",
      "不朽的传奇 奥迪五缸发动机40年进化史"
    ],
    new_pic: [
      "http://pic.xcarimg.com/img/07news/201610/wNdmGPDBGm1475580976311755147558097631.jpg-200x150.jpg",
      "http://pic.xcarimg.com/img/07news/201610/qnDMIK50ud1475464258081744147546425808.jpg-200x150.jpg",
      "http://pic.xcarimg.com/img/07news/201609/GSJZ0C7c3x1475116821458482147511682145.jpg-200x150.jpg",
      "http://pic.xcarimg.com/img/07news/201609/CtdlTtd2El1475067775454577147506777545.jpg-200x150.jpg",
      "http://pic.xcarimg.com/img/07news/201609/mvaZ75mVWE1473064107454160147306410745.jpg-200x150.jpg",
      "http://pic.xcarimg.com/img/07news/201609/VxAsOdBCh31473237548487414147323754848.jpg-200x150.jpg"
    ],

    load: false
  },

  setLoad: function(e) {
    this.setData({
      load: !this.data.load
    })
  },

  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function(userInfo){
  //     //更新数据
  //     that.setData({
  //       userInfo:userInfo
  //     })
  //   })
  // }
})
