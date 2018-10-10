var app = getApp();
var letters=require('../../utils/cityInfo.js').letters;
Page({
    data: {
        currentIndex: 0,
        letterId:''
    },

    onLoad:function(){
        this.type=arguments[0].type;
        var that=this;
        app.get('api/City/GetDestinationCityList',{
            isRequireFilterByAirport:this.type==2
        }).then(function(data){
            if(data.Code==200){
                var ForeignCity=that.getCityList(data.Data.ForeignCityList);
                var InternalCity=that.getCityList(data.Data.InternalCityList);
                that.setData({
                    foreignCity:ForeignCity.cityList,
                    foreignLetters:ForeignCity.newLetters,
                    internalCity:InternalCity.cityList,
                    internalLetters:InternalCity.newLetters
                })
            }
            
        }).catch(function(e){
            console.log(e)
        })
    },
    getCityList:function(list){
        var newLetters=[];
        var cityList={};
        letters.forEach(function(le){
            var count=0;
            (list||[]).forEach(function(li){
                if(li.Initial.toUpperCase()==le){
                    count++;
                    cityList[le]==undefined&&(cityList[le]=[]);
                    cityList[le].push(li);
                }
            })
            count&&newLetters.push(le);
        })

        return {
            newLetters:newLetters,
            cityList:cityList
        }
    },

    handleLetterTap:function(ev){
        var id=ev.target.dataset.id;
        this.setData({
            letterId:id+this.data.currentIndex
        });
    },

    handleTapEvent: function(ev) {

        this.setData({
            currentIndex: ev.target.dataset.index
        })
    },

    handleChangeEvent: function(ev) {
        //打印时间对象知道， current 在事件对象里面
        this.setData({
          currentIndex: ev.detail.current
        })
    },

    bindChangeCity: function(e) { //绑定返回的页面
      var city = e.currentTarget.dataset.city;
      var fn = app.globalData.cityFn;
      var type=this.type;
      if (typeof fn == 'function') {
        setTimeout(function(){
          fn(city,type);
          app.globalData.cityFn=null;
        },0)
        wx.navigateBack({
          delta: 1
        });
      }
    }
})

// Initial Spell CityCode 
