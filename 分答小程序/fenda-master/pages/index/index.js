//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
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
    }],
    // 顶部切换
    currentTab: 0,//0为问题榜 1为悬赏
    hidden: true,
    rewardeds:[{
        id:1,
        status: 1,//0代表正在进行，1代表已经成功
        content:'你满意你目前的生活吗？十年来，你觉得在你身边，发生最大的变化是什么？如果给你寿命多加十年，你会怎么度过这十年？',
        price: 100,
        authorHead: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1702198402,2278399184&fm=111&gp=0.jpg',
        authorName: '李小船',
        authorBio:'央企集团总部人力资源经理，百单行家',
        endTime: 140000000000,
        createTime: 140000000000,
        answersNum: 100,
        answers:[{
            
        }]

    }],

    rewardings:[{
        id:2,
        status: 0,//0代表正在进行，1代表已经成功
        content:'为了宣传陌陌直播的社交特点，我们计划拍摄新一季的广告大片。请围绕“陌生人”、“摄像头”、“动物园”三个关键信息（含义表达到即可）创作陌陌直播广告创意，以短文或段子呈现，文体不限，时空不限。一经选取，你不仅可以拿走赏金，作品还有机会成为广告大片素材，在陌陌里程碑上留上你的大名。',
        price: 100,
        authorHead: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1702198402,2278399184&fm=111&gp=0.jpg',
        authorName: '李小船',
        authorBio:'央企集团总部人力资源经理，百单行家',
        endTime: 140000000000,
        createTime: 140000000000,
        answersNum: 100,
        answers:[{
            
        }]

    }],

    rewardsCurrentTab: 0//0为已解决 1为最新
  },

  onLoad: function(){
      //nowRewards = rewardeds

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
     * 滑动切换tab
     */
    bindChange: function( e ) {

        var that = this;
        that.setData( { currentTab: e.detail.current });
        that.setData( { rewardsCurrentTab: e.detail.rewardCurrent });
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
    },
    /**
     *  点击悬赏的切换按钮
     */
    swichRewardNav: function( e ) {
        
        var that = this;
        console.log(e.target.dataset.rewardcurrent);
        if( this.data.rewardsCurrentTab === e.target.dataset.rewardcurrent ) {
            return false;
        } else {
            that.setData( {
                rewardsCurrentTab: e.target.dataset.rewardcurrent
            })
        }
    }


})
