//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    
    parentItem: [
      {
        itemTiele:"网络工具",
        imgUrls:[
          "../../images/menu/a38.png",
          "../../images/menu/a19.png",
            "../../images/menu/a1.png",
        ],
        texts:[
          "身份证查询",
          "网站安全检测",
          "IP地址",
        ]
      },
      {
        itemTiele:"日常生活",
        imgUrls:[
          "../../images/menu/a73.png",
          "../../images/menu/a183.png",
          "../../images/menu/a80.png",
        ],
        texts:[
          "天气预报",
          "驾照题库",
          "汇率",
        ]
      },
      {
        itemTiele:"开心娱乐",
        imgUrls:[
          "../../images/menu/a63.png",
          "../../images/menu/qq.png",
          "../../images/menu/a65.png",
          "../../images/menu/a58.png",
        ],
        texts:[
          "历史上的今天",
          "QQ号码测吉凶",
          "老黄历",
          "星座运势",
        ]
      }
    ]
  },

  goTools:function(event){
    var to = event.target.dataset.sel
    var to_str = this.isToUrl[to];
    console.log(to);
    wx.navigateTo({
      url: '../'+to_str+'/'+to_str
    })
  },

  isToUrl : {
    "0-0" : "card",
    "0-1" : "webmon",
    "0-2" : "ipaddress",
    "1-0" : "weather",
    "1-1" : "drive",
    "1-2" : "parities",
    "2-0" : "history",
    "2-1" : "qqtest",
    "2-2" : "almanac",
    "2-3" : "constellation",
  },
  
  onLoad: function () {

    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

  }
})
