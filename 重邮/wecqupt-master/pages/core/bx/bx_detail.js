//bx_detail.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    detail: {},   //工单详情
    state: []     //处理详情(申请-审核-受理-派单-完工-驳回.倒序)
  },
  //下拉更新
  onPullDownRefresh: function(){
    this.getData();
  },
  onLoad: function(options){
    this.setData({
      bxID: options.id
    });
    this.getData();
  },
  getData: function () {
    var _this = this;
    if(!app._user.we.ykth || !_this.data.bxID){
      _this.setData({
        remind: '404'
      });
      return false;
    }
    // 发送请求
    wx.request({
      url: app._server + "/api/bx/get_repair_detail.php", 
      method: 'POST',
      data: app.key({
        openid: app._user.openid,
        "yktID": app._user.we.ykth,
        "bxID": _this.data.bxID
      }),
      success: function(res) {
        if(res.data && res.data.status === 200) {
          var info = res.data.data;
          //报修内容过滤标签
          info.wx_bt = _this.convertHtmlToText(info.wx_bxnr).replace(/[\r|\n]/g, "");
          info.wx_bxnr = _this.convertHtmlToText(info.wx_bxnr);
          //处理详情
          var state = [{
            'type': 'refused',
            name: '驳回',
            status: info.wx_wxztm == '驳回',
            list: {}
          },{
            'type': 'finished',
            name: '完工',
            status: info.wx_wxztm == '已完工',
            list: {
              '用时': info.wx_ysfz + '分钟'
            }
          },{
            'type': 'dispatched',
            name: '派单',
            status: !!info.wx_wxgm.trim(),
            list: {
              '承修人': info.wx_wxgm
            }
          },{
            'type': 'accepted',
            name: '受理',
            status: !!info.wx_slr.trim(),
            list: {
              '受理人': info.wx_slr,
              '承修部门': info.wx_cxbmm,
              '响应时间': info.xysj
            }
          },{
            'type': 'waited',
            name: '审核',
            status: !!info.wx_shr.trim(),
            list: {
              '审核人': info.wx_shr
            }
          },{
            'type': 'waited',
            name: '申请',
            status: true,
            list: {
              '申请人': info.wx_bxr+' ('+info.wx_bxrrzm+')',
              '申报时间': info.wx_bxsj
            }
          }];
          _this.setData({
            'detail': info,
            'state': state.filter(function(e,i){
              return e.status
            }),
            'remind': ''
          });
        }else{
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