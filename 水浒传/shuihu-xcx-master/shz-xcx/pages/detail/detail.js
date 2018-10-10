//index.js
//获取应用实例
var app = getApp();


Page({
    data:{
        id:0,
        zanCounts:0,
        loading:false,
        details:[],
        toast1Hidden:true,
    },
    onLoad:function(options){
        

        this.setData({
            id:options.id
        })
        console.log('options---',options)
        console.log('详情',this.data.details)
        
    },
    //第三步
    onReady:function(options){
        
        this.setData({
            details:getApp().globalData.heroes
        })
        console.log('渲染完成',options)
    },
     setLoading: function(e) {
        this.setData({
        loading: !this.data.loading
        })
    },
    tapMe:function(){
       
        var id = this.data.id;
        var heroZanStorage = wx.getStorage({key:"heroZan"}) || []
        var counts = 0;
        console.log(heroZanStorage)
        if(heroZanStorage.length){
           counts =  heroZanStorage[id].count ? heroZanStorage[id].count+1 : 0
        }

        this.setData({
            toast1Hidden:false,
            zanCounts:counts
        })
        wx.setStorage({
            key:"heroZan",
            data:[{
                id:id,
                count:counts
            }]
        });

    },
    bindToast:function(){
        this.setData({
            toast1Hidden:true,
        })
    },
    tapHeroSrc:function(e){

        wx.openLocation({
        longitude: 39.915,
        latitude: 116.404,
        name: 'demo',
        address: 'beojing'
        })
    }
})