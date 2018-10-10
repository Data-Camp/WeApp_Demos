var utils = require( '../../utils/util.js' );
var requests = require( '../../requests/request.js' );

var weekdayStr = [ '日', ' 一', '二', '三', '四', '五', '六' ];

Page( {
  data: {
    pageData: {}, //列表数据
    themeData: {}, //主题菜单数据
    sliderData: {}, //轮播图数据
    currentDateStr: '',
    currentDate: new Date(),
    refreshAnimation: {}, //加载更多旋转动画数据
    loadingMore: false, //是否正在加载
    avatarUrl: '', //当前开发者头像
    nickName: '', //当前开发者名字

    loading: false,
    loadingMsg: '加载中...',
    pageShow: 'none',

    maskDisplay: 'none',
    slideHeight: 0,
    slideRight: 0,
    slideWidth: 0,
    slideDisplay: 'block',
    screenHeight: 0,
    screenWidth: 0,
    slideAnimation: {},

    ballBottom: 20,
    ballRight: 30,
    ballOpacity: '.8',
    modalMsgHidden: true,
    themeId:0,//当前主题id

    id: null,
    //pageShow: 'display',
    background: '',
    //pageData: [], //列表数据源
    editorData: [], //主编数据
    description: '',
    //loading: false,
    //loadingMsg: '数据加载中...'
  },

  //获取设备信息，屏幕的高度宽度
  onLoad: function() {
    var _this = this;
    wx.getSystemInfo( {
      success: function( res ) {
        _this.setData( {
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          slideHeight: res.windowHeight,
          slideRight: res.windowWidth,
          slideWidth: res.windowWidth * 0.7
        });
      }
    });

    var app = getApp();
    app.getUserInfo(function(data) {
      _this.setData({avatarUrl: data.avatarUrl,nickName :data.nickName});
    });
  },

  //从详细页面返回时会刷新
  onShow: function() {
    if (this.data.themeId==-1){
      var pageData = wx.getStorageSync('pageData') || []
      console.log(pageData);
      this.setData({
        pageData:pageData
      })
    }
  },

  onReady: function() {

    var date = utils.getCurrentData();
    this.setData( { currentDateStr: date.year + '.' + date.month + '.' + date.day + '　' + '星期' + weekdayStr[ date.weekday ] });

    var _this = this;
    _this.setData( { loading: true });
    requests.getNewsLatest(( data ) => {
      data=utils.correctData(data);
      console.log( data );
    //console.log( data.stories );
      _this.setData( {
        sliderData: data.top_stories,
        pageData: data.stories
      });
      _this.setData( { pageShow: 'block' });
    }, null, () => {
      _this.setData( { loading: false });
    });

    //获取主题日报列表
    requests.getTheme(( data ) => {
      _this.setData( { themeData: data.others });
    });
  },

  //列表加载更多
  loadingMoreEvent: function( e ) {
    if( this.data.loadingMore ) return;

    console.log( this.data.currentDate );
    var date = new Date( Date.parse( this.data.currentDate ) - 1000 * 60 * 60 * 24 );
    var _this = this;
    var pageData = [];

    this.setData( { loadingMore: true });
    updateRefreshIcon.call( this );
    var y = date.getFullYear();
    var m = ( date.getMonth() + 1 );
    var d = date.getDate();
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;
    var dateStr = [ y, m, d ].join( '' );
    requests.getBeforeNews( dateStr, ( data ) => {
      data=utils.correctData(data);
      console.log( data );
      pageData = _this.data.pageData;
      pageData.push( { type: '3', title: ( [ y, m, d ].join( '.' ) + '  星期' + weekdayStr[ date.getDay() ] ) });
      pageData = pageData.concat( data.stories );

      _this.setData( { currentDate: date, pageData: pageData });
    }, null, () => {
      _this.setData( { loadingMore: false });
    });
  },

  //浮动球移动事件
  ballMoveEvent: function( e ) {
    var touchs = e.touches[ 0 ];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    if( pageX < 25 ) return;
    if( pageX > this.data.screenWidth - 25 ) return;
    if( this.data.screenHeight - pageY <= 25 ) return;
    if( pageY <= 25 ) return;
    var x = this.data.screenWidth - pageX - 25;
    var y = this.data.screenHeight - pageY - 25;
    this.setData( {
      ballBottom: y,
      ballRight: x
    });
  },

  toDetailPage: function( e ) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo( {
      url: '../detail/detail?id=' + id
    });
  },
  toSettingPage: function() {
    wx.navigateTo( {
      url: '../setting/setting'
    });
  },
  //toCollectPage: function() {
  //  wx.redirectTo( {
  //    url: '../collect/collect'
  //  });
  //},

  toHomePage: function( e ) {
    var _this = this;
    _this.setData( { loading: true,themeId:0 });
    console.log( 'themeId',  _this.data.themeId );
    requests.getNewsLatest(( data ) => {
      data=utils.correctData(data);
    console.log( data );
    _this.setData( {
      sliderData: data.top_stories,
      pageData: data.stories
    });
    slideDown.call( this );
    _this.setData( { pageShow: 'block' });
  }, null, () => {
      _this.setData( { loading: false });
    });
  },

  toThemePage: function( e ) {
    var _this = this;
    _this.setData( { loading: true,themeId:e.currentTarget.dataset.id });
    console.log( 'themeId',  _this.data.themeId );
    requests.getThemeStories( _this.data.themeId, ( data ) => {
      //console.log(data);
    data.background=data.background.replace("pic1.","pic3.");
    data.background=data.background.replace("pic2.","pic3.");
    for(var i=0;i<data.editors.length;i++){
      data.editors[i].avatar=data.editors[i].avatar.replace("pic1.","pic3.");
      data.editors[i].avatar=data.editors[i].avatar.replace("pic2.","pic3.");
    }
    data=utils.correctData(data);
    console.log(data);
    _this.setData( {
      pageData: data.stories,
      background: data.background,
      description: data.description,
      editorData: data.editors
    });
    slideDown.call( this );
    //wx.setNavigationBarTitle( { title: data.name }); //设置标题
  }, null, () => {
      _this.setData( { loading: false });
    });
  },

  toCollectPage: function( ) {
    var _this = this;
    _this.setData( { themeId:-1});
    var pageData = wx.getStorageSync('pageData') || []
    console.log(pageData);
    _this.setData({
      themeId:-1,
      pageData:pageData
    })
    //_this.setData( {
    //  pageData: data.stories,
    //  background: data.background,
    //  description: data.description,
    //  editorData: data.editors
    slideDown.call( this );
    //wx.setNavigationBarTitle( { title: data.name }); //设置标题

  },
  //toThemePage: function( e ) {
  //  var themeId = e.currentTarget.dataset.id;
  //  console.log( 'themeId', themeId );
  //  wx.navigateTo( {
  //    url: '../theme/theme?themeId=' + themeId
  //  });
  //},

  //浮动球点击 侧栏展开
  ballClickEvent: function() {
    slideUp.call( this );
  },

  //遮罩点击  侧栏关闭
  slideCloseEvent: function() {
    slideDown.call( this );
  },

  authorShowEvent: function() {
    this.setData({modalMsgHidden: false});
  },

  modalMsgHiddenEvent: function() {
    this.setData({modalMsgHidden: true});
  },

  onPullDownRefreash: function( e ) {
    console.log( 1 );
  }
});

//侧栏展开
function slideUp() {
  var animation = wx.createAnimation( {
    duration: 600
  });
  this.setData( { maskDisplay: 'block' });
  animation.translateX( '100%' ).step();
  this.setData( {
    slideAnimation: animation.export()
  });
}

//侧栏关闭
function slideDown() {
  var animation = wx.createAnimation( {
    duration: 800
  });
  animation.translateX( '-100%' ).step();
  this.setData( {
    slideAnimation: animation.export()
  });
  this.setData( { maskDisplay: 'none' });
}


/**
 * 旋转上拉加载图标
 */
function updateRefreshIcon() {
  var deg = 360;
  var _this = this;

  var animation = wx.createAnimation( {
    duration: 1000
  });

  var timer = setInterval( function() {
    if( !_this.data.loadingMore )
      clearInterval( timer );
    animation.rotateZ( deg ).step();
    deg += 360;
    _this.setData( {
      refreshAnimation: animation.export()
    })
  }, 1000 );
}