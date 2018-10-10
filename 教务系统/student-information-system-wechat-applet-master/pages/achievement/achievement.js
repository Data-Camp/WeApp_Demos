var mockData = require('../../mock/data.js')

var data = {}

Page({
  data: {
    username: 0,
    list: [
      {
        id: 1,
        years: '2016-2017',
        term: 1,
        open: false,
        table: []
      }
    ]
  },

  widgetsToggle: function (e) {
    var id = e.currentTarget.id
    var list = this.data.list
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        // list[i].open = false
      }
    }
    this.setData({
      list: list
    })
  },

  setCurrentTermShow: function () {
    var today = new Date(); // 获得当前日期
    var year = today.getFullYear(); // 获得年份
    var month = today.getMonth() + 1; // 此方法获得的月份是从0---11，所以要加1才是当前月份
    var day = today.getDate(); // 获得当前日期
    var list = this.data.list
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].years.indexOf(year) != -1) {
        if (month >= 6 && list[i].term == 2) {
          list[i].open = true // 上半年看第一学期，下半年第二学期成绩打开
        }else if (month < 6 && list[i].term == 1) {
          list[i].open = true
        }
      }
    }
    this.setData({
      list: list
    })
  },

  fillData: function (options) {
    data = JSON.parse(options['data'])
    data.shift() // 去掉表头
    var list = []
    var tempDiffVal = '' // 按照年份和学期分组标记
    var tempItem = {}
    for (var i = 0;i < data.length;i++) {
      var dataRow = data[i]
      var years = dataRow[0]
      var term = dataRow[1]
      diffVal = years + term
      if (diffVal != tempDiffVal) { // 如果下一行变了就创建新的栏目
        var item = {
          id: list.length + 1,
          years: years,
          term: term,
          open: false,
          table: []
        }
        tempItem = item
        list.push(item) // 把新的栏目放到列表
        tempDiffVal = diffVal
      }

      var tableRow = []
      tableRow[0] = dataRow[2] // 课程
      tableRow[1] = dataRow[6] // 成绩
      tableRow[2] = dataRow[11] // 绩点
      tempItem.table.push(tableRow)
    }
    this.setData({
      list: list,
      username: options.username
    })
  },

  onLoad: function (options) {
    this.fillData(options)
    this.setCurrentTermShow()
  },

  onShow:function(){
    wx.hideNavigationBarLoading()
  },

  // https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html?t=1475052056377#生命周期函数
  onReady: function () {
    var page = this
    wx.setNavigationBarTitle({
      title: '学号 ' + page.data.username + ' 的成绩'
    }
    )
  }
})
