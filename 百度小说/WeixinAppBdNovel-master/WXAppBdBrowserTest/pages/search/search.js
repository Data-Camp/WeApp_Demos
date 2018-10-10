//search.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    history:"",
    show_letter:"none",
    show_list:"block",
    items:[{"title":"超级兵王","author":"白与黑","status":"完结","type":"都市"},
    {"title":"逆鳞","author":"柳下惠","status":"连载","type":"都市"},
    {"title":"极品小老板","author":"一粟红尘","status":"完结","type":"古代言情"}],
    novels:[{"title":"aa","author":"白与黑","status":"完结","type":"都市"},
    {"title":"bb","author":"柳下惠","status":"连载","type":"都市"},
    {"title":"cc","author":"一粟红尘","status":"完结","type":"古代言情"},
    {"title":"dd","author":"白与黑","status":"完结","type":"都市"},
    {"title":"ee","author":"柳下惠","status":"连载","type":"都市"},
    {"title":"ff","author":"一粟红尘","status":"完结","type":"古代言情"}],
    
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function () {
    var context = wx.createContext();
    context.setStrokeStyle("#00ff00")
      context.moveTo(0,0);
      context.lineTo(40000,11);
      context.stroke();
  

    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'first-canvas',
      actions: context.getActions() //获取绘图动作数组
    })


    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  bindInputChange:function(e){
    // var self = this;
    // var text = e.detail.value.toUpperCase();

    // if(text==""){
      
    //     this.setData({
    //   show_letter:"block",
    // });
      
    // }else{
    //   this.setData({
    //   show_letter:"none",
    // });
    // }
    
    // for(var i=0;i<this.novels.length;i++){
    //   if(novels[i].title!=null&& novels[i].indexOf(text)!=-1){
    //     novels[i]["display"]="block";
    //   }else{
    //     novels[i]["display"]="none";
    //   }
    // }


    this.setData({
      history:"    " + e.detail.value
    })
  }
  
})
