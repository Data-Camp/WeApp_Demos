var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    questions: [{
      id:1,
      qtype: 0,//0为限时免费、1为一元
      content: '小船姐姐，刚毕业的大学生，简历上着重写什么经历呢？在学校也没参加学生会什么的，感觉自己很平凡。',
      authorHead: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1702198402,2278399184&fm=111&gp=0.jpg',
      authorName: '李小船',
      authorBio:'央企集团总部人力资源经理，百单行家',
      createTime: 140000000000
    }, {
      id:2,
      qtype: 1,//0为限时免费、1为一元
      content: '小船姐姐，刚毕业的大学生，简历上着重写什么经历呢？在学校也没参加学生会什么的，感觉自己很平凡。',
      authorHead: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1702198402,2278399184&fm=111&gp=0.jpg',
      authorName: '李小船',
      authorBio:'央企集团总部人力资源经理，百单行家',
      createTime: 140000000000
    }]
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
