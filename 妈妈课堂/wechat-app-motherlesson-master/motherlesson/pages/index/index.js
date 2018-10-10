
var app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    imgUrls: [],
    list:[]
  },

  onLoad: function(options) {
    this.loadData()
  },

  loadData: function() {
    let that = this
    wx.request({
      url: 'http://z.yeemiao.com/mm/api/article/get-popular-data',
      data: {
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){

        var tempArray = new Array()
        var resarray = res.data.data.items 
        const length = resarray.length;
        for (var i = 0; i < length; ++i) {
          if (resarray[i].type != 1) {
            tempArray[i] = {type: resarray[i].type, data: JSON.parse(resarray[i].data)}
          } else {
            tempArray[i] = {type: resarray[i].type, data: resarray[i].data}
          }
        }
        
        that.setData({
          imgUrls: res.data.data.banners,
          list: tempArray
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  onPullDownRefresh: function() {
    this.loadData()
  },

  // banner上图片点击
  bannerImageTap: function(e) {
    console.log('test' + e.target.dataset.id)
    wx.navigateTo({ 
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  }
  
})