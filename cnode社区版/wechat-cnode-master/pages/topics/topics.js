var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

var navList = [
  {id:"all", title: "全部"},
  {id:"good", title: "精华"},
  {id:"share", title: "分享"},
  {id:"ask", title: "问答"},
  {id:"job", title: "招聘"}
];

Page({
  data: {
    activeIndex: 0,
    navList: navList,
    title: '话题列表',
    postsList: [],
    hidden: false,
    page: 1,
    limit: 20,
    tab: 'all'
  },

  onLoad: function () {
    this.getData();
  },

  onPullDownRefresh: function () {
    this.getData();
    console.log('下拉刷新', new Date());
  },

  
  onReachBottom: function () {
    this.lower();
    console.log('上拉刷新', new Date());
  },

  // 点击获取对应分类的数据
  onTapTag: function(e) {
    var that = this;
    var tab = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    that.setData({
      activeIndex: index,
      tab: tab,
      page: 1
    });
    if (tab !== 'all') {
      that.getData({tab: tab});
    } else {
      that.getData();
    }
  },

  //获取文章列表数据
  getData: function() {
    var that = this;
    var tab = that.data.tab;
    var page = that.data.page;
    var limit = that.data.limit;
    var ApiUrl = Api.topics +'?tab='+ tab +'&page='+ page +'&limit='+ limit;

    that.setData({ hidden: false });

    if(page == 1) {
      that.setData({ postsList: [] });
    }

    Api.fetchGet(ApiUrl, (err, res) => {
      //更新数据
      that.setData({
        postsList: that.data.postsList.concat(res.data.map(function (item) {
          item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
          return item;
        }))
      });

      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
  },

  // 滑动底部加载
  lower: function() {
    console.log('滑动底部加载', new Date());
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    if (that.data.tab !== 'all') {
      this.getData({tab: that.data.tab, page: that.data.page});
    } else {
      this.getData({page: that.data.page});
    }
  }


})
