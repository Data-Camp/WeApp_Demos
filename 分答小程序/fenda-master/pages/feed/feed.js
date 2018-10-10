Page({
    data:{
        questions: [{
        id:1,
        qtype: 0,//0为限时免费、1为一元
        content: '小船姐姐，刚毕业的大学生，简历上着重写什么经历呢？在学校也没参加学生会什么的，感觉自己很平凡。',
        authorHead: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1702198402,2278399184&fm=111&gp=0.jpg',
        authorName: '李小船',
        authorBio:'央企集团总部人力资源经理，百单行家',
        createTime: 140000000000,
        listenNum:20
        }, {
        id:2,
        qtype: 1,//0为限时免费、1为一元
        content: '小船姐姐，刚毕业的大学生，简历上着重写什么经历呢？在学校也没参加学生会什么的，感觉自己很平凡。',
        authorHead: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1702198402,2278399184&fm=111&gp=0.jpg',
        authorName: '李小船',
        authorBio:'央企集团总部人力资源经理，百单行家',
        createTime: 140000000000,
        listenNum:20
        }],
       hidden: true,
       // 顶部切换
       currentTab: 0 //0为问题榜 1为悬赏
    },

    /**
     * 点击tab切换
     */
    swichNav: function( e ) {

        var that = this;

        if( this.data.currentTab === e.target.dataset.current ) {
            return false;
        } else {
            that.setData( {
                currentTab: e.target.dataset.current
            })
        }
    }
});