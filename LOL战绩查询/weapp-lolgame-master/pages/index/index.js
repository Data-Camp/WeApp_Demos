//index.js
//获取应用实例
var app = getApp()
var utils = require("../../utils/util.js")
Page({
  data: {
    token:null,
    token_video: null,
    video_latest: null,
    tab:[
      {"idx":0,"hover":'top-hoverd-btn','title':"最新","content":"display"},
      {"idx":1,"hover":'','title':"英雄视频","content":"hidden"},
      {"idx":2,"hover":'','title':"解说","content":"hidden"},
      {"idx":3,"hover":'','title':"查询","content":"hidden"},
    ]
  },
  toTab: function(event){
      var index = parseInt(event.target.dataset.index)
      //console.log(index)
      var tolatest = '',tohero='',toauthor='',tosearch=''
      var tab = this.data.tab
      for(var i = 0; i < tab.length; i++)
      {
        tab[i].hover = ''
        tab[i].content = 'hidden'
        if(index == tab[i].idx)
        {
          tab[i].hover = 'top-hoverd-btn'
          tab[i].content = 'display'
        }
      }
      this.setData({
          tab: tab
      });
  },
  playTap: function(event){
      app.globalData.video_path = event.currentTarget.dataset.path

    },
  refresh: function(){
    var that = this
    this.setData({
      token_video: app.globalData.token_video,
      token: app.globalData.token
    })

    wx.request({
      url: 'http://lolapi.games-cube.com/Area',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        app.globalData.area = res.data.data
      }
    })

    wx.request({
      url: 'http://infoapi.games-cube.com/GetNewstVideos?p=1',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token_video
      },
      success: function(res) {
        var latest = res.data.data
        var date_now = new Date()
        for(var i = 0; i < latest.length; i++)
        {
          var date = latest[i].createdate
          date = date.replace(/T/," ")
          var date_video = utils.stringToDate(date)
          var date_diff = utils.TimeDiff(date_video, date_now)
          if(date_diff.days){
            latest[i].time = date_diff.days+"天以前"
            latest[i].new = false
          }
          else if(date_diff.hours){
            latest[i].time = date_diff.hours+"小时以前"
            latest[i].new = true
          }
          else
          {
            latest[i].time = "1小时以前"
            latest[i].new = true
          }
          var get_url = utils.GetURL(latest[i].content)
          get_url = get_url.substring(0,get_url.length-1)
          latest[i].get_url = get_url
        }
        that.setData({
          latest:  latest
        })
      }
    })
  },
  onLoad: function() {
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
    wx.stopPullDownRefresh()
  }
  
})
