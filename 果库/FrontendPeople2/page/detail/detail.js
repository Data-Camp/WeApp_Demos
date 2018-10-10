
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "detail",
  /**
   * 页面的初始数据
   */

  data: {
    
  
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // 注册coolsite360交互模块
    coolsite360.register(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
  tap_e2bd485d:function(e){
    //触发coolsite360交互事件
    coolsite360.fireEvent(e,this);
  },
  
  tap_d6c84484:function(e){
    //触发coolsite360交互事件
    coolsite360.fireEvent(e,this);
  },
  
  tap_3ec69114:function(e){
    //触发coolsite360交互事件
    coolsite360.fireEvent(e,this);
  },
  
  tap_3013baf2:function(e){
    //触发coolsite360交互事件
    coolsite360.fireEvent(e,this);
  },
  
  tap_d5808da3:function(e){
    //触发coolsite360交互事件
    coolsite360.fireEvent(e,this);
  },
  
  tap_22930b74:function(e){
    //触发coolsite360交互事件
    coolsite360.fireEvent(e,this);
  },
  
})

