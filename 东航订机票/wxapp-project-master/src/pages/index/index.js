var app=getApp();
var dateFormat = require('../../utils/dateutil');
var oneDay = 1*24*60*60*1000;
Page({
  data: {
    currentIndex: '1',
    startCity: '上海',
    endCity: '南京',
    hotelCity: '上海',
    adultNum: 1,
    childNum: 0,
    rotate: -180,
    toast1: {
      show: false,
      alertWarn: 'warn',
      info: ''
    },
    toast2: {
      show: false
    }
  },
  onLoad: function(){
    this.setData({
      FSdate: {
        date: dateFormat.formatTime(new Date(Date.now() + oneDay)),
        week: dateFormat.formatWeek(new Date(Date.now() + oneDay)),
        startday: dateFormat.formatDay(new Date(Date.now() + oneDay)),
        currentday: dateFormat.formatDay(new Date(Date.now() + oneDay))
      },
      FEdate: {
        date: dateFormat.formatTime(new Date(Date.now() + 2*oneDay)),
        week: dateFormat.formatWeek(new Date(Date.now() + 2*oneDay)),
        startday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay)),
        currentday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay))
      },
      HSdate: {
        date: dateFormat.formatTime(new Date(Date.now() + oneDay)),
        week: dateFormat.formatWeek(new Date(Date.now() + oneDay)),
        startday: dateFormat.formatDay(new Date(Date.now() + oneDay)),
        currentday: dateFormat.formatDay(new Date(Date.now() + oneDay))
      },
      HEdate: {
        date: dateFormat.formatTime(new Date(Date.now() + 2*oneDay)),
        week: dateFormat.formatWeek(new Date(Date.now() + 2*oneDay)),
        startday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay)),
        currentday: dateFormat.formatDay(new Date(Date.now() + 2*oneDay))
      }
    })
  },
  minusAdultNum: function(){//减少成人的数量
    this.data.adultNum--;
    if(!this.ratioError()){
      this.data.adultNum++;
      var obj = {
        pointer: this,
        info: '成人儿童比例不能超过1:2！',
        duration: 2000
      }
      app.toast1(obj);
    }else if(this.data.adultNum > 0){
      this.setData({
        adultNum: this.data.adultNum
      })
    }else{
      this.data.adultNum++;
      var obj = {
        pointer: this,
        info: '成人数量不能小于1！',
        duration: 2000
      }
      app.toast1(obj);
    }
  },
  minusChildNum: function(){//减少儿童的数量
    this.data.childNum--;
    if(!this.ratioError()){
      this.data.childNum++;
      var obj = {
        pointer: this,
        info: '成人儿童比例不能超过1:2！',
        duration: 2000
      }
      app.toast1(obj);
    }else if(this.data.childNum >= 0){
      this.setData({
        childNum: this.data.childNum
      })
    }else{
      this.data.childNum++;
      var obj = {
        pointer: this,
        info: '儿童数量不能小于0！',
        duration: 2000
      }
      app.toast1(obj);
    }
  },
  plusAdultNum: function(){//增加成人的数量
    this.data.adultNum++;
    if(!this.ratioError()){
      this.data.adultNum--;
      var obj = {
        pointer: this,
        info: '成人儿童比例不能超过1:2！',
        duration: 2000
      }
      app.toast1(obj);
    }else if(this.data.adultNum + this.data.childNum > 9){
      this.data.adultNum--;
      var obj = {
        pointer: this,
        info: '成人+儿童最多支持9人！',
        duration: 2000
      }
      app.toast1(obj);
    }else{
      this.setData({
        adultNum: this.data.adultNum
      })
    }
  },
  plusChildNum: function(){//增加儿童的数量
    this.data.childNum++;

    if(!this.ratioError()){
      this.data.childNum--;
      var obj = {
        pointer: this,
        info: '成人儿童比例不能超过1:2！',
        duration: 2000
      }
      app.toast1(obj);
    }else if(this.data.adultNum + this.data.childNum > 9){
      this.data.childNum--;
      var obj = {
        pointer: this,
        info: '成人+儿童最多支持9人！',
        duration: 2000
      }
      app.toast1(obj);
    }else{
      this.setData({
        childNum: this.data.childNum
      })
    }
  },

  ratioError: function(){
    var adultNum = this.data.adultNum;
    var childNum = this.data.childNum;
		return (adultNum*2)>=childNum;
  },

  rotate_img: function() {//旋转飞机图片
    var animation = wx.createAnimation({
      timingFunction: "ease",
      duration: 400
    })
    this.animation = animation;
    animation.rotateZ(this.data.rotate).step();
     
    this.setData({
      rotate: -1*this.data.rotate,
      startCity: this.data.endCity,
      endCity: this.data.startCity,
      animation: animation.export(),
    })

  },

  changeBtn: function(ev) {//单程，往返切换
    this.setData({
      currentIndex: ev.target.dataset.index
    })
  },

  bingDateChange: function(e){//绑定选择时间的函数
    var type = e.currentTarget.dataset.type;
    switch (type) {
      case '1':
        this.setData({
          FSdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.FSdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          },
          FEdate: {
            date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatTime(new Date(this.data.FEdate.currentday)),
            week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatWeek(new Date(this.data.FEdate.currentday)),
            startday: dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)),//todo
            currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatDay(new Date(this.data.FEdate.currentday))
          },
          HSdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.HSdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          },
          HEdate: {
            date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatTime(new Date(this.data.FEdate.currentday)),
            week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatWeek(new Date(this.data.FEdate.currentday)),
            startday: this.data.HEdate.startday,
            currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatDay(new Date(this.data.FEdate.currentday))
          }
        })
        break;
      case '2':
        this.setData({
          FEdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.FEdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          },
          HEdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.HEdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          }
        })
        break;
      case '3':
        this.setData({
          HSdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.HSdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          },
          HEdate: {
            date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatTime(new Date(this.data.FEdate.currentday)),
            week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatWeek(new Date(this.data.FEdate.currentday)),
            startday: dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)),//todo
            currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateFormat.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateFormat.formatDay(new Date(this.data.FEdate.currentday))
          }
        })
        break;
      case '4':
        this.setData({
          HEdate: {
            date: dateFormat.formatTime(new Date(e.detail.value)),
            week: dateFormat.formatWeek(new Date(e.detail.value)),
            startday: this.data.HEdate.startday,
            currentday: dateFormat.formatDay(new Date(e.detail.value))
          }
        })
        break;
    }
  },

  compareDay: function(startday,endday){
    var startSecond = new Date(startday).getTime();
    var endSecond = new Date(endday).getTime();
    if((endSecond - startSecond) > oneDay){
      return true;
    }else{
      return false;
    }
  },

  alertWarn: function(){
    var obj = {
      pointer: this,
      duration: 3000
    }
    app.toast2(obj);
  },
  searchProduct: function(){//跳转详情页
    var objParams = { //单程的params的参数
      'AirStartCityName': this.data.startCity,
      'AirArriveCityName': this.data.endCity,
      'AirGoDate': dateFormat.timestamp(this.data.FSdate.currentday),
      'HotelCityName': this.data.hotelCity,
      'HotelCheckInDate': dateFormat.timestamp(this.data.HSdate.currentday),
      'HotelCheckOutDate': dateFormat.timestamp(this.data.HEdate.currentday),
      'AdultNum': this.data.adultNum,
      'ChildrenNum': this.data.childNum,
      'IsRequireHotel': true
    };

    if(this.data.currentIndex === '1'){//往返的params的参数
        Object.assign(objParams, {
          'AirBackDate': dateFormat.timestamp(this.data.FEdate.currentday)
        })
    }

    wx.setStorageSync('productSearchParams', objParams);//同步缓存SearchProductList请求数据

    wx.navigateTo({
      url:'../productDetail/productDetail?level=1'
    })
  },
  selectCity: function(e){//选择城市 切换保存方法
    var type = e.currentTarget.dataset.type;
    var that = this;
    var url=type!=1?'../selectcity/selectcity':'../selectStartCity/selectStartCity';
    url=url+'?type='+type;
    app.globalData.cityFn = function(city,type){
      switch (type) {
        case '1':
          that.setData({
            startCity: city
          });
          break;
        case '2':
          that.setData({
            endCity: city,
            hotelCity: city
          });
          break;
        case '3':
          that.setData({
            hotelCity: city
          });
          break;
      }
    };

    wx.navigateTo({
      url
    })
  }
})
