//获取应用实例
var app = getApp()
var date = require('../../../utils/util.js')
Page({
  data:{
    select: ["select", "",""],
    //display: "detail-display"
    display: ["detail-hidden","detail-hidden","detail-hidden","detail-hidden","detail-hidden",
              "detail-hidden","detail-hidden","detail-hidden","detail-hidden","detail-hidden"]
  },
  
  onReady: function() {
    wx.setNavigationBarTitle({
      title: "战绩详情"
    })
  },
  
  detailTap: function(event) {
    
    var idx = event.currentTarget.dataset.index
    var display = this.data.display
    console.log("detailTap"+idx)
    if(display[idx] == "detail-display")
    {
      display[idx] = "detail-hidden"
      this.setData({
        display:display
      })
    }
    else if(display[idx] == "detail-hidden")
    {
      display[idx] = "detail-display"
      this.setData({
        display:display
      })
    }
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      qquin: options.qquin,
      area_id: options.area_id,
      token: app.globalData.token,
      game_id: options.game_id,
      area: app.globalData.area,
      game_type: app.globalData.game_type,
      battle_flag: app.globalData.battle_flag
    })
    
    wx.request({

      url: 'http://lolapi.games-cube.com/GameDetail?qquin='+this.data.qquin+'&vaid='+this.data.area_id+'&gameid='+this.data.game_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        /* 计算游戏时间 */
        var date1 = new Date(res.data.data[0].battle.start_time.replace(/-/g,"/"));
        var date2 = new Date(res.data.data[0].battle.stop_time.replace(/-/g,"/"));
        var time_diff = date.TimeDiff(date1, date2)

        function sprintf(){
          var as=[].slice.call(arguments),fmt=as.shift(),i=0;
          return     fmt.replace(/%(\w)?(\d)?([dfsx])/ig,function(_,a,b,c){
                  var s=b?new Array(b-0+1).join(a||''):'';
                  if(c=='d') s+=parseInt(as[i++]);
                  return b?s.slice(b*-1):s;
             })
        }
        var time = ''
        if(time_diff.days)
          console.log("something wrong, this game time is too long")
        if(time_diff.hours)
          time += time_diff.hours+":"
        time += sprintf("%02d",time_diff.minutes)+":"+sprintf("%02d",time_diff.seconds)
        console.log(time)
        /* 计算KDA总数据 */
        var win_cnt = 0,lost_cnt = 0
        var detail = res.data.data[0].battle
        var win = [0,0,0,0], lost = [0,0,0,0]
        for(var i = 0; i < detail.gamer_records.length; i++)
        {
          detail.gamer_records[i].game_score /= 100 
          /* 胜利方 */
          if(detail.gamer_records[i].win == 1)
          {
            win[0] += detail.gamer_records[i].champions_killed
            win[1] += detail.gamer_records[i].num_deaths
            win[2] += detail.gamer_records[i].assists
            win[3] += detail.gamer_records[i].gold_earned
            win_cnt ++
          }          /* 失败方 */
          else if(detail.gamer_records[i].win == 2)
          {
            lost[0] += detail.gamer_records[i].champions_killed
            lost[1] += detail.gamer_records[i].num_deaths
            lost[2] += detail.gamer_records[i].assists
            lost[3] += detail.gamer_records[i].gold_earned
            lost_cnt ++
          }
        }

        that.setData({
          game_detail: res.data.data[0].battle,

          start_time: res.data.data[0].battle.start_time.split(' ')[1],
          game_time: time,
          win: win,
          lost: lost,
          win_cnt: win_cnt,
          lost_cnt: lost_cnt
          //game_time: date.stringToDate(res.data.data[0].battle.start_time)
        })

      }
    })
  }
  
})
