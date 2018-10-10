//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    core: [
      { id: 'kb', name: '课表查询', disabled: false, teacher_disabled: false },
      { id: 'cj', name: '成绩查询', disabled: false, teacher_disabled: true },
      { id: 'ks', name: '考试安排', disabled: false, teacher_disabled: false },
      { id: 'kjs', name: '空教室', disabled: false, teacher_disabled: false },
      { id: 'xs', name: '学生查询', disabled: false, teacher_disabled: false },
      { id: 'ykt', name: '一卡通', disabled: false, teacher_disabled: false },
      { id: 'jy', name: '借阅信息', disabled: false, teacher_disabled: false },
      { id: 'xf', name: '学费信息', disabled: false, teacher_disabled: true },
      { id: 'sdf', name: '电费查询', disabled: false, teacher_disabled: true },
      { id: 'bx', name: '物业报修', disabled: false, teacher_disabled: false }
    ],
    card: {
      'kb': {
        show: false,
        time_list: [
          { begin: '8:00', end: '8:45' },
          { begin: '8:55', end: '9:40' },
          { begin: '10:05', end: '10:50' },
          { begin: '11:00', end: '11:45' },
          { begin: '14:00', end: '14:45' },
          { begin: '14:55', end: '15:40' },
          { begin: '16:05', end: '16:50' },
          { begin: '17:00', end: '17:45' },
          { begin: '19:00', end: '19:45' },
          { begin: '19:55', end: '20:40' },
          { begin: '20:50', end: '21:35' },
          { begin: '21:45', end: '22:30' }
        ],
        data: {}
      },
      'ykt': {
        show: false,
        data: {
          'last_time': '',
          'balance': 0,
          'cost_status': false,
          'today_cost': {
            value: [],
            total: 0
          }
        }
      },
      'jy': {
        show: false,
        data: {}
      },
      'sdf': {
        show: false,
        data: {
          'room': '',
          'record_time': '',
          'cost': 0,
          'spend': 0
        }
      }
    },
    user: {},
    disabledItemTap: false //点击了不可用的页面
  },
  //下拉更新
  onPullDownRefresh: function(){
    if(app._user.is_bind){
      this.getCardData();
    }
  },
  onShow: function(){
    var _this = this;
    function isEmptyObject(obj){ for(var key in obj){return false;} return true; }
    function isEqualObject(obj1, obj2){ if(JSON.stringify(obj1) != JSON.stringify(obj2)){return false;} return true; }
    var l_user = _this.data.user,  //本页用户数据
        g_user = app._user; //全局用户数据
    //排除第一次加载页面的情况（全局用户数据未加载完整 或 本页用户数据与全局用户数据相等）
    if(isEmptyObject(l_user) || !g_user.openid || isEqualObject(l_user.we, g_user.we)){
      return false;
    }
    //全局用户数据和本页用户数据不一致时，重新获取卡片数据
    if(!isEqualObject(l_user.we, g_user.we)){
      //判断绑定状态
      if(!g_user.is_bind){
        _this.setData({
          'remind': '未绑定'
        });
      }else{
        _this.setData({
          'remind': '加载中'
        });
        //清空数据
        _this.setData({
          user: app._user,
          'card.kb.show': false,
          'card.ykt.show': false,
          'card.jy.show': false,
          'card.sdf.show': false
        });
        _this.getCardData();
      }
    }
  },
  onLoad: function(){
    this.login();
  },
  login: function(){
    var _this = this;
    //如果有缓存
    if(!!app.cache){
      try{
        _this.response();
      }catch(e){
        //报错则清除缓存
        wx.removeStorage({ key: 'cache' });
      }
    }
    //然后通过登录用户, 如果缓存更新将执行该回调函数
    app.getUser(_this.response);
  },
  response: function(){
    var _this = this;
    _this.setData({
      user: app._user
    });
    //判断绑定状态
    if(!app._user.is_bind){
      _this.setData({
        'remind': '未绑定'
      });
    }else{
      _this.setData({
        'remind': '加载中'
      });
      _this.getCardData();
    }
  },
  disabled_item: function(){
    var _this = this;
    if(!_this.data.disabledItemTap){
      _this.setData({
        disabledItemTap: true
      });
      setTimeout(function(){
        _this.setData({
          disabledItemTap: false
        });
      }, 2000);
    }
  },
  getCardData: function(){
    var _this = this;
    var kb_data = {
      id: app._user.we.info.id,
    };
    if(app._user.teacher){ kb_data.type = 'teacher'; }
    //获取课表数据
    wx.request({
      url: app._server + '/api/get_kebiao.php',
      method: 'POST',
      data: app.key(kb_data),
      success: function(res) {
        wx.stopPullDownRefresh();
        if(res.data && res.data.status === 200){
          var info = res.data.data,
              today = parseInt(info.day),
              lessons = info.lessons[today===0 ? 6 : today-1], //day为0表示周日(6)，day为1表示周一(0)..
              list = [],
              time_list = _this.data.card.kb.time_list;
          for(var i = 0; i < 6; i++){
            for(var j = 0; j < lessons[i].length; j++){
              var lesson = lessons[i][j];
              if(lesson.weeks && lesson.weeks.indexOf(parseInt(info.week)) !== -1){
                var begin_lesson = 2*i+1, end_lesson = 2*i+lesson.number;
                list.push({
                  when: begin_lesson+' - '+end_lesson+'节'
                        +'（'+time_list[begin_lesson-1].begin+'~'+time_list[end_lesson-1].end+'）',
                  what: lesson.name,
                  where: lesson.place.trim()
                });
              }
            }
          }
          _this.setData({
            'card.kb.data': list,
            'card.kb.show': true,
            'card.kb.nothing': !list.length,
            'remind': ''
          });
        }
      }
    });
    //获取一卡通数据
    wx.request({
      url: app._server + '/api/get_yktcost.php',
      method: 'POST',
      data: app.key({
        yktID: app._user.we.ykth
      }),
      success: function(res) {
        wx.stopPullDownRefresh();
        if(res.data && res.data.status === 200){
          var list = res.data.data;
          if(list.length > 0){
            var last = list[0],
                last_time = last.time.split(' ')[0],
                now_time = app.util.formatTime(new Date()).split(' ')[0];
            //筛选并计算当日消费（一卡通数据有一定延迟，无法成功获取到今日数据，主页卡片通常不能展示）
            for(var i = 0, today_cost = [], cost_total = 0; i < list.length; i++){
              if(list[i].time.split(' ')[0] == now_time && list[i].cost.indexOf('-') == 0){
                var cost_value = Math.abs(parseInt(list[i].cost));
                today_cost.push(cost_value);
                cost_total += cost_value;
              }
            }
            if(today_cost.length){
              _this.setData({
                'card.ykt.data.today_cost.value': today_cost,
                'card.ykt.data.today_cost.total': cost_total,
                'card.ykt.data.cost_status': true
              });
            }
            _this.setData({
              'card.ykt.data.last_time': last_time,
              'card.ykt.data.balance': parseFloat(last.balance),
              'card.ykt.show': true,
              'remind': ''
            });
          }
        }
      }
    });
    if(!!app._user.we.room && !!app._user.we.build){
      //获取水电费数据
      wx.request({
        url: app._server + '/api/get_elec.php',
        method: 'POST',
        data: app.key({
          buildingNo: app._user.we.build,
          floor: app._user.we.room.slice(0,1),
          room: parseInt(app._user.we.room.slice(1))
        }),
        success: function(res) {
          wx.stopPullDownRefresh();
          if(res.data && res.data.status === 200){
            var info = res.data.data;
            _this.setData({
              'card.sdf.data.room': info.room.split('-').join('栋'),
              'card.sdf.data.record_time': info.record_time.split(' ')[0],
              'card.sdf.data.cost': info.elec_cost,
              'card.sdf.data.spend': info.elec_spend,
              'card.sdf.show': true,
              'remind': ''
            });
          }
        }
      });
    }
    //获取借阅信息
    wx.request({
      url: app._server + '/api/get_booklist.php',
      method: 'POST',
      data: app.key({
        id: app._user.teacher ? app._user.we.ykth : app._user.we.info.id
      }),
      success: function(res) {
        wx.stopPullDownRefresh();
        if(res.data && res.data.status === 200){
          var info = res.data.data;
          if(parseInt(info.books_num) || (info.book_list && info.book_list.length)){
            var nowTime = new Date().getTime();
            info.book_list.map(function(e){
              var oDate = e.yhrq.split('-'),
                  oTime = new Date(oDate[0], oDate[1]-1, oDate[2]).getTime();
              e.timing = parseInt((oTime - nowTime) / 1000 / 60 / 60 /24);
              return e;
            });
            _this.setData({
              'card.jy.data': info,
              'card.jy.show': true,
              'remind': ''
            });
          }
        }
      }
    });
  }
});