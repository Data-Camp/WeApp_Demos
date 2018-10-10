
import api from '../../utils/api'

var app = getApp()
Page({
  data: {
    motto: '上传图片或拍照',
    image: '',
    width: 0,
    height: 0,
    tips: '哪里不会拍哪里，so easy!',
    words: []
  },
  go(e) {
    wx.navigateTo({
      url: '../word/word?word='+e.target.dataset.word
      
    })
  },
  //事件处理函数
  uploadImage() {
     
    wx.chooseImage({
  success: (res) => {
    var tempFilePaths = res.tempFilePaths
    wx.showToast({
      title: '拼命扫描中...',
      icon: 'loading',
      duration: 10000
    })
    
    api.upload('qiniu/upload', {file: tempFilePaths[0]}, (data) => {
        this.setData({
          image: 'https://'+data.url+'-max750'
        })
       
         api.post('faceplusplus/recognizetext',{
            url: 'https://'+data.url+'-max750'
        }, (data)=>{
        wx.hideToast()
        if(!data.result || !data.result.length){
          console.log(data)
          return
        }
        let words = []
        data.result.map((e)=>{
          //[0]['child-objects']
          e['child-objects'].map((f)=>{
          if(words.indexOf(f.value) == -1)
            words.push(f.value)
          })
        })
        this.setData({
          words: words
        })
      })


    })
    
  
    
    
  }
  })

  },
  onLoad() {
    console.log('onLoad')
    wx.getSystemInfo({
  success: (res) => {
    this.setData({
      width: res.windowWidth,
      height: res.windowHeight
    })
   
  }
})
  }
})
