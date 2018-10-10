//app.js
App({
  onLaunch: function () {
    var temp=[
      // {
      //   "name":"EUR",
      //   "country":"欧洲",
      //   "rate": 0.0,
      //   "amount": 0.0,
      //   "en": "Euro",
      //   "cn": "欧元",
      //   "jp": "ユーロ",
      //   "ko": "유로"
      // }, 
      // {
      //     "name": "HKD",
      //     "country":"香港",
      //     "rate": 0.0,
      //     "amount": 0.0,
      //     "en": "Hong Kong Dollar",
      //     "cn": "港元",
      //     "jp": "香港ドル",
      //     "ko": "홍콩 달러"
      //   }
    ]
    wx.setStorage({
        key:"mySelectCurs",
        data:temp
      }),

    wx.setStorage({
        key:"myMainCur",
        data: {
          "name": "CNY",
          "country":"中国",
          "rate": 0.0,
          "amount": 100.0,
          "en": "RMB",
          "cn": "人民币",
          "jp": "香港ドル",
          "ko": "홍콩 달러"
        }
      })
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
  }
})





// ,
//  {
//       "name": "INR",
//       "country":"印度",
//     "rate": 0.0,
//     "en": "Indian Rupee",
//     "cn": "印度卢比",
//     "jp": "インド ルピー",
//     "ko": "인도 루피"
//   },
//    {
//       "name": "JPY",
//       "country":"日本",
//     "rate": 0.0,
//     "en": "Japanese Yen",
//     "cn": "日元",
//     "jp": "日本円",
//     "ko": "일본 엔"
//   },
//   {
//       "name": "KRW",
//       "country":"韩国",
//     "rate": 0.0,
//     "en": "South-Korean Won",
//     "cn": "韩元",
//     "jp": "韓国ウォン",
//     "ko": "대한민국 원"
//   },
//   {
//       "name": "SGD",
//       "country":"新加坡",
//     "rate": 0.0,
//     "en": "Singapore Dollar",
//     "cn": "新加坡元",
//     "jp": "シンガポール ドル",
//     "ko": "싱가포르 달러"
//   },
//   {
//       "name": "TWD",
//       "country":"台湾",
//     "rate": 0.0,
//     "en": "Taiwan Dollar",
//     "cn": "台币",
//     "jp": "台湾ドル",
//     "ko": "대만 위안 달러"
//   },
//    {
//       "name": "USD",
//       "country":"美国",
//     "rate": 0.0,
//     "en": "US Dollar",
//     "cn": "美元",
//     "jp": "米国ドル",
//     "ko": "미국 달러"
//   },
//   {
//       "name": "XAU",
//       "country":"黄金",
//     "rate": 0.0,
//     "en": "Gold (oz.)",
//     "cn": "黄金（盎司）",
//     "jp": "金 (オンス)",
//     "ko": "금(온스)"
//   }