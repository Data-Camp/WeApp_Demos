var app = getApp()
Page({
  data: {
    userInfo: {},
    barTitle:[{'name':'收藏',currentTab:0},
              {'name':'制作',currentTab:1},
              {'name':'我的',currentTab:2}],
    items:[
       {title:'模版1',cover:'http://img.huiyoobao.com/funny/columnback/1474432200020_orign.jpg'},
       {title:'模版2',cover:'http://img.huiyoobao.com/funny/columnback/1473825600311_orign.jpg'},
       {title:'模版3',cover:'http://img.huiyoobao.com/funny/columnback/1473825601094_orign.jpg'},
       {title:'模版4',cover:'http://img.huiyoobao.com/funny/columnback/1473825076410_orign.jpg'},
       {title:'模版5',cover:'http://img.huiyoobao.com/funny/columnback/1473825075998_orign.jpg'}],
    winHeight:0,
    winWidth:0,
    currentTab:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  swichNav:function(e){
    this.setData({
      currentTab:e.currentTarget.dataset.currenttab
    })
    // wx.request({
    //   url: 'https://URL',
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function(res){
    //     // success
    //   },
    //   fail: function() {
    //     console.log("查询失败！");
    //   }
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    let that=this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight,
          winWidth:res.windowWidth
        })
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
