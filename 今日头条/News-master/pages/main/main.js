//main.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title:[],
    imgUrls:[],
    author:[],
    date:[],
    requestUrl:"top",
    cssActive:0,
    dataId:0,
    windowHeight:"",
    windowWidth:"",
    page:0,
  },
  onShow: function( e ) {
    wx.getSystemInfo( {
      success: (res) =>{
        this.setData( {
          windowHeight: res.windowHeight,
          windowWidth:res.windowWidth
        })
      }
    })
  },
  pullDownRefresh: function( e ) {
    console.log( "下拉刷新" );
    this.onLoad();
  },
  pullUpLoad: function( e ) {
    app.page+=5;
    this.setData( {
      page: app.page
    })
    console.log( "上拉加载" + app.page );
    this.loading();
    this.getTypeData(app.page);
  },
  check:function(e){
    // console.log(e.target.dataset.id);
    // console.log(e.target.id);
    app.cssActive = e.target.dataset.id
    app.requestUrl = e.target.id;
    this.resetData();
    this.setData({
      dataId:app.cssActive,
      title:app.title,
      imgUrls:app.imgUrls,
      author:app.author,
      date:app.date,
      requestUrl:app.requestUrl,
      page:app.page
    }),
    this.loading();
    this.getTypeData(app.page);
  },
  onLoad: function () {
      this.resetData();
      this.loading();
      this.getTypeData(app.page);
  },
  getTypeData:function(page){
    wx.request({
        url: 'http://v.juhe.cn/toutiao/index?type='+app.requestUrl+'&key=1c84600b999ae65c986571e77b403fab',
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: (res) =>{
          // success
        //   console.log( res.data.result.data );
          var data = res.data.result.data;
          for(var i=page;i<page+5;i++){
              app.title.push( data[i].title );
              app.imgUrls.push( data[i].thumbnail_pic_s );
              app.author.push( data[i].author_name );
              app.date.push( data[i].date );
              app.url.push( data[i].url );
          }
        //   console.log( app.imgUrls );
          this.setData({
            title:app.title,
            imgUrls:app.imgUrls,
            author:app.author,
            date:app.date,
            page:app.page
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
          wx.hideToast();
        }
      })
  },
  resetData:function(){
    app.title = [];
    app.imgUrls = [];
    app.author = [];
    app.title = [];
    app.date = [];
    app.page = 0;
  },
  loading:function(){
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
  },
})
