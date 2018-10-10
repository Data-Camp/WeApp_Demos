Page({
  data:{
    src:"http://sc1.111ttt.com/2015/3/12/04/105041536183.mp3",
    name:"演员",
    author:"薛之谦",
    poster:"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3090655511,358562022&fm=58",
    audioAction: {
      method: 'play'
    }
  },
  audioPlay:function(){
    this.setData({
        action: {
            method: 'play'
        }
    })
  },
  audioPause:function(){
     this.setData({
        action: {
            method: 'pause'
        }
    })
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
  }
})