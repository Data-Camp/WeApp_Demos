var app = getApp();
var url = app.url;
var util = require('../../utils/util');
var config = require('../../utils/config');
var db = require('../../utils/db');
var isbn13;
var qty;
var empno = 'FE717';//暂时hard code，应该是从登陆用户找到对应的工号

Page({
  data: {
    bookMsg: {},
    isLoading: true, //是否正在读取数据
    windowWidth: '',
    windowHeight: '',
    pixelRatio: '',
    showBorrowBtn: false, //是否显示 借阅 按钮
    showBookBtn: false, //是否显示 预约 按钮
    showAddBook: false, //是否显示 录入 按钮
    addBookQty: 1 //默认的录入数量
  },
  inputChange: function (e) {
    this.data.addBookQty = e.detail.value;
    //book["qty"] = e.detail.value;
    //that.bookMsg.qty=e.detail.value;
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;


    //1.动态获取设备屏幕的高度，然后计算scroll view的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          pixelRatio: res.pixelRatio
        });
      }
    });


    //2.从豆瓣查询某本书的相关信息
    isbn13 = options.id;
    //qty=options.qty;
    //util.showLoading();
    that.setData({
      isLoading: false
    });

    db.selectBookFromDouban(isbn13, (res, err) => {
      var book = res.data;

      if (options.qty) {
        book["qty"] = options.qty;
        qty = options.qty;
      }

      if (options.addBook) {
        book["qty"] = 1;
        that.setData({
          showAddBook: true
        });
      }

      //qty>0 代表从主页面点击图书，且图书可借数量大于0，显示借阅按钮
      if (options.qty > 0) {
        that.setData({
          bookMsg: book,
          isLoading: true,
          showBorrowBtn: true,
          showBookBtn: false
        });
      }
      //qty=0 代表从主页面点击图书，且图书可借数量等于0，显示预约按钮
      else if (options.qty == 0) {
        that.setData({
          bookMsg: book,
          isLoading: true,
          showBorrowBtn: false,
          showBookBtn: true
        });
      }
      //qty=undifine 代表从录入页面转跳过来，显示 录入按钮
      else {
        that.setData({
          bookMsg: book,
          isLoading: true,
          showBorrowBtn: false,
          showBookBtn: false
        });
      }
    });



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
  borrowBook: function () {
    //借书
    // util.showLoading();
    // var options = {

    //   tableName: 'MOA_BOOK_BORROW_DETAILS_ALL',
    //   EMPNO: 'FE717',
    //   BOOK_ID: isbn13
    // }

    // db.insertData(options).then(function (res) {
    //   util.hideLoading();
    //   if (res.data.rowsAffected == 1) {
    //     //图书可借数量-1
    //     var updateOptions = {
    //       tableName: 'MOA_BOOK_LIBRARY',
    //       setColumns: {
    //         qty: qty - 1
    //       },
    //       whereColumns: {
    //         ISBN13: isbn13
    //       }
    //     };
    //     db.updateData(updateOptions).then(function (res) {
    //       console.log(res);
    //     });

    //     //提示借阅成功,正常应该刷新主页面，更新qty，但考虑到速度慢，就暂时不刷新
    //     util.showSuccess('已成功借阅！', config.showSuccessTime).then(function () {
    //       wx.navigateBack();
    //     });
    //   } else {
    //     util.showSuccess('借阅失败，请联系管理员！', config.showSuccessTime).then(function () {
    //       wx.navigateBack();
    //     });
    //   }
    // });

    var that = this;
    //1.往数据库写入借书的信息
    //1.1首先查询这个人是否有借书记录
    var option1 = {
      url: config.clubApi.get,
      data: {
        appkey: config.appKey,
        key: empno,
        type: 'bookBorrow'
      }
    };
    util.request(option1, res => {
      //console.log(res.data.result.value);
      var borrowList;
      //如果有找到数据，证明这个人有借过书 
      if (typeof (res.data.result) !== 'undefined') {
        borrowList = res.data.result.value;
      } else {
        borrowList = [];
      }
      var book={
        isbn13:isbn13,
        borrowDate:new Date().getTime()
      }
      borrowList.push(book);

      var borrowOptions = {
        url: config.clubApi.put,
        data: {
          appkey: config.appKey,
          type: 'bookBorrow',
          key: empno,
          value: borrowList
        }
      }

      util.request(borrowOptions, res => {
        //console.log(res);
        if (res.data.result === empno) {
          //2.把qty-1，然后重新insert到数据库，覆盖原来的数据
          that.data.bookMsg.qty = parseInt(that.data.bookMsg.qty) - 1;
          var options = {
            url: config.clubApi.put,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'//'application/json'
            },
            data: {
              appkey: config.appKey,
              type: 'bookLibrary',
              key: isbn13,
              value: JSON.stringify(that.data.bookMsg),
              columns: ['id', 'isbn13', 'title']
            }
          };

          util.request(options, (res, err) => {
            if (res.data.success) {

              util.showSuccess('借阅成功!', config.showSuccessTime, () => {
                wx.navigateBack();
              })
            }
          });

        }
      })


    })

  },
  addBook: function (e) {


    var that = this;
    //var bookMsg = this.data.bookMsg;
    // this.data.bookMsg.qty = this.data.addBookQty;

    //1.查询是否已经录入过这本书
    var option1 = {
      url: config.clubApi.get,
      data: {
        appkey: config.appKey,
        key: isbn13,
        type: 'bookLibrary'
      }
    };

    //var nowTimestamp = new Date().getTime();
    util.request(option1, res => {
      if (typeof (res.data.result) !== 'undefined') {
        this.data.bookMsg.qty +=parseInt(this.data.addBookQty) - 0 ;
        //this.data.bookMsg.borrowDate =nowTimestamp;
        var options = {
          url: config.clubApi.put,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'//'application/json'
          },
          data: {
            appkey: config.appKey,
            type: 'bookLibrary',
            key: isbn13,
            value: JSON.stringify(this.data.bookMsg)
            // columns: ['id', 'isbn13', 'title']
          }
        };

        util.request(options, (res, err) => {
          if (res.data.success) {

            util.showSuccess('录入成功!', config.showSuccessTime, () => {
              wx.navigateBack();
            })
          }
        });
      } else {
        this.data.bookMsg.qty = parseInt(this.data.addBookQty) - 0;
        //this.data.bookMsg.borrowDate =nowTimestamp;
        var options = {
          url: config.clubApi.put,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'//'application/json'
          },
          data: {
            appkey: config.appKey,
            type: 'bookLibrary',
            key: isbn13,
            value: JSON.stringify(this.data.bookMsg)
          }
        };

        util.request(options, (res, err) => {
          if (res.data.success) {

            util.showSuccess('录入成功!', config.showSuccessTime, () => {
              wx.navigateBack();
            })
          }
        });

      }
    });





  }
})