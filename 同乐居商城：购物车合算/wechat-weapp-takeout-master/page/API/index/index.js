Page({
  data: {
    menuList: [{
      name: '开放接口',
      APIList: [{
        zhName: '微信登录',
        enName: 'login',
        url: '../login/login'
      }, {
        zhName: '获取用户信息',
        enName: 'getUserInfo',
        url: '../get-user-info/get-user-info'
      }, {
        zhName: '发起支付',
        enName: 'requestPayment',
        url: '../request-payment/request-payment'
      }],
      opened: false
    }, {
      name: '界面',
      opened: false,
      APIList: [{
        zhName: '设置界面标题',
        enName: 'setNavigationBarTitle',
        url: '../set-navigation-bar-title/set-navigation-bar-title'
      }, {
        zhName: '标题栏加载动画',
        enName: 'navigationBarLoading',
        url: '../navigation-bar-loading/navigation-bar-loading'
      }, {
        zhName: '页面跳转',
        enName: 'navigateTo, navigateBack, redirectTo',
        url: '../navigator/navigator'
      }, {
        zhName: '下拉刷新',
        enName: 'pullDownRefresh',
        url: '../pull-down-refresh/pull-down-refresh'
      }, {
        zhName: '创建动画',
        enName: 'createAnimation',
        url: '../animation/animation'
      }, {
        zhName: '创建绘画',
        enName: 'createContext',
        url: '../canvas/canvas'
      }]
    }, {
      name: '设备',
      opened: false,
      APIList: [{
        zhName: '获取手机网络状态',
        enName: 'getNetworkType',
        url: '../get-network-type/get-network-type'
      }, {
        zhName: '获取手机系统信息',
        enName: 'getSystemInfo',
        url: '../get-system-info/get-system-info'
      }, {
        zhName: '监听重力感应数据',
        enName: 'onAccelerometerChange',
        url: '../on-accelerometer-change/on-accelerometer-change'
      }, {
        zhName: '监听罗盘数据',
        enName: 'onCompassChange',
        url: '../on-compass-change/on-compass-change'
      }]
    }, {
      name: '网络',
      opened: false,
      APIList: [{
        zhName: '发起一个请求',
        enName: 'request',
        url: '../request/request'
      }, {
        zhName: 'WebSocket',
        enName: 'WebSocket',
        url: '../web-socket/web-socket'
      }, {
        zhName: '上传文件',
        enName: 'Upload File',
        url: '../upload-file/upload-file'
      }, {
        zhName: '下载文件',
        enName: 'Download File',
        url: '../download-file/download-file'
      }]
    }, {
      name: '媒体',
      opened: false,
      APIList: [{
        zhName: '图片',
        enName: 'chooseImage/previewImage',
        url: '../image/image'
      }, {
        zhName: '录音',
        enName: 'start/stopRecord, play/pause/stopVoice',
        url: '../voice/voice'
      }, {
        zhName: '背景音频',
        enName: 'play/pause/stopAudio',
        url: '../background-audio/background-audio'
      }, {
        zhName: '文件',
        enName: 'saveFile',
        url: '../file/file'
      }, {
        zhName: '视频',
        enName: 'video',
        url: '../video/video'
      }]
    }, {
      name: '位置',
      opened: false,
      APIList: [{
        zhName: '获取当前位置',
        enName: 'getLocation',
        url: '../get-location/get-location'
      }, {
        zhName: '使用原生地图查看位置',
        enName: 'openLocation',
        url: '../open-location/open-location'
      }]
    }, {
      name: '数据',
      opened: false,
      url: '../storage/storage'
    }]
  },
  tapMenuItem: function (e) {
    var menuItem = this.data.menuList[parseInt(e.currentTarget.id)] 
    if (menuItem.url) {
      wx.navigateTo({ url: menuItem.url })
    } else {
      var changeData = {}
      var opened = menuItem.opened
      var index = parseInt(e.currentTarget.id)

      // 展开操作
      if (opened === false) {
        var openedIndex = -1
        this.data.menuList.forEach(function (menu, i) {
          if (menu.opened === true) {
            openedIndex = i
          }
        })
        if (openedIndex > -1) {
          changeData['menuList[' + openedIndex + '].opened'] = false
        }
      }

      changeData['menuList[' + index + '].opened'] = !opened
      this.setData(changeData)
    }
  }
})
