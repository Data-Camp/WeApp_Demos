var util = require('../../utils/util.js')
var items = ['播放列表', '歌曲', '专辑', '演唱者']
var _songsList=[{
      dataUrl:'http://stream.qqmusic.tc.qq.com/137192078.mp3',
      name: '告白气球',
      mid: "003OUlho2HcRHC",
      singer:'周杰伦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg'
    },{
      dataUrl:'http://stream.qqmusic.tc.qq.com/138549169.mp3',
      name: '你还要我怎样',
      mid: "000E62Tc3bMiJB",
      singer:'薛之谦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000000aWdOx24i3dG.jpg'
    },{
      dataUrl:'http://stream.qqmusic.tc.qq.com/137903929.mp3',
      name: '微微一笑很倾城',
      mid: "002NbtFA3fuJhD",
      singer:'杨洋',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RxTdZ0sJLwo.jpg'
    },{
      dataUrl:'http://stream.qqmusic.tc.qq.com/132636799.mp3',
      name: '演员',
      mid: "001Qu4I30eVFYb",
      singer:'薛之谦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003y8dsH2wBHlo.jpg'
    }]
var _albumList = [{
      name:'寂寞不痛',
      singer:'A-Lin',
      image:'http://y.gtimg.cn/music/photo_new/T002R300x300M000000Nlo922ahOEE.jpg?max_age=2592000'
    },{
      name:'喜剧之王',
      singer:'李荣浩',
      image:'http://y.gtimg.cn/music/photo_new/T002R300x300M000001FOctH2oGoAx.jpg?max_age=2592000'
    },{
      name:'I Know You Were Trouble.-Single',
      singer:'Taylor Swift',
      image:'http://y.gtimg.cn/music/photo_new/T002R300x300M000000XafSm26FA1L.jpg?max_age=2592000'
    },{
      name:'哎呦，不错哦',
      singer:'周杰伦',
      image:'http://y.gtimg.cn/music/photo_new/T002R300x300M000001uqejs3d6EID.jpg?max_age=2592000'
    }]

var pageObject = {
  data: {
    playing:false,
    playingSongsNum:0,
    musicGroupName:items[0],
    listTemplateName:'music-play-list',
    actionSheetHidden: true,
    actionSheetItems: items,
    playBar:{
      dataUrl:'http://stream.qqmusic.tc.qq.com/137192078.mp3',
      name: '告白气球',
      singer:'周杰伦',
      coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R90x90M000003RMaRI1iFoYd.jpg'
    },
    songsList:_songsList,
    albumList :_albumList
  },
  playButtonTap:function(){
    var that = this

  },
  actionSheetTap: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad: function () {
    var that = this
    wx.onBackgroundAudioStop(function () {
      that.setData({
        playing: false
      })
    })
  },
  play: function (event) {
    var that = this
    var res=that.data.songsList[event.currentTarget.dataset.num]
    getApp().globalData.playing = res
    that.setData({
          playBar:res,
          playingSongsNum:event.currentTarget.dataset.num
    })
    wx.playBackgroundAudio({
      dataUrl: res.dataUrl,
      name: res.name,
      singer:res.singer,
      coverImgUrl: res.coverImgUrl,
      complete: function (res) {
        that.setData({
          playing: true
        })
      }
    })
  },
  pause: function () {
    var that = this
    wx.pauseBackgroundAudio({
      success: function () {
        that.setData({
          playing: false
        })
      }
    })
  },
  onUnload: function () {
    clearInterval(this.updateInterval)
  },
  onShow:function(){
    var that = this
    
      wx.request({
        url: 'http://120.27.93.97/weappserver/get_music.php',
        data: {
          mid: getApp().globalData.playing.mid
        },
        header: {
            'Content-Type': 'text/html;charset=utf-8'
        },
        success: function(res) {
          console.log(res.data)
          var obj=that.data.playBar
          obj['coverImgUrl']='http:'+res.data
          that.setData({
            playBar:obj
          })
        }
      })
      that.setData({
        playing: true,
        playBar: getApp().globalData.playing
      })
  }
}

 for (var i = 0; i < items.length; ++i) {
   (function(itemName) {
     switch(itemName){
       case '播放列表':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'music-play-list',
            templateData:null,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;

       case '歌曲':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'songs-list',
            templateData:_songsList,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;

       case '专辑':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'album-list',
            templateData:_albumList,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;

       case '演唱者':
          pageObject['bind' + itemName] = function(e) {
          console.log('click' + itemName, e)
          this.setData({
            musicGroupName:itemName,
            listTemplateName:'singer-list',
            templateData:null,
            actionSheetHidden: !this.data.actionSheetHidden
          })
        }
       break;
     }

   })(items[i])
 }



Page(pageObject)