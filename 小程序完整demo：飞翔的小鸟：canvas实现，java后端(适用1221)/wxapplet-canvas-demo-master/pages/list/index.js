// pages/list/index.js
Page({
  data: {
    listData: []  // 排行榜数据，包括：用户名/头像/分数，没有头像就显示默认头像
  },

  /**
   * 设置当前页面标题
   */
  setTitle: function () {
    // 尼玛，手机上调试的时候设置标题无效
    wx.setNavigationBarTitle({
      title: 'Top20达人榜'
    });
  },

  /**
   * 获取排行榜数据
   */
  getList: function () {
    const that = this;
    wx.request({
      url: 'https://jxy.me/flappy/getList',
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            listData: res.data
          });
        } else {
          that.handleError();
        }
      },
      fail: function () {
        that.handleError();
      }
    });
  },

  /**
   * 处理请求后端接口出错的情况
   */
  handleError: function () {
    this.setData({
      listData: [{ name: '请求失败啦', score: 0 }]
    });
  },

  onShow: function () {
    this.setTitle();
    this.getList();
  }
})
