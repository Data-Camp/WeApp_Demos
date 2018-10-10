var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page( {
  data: {
    motto: 'Hello World',
    message: '小白',
    token: '',
    tmpleData:[{
         id:'',
         msg:'',
         dateTime:''
    }],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo( {
      url: '../chat/chat.wxml'
    })
  },
  onLoad: function() {
    console.log( 'onLoad' )
    var that = this

  },
  sendBt: function() {
    console.log( this.data.inputValue );
    var _this = this;
    //播放声音
    var _tmpleData =  _this.data.tmpleData;
     console.log(_tmpleData);
     _tmpleData.push({
          id:'1',
          msg:this.data.inputValue,
          dateTime:util.formatTime(new Date)
        });
    _this.setData( {
        tmpleData:_tmpleData
      })
    app.getTulingMsg( this.data.inputValue, function( res ) {
        _tmpleData.push({
          id:'2',
          msg:res.text,
          dateTime:util.formatTime(new Date)
        });
      _this.setData( {
        tmpleData:_tmpleData
      })
      var baidu_token = wx.getStorageSync( 'baidu_token');
      console.log(baidu_token);
     //播放声音
      wx.playBackgroundAudio( {
        dataUrl: 'http://tsn.baidu.com/text2audio?tex=' + res.text + '&lan=zh&cuid=111111&ctp=1&tok='+baidu_token.access_token,
        title: '',
        coverImgUrl: ''
      })
      //结束播放声音
    });
  },

  bindKeyInput: function( e ) {
    this.setData( {
      inputValue: e.detail.value
    })
  }
})