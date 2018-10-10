//app.js
App( {
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync( 'logs' ) || []
    logs.unshift( Date.now() )
    wx.setStorageSync( 'logs', logs )
    var currentTimeIn = Date.now();
    console.log( currentTimeIn )
    var baidu_token = wx.getStorageSync( 'baidu_token' ) || {}
    if( baidu_token ) {
      if( baidu_token.time - Date.now() <= 300000 ) {
        this.sysBaiduOpenApiToken();
      }
    }

    var _this = this;
    setTimeout( function() {
      console.log('start ........')
      wx.setStorageSync( 'baidu_token', baidu_token )
      _this.sysBaiduOpenApiToken();
    }, 5 )

  },

  sysBaiduOpenApiToken: function() {

    var currentTimeIn = Date.now();
    var baidu_token = wx.getStorageSync( 'baidu_token' ) || {}
    if( baidu_token ) {
      if( baidu_token.time - Date.now() <= 300000 ) {
        console.log("request ...")
        this.getBaiduOpenApiToken( function( baidu_token ) {
          console.log( baidu_token );
          baidu_token.time = Date.now() + 7200000
          wx.setStorageSync( 'baidu_token', baidu_token )
        });
      }else{
        console.log("have ...")
      }
    }
  },

  getUserInfo: function( cb ) {
    var that = this
    if( this.globalData.userInfo ) {
      typeof cb == "function" && cb( this.globalData.userInfo )
    } else {
      //调用登录接口
      wx.login( {
        success: function() {
          wx.getUserInfo( {
            success: function( res ) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb( that.globalData.userInfo )
            }
          })
        }
      })
    }
  },
  getBaiduOpenApiToken: function( cb ) {
    console.log( 'getBaiduOpenApiToken' );
    var url = 'https://openapi.baidu.com/oauth/2.0/token';
    wx.request( {
      url: url,
      data: {
        grant_type: 'client_credentials', client_id: 'YgMAXXnP0Lziw0LPVbc6E4zm', client_secret: 'Q1BYOGgl3sMjoXSBAx5bMrIuOHSfoMh9'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        console.log( res )
        typeof cb == "function" && cb( res.data );
      }, fail: function( e ) {
        console.log( e );
      }
    })
  },
  getTulingMsg: function( info, cb ) {
    var url = 'http://www.tuling123.com/openapi/api?key=eeec171e907553c15aa3131562f75903&info=' + info;
    wx.request( {
      url: url,
      data: {

      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        console.log( res.data )
        typeof cb == "function" && cb( res.data )
      }
    })
  },
  globalData: {
    userInfo: null
  }
})