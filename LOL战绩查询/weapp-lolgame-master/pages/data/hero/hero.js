//获取应用实例
var app = getApp()
var fuzzy = require('../../../utils/fuzzy.js')
Page({
  data: {
    toastHidden:true,
    display:"hidden",
    search_name: "",
    champions: [],
    display_champions: [],
    ename: [],
    title: [],
    cname: []
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
    if(e.detail.value == null || e.detail.value == "")
    {
      this.setData({
        display:"hidden"
      })
    }
    else
    {
      this.setData({
        display:"display"
      })
      var options = {extract: function(el) {return el.ename+el.title+el.cname}}
      var f = fuzzy.filter(this.data.search_name, this.data.champions, options)
      //console.log(JSON.stringify(f))
      var display_champions = []
      for(var i = 0; i < f.length; i++)
      {
        display_champions.push(this.data.champions[f[i].index])
      }
      this.setData({
        display_champions:display_champions
      })
    }
    
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
    var that = this
    this.setData({
      token: app.globalData.token
    })
    wx.request({
      url: 'http://lolapi.games-cube.com/champion',
      type: "GET",
      header: {
          "DAIWAN-API-TOKEN": this.data.token
      },
      success: function(res) {
        //console.log(JSON.stringify(res))
        var i = 0
        var ename = []
        var title = []
        var cname = []
        for(i=0;i<res.data.data.length;i++)
        {
          ename[i] = res.data.data[i].ename
          title[i] = res.data.data[i].title
          cname[i] = res.data.data[i].cname
        }
        that.setData({
          champions: res.data.data,
          display_champions: res.data.data,
          ename: ename,
          title: title,
          cname: cname
        })
      }
    })

    
  }
})
