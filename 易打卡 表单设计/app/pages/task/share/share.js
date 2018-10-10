Page({
  data: {
    command: ''
  },
  bindClose: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  
  onLoad: function (options) {
    this.setData({
      command: options.taskID
    })
  }
  
});