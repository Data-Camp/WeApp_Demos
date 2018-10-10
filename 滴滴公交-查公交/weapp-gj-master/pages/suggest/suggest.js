
//获取应用实例
var app = getApp()
Page({
  data: {
    suggests: []
  },
  //事件处理函数
  getSug: function(e) {
    wx.request({
      url: 'https://gongjiao.xiaojukeji.com/api/transit/search/suggest',
      method: 'POST',
      header: {
          'Content-Type': 'application/json'
      },
      data: {
        imei:'general_app',
        token:'t49GcWlrGxJ0d2tGQtC9zA_MYpKZXtCpEcwSEJk1jSpUjTsOAyEMRO8ytQucZY3t25B_KiJQlAJx91hKte28p3kTFQ4QzvCTci7ZipjJxplwhSvhBp941zG-rccSjnCYwoTRPv0SfF-E-xE94pZ342SJddMoPP-hFzytXwAAAP__',
        lng:'116.29319741622',
        lat:'40.041375934019',
        city:1,
        filter:'poi,line,banner',
        pattern: e.detail.value
      },
      success: function(res){
        
        if(res.data.matches && res.data.matches.length) {
          console.log(res.data.matches);
          this.setData({suggests: res.data.matches});
        }
      }.bind(this)
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  },
  getRecommend: function() {
    wx.request({
      url: 'http://gongjiao.xiaojukeji.com/api/transit/line/recommendation',
      method: 'POST',
      header: {
          'Content-Type': 'application/json'
      },
      data: {
        imei:'general_app',
        token:'t49GcWlrGxJ0d2tGQtC9zA_MYpKZXtCpEcwSEJk1jSpUjTsOAyEMRO8ytQucZY3t25B_KiJQlAJx91hKte28p3kTFQ4QzvCTci7ZipjJxplwhSvhBp941zG-rccSjnCYwoTRPv0SfF-E-xE94pZ342SJddMoPP-hFzytXwAAAP__',
        lng:'116.29319741622',
        lat:'40.041375934019',
        city:1,
        filter:'0,1'
      },
      success: function(res){
        console.log(res.data);
      }
    });
  }
 
})
