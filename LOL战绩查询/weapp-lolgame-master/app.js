//app.js
App({
    rrrrrr: function () {
        var that = this
        wx.request({
          url: 'http://lolapi.games-cube.com/GetSummonSpellIcon?summonspellid='+that.globalData.idx,
          type: "GET",
          header: {
              "DAIWAN-API-TOKEN": this.globalData.token
          },
          success: function(res) {
            console.log(that.globalData.idx)
            console.log(JSON.stringify(res))
            that.globalData.idx++
            if(that.globalData.idx > 50)
                return
            that.rrrrrr()
          }
        })
    },
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        //this.rrrrrr()
    },
    globalData: {
    token: "FF298-D9B3C-F0906-2F4C1",
    token_video: "E59B4-43534-72EA6-A34A4", 
    area: null,
    search_result: null,
    idx: 30,
    battle_flag: ["","Carry局","休闲局","Carry局","休闲局","Carry局","休闲局","Carry局","翻盘局","Carry局",
                "休闲局","Carry局","翻盘局","Carry局","休闲局","Carry局","福利局","Carry局","休闲局","Carry局",
                "福利局","Carry局","休闲局","Carry局","翻盘局","Carry局","休闲局","Carry局","翻盘局","Carry局",
                "休闲局","Carry局","挂机局","Carry局","休闲局","Carry局","挂机局","Carry局","休闲局","Carry局",
                "翻盘局","Carry局","休闲局","Carry局","翻盘局","Carry局","休闲局","Carry局","福利局","Carry局"],
    division_name: [
    "最强王者","璀璨钻石","华贵铂金","荣耀黄金","不屈白银","英勇黄铜","超凡大师"
    ],
    game_type: [
    {"name":"未知比赛类型"},
    {"name":"自定义"},
    {"name":"新手关"},
    {"name":"匹配赛"},
    {"name":"排位赛"},
    {"name":"战队赛"},
    {"name":"大乱斗"},
    {"name":"人机"},
    {"name":"统治战场"},
    {"name":"大对决"},
    {"name":"未知比赛类型"},
    {"name":"克隆赛"},
    {"name":"未知比赛类型"},
    {"name":"未知比赛类型"},
    {"name":"无限火力"},
    {"name":"镜像赛"},
    {"name":"末日赛"},
    {"name":"飞升赛"},
    {"name":"六杀丛林"},
    {"name":"魄罗乱斗"},
    {"name":"互选征召"},
    {"name":"佣兵战"},
    {"name":"未知比赛类型"},
    {"name":"未知比赛类型"},
    {"name":"无限乱斗"},
    {"name":"末日人工智能"}],
    win: {
      "name":["未定义","胜利","失败"],
      "color":["red","green","red"]
    },
    division_position: ["I","II","III","IV","V"],
    user: {
        "qquin": null,
        "area_id": 0
    },
    /* 恶人谷丶小霸王 */
    // user_default: {
    //     "qquin": "U6715578389630215985",
    //     "area_id": 7
    // }
    /* xiaxiaowen */
    // user_default: {
    //     "qquin": "U7999221378384908169",
    //     "area_id": 18
    // }
    // /* 专业坑爹20年了 钢铁烈阳 */
    // user_default: {
    //     "qquin": "U15815230029956674927",
    //     "area_id": 17
    // }
    /* 专业坑爹20年了 卡拉曼达 */
    user_default: {
        "qquin": "U14289356289420285104",
        "area_id": 25
    }
    }
})
