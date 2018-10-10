var util = require('../../utils/util');

Page({
  data:{
    findList:null
  },
  setFindList: function(){
    let that = this;
    util.fetch('http://api.cyb.kuaiqiangche.com/findcar/find_list?page=1',function(data){
      that.setData({
        findList: data.data
      })
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    that.setFindList();
  }
})