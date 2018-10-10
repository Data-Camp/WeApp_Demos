Page({
  data: {
    servicedetail:{},
  },
  onLoad: function (options) {
    const i = options.id;
    this.setData({
      servicedetail:{
        "name":"上海拜特信息技术有限公司"+i,
        "city":"上海",
        "tag":"法律咨询",
        "imgurl":"http://img.mukewang.com/57fdecf80001fb0406000338-240-135.jpg"
      }
    })
    wx.setNavigationBarTitle({
      title: this.data.servicedetail.name
    })
  }
})
