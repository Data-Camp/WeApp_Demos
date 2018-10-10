Page({
    data:{
        checked:false,
       
    },
     //常用旅客卡选择 
    bindswitchchange:function(e){ 
     this.setData({
            checked:e.detail.value
        })
    }
})


