const app=getApp();
const request=require("../../utils/requests");
Page({
  data:{
    id:"",
    bookList:null,
    count:4,
    view_show:false
  },

  toSearch:function(){
    var that=this;
   
  },

 
  
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    if(options.tag){
      that.setData({bookTag:options.tag})
    }

    request.getBooklist("",function(res){
      if(res.data.count==0){return;}
      that.setData({bookList:res.data.data,count:res.data.count});
    })
  },
   

  
})