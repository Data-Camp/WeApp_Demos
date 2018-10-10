Page({
    data:{
        list:[
            {
                list_tool:[
                    {
                        img:"/image/friend_r.png",
                        name:"朋友圈",
                        url:"../moments/moments"
                    }
                ]
            },
            {
                list_tool:[
                    {
                        img:"/image/saoyisao.png",
                        name:"扫一扫"
                    },
                    {
                        img:"/image/yaoyiyao.png",
                        name:"摇一摇"
                    }
                ]
            },
            {
                list_tool:[
                    // {
                    //     img:"/image/newFriend.png",
                    //     name:"附近的人"
                    // },
                    {
                        img:"/image/piaoliuping.png",
                        name:"漂流瓶"
                    }
                ]
            },
            {
                list_tool:[
                    {
                        img:"/image/gouwu.png",
                        name:"购物"
                    },
                    {
                        img:"/image/youxi.png",
                        name:"游戏"
                    }
                ]
            },
        ]
    },
    goPage:function(e){
        console.log(e);
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    }
})
