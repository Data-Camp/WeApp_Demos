//cars.js
Page({
  data: {
    image_url: [
        "http://img1.xcarimg.com/PicLib/s/s7293_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s6302_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s4494_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s7380_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s4707_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s7286_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s6633_120.jpg",
        "http://img1.xcarimg.com/PicLib/s/s2661_120.jpg",
    ],
    car_icon_a: [
      "http://img1.xcarimg.com/PicLib/logo/pl1_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl56_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl224_80.jpg",
    ],
    car_title_a: [
      "奥迪",
      "阿斯顿·马丁",
      "Alpina",
    ],
    car_icon_b: [
      "http://img1.xcarimg.com/PicLib/logo/pl2_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl3_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl17_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl13_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl57_80.jpg",
    ],
    car_title_b: [
      "宝马",
      "奔驰",
      "本田",
      "别克",
      "宾利",
    ],
    car_icon_d: [
      "http://img1.xcarimg.com/PicLib/logo/pl4_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl124_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl33_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl10_80.jpg",
    ],
    car_title_d: [
      "大众",
      "DS",
      "东风",
      "福特",
    ],
    car_icon: [
      "http://img1.xcarimg.com/PicLib/logo/pl59_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl60_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl69_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl62_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl61_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl16_80.jpg",
      "http://img1.xcarimg.com/PicLib/logo/pl126_80.jpg"
    ],
    car_title: [
      "法拉利",
      "捷豹",
      "凯迪拉克",
      "劳斯莱斯",
      "兰博基尼",
      "雪佛兰",
      "迈凯伦"
    ]
  },
  // 热门汽车跳转
  remen_click: function() {
    wx.navigateTo({
      url: '../car_detail/super_car/super_car'
    })
  },
// 奥迪汽车跳转
  aodi_click: function() {
    wx.navigateTo({
      url: '../car_detail/ao_di/ao_di'
    })
  },
})

