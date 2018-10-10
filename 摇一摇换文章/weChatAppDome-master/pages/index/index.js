var util = require('../../utils/util.js')
Page({
  data: {
    x:util.res[0].title,
    y:util.res[0].summary,
    z:util.res[0].img,
    hidden: false,
    last_update:0,
    last_x:0,
    last_y:0,
    last_z:0
  },
  onReady: function (e) {
    var determination = false
    var that = this
    function a(){
      wx.onAccelerometerChange(function(res) {
        var curTime = new Date().getTime()
        var SHAKE_THRESHOLD = 60
        var last_update = that.data.last_update
        var len = util.res.length
        var list = Math.floor(Math.random()*(len-1))
        if ((curTime - last_update) > 100) {
          var diffTime = curTime - last_update; 
          var speed = Math.abs(res.x + res.y + res.z - that.data.last_x - that.data.last_y - that.data.last_z) / diffTime * 10000;
          if (speed > SHAKE_THRESHOLD && !determination) {
            determination = true
            determination = that.f(util.res[list])
          }
          that.setData({
            last_update: curTime,
            last_x: res.x,
            last_y: res.y,
            last_z: res.z
          })
        }
      })
    }
    a()
 },
 f: function(res){
      if(res.img){
        this.setData({
          x: res.title,
          y: res.summary,
          z: res.img,
          hidden: false,
        })
      }else{
        this.setData({
          x: res.title,
          y: res.summary,
          hidden: true,
        })        
      }
    wx.playBackgroundAudio({
      dataUrl: 'http://fjyd.sc.chinaz.com/files/download/sound1/201410/5012.mp3',
      title: 'weixin'
    })  
    return false
 }
})
