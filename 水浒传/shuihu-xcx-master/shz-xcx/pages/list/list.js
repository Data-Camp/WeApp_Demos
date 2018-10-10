//index.js
//获取应用实例
var app = getApp()

Page({
  data:{
    hero:[],
  },
  //第一步
  onLoad:function(options){
    console.log('加载成功',options)
  },
  //第二步
  onShow:function(){

    //不需要在这里设置了，有延迟的bug。可以在list.json直接设置 navigationBarTitleText
    // wx.setNavigationBarTitle({
    //   title: '聚义厅'
    // })
  },
  //第三步
  onReady:function(e){
    console.log('渲染完成',e)
    this.setData({
        hero:getApp().globalData.heroes
    })

    
  }
  
  
})
