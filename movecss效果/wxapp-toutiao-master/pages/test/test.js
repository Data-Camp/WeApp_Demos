//logs.js
var app = getApp();

var num=0;
Page({
  data: {
    /*list: [{
     
      "scm": "帅气型男团，携手抓罪犯",
      "nm": "反贪风暴2",
      "showDate": "",
      "preSale": 0,
      "vd": "",
      "dir": "林德禄",
      "star": "古天乐,张智霖,周渝民",
      "cat": "犯罪,动作",
      "wish": 107395,
      "3d": false,
      "img": "http://p1.meituan.net/165.220/movie/9e3533ca6d216db222f5c668f34549fd281300.jpg",
      "dur": 95,
      "sc": 8.2
    }, {
      id: 2,
      title: '段子来了丨 父母在，不远游，宅在家里玩网游60919（采采）',
      time: '2016年9月26日 11:59:11'
    }, {
      id: 3,
      title: '段子来了丨人说月有阴晴圆缺，月亮说我好好的从来不缺60916(采采)',
      time: '2016年9月26日 11:59:11'
    }, {
      id: 4,
      title: '段子来了丨别低头，老师会叫；别流泪，同学会拍照60908（采采）PARKER',
      time: '2016年9月26日 11:59:11'
    }],*/
    actionSheetItems:['item1','item2','item3'],
    currentVal: '',
    toast1Hidden: true,
    toView: "K",
    hidden:false,
    hasMore:true,
    hasRefesh:false
  },
  toast1Change: function(e) {
    this.setData({
      toast1Hidden: true
    })
  },
  toast1Tap: function() {
    this.setData({
      toast1Hidden: false
    })
  },
  clickHandler: function(e) {
    //console.log(e);

    this.setData({
      toast1Hidden: false,
      currentVal: e.currentTarget.dataset.id
    }); 
  },
  upper: function(e) {  //顶部
    console.log(e)
  },
  lower: function(e) { //底部
   
    var that = this;
   
    that.setData({
      hasRefesh:true
    });
     console.log(num);
    if (num >=1) {
       that.setData({
        hasMore:false
      });
    };
    if (!that.data.hasMore) return;
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        var data = res.data.data;
        console.log(data.data);
        that.setData({
           list: that.data.list.concat( data.movies )
        });
        num++;
      }
    });
  },
 /* scroll: function(e) {
    console.log(e)
  },*/
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  onLoad: function() {
    console.log('onLoad');

    var that = this;
      //调用应用实例的方法获取全局数据
    /*app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })*/

    var _this=this;
    wx.request({
      url: 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        var data = res.data.data;
        console.log(data.data);
        _this.setData({
           list:data.movies
        });
      }
    });
  }
});




 