//bx_apply.js
//获取应用实例
var app = getApp();
Page({
  remind: '加载中',
  data: {
    serviceTypeList: {},      //获取到的服务类型列表数据
    serviceAreaList: [],      //获取到的服务区域列表数据
    serviceTypeValue: false,  //服务类型picker-value
    serviceTypeRange: [],     //服务类型picker-range
    serviceObjectValue: false,//服务项目picker-value
    serviceObjectRange: ['请先选择服务类型'],   //服务项目picker-range
    serviceAreaValue: false,  //服务区域picker-value
    serviceAreaRange: [],     //服务区域picker-range  
    formData: {             //表单数据
        Id: '',         //统一认证码
        Name: '',       //姓名
        Title: '',      //标题
        CategoryId: '', //服务类型
        SpecificId: '', //服务项目id
        Phone:  '',     //报修用户电话
        AddressId:  '', //报修区域id
        Address: '',    //报修地点
        Content: ''     //报修内容
    }
  },
  onLoad: function(){
    if(!app._user.we.ykth || !app._user.we.info.name){
      this.setData({
        remind: '未绑定'
      });
      return false;
    }
    this.setData({
      'formData.Id': app._user.we.ykth,
      'formData.Name': app._user.we.info.name
    });
    // 发送请求
    this.getServiceType();
    this.getServiceArea();
  },
  getServiceType: function () {
    var _this = this;
    wx.request({
      url: app._server + '/api/bx/get_repair_type.php',
      success: function(res) {
        if(res.data && res.data.status === 200){
          var list = res.data.data, serviceTypeRange = [];
          for(var key in list){ 
            if(list.hasOwnProperty(key)){ 
              serviceTypeRange.push(key);
            }
          }
          _this.setData({
            serviceTypeList: list,
            serviceTypeRange: serviceTypeRange
          });
          if(_this.data.serviceTypeRange.length && _this.data.serviceAreaRange.length){  
            _this.setData({
              remind: ''
            });
          }
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
      }
    });
  },
  getServiceArea: function () {
    var _this = this;
    wx.request({
      url: app._server + '/api/bx/get_repair_areas.php',
      success: function(res) {
        if(res.data && res.data.status === 200){
          var list = res.data.data;
          var serviceAreaRange = list.map(function(e,i){
            return e.Name;
          });
          _this.setData({
            serviceAreaList: list,
            serviceAreaRange: serviceAreaRange
          });
          if(_this.data.serviceTypeRange.length && _this.data.serviceAreaRange.length){  
            _this.setData({
              remind: ''
            });
          }
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
      }
    });
  },
  listenerServiceType: function(e) {
    var index = e.detail.value;
    var theServiceTypeList = this.data.serviceTypeList[this.data.serviceTypeRange[index]];
    var serviceObjectRange = theServiceTypeList.map(function(e, i){
      return e.Name;
    });
    this.setData({
      serviceTypeValue: index,
      serviceObjectValue: false,
      serviceObjectRange: serviceObjectRange
    });
  },
  listenerServiceObject: function(e) {
    if(!this.data.serviceTypeValue){
      app.showErrorModal('请先选择服务类型', '提醒');
      return false;
    }
    var index = e.detail.value;
    var theServiceTypeList = this.data.serviceTypeList[this.data.serviceTypeRange[this.data.serviceTypeValue]];
    this.setData({
      serviceObjectValue: index,
      'formData.CategoryId': theServiceTypeList[index].CategId,
      'formData.SpecificId': theServiceTypeList[index].Id
    });
  },
  listenerServiceArea: function(e) {
    this.setData({
      serviceAreaValue: e.detail.value,
      'formData.AddressId': this.data.serviceAreaList[e.detail.value].Id
    });
  },
  listenerAddress: function(e) {
    this.setData({
      'formData.Address': e.detail.value
    });
  },
  listenerTel: function(e) {
    this.setData({
      'formData.Phone': e.detail.value
    });
    if(e.detail.value.length >= 11){
      wx.hideKeyboard();
    }
  },
  listenerTitle: function(e) {
    this.setData({
      'formData.Title': e.detail.value
    });
  },
  listenerTextarea: function(e) {
    this.setData({
      'formData.Content': e.detail.value
    });
  },
  submitApply: function(e) {
    var _this = this,
        formData = _this.data.formData;
    // 验证表单
    if(!formData.CategoryId || !formData.SpecificId || !formData.AddressId){
      app.showErrorModal('请检查服务类型、服务项目、服务区域是否选择完整', '提交失败');
      return false;
    }
    if(!formData.Phone || !formData.Address){
      app.showErrorModal('请检查联系方式、报修地址是否填写完整', '提交失败');
      return false;
    }
    if(formData.Phone.length !== 11){
      app.showErrorModal('联系方式有误', '提交失败');
      return false;
    }
    if(!formData.Title){
      app.showErrorModal('请填写报修标题', '提交失败');
      return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否确认提交申请？',
      success: function(res) {
        if (res.confirm) {
          if(!formData.Content){
            app.showErrorModal('请填写报修内容', '提交失败');
            return false;
          }
          formData.openid = app._user.openid;
          wx.request({
            url: app._server + '/api/bx/bx.php',
            method: 'POST',
            data: app.key(formData),
            success: function(res) {
              if(res.data && res.data.status === 200){
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                });
                wx.navigateBack();
              }else{
                var errorMessage = (res.data.data && res.data.data.reason) || res.data.message;
                app.showErrorModal(errorMessage);
              }
            },
            fail: function(res) {
              app.showErrorModal(res.errMsg);
            }
          });
        }
      }
    });

  }
  
});

