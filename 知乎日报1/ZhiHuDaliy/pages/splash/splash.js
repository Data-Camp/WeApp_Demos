var requests = require( '../../requests/request.js' );

Page( {
  data: {
    splash: {},
    screenHeight: 0,
    screenWidth: 0
  },
  onLoad: function( options ) {
    var _this = this;
    wx.getSystemInfo( {
      success: function( res ) {
        _this.setData( {
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
        });
      }
    });
  },
  onReady: function() {
    var _this = this;
    var size = this.data.screenWidth + '*' + this.data.screenHeight;
    requests.getSplashCover( size, ( data ) => {
      data.img=data.img.replace("pic1","pic4");
      data.img=data.img.replace("pic2","pic4");
      _this.setData( { splash: data });
    }, null, () => {
      toIndexPage.call(_this);
    });
  },
  onShow: function() {
  },
  onHide: function() {
  },
  onUnload: function() {
  }
});

/**
 * 跳转到首页
 */
function toIndexPage() {
  setTimeout( function() {
    wx.redirectTo( {
      url: '../index/index'
    });
  }, 2000 );
}