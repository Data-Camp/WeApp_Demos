//index.js
//获取应用实例
var app = getApp();
var config = require('../../utils/config');
var url = config.url;
var util = require('../../utils/util');
var db = require('../../utils/db');

Page({
  data: {
    bookList: [],
    inputValue: ''
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log('onload index')
    var that = this;

    //1.获取用户的基本信息，查询数据库获取用户的工号，并使用缓存存在本机
    //var openid = wx.getStorageSync('openid');

    /*如何获取工号
    var options={
      url:config.clubApi.get,
      data:{
        appkey: config.appKey,
        key: openid,
        type:'userMapping'
      }
    }
    util.request(options).then(res=>{
      //获取到工号
      console.log(res.data.result.value);
    })*/

    //以下这段都是有用的，不要删除。以后做个界面，用户第一次使用的时候就要输入自己的工号，然后把工号和openid存到mapping表里
    // if (openid) {
    //   wx.checkSession({
    //     success: function (e) {
    //       //登录态未过期
    //     },
    //     fail: function () {
    //       //登录态过期
    //       wx.login({
    //         success: function (res) {
    //           if (res.code) {
    //             db.getOpenId(res.code).then(res => {
    //               console.log(res);
    //               var openid = res.data.openid;
    //               var expires_in = res.data.expires_in;
    //               var session_key = res.data.session_key;

    //               for (var key in res.data) {
    //                 // console.log(key);
    //                 // console.log(res.data[key]);
    //                 wx.setStorage({
    //                   key: key,
    //                   data: res.data[key]
    //                 });
    //               };
    //             });
    //           }
    //         },
    //         fail: function () {
    //           console.log('login fail')
    //         },
    //         complete: function () {
    //           // complete
    //         }
    //       });
    //     }
    //   })

    // } else {

    //   wx.login({
    //     success: function (res) {
    //       if (res.code) {
    //         db.getOpenId(res.code).then(res => {
    //           console.log(res);
    //           var openid = res.data.openid;
    //           var expires_in = res.data.expires_in;
    //           var session_key = res.data.session_key;

    //           for (var key in res.data) {
    //             // console.log(key);
    //             // console.log(res.data[key]);
    //             wx.setStorage({
    //               key: key,
    //               data: res.data[key]
    //             });
    //           };
    //         });
    //       }
    //     },
    //     fail: function () {
    //       console.log('login fail')
    //     },
    //     complete: function () {
    //       // complete
    //     }
    //   });

    // };






    //2.从数据库获取所有书本的信息
    // var options = {
    //   url: config.clubApi.list,
    //   data: {
    //     appkey: config.appKey,
    //     type: 'bookLibrary'
    //     //columns: ['id', 'isbn13', 'title']
    //   }
    // };

    // util.request(options, function (res) {
    //   var books = [];
    //   for (var i = 0; i < res.data.result.length; i++) {
    //     books.push(res.data.result[i].value);
    //   }
    //   that.setData({
    //     bookList: books
    //   })
    // });



    //this.queryAllBooks();
    // var timestamp3 = new Date().getTime();

    // var newDate = new Date();
    // newDate.setTime(timestamp3);
    // console.log(newDate.toLocaleString());




  },
  queryBooks: function (e) {
    var that = this;

    var inputMsg = that.data.inputValue;
    var options = {
      url: config.clubApi.list,
      data: {
        appkey: config.appKey,
        type: 'bookLibrary',
        // columns:'title',
        keywords: inputMsg
        //columns: ['id', 'isbn13', 'title']
      }
    };

    util.request(options, (res, err) => {
      var books = [];
      for (var i = 0; i < res.data.result.length; i++) {
        books.push(res.data.result[i].value);
      }
      that.setData({
        bookList: books
      });
    });

  },
  goToDetailPage: function (e) {

    var isbn13 = e.currentTarget.id;
    var qty = e.currentTarget.dataset.qty;
    wx.navigateTo({
      url: '../detail/detail?id=' + isbn13 + '&qty=' + qty
    });

  },
  onShow: function () {
    // 页面显示
    //console.log('onshow');
    //this.queryAllBooks();
    this.queryBooks();
  },
  queryAllBooks: function () {

    var that = this;
    var options = {
      url: config.clubApi.list,
      data: {
        appkey: config.appKey,
        type: 'bookLibrary'
      }
    };

    util.request(options, function (res) {
      var books = [];
      for (var i = 0; i < res.data.result.length; i++) {
         books.push(res.data.result[i].value);
        //books.push(JSON.parse(res.data.result[i].value));
        //console.log(typeof(res.data.result[i].value));
      }
      that.setData({
        bookList: books
      })
    });
    


  }

})
