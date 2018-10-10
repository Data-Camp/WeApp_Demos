var config = require('../../config.js')
var mockData = require('../../mock/data.js')
var simulator = require('../../utils/simulator.js')

var inputs = {}

// 获取应用实例
var app = getApp()
Page({
  data: {
    loadingHidden: true,
    modalHidden: true,
    modalContent: '',
    inputs: {}
  },

  tapLoading: function () {
    this.setData({
      loadingHidden: true
    })
  },

  loading: function () {
    this.setData({
      loadingHidden: false
    })
  },

  unloading: function () {
    this.setData({
      loadingHidden: true
    })
  },
  inputChange: function (e) {
    inputs[e.currentTarget.id] = e.detail.value
  },

  formSubmit: function () {
    var page = this
    if (inputs['username'] == null || inputs['username'] == '') {
      page.showModal('请输入学号')
      return
    }
    if (inputs['password'] == null || inputs['password'] == '') {
      page.showModal('请输入密码')
      return
    }
    page.loading()
    // 异步请求不能
    simulator.login(inputs['username'], inputs['password'])
    simulator.getAchievement(function (data) {
      console.log(data)
      wx.setStorageSync('username', inputs['username'])
      wx.setStorageSync('password', inputs['password'])

      page.unloading()
      wx.hideNavigationBarLoading()

      wx.navigateTo({
        // 必须要序列化成字符串，URL编码自动完成
        url: '/pages/achievement/achievement?data=' + JSON.stringify(data) + '&username=' + inputs['username']
      })
    }, function (error) {
      console.log(error)

      page.unloading()
      page.showModal(error)
    })
  },

  formReset: function () {
    inputs = {}
    wx.setStorageSync('username', '')
    wx.setStorageSync('password', '')
  },

  modalCancel: function () {
    this.setData({
      modalHidden: true
    })
  },

  modalConfirm: function () {
    this.setData({
      modalHidden: true
    })
  },

  showModal: function (msg) {
    this.setData({
      modalHidden: false,
      modalContent: msg
    })
  },

  onLoad: function () {
    // 调用应用实例的方法获取全局数据
    var that = this
    inputs['username'] = wx.getStorageSync('username')
    inputs['password'] = wx.getStorageSync('password') // 这里没有加密安全性较低
    this.setData({
      inputs: inputs
    })
  },

  switchChange: function (e) {
    inputs[e.currentTarget.id] = e.detail.value
  },

  tapnav:function (){
    wx.navigateTo({
      url:'/pages/introduce/introduce'
    })
  }
})
