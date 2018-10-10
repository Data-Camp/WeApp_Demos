//获取应用实例
var app = getApp()
Page({
    data:{
        userInfo:{},
        animationData:{},
        actionSheetHidden: true,
        actionSheetItems:[
            {"name":"产品介绍","linkTo":"../centerPage/introduce"},
            {"name":"音频展示","linkTo":"../centerPage/showVideo"},
            {"name":"用户管理","linkTo":"../centerPage/userManage"},
            {"name":"关于我们","linkTo":"../centerPage/aboutUS"}
            ],
        // markers: [{
        //     latitude: 23.099994,
        //     longitude: 113.324520,
        //     name: 'T.I.T 创意园',
        //     desc: '我现在的位置'
        //     }],
        // covers: [{
        //     latitude: 23.099794,
        //     longitude: 113.324520,
        //     iconPath: '../images/car.png',
        //     rotate: 10
        //     }, {
        //     latitude: 23.099298,
        //     longitude: 113.324129,
        //     iconPath: '../images/car.png',
        //     rotate: 90
        //     }]
    },
    chatWithMe: function(e){
       // console.log('dfdf')
        wx.navigateTo({
          url: '../chatRoom/chatBox'
        })
    },
    actionSheetChange: function(e){
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    bindItemTap: function (e){
         console.log('tap ' + e.currentTarget.dataset.navigator);
         wx.navigateTo({
            url: e.currentTarget.dataset.navigator
        })
    },
    onShow: function () {
        let that = this;
        app.getUserInfo(function(userInfo){
            that.setData({
                userInfo:userInfo
                })
        })
        wx.setNavigationBarTitle({
            title: '主页',
            success:function(){
               // console.log("success")
            },
            fail: function(){
               // console.log("error")
            }
        })
        wx.showNavigationBarLoading();
        var animation = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 3000,
            timingFunction: 'ease',
            delay: 0
        })
        this.animation = animation;
        animation.scale(2,2).rotate(45).step();
        this.setData({
            animationData: animation.export()
        })
        setTimeout(function(){
            animation.translate(30).step();
            this.setData({
                animationData:animation.export()
            })
        }.bind(this),2000)
    }
})