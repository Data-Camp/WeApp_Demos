//ks.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    list: [],
    first: 1
  },
  togglePage: function (e) {
    var id = e.currentTarget.id, data = {};
    data.show = [];
    for (var i = 0, len = this.data.class.length; i < len; i++) {
        data.show[i] = false;
    }
    if(this.data.first){
      this.setData(data);
      this.data.first = 0;
    }
    data.show[id] = !this.data.show[id];
    this.setData(data);
  },
  onLoad: function(){
    var _this = this;
    if(!app._user.we.info.id || !app._user.we.info.name){
      _this.setData({
        remind: '未绑定'
      });
      return false;
    }
    _this.setData({
      id: app._user.we.info.id,
      name: app._user.we.info.name,
      teacher: app._user.teacher
    });
    var data = {
      openid: app._user.openid,
      id: app._user.we.info.id
    };
    if(app._user.teacher){ data.type = 'teacher'; }
    wx.request({
      url: app._server + "/api/get_ks.php",
      method: 'POST',
      data: app.key(data),
      success: function(res) {
        if (res.data && res.data.status === 200){
          var list = res.data.data;
          if(!list || !list.length){
            _this.setData({
              remind: '无考试安排'
            });
            return false;
          }
          var days = ['一','二','三','四','五','六','日'];
          for (var i = 0, len = list.length; i < len; ++i) {
            list[i].open = false;
            list[i].index = i;
            list[i].day = days[list[i].day - 1];
            list[i].time = list[i].time.trim().replace('—','~');
            list[i].lesson = list[i].lesson.replace(',','-');
            //倒计时提醒
            if(list[i].days > 0){
              list[i].countdown = '还有' + list[i].days + '天考试';
              list[i].place = '（'+list[i].time+'）'+list[i].room;
              if(!app._user.teacher){
                list[i].place += '#'+list[i].number; 
              }
            }else if(list[i].days < 0){
              list[i].countdown = '考试已过了' + (-list[i].days) + '天';
              list[i].place = '';
            }else{
              list[i].countdown = '今天考试';
              list[i].place = '（'+list[i].time+'）'+list[i].room; 
              if(!app._user.teacher){
                list[i].place += '#'+list[i].number; 
              }
            }
          }
          list[0].open = true;
          _this.setData({
            list: list,
            remind: ''
          });
        } else {
          _this.setData({
            remind: res.data.message || '未知错误'
          });
        }
      },
      fail: function(res) {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      }
    });
  },
  // 展示考试详情
  slideDetail: function(e) {
    var id = e.currentTarget.dataset.id, 
        list = this.data.list;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  }
});
