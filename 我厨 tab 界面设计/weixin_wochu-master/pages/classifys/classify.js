import util from '../../utils/util.js'
import api from '../../api/api.js'

Page({
  data: {
    deviceWidth: 0,
    deviceHeight: 0,
    feed: [], //推荐二级
    firstCategoryList: [], //一级分类
    secondCateGoryList: [], //二级
    leftOtherArray: [], //每个一级分类下面的二级分类
    categoryType: 1, //1是推荐界面  0是其他一级分类界面
    rightBigImageArray: []  //右边大图的数组，及参数
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    util.getSystemInfo({
      success: (res) => {
        that.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
    api.getGetCategoryRecommendList({
      data: {
        parameters: { version: "4.3.0", source: "I" }
      },
      success: (res) => {
        // console.log(res)
        if (res.data.data) {
          // success
          that.setData({
            feed: res.data.data
          });
        }
      }
    });
    api.getCategoryListByMenuId({
      data: {
        parameters: { menu: '0' }
      },
      success: (res) => {
        console.log(res)
        if (res.data.data) {
          // success
          that.updateCategoryListData(res.data.data);
        }
      }
    })

  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '分类',
      success: function (res) {
        // success
      }
    })
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
  updateCategoryListData: function (categoryListArray) {
    var that = this;
    var leftArray = this.data.firstCategoryList;
    var rightArray = this.data.secondCateGoryList;
    var objectRecommend = { name: '推荐' };
    leftArray.push(objectRecommend);
    for (let i = 0; i < categoryListArray.length; i++) {
      var object = categoryListArray[i];
      if (object.menu == '1') {
        leftArray.push(object);
      } else if (object.menu == '2') {
        rightArray.push(object);
      }
    }
    that.setData({
      firstCategoryList: leftArray,
      secondCateGoryList: rightArray,
    })
  },
  tapCategory: function (event) {
    var that = this;
    console.log(event);
    if (event.target.id) {
      that.setData({
        categoryType: event.target.id,
      })
    }

    if (event.target.dataset.id) {
      var firstCategoryList = that.data.firstCategoryList;
      var secondCategoryArray = that.data.secondCateGoryList;
      var mutableTemArray = that.data.leftOtherArray;
      mutableTemArray.splice(0, mutableTemArray.length);
      for (let i = 0; i < secondCategoryArray.length; i++) {
        var item = secondCategoryArray[i];
        if (item.parentId == event.target.dataset.id) {
          mutableTemArray.push(item);
        }
      }
      for (let i = 0; i < firstCategoryList.length; i++) {
        var item = firstCategoryList[i];
        if (event.target.dataset.id == item.id) {
          that.setData({
            rightBigImageArray: item.adImg,
          })
        }
      }
      that.setData({
        leftOtherArray: mutableTemArray,
      })

    }
  }
})