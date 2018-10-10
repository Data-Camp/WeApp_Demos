var App = getApp();
Page({
    data:{},
    onShow:function (){
        // wx.navigateTo({
        //  url: '../centerPage/centerPage'
        // })
    },
    onLoad:function(){
        wx.setNavigationBarTitle({
            title: '产品介绍'
        }) 
    }
    
})