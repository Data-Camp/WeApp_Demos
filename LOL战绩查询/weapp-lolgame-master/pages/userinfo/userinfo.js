//获取应用实例
var app = getApp()
Page({
  data:{
    select: ["select", "",""],
    display:["display","hidden","hidden"],
    point: [
      {
        "label": "击杀",
        "value": 60
      },
      {
        "label": "生存",
        "value": 60
      },
      {
        "label": "助攻",
        "value": 60
      },
      {
        "label": "胜率",
        "value": 60
      },
      {
        "label": "魔法",
        "value": 60
      },
      {
        "label": "防御",
        "value": 60
      },
      {
        "label": "金钱",
        "value": 60
      }
    ]

  },
  selectNav: function(event){
    var index = parseInt(event.target.dataset.index);
    var sel = ["","",""]
    var dis = ["hidden","hidden","hidden"]
    sel[index] = "select"
    dis[index] = "display"
    this.setData({
      select:sel,
      display:dis
    })
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg);
  },
  /* value:半径 idex:点  total:总共有几个点 */
  valueToPoint: function(value, index, total) {
    var x     = 0
    var y     = -value * 0.8
    var angle = Math.PI * 2 / total * index
    var cos   = Math.cos(angle)
    var sin   = Math.sin(angle)
    var tx    = x * cos - y * sin + 125
    var ty    = x * sin + y * cos + 125
    return {
      x: tx,
      y: ty
    }
  },
  canvasDraw: function(){
    //使用wx.createContext获取绘图上下文context
    var context = wx.createContext()
    
    /* 绘制外围圈 */
    //context.arc(100,100,100,0,Math.PI*2,true);
    var point = this.data.point
    var r_color = ["#ffffff","#d0f0ef", "#99dee3", "#54bfc5", "#238890"]
    var pos = []

    var radius = 125
    /* 该七星图总共分五圈，最外围一圈用来显示标签（击杀、死亡...）
     * 首先根据半径通过valueToPoint()计算得到七个点的坐标，然后绘制七角星
     * 同时绘制到中心的线，根据r_color指定填充颜色*/
    for(var r = 0; r < 5; r ++)
    {
      context.beginPath();
      
      /* 获取七星图七个点坐标 */
      for(var i = 0; i < point.length; i++)
      {
        pos[i] = this.valueToPoint(radius, i, point.length)
      }
      radius -= 25
      /* 外围一圈绘制标签 */
      if(r == 0)
      {
        context.setFontSize(12)
        for(var h = 0; h < point.length; h++)
        {
          /* 坐标偏移，否则看起来有偏差 */
          pos[h].x -= 12
          pos[h].y += 5
          /* 写标签 */
          context.fillText(point[h].label, pos[h].x, pos[h].y)
        }
        context.stroke()
        context.closePath()
        continue
      }
      /* 绘制七角星 */
      context.moveTo(pos[0].x,pos[0].y)
      for(var i = 1; i < point.length; i++)
          context.lineTo(pos[i].x,pos[i].y)
      context.lineTo(pos[0].x,pos[0].y)
      context.setFillStyle(r_color[r])
      if(r == 0)
        context.setStrokeStyle(r_color[1])
      else
        context.setStrokeStyle(r_color[r])
      context.fill()

      context.stroke()
      context.closePath()
      /* 绘制到中心的线*/
      context.beginPath()
      context.setLineWidth(1)
      for(var k = 0; k < point.length; k++)
      {
        context.moveTo(pos[k].x,pos[k].y)
        context.lineTo(125,125)
      }
      context.setStrokeStyle(r_color[1])
      context.stroke()
      context.closePath()
    }
    /* 绘制个人能力 */
    context.beginPath();
    for(var i = 0; i < point.length; i++)
    {
      pos[i] = this.valueToPoint(point[i].value, i, point.length)
    }
    /* 绘制七角星 */
    context.setLineWidth(2)
    context.setStrokeStyle("#ff0000")
    context.moveTo(pos[0].x,pos[0].y)
    for(var i = 1; i < point.length; i++)
        context.lineTo(pos[i].x,pos[i].y)
    context.lineTo(pos[0].x,pos[0].y)
    
    context.stroke()
    context.closePath()
    //调用wx.drawCanvas，通过canvasId指定在哪张画布上绘制，通过actions指定绘制行为
    wx.drawCanvas({
      canvasId: 'firstCanvas',
      actions: context.getActions() //获取绘图动作数组
    });
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.area[this.data.area_id-1].name
    })
    this.canvasDraw()
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      token: app.globalData.token,
      area: app.globalData.area,
      battle_flag: app.globalData.battle_flag,
      division_name: app.globalData.division_name,
      division_position: app.globalData.division_position,
      game_type: app.globalData.game_type,
      win: app.globalData.win
    })
    
    if(options.qquin && options.area_id)
    {
      console.log("this is search user info")
      this.setData({
        qquin: options.qquin,
        area_id: options.area_id
      })
    }
    else
    {
      console.log("this is default user info")
      this.setData({
        qquin: app.globalData.user_default.qquin,
        area_id: app.globalData.user_default.area_id
      })
    }
    wx.request({
      url: 'http://lolapi.games-cube.com/UserHotInfo?qquin='+this.data.qquin+'&vaid='+this.data.area_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          user_hot_info: res.data.data
        })
      }
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/UserExtInfo?qquin='+this.data.qquin+'&vaid='+this.data.area_id,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        /* 统计能力七星图 */
        var recent_kda = res.data.data[0].items[0].recent_kda
        var kill = (recent_kda.k_num / recent_kda.use_num) * 10
        if(kill > 100) kill = 100
        var assists = (recent_kda.a_num / recent_kda.use_num) * 10
        if(assists > 100) assists = 100
        var dead = (recent_kda.d_num / recent_kda.use_num) * 10
        if(dead > 100) dead = 100
        dead  = 100 - dead
        var win = (recent_kda.win_num / recent_kda.use_num) * 100
        if(win > 80) win = 80
        if(win < 40) win = 40
        win = (win - 40) * 2.5
        var point = that.data.point
        point[0].value = kill
        point[1].value = dead
        point[2].value = assists
        point[3].value = win

        /* 统计常用位置 */
        var recent_position = res.data.data[0].items[0].recent_position
        var position = [
          {
            "num":recent_position.jungle_use_num,
            "name":"打野"
          },
          {
            "num":recent_position.adc_use_num,
            "name":"ADC"
          },
          {
            "num":recent_position.up_use_num,
            "name":"上单"
          },
          {
            "num":recent_position.mid_use_num,
            "name":"中单"
          },
          {
            "num":recent_position.aux_use_num,
            "name":"辅助"
          }
        ]
        /* 冒泡排序得到常用的位置 */
        var temp 
        for(var i = 1; i < position.length; i++)
        {
          for(var j = 0; j < position.length-i; j++)
          {
            if(position[j].num>position[j+1].num)
            {
              temp = position[j+1]
              position[j+1] = position[j]
              position[j] = temp
            }
          }
        }
        /* 获取最近常用英雄 */
        var champion = res.data.data[3].champion_list
        for(var i = 1; i < champion.length; i++)
        {
          for(var j = 0; j < champion.length-i; j++)
          {
            if(champion[j].use_num<champion[j+1].use_num)
            {
              temp = champion[j+1]
              champion[j+1] = champion[j]
              champion[j] = temp
            }
          }
        }
        var recent_champion = champion.slice(0,5)
        var per = 0
        for(var i = 0; i < 5; i++)
        {
          per = (recent_champion[i].win_num/recent_champion[i].use_num)*100
          per = Math.round(per)
          recent_champion[i].per = per
        }
        that.setData({
          user_ext_info: res.data.data,
          point: point,
          recent_position: position,
          recent_champion: recent_champion
        })
        that.canvasDraw()
      }
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/CombatList?qquin='+this.data.qquin+'&vaid='+this.data.area_id+'&p=0',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        that.setData({
          combat_list: res.data.data
        })
      }
    })
    
    
  }
  
})
