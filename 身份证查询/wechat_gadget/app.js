//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  //填写网站接口域名
  domainName:"https://www.qingzhou123.net/routine_prod.php",

  //接口地址详情
  port:{
    //身份证查询
    "card":{
      "key":"86f79e974dd392f4c48e226aa3f8ed0c",
      "cardAddress":"https://apis.juhe.cn/idcard/index" //?cardno=330326198903081211
    },
    "webmon":{
      //网站安全监测
      "key":"b0054fd1b24d88ee69b9bd3734c871c4",
    },
    "ipaddress":{
      //IP地址
      "key":"a5afbf6279f79c718566292982ade72e",
    },
    "weather":{
      //天气预报
      "key":"66364b95ba638486ed9f80f9399a1fa3",
    },
    "drive":{
      //驾考题库
      "key":"0ae52b188d5fa9b95c024b9a2d0dcc5e",
    },
    "parities":{
      //汇率
      "key":"53f6704bd7ff4143cecce2ee8519a128",
    },
    "history":{
      //历史上的今天
      "key":"246fcbbb34a3a0234e2ccb362dcc99be",
    },
    "qqtest":{
      //QQ号码测吉凶
      "key":"22c0782eeb3dbc1fa2a47a76c6c80eee",
      "":"http://japi.juhe.cn/qqevaluate/qq"  //?qq=591196507
    },
    "almanac":{
      //老黄历
      "key":"d842afe4a2401bb683f120394a97a5ef",
    },
    "constellation":{
      //星座运势
      "key":"a5b0555574dd31ced281f181e3f251a2",
    },
  }

})