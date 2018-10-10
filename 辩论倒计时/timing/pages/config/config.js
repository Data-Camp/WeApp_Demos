// pages/config/config.js
Page({
  data:{
    configs:{ // 初始化该对象值

    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //读取缓存中的初始配置
    try {
        var configs = wx.getStorageSync('configs');
        this.setData({
          configs:configs
        })
    } catch (e) {
      console.log(e);
    }
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

  // 开关选择器事件
  switchChange:function(event){

    var id = event.currentTarget.id; //标识
    var configs = this.data.configs;
    var config = configs[id]; //获取之前的数据

    //如果对象不存在，创建一个新的对象
    if(!config){
        config = Object.create(null);
    }

    config.state = event.detail.value;
    
    configs[id] = config;

    this.setData({
      configs:configs
    });

    //把设置保存到缓存中中，便于计时页面的使用
    try {
        wx.setStorageSync('configs', configs);
    } catch (e) {
      console.log(e);
    }
  },

  // slider 事件
  sliderChange:function(event){
    var id = event.currentTarget.id; //标识
    var configs = this.data.configs;
    var config = configs[id]; //获取之前的数据
    
    //如果对象不存在，创建一个新的对象
    if(!config){
        config = Object.create(null);
    }

    config.time = event.detail.value;
    
    configs[id] = config;

    this.setData({
      configs:configs
    });
    //把设置保存到缓存中中，便于计时页面的使用
    try {
        wx.setStorageSync('configs', configs);
    } catch (e) {
      console.log(e);
    }
  },

  // 声音提醒 事件
  radioChange:function(event){
    var id = event.currentTarget.id; //标识
    var configs = this.data.configs;
    var config = configs[id]; //获取之前的数据
    
    //如果对象不存在，创建一个新的对象
    if(!config){
        config = Object.create(null);
    }

    config.voice = event.detail.value;
    
    configs[id] = config;

    this.setData({
      configs:configs
    });
    //把设置保存到缓存中中，便于计时页面的使用
    try {
        wx.setStorageSync('configs', configs);
    } catch (e) {
      console.log(e);
    }
  }

})