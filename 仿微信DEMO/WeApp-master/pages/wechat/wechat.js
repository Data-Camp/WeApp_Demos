var app = getApp()
var util = require('../../utils/util')
// console.log(JSON)
app.getUserInfo();
Page({
    data:{
      list:null,
      modalHidden:true,
      hidden:true,
      toast1Hidden:true
    },
    onReady:function(){
        util.getUser(this);
    },
    modalTap: function(e) {
        this.setData({
            modalHidden: false
        })
    },
    modalChange:function(e){
        this.setData({
            modalHidden: true
        })
    },
    goPage:function(e){
        console.log(e)
        var _self = this;
        var newlist = _self.data.list
        var index = e.currentTarget.dataset.index
        newlist[index].count=0;
        _self.setData({
            list: newlist
        })
        // console.log(e.currentTarget.dataset.index)
        // console.log(e.target.dataset.name)
        wx.navigateTo({
            url: '../message/message?name='+e.currentTarget.dataset.name+"&id="+e.currentTarget.dataset.id
        })
        // console.log(test);
    },
    toast1Change:function(){
        this.setData({
            toast1Hidden: true
        })
    },
    onPullDownRefresh:function(){
        
        util.getUser(this);
        
    }
})
