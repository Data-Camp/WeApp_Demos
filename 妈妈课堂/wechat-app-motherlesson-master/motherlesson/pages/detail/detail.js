// pages/detail/detail.js
Page({
  data:{
    
  },

  onLoad:function(options){
    let that = this
    wx.request({
      url: 'http://z.yeemiao.com/mm/api/article/get-article-detail',
      data: {
          id: options.id,
          isRelated: 1,
          isComment: 1,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        that.setData({
          articlemodel: res.data
        })
      }
    })
  },
  
})