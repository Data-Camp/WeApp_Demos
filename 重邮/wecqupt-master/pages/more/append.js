//append.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    building_list: ['1','2','3','4','5','6','8','9',
      '10','11','12','15','16','17','18','19',
      '20','21','22','23A','23B','24','25','26','27','28','29',
      '30','31','32','33','34','35','36','37','39'],  //寝室楼栋
    buildings: ['1栋（知行苑1舍）', '2栋（知行苑2舍）', '3栋（知行苑3舍）', '4栋（知行苑4舍）', '5栋（知行苑5舍）', '6栋（知行苑6舍）', '8栋（宁静苑1舍）', '9栋（宁静苑2舍）',
      '10栋（宁静苑3舍）', '11栋（宁静苑4舍）', '12栋（宁静苑5舍）', '15栋（知行苑7舍）', '16栋（知行苑8舍）', '17栋（兴业苑1舍）', '18栋（兴业苑2舍）', '19栋（兴业苑3舍）',
      '20栋（兴业苑4舍）', '21栋（兴业苑5舍）', '22栋（兴业苑6舍）', '23A栋（兴业苑7舍）', '23B栋（兴业苑8舍）', '24栋（明理苑1舍）', '25栋（明理苑2舍）', '26栋（明理苑3舍）', '27栋（明理苑4舍）', '28栋（明理苑5舍）', '29栋（明理苑6舍）',
      '30栋（明理苑7舍）', '31栋（明理苑8舍）', '32栋（宁静苑6舍）', '33栋（宁静苑7舍）', '34栋（宁静苑8舍）', '35栋（宁静苑9舍）', '36栋（四海苑1舍）', '37栋（四海苑2舍）', '39栋（明理苑9舍）'], // picker-range
    ibuilding: false,  // picker-index
    room_focus: false,
    room: '',
    angle: 0
  },
  onLoad: function(){
    var _this = this;
    if(app._user.we.build){
      _this.data.buildings.forEach(function(e,i){
        if(e.split("栋")[0] == app._user.we.build){
          _this.setData({
            ibuilding: i
          });
        }
      });
    }
    if(app._user.we.room){
      _this.setData({
        'room': app._user.we.room
      });
    }
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
  buildingPicker: function(e) {
    this.setData({
      ibuilding: e.detail.value
    });
  },
  inputFocus: function(e){
    if(e.target.id == 'room'){
      this.setData({
        'room_focus': true
      });
    }
  },
  inputBlur: function(e){
    if(e.target.id == 'room'){
      this.setData({
        'room_focus': false
      });
    }
  },
  roomInput:  function(e){
    this.setData({
      'room': e.detail.value
    });
    if(e.detail.value.length >= 3){
      wx.hideKeyboard();
    }
  },
  confirm: function(){
    var _this = this;
    var data = {
      openid: app._user.openid
    };
    if(!_this.data.ibuilding || !_this.data.room){
      app.showErrorModal('请先输入表单信息', '提醒');
      return false;
    }
    if(!/^\d+$/.test(_this.data.room) || _this.data.room.length !== 3){
      app.showErrorModal('请输入正确的寝室号', '提醒');
      return false;
    }
    var buildText = _this.data.buildings[_this.data.ibuilding];
    var build = buildText.split("栋")[0];
    data.build = build;
    data.room = _this.data.room;
    app.showLoadToast();
    wx.request({
      url: app._server + '/api/users/set_info.php',
      data: app.key(data),
      method: 'POST',
      success: function(res){
        if(res.data && res.data.status === 200){
          app.appendInfo(data);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
          wx.navigateBack();
        }else{
          wx.hideToast();
          app.showErrorModal(res.data.message);
        }
      },
      fail: function() {
        wx.hideToast();
        app.showErrorModal(res.errMsg);
      }
    })
  }
});