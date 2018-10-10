App( {
  onLaunch: function() {
    var _this = this;
    //获取应用设置
    var settingData = wx.getStorageSync( _this.constant.SETTING );
    if( settingData ) {
      this.globalData.appSetting = settingData;
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
  //更新应用设置
  updateupdateAppSetting: function( data ) {
    var _this = this;
    try {
      wx.setStorageSync( _this.constant.SETTING, data );
    } catch( e ) {
      return false;
    }
    return true;
  },
  //获取缓存
  getCache: function() {
    return wx.getStorageSync( _this.constant.CACHE );
  },
  globalData: {
    userInfo: null,
    //应用设置
    appSetting: {
      theme: 'light', //主题
      noPicMode: false //无图模式
    }
  },
  constant: {
    SETTING: 'ZHIHU_SETTING',
    CACHE: 'ZHIHU_CACHE'
  },
  debug: false //程序调试
})