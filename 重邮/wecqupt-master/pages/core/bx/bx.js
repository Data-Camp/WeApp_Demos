//bx.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    count: '-',
    list: [],
    process_state: {
      '未审核': 'waited',
      '未受理': 'waited',
      '已受理': 'accepted',
      '已派出': 'dispatched',
      '已完工': 'finished',
      '驳回': 'refused'
    }
  },
  //下拉更新
  onPullDownRefresh: function(){
    this.getData();
  },
  onLoad: function(){
    this.getData();
  },
  getData: function(){
    var that = this;
    if(!app._user.we.ykth){
      that.setData({
        remind: '未绑定'
      });
      return false;
    }
    // 发送请求
    wx.request({
      url: app._server + "/api/bx/get_repair_list.php", 
      method: 'POST',
      data: app.key({
        openid: app._user.openid,
        "yktID": app._user.we.ykth
      }),
      success: function(res) {

        if(res.data && res.data.status === 200) {
          var list = res.data.data;
          if(!list || !list.length){
            that.setData({
              'remind': '无申报记录'
            });
          }else{
            for(var i = 0, len = list.length; i < len; i++) {
              list[i].state = that.data.process_state[list[i].wx_wxztm];
              list[i].wx_bt = that.convertHtmlToText(list[i].wx_bxnr).replace(/[\r|\n]/g, "");
            }
            that.setData({
              'list': list,
              'count': len,
              'remind': ''
            });
          }
        }else{
          that.setData({
            remind: res.data.message || '未知错误',
            'count': 0
          });
        }
      },
      fail: function(res) {
        app.showErrorModal(res.errMsg);
        that.setData({
          remind: '网络错误',
          'count': 0
        });
      },
      complete: function(){
        wx.stopPullDownRefresh();
      }
    });
  },
  convertHtmlToText: function(inputText){
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/?[^>]*>/g, '').replace(/[ | ]*\n/g, '\n').replace(/ /ig, '')
                  .replace(/&mdash/gi,'-').replace(/&ldquo/gi,'“').replace(/&rdquo/gi,'”');
    return returnText;
  }
  
});

