
import api from '../../utils/api'

Page({
  data:{
    detail: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
      wx.showToast({
  title: '拼命查字典中...',
  icon: 'loading',
  duration: 10000
})
    api.get('juhe/xhzd/query', {  
        word: options.word
      }, (data)=>{
        wx.hideToast()
        if(!data.result){
          wx.showModal({
            title: '提示',
            content: '很遗憾，没找到这个字的解释:(',
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
          return
        }
        data.result.pinyins = data.result.py.split(',')
        this.setData({
          detail: data.result
        })
    })
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
  }
})