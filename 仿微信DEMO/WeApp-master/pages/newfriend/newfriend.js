Page({
  data:{
    // text:"这是一个页面"
    inputValue: "",
    list:[
        {
            img:"/image/adam.jpg",
            name:"王浩",
            message:"你好",
            type:true,
            id:"1"
        },
        {
            img:"/image/ben.png",
            name:"成凤杰",
            message:"我是成凤杰",
            type:true,
            id:"2"
        },
        {
            img:"/image/max.png",
            name:"梁雨",
            message:"加个好友",
            type:true,
            id:"3"
        },
        {
            img:"/image/mike.png",
            name:"廖芳樱",
            message:"+++++",
            type:true,
            id:"4"
        },
        {
            img:"/image/perry.png",
            name:"邓福滨",
            message:"...",
            type:true,
            id:"5"
        }
    ],
    textList:[
      {
        text:"实时搜索文本"
      },
      {
        text:"不像angular有过滤器"
      },
      {
        text:"只能从服务端过滤"
      }
    ],
    type:true,
    focusing:false
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
  goPage:function(e){
        // console.log(e.currentTarget.dataset.index)
        // console.log(e.target.dataset.name)
        wx.navigateTo({
            url: '../message/message?name='+e.currentTarget.dataset.name+"&id="+e.currentTarget.dataset.id
        })
        // console.log(test);
  },
  inputFun:function(e){
      var _self = this;
      this.setData({
        inputValue:e.detail.value
      })
      if(e.detail.cursor){
        _self.setData({
            type:false
        })
      }else{
          _self.setData({
            type:true
        })
      }
  },
  inputFocus(){
    var _self = this;
    _self.setData({
            focusing:true
    })
  },
  inputBlur(e){
    var _self = this;
    if(e.detail.cursor==0){
      _self.inputclear()
    }
  },
  inputclear:function(e){
      var _self = this;
      _self.setData({
          focusing:false,
          inputValue: '',
          type:true,
      })
      console.log("input的值为"+_self.data.inputValue)
  }
})