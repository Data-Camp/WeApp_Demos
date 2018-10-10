'use strict';
import Promise from './es6-promise.min'

module.exports = {
  PAGE_WORK: '/pages/work-detail/work-detail',

  HOST_WORK: 'http://work.artand.cn/',
  HOST_HEAD: 'http://head.artand.cn/',
  HOST_IOS: 'http://ios1.artand.cn/',
  HOT: 'discover/work/hot',
  LATEST: 'discover/work/new',

  SWIPERS: 'http://ios1.artand.cn/discover/home/rank',

  SIGN_UP: 'http://ios1.artand.cn/signup/sms',
  LOGIN: 'http://ios1.artand.cn/login/doLogin',
  GET_VERIFICATION: 'http://ios1.artand.cn/signup/sms',

  get (url) {
    return new Promise((resolve, reject) => {
      console.log(url)
      wx.request({
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
        },
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  },

  json2Form(json) {
    var str = []
    for(var p in json){
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
    }
    return str.join("&")
  }

};
