var functions = require('../functions.js')
var url = 'https://api.douban.com/v2/movie/in_theaters'
var pageSize = 20
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  scroll: function(e){
    //console.log(e)
  },
  onLoad: function () {
    var that = this
    functions.getCity(function(city){
      functions.fetchFilms.call(that, url, city, 0, pageSize, function(data){
        that.setData({
          showLoading: false
        })
      })
    })
  },
  scrolltolower: function(){
    var that = this
    functions.getCity(function(city){
      functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function(data){ })
    })
  },
  viewDetail: function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  }
})
