var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    img:"",
    img2:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  selectImg(){
    var _self = this
    wx.chooseImage({
        success: function(res) {
            var tempFilePaths = res.tempFilePaths;
            _self.setData({
                img:tempFilePaths
            })
            console.log("file"+":"+tempFilePaths[0])
            wx.uploadFile({
              url: app.globalData.ip+'/upload.php',
              filePath: tempFilePaths[0],
              name: 'test',
              success(data){
                console.log(data);
              }
            })
        }
    })
  },
  download(){
    var _self = this;
    wx.downloadFile({
      url: app.globalData.ip+'/download',
      type: 'image',
      success: function(res) {
        console.log(res)
        // wx.playVoice({
        //   filePath: res.tempFilePath
        // })
        _self.setData({
            img2:res.tempFilePath
        })
      },
      fail(err){
	      console.log(err)
      }
    })
  }
})