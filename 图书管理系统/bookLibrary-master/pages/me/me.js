//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    showBadge:false,
    meList:[
      {
        text:'借入的图书',
        icon:'../../assets/img/iconfont-dingdan.png',
        url:'../bookList/bookList'
      },
            {
        text:'借出的图书',
        icon:'../../assets/img/iconfont-help.png',
        url:''
      },
            {
        text:'预约的图书',
        icon:'../../assets/img/iconfont-icontuan.png',
        url:''
      },
            {
        text:'飘流的图书',
        icon:'../../assets/img/iconfont-kefu.png',
        url:''
      },
            {
        text:'曾经拥有的图书',
        icon:'../../assets/img/iconfont-tuihuo.png',
        url:''
      },
    ]
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
