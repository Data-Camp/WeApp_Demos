var app = getApp();
var cityInfo = require('../../utils/cityInfo.js');
var cityItems = cityInfo.cityItems;

Page({
    data: {
        currentIndex: 0,
        cityItems:cityItems,
        letters:Object.keys(cityItems['国内']),
        lettersCh:Object.keys(cityItems['国内']),
        lettersIt:Object.keys(cityItems['国际']),
        lettersHmw:Object.keys(cityItems['港澳台']),
        letterId:''
    },

    onLoad(){
        this.type=arguments[0].type;
    },

    handleTapEvent: function(ev) {
        // console.log(ev.target.dataset.index);
        this.setData(this.getTapChangeData(ev.target.dataset.index));
    },

    handleChangeEvent: function(ev) {
        this.setData(this.getTapChangeData(ev.detail.current));
    },
    handleLetterTap:function(ev){
        var id = ev.target.dataset.id;

        this.setData({
            letterId:id+this.data.currentIndex
        });
    }
    ,

    getTapChangeData:function(currentIndex){
        var letters = currentIndex == 0 ? this.data.lettersCh : (currentIndex==1 ? this.data.lettersIt : this.data.lettersHmw);
        return {
            currentIndex:currentIndex,
            letters:letters
        }
    },

    bindChangeCity: function(e) { //绑定返回的页面
      var city = e.currentTarget.dataset.city;
      var fn = app.globalData.cityFn;
      var type = this.type;
      if (typeof fn == 'function') {
        setTimeout(function(){
          fn(city,type);
          app.globalData.cityFn = null;
        },0)
        wx.navigateBack({
          delta: 1
        });
      }
    }
})
