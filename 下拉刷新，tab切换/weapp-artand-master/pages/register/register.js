var api = require('../../utils/api.js')
Page({
  data: {
    array: ['中国', '新加坡', '日本', '香港', '韩国', '台湾', '澳门'],
    arrayNum: ['86', '65', '81', '852', '82', '886', '853'],
    index: 0,
    mobile: 0
  },

  onLoad () {
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },

  bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindMobileInput (e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },

  bindGetVerification () {
    let that = this
    api.post(api.GET_VERIFICATION, {
      area: parseInt(this.data.arrayNum[this.data.index]),
      mobile: parseInt(this.data.mobile),
      type: 'sign'
    }).then(res => {
      console.log(res)
      // 后台验证了来源，故无法获取正确返回
    })
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
  }
})
