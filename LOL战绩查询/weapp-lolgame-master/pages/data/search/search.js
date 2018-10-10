//获取应用实例
var app = getApp()
Page({
  data: {
    token:null,
    search_name:"恶人谷丶小霸王",
    loading:false,
    toastHidden:true,
    paper_item: [[{"tag":"召唤师查询","img":"../../img/paper/search.png"},
                  {"tag":"英雄资料","img":"../../img/paper/hero.png"},
                  {"tag":"周免英雄","img":"../../img/paper/hero_free.png"}],
                 [{"tag":"排行榜","img":"../../img/paper/rank.png"},
                  {"tag":"物品信息","img":"../../img/paper/item.png"},
                  {"tag":"大区数据","img":"../../img/paper/area.png"}],
                 [{"tag":"没有","img":"../../img/paper/item1.png"},
                  {"tag":"没有","img":"../../img/paper/item2.png"},
                  {"tag":"没有","img":"../../img/paper/item3.png"}]]
  },
  toastChange: function() {
    this.setData({
        toastHidden:true
      })
  },
  bindSearchInput:function(e){
    this.setData({
      search_name:e.detail.value
    })
  },
  //事件处理函数
  bindSearchTap: function() {
    var that = this
    if(that.data.search_name == null || that.data.search_name == "")
    {
      console.log("please input the name")
      
      that.setData({
        toastHidden:false
      })
      return
    }
    that.setData({
      loading:true
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/UserArea?keyword='+this.data.search_name,
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        that.setData({
          loading:false
        })
        console.log(JSON.stringify(res))
        app.globalData.search_result = res
        wx.navigateTo({
          url: 'result/result'
        })
      }
    })
  },
  onLoad: function() {
    this.setData({
      token: app.globalData.token
    })
  }
  
})
