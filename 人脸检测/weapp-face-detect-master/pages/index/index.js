//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '上传靓照',
    userInfo: {}
  },
  //事件处理函数
  uploadImage: function() {
    var that = this
    wx.chooseImage({
  success: function(res) {
    var tempFilePaths = res.tempFilePaths
    wx.showToast({
  title: '鉴定中，请稍候',
  icon: 'loading',
  duration: 2000
})
    wx.uploadFile({
      url: 'https://api.getweapp.com/vendor/face/detect', //仅为示例，非真实的接口地址
      header: {
      'content-type': 'application/json'
  },
      filePath: tempFilePaths[0],
      name: 'file',
      success: function(res){
        console.log(res.data)
        wx.hideToast()
        var data = JSON.parse(res.data)
        if(!data.attributes){
          that.setData({
            userInfo:{
            avatarUrl:data.url,
            tips:'未检测到人脸'
            }
          })
          return
        }
        const genders = {
          'Male':'帅哥',
          'Female':'美女'
        }
        that.setData({
          userInfo:{
            avatarUrl:data.url,
            tips:'一位'+data.attributes.age.value+'岁的'+genders[data.attributes.gender.value]
          }
        })
        //do something
      }
    })
  }
})
  },
  onLoad: function () {
    console.log('onLoad')
  }
})
