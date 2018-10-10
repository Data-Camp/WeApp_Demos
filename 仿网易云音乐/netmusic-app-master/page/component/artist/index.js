var bsurl=require('../../../utils/bsurl.js');
Page({
    data:{
        art:{},
        loading:false,
        tab:1,
        album:{
            offset:20,
            loading:false
        },
        mv:{}
    },
    onLoad:function(options){
        var id=options.id;
        var that=this;
        wx.request({
          url:bsurl+'artist?id='+id,
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          success: function(res){
           that.setData({
               art:res.data,
               loading:true
           })
          },
          fail: function() {
            wx.navigateBack({
              delta: 1
          })
          }
        })
    },
    tabtype:function(e){
        var t=e.currentTarget.dataset.t;
        this.setData({tab:t});
        var that=this;
        if(t==2&&!this.data.album.loading){
            this.setData({loading:false})
            wx.request({
              url: bsurl+'artistAlbums',
              data:{
                  id:that.data.art.artist.id,
                  offset:that.data.album.offset,
                  limit:20
              },
              success: function(res){
                res.data.loading=true;
                res.data.offset=that.data.album.offset+res.data.hotAlbums.length
                that.setData({
                    album:res.data,
                    loading:true
                })
              },
              fail: function() {
                // fail
              }
            })
        }
    }
})