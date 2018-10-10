var promise = require('utils/promise.js');
App({
  globalData: {
    baseurl: 'https://vacations.ceair.com/wechat', //线上的接口
    // baseurl: 'http://dev-WechatApi.ceair.com',//62测试接口
    errMsg: '所选日期产品目前资源不足，请重新选择！'
  },

  fetchApi (url, params, method='GET') {
    let methodParam = {
      method: method
    };

    let accessToken = {};
    if(this.exist(this.globalData.AccessToken)){
      accessToken = {
        'AccessToken': this.globalData.AccessToken
      }
    }

    return new promise((resolve, reject) => {
      wx.request(
        Object.assign({
          url: `${this.globalData.baseurl}/${url}`,
          data: Object.assign({}, params),
          header: Object.assign({
            'Content-Type': 'application/json'
          }, accessToken),
          method: method,
          success: resolve,
          fail: reject
        },methodParam)
      )
    }).then((data) => {
      return promise.resolve(data.data);
    }).catch((err) => {
      console.log(err);
    })
  },

  get(url, params){
    return this.fetchApi(url, params);
  },

  post(url, params){
    return this.fetchApi(url, params, 'POST');
  },

  exist(val){
    if(!!val){
      return true
    }else{
      return false
    }
  },

  toast1(obj){
    var { pointer, info, duration } = obj;
    pointer.setData({
      toast1: {
        show: true,
        alertWarn: 'warn',
        info: info
      }
    })

    setTimeout(() => {
      pointer.setData({
        toast1: {
          show: false,
          alertWarn: 'warn',
          info: ''
        }
      })
    },duration)
  },

  toast2(obj){
    var { pointer, duration } = obj;
    pointer.setData({
      toast2: {
        show: true
      }
    })

    setTimeout(() => {
      pointer.setData({
        toast2: {
          show: false
        }
      })
    },duration)
  },

  orderStatus(type){
    switch (type) {
      case 1:
        return '待支付'
        break;
      case 2:
        return '处理中'
        break;
      case 3:
        return '待审核'
        break;
      case 4:
        return '已确认'
        break;
      case 5:
        return '已出行'
        break;
      case 6:
        return '已完成'
        break;
      case 7:
        return '已取消'
        break;
    }
  },

  login(){
    let that = this;

    this.globalData.afterLogin = new promise((resolve,reject) => {
      wx.login({
        success: function(res){
          let code = res.code;

          /*//获取用户信息
          wx.getUserInfo({
            success: function(res){
              console.log(res);
            }
          });*/

          that.post('api/Account/Login', {
            Code: code
          }).then((data) => {
            that.globalData.AccessToken = `${data.Data.Token}:${data.Data.CredentialsId}`;
            resolve('already login!');
          },()=>resolve('login failed')).catch(err => {
            console.log(err)
            resolve('login failed');
          })
        },
        fail:function(){
          resolve('login failed');
        }
      });
    })

    return this.globalData.afterLogin;
  },

  onLaunch(){
    this.login();
  },

  onShow(){
    // console.log('onShow');
    // 当应用程序进入前台显示状态时触发
  },

  onHide(){
    // console.log('onHide');
    // 当应用程序进入后台状态时触发
  }

})


Object.values=function(obj){
  var values=[];
  for (var key in obj) {
    values.push(obj[key])
  }
  return values;
}

//Object.assign兼容性处理
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
