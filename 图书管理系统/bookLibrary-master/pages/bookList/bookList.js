var config = require('../../utils/config');
var url = config.url;
var util = require('../../utils/util');
var db = require('../../utils/db');
var empno = 'FE717';//暂时hard code，应该是从登陆用户找到对应的工号

Page({
  data: {
    bookList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.queryAllBorrowBooks();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  queryAllBorrowBooks: function () {
    var that = this;
    var options = {
      url: config.clubApi.get,
      data: {
        appkey: config.appKey,
        key: empno,
        type: 'bookBorrow'
      }
    };

    util.request(options, function (res) {
      if (typeof (res.data.result) !== 'undefined') {
        var books = [];
        var results = res.data.result.value;
        for (let i = 0; i < results.length; i++) {
          //books.push(results[i].isbn13);

          var option1 = {
            url: config.clubApi.get,
            data: {
              appkey: config.appKey,
              type: 'bookLibrary',
              key: results[i].isbn13
            }
          };

          util.request(option1, (res, err) => {
            var book = res.data.result.value;
            // console.log(results[i]);
            // var newDate = new Date();
            // newDate.setTime(results[i].borrowDate);
            //console.log(newDate.toLocaleString());
            //book["borrowDate"] = newDate.toLocaleDateString();
            book["borrowDate"] = util.formatTime(results[i].borrowDate);
            book["shouldBackDate"] = util.formatTime(results[i].borrowDate+86400000*30);
            books.push(book);
            that.setData({
              bookList: books
            })
          });

          // if (i == results.length) {
          //   console.log(books);
          //   that.setData({
          //     bookList: books
          //   })
          // }
        }


      }

    });
  },
  queryOneBook: function (key) {
    var that = this;

    var inputMsg = that.data.inputValue;
    var options = {
      url: config.clubApi.list,
      data: {
        appkey: config.appKey,
        type: 'bookLibrary',
        key: key
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

  }
})