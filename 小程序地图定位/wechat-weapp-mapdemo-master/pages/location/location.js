//location.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    point:{
      latitude: 23.114155,
      longitude: 113.318977
    },
    markers: []
  },
  onLoad: function() {
    console.log( '地图定位接口getLocation还不能正常获取用户位置！' )
    var that = this;
    wx.getLocation( {
      type: 'wgs84',
      success: function( res ) {
        //我这里测试获取的数据一直是一样的（TIT创意园），官方接口没真正开放，还是没发布的原因
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        var point={
             latitude: latitude,
             longitude: longitude
        }
        var markers = [ {
          latitude: latitude,
          longitude: longitude,
          name: '地图定位',
          desc: '我现在的位置'
        }];
        that.setData( markers );
         that.setData( point );
      }
    })
  }
})
