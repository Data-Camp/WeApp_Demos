// pages/airticket/airticket.js
var app=getApp();
let compose = require('../../utils/compose');
let dateFormat = require('../../utils/dateutil');
Page({
  data: {
    loading:true
  },

   onLoad:function(options){
    this.type= options.type;
    this.productSearchParams = wx.getStorageSync('productSearchParams');
    var date=this.isGo()?this.productSearchParams.AirGoDate:this.productSearchParams.AirBackDate;

    this.setData({
      dateTxt:dateFormat.formatTime(date*1000),
      date:date,
      orgCity:this.isGo()?this.productSearchParams.AirStartCityName:this.productSearchParams.AirArriveCityName,
      destCity:this.isGo()?this.productSearchParams.AirArriveCityName:this.productSearchParams.AirStartCityName,
      type:this.type
    })
    this.isGo()?this.goAirLoadData(this.productSearchParams):this.backAirLoadData(this.productSearchParams);

  },
  isGo:function(){
    return this.type!=2;
  },

  goAirLoadData:function(orderParams){
    var that=this;
    app.post('api/Product/GetGoFightList',{
            ShoppingKey:orderParams.ShoppingID
            ,SelectedFlightNumber:orderParams.GoFlightNumber
            ,SelectedAirspaceCode:orderParams.GoAirSpaceCode
            ,FlightSourceType:orderParams.GoSourceType
            ,AirStartCityName:orderParams.AirStartCityName
            ,AirArriveCityName:orderParams.AirArriveCityName
            ,AirStartDate:orderParams.AirGoDate
            ,AirBackDate:orderParams.AirBackDate
            ,AdultNum: orderParams.AdultNum
            ,ChildrenNum: orderParams.ChildrenNum
            ,OrderByField: ''
            ,OrderByType: ''
            ,Token: ''
            ,Time: ''
        }).then(function(data){
          if(data.Code==200){
            var newData=that.getData(data.Data.FightCollection.FlightList);
            newData.loading=false;
            that.setData(newData);
          }
        }).catch(function(e){
          console.log(e);
        })
  },
  backAirLoadData:function(orderParams){
    var that=this;
    var newGoAir=wx.getStorageSync('goAirParams')||{};
    app.post('api/Product/GetBackFightList',{
            ShoppingKey:orderParams.ShoppingID,
            SelectedGoFlightNumber:newGoAir.GoFlightNumber,
            SelectedBackFlightNumber:orderParams.BackFlightNumber,
            SelectedGoAirSpaceCode:newGoAir.GoAirSpaceCode,
            SelectedBackAirSpaceCode:orderParams.BackAirSpaceCode,
            FlightSourceType:newGoAir.GoSourceType,
            SelectedBackFlightSourceType:orderParams.BackSourceType,
            AdultNum:orderParams.AdultNum,
            ChildrenNum:orderParams.ChildrenNum,
            OrderByField: '',
            OrderByType: '',
            Token: '',
            Time: ''
        }).then(function(data){
          if(data.Code==200){
            var newData=that.getData(data.Data.FightCollection.FlightList);
            newData.loading=false;
            that.setData(newData);
          }

        }).catch(function(e){
          console.log(e);
        })
  }
  ,
  getData:function(fightList){
    var count=0,
        newList=[];

    fightList.forEach(function(item,index){
      var minPrice=null;
      var flight={
        FightStartDate:dateFormat.formatHour(item.FightStartDate*1000),
        FightEndDate:dateFormat.formatHour(item.FightEndDate*1000),
        hidden:true,
        mId:index
      };

      item.AirSpaceList.forEach(function(i,idx){
        if(minPrice==null||minPrice>=i.PriceDifference)
          minPrice=i.PriceDifference;
        var asy=i.PriceDifference>=0?'+':'-';
        var storeStatus='余票充足',color=false;
        if(i.RemainTicketNum !='>9'&&(+i.RemainTicketNum)<=5){
          storeStatus='仅剩'+i.RemainTicketNum+'张';
          color=true;
        }

        Object.assign(i,{
          asy:asy,
          storeStatus:storeStatus,
          color:color,
          asyPrice:Math.abs(i.PriceDifference),
          id:''+index+idx
        })
        count++;
      })
      flight.asy=minPrice>=0?'+':'-';
      flight.minPrice= Math.abs(minPrice)||0;
      Object.assign(item,flight);
    })
    return {
            list:fightList,
            count:count
          };
  },
  catchTapHandle:function(){

  }
  ,
  showExitChangeSignRule:function(e){
    var flIndex=e.currentTarget.dataset.flIndex*1;
    var alIndex=e.currentTarget.dataset.alIndex*1;
    var ExitChangeSignRule=this.data.list[flIndex].AirSpaceList[alIndex].ExitChangeSignRule;
    var obj = {
        pointer: this,
        info: ExitChangeSignRule,
        duration: 2000
      }
      app.toast1(obj);
  },
  changeDownHandle:function(e){
    var index =e.currentTarget.dataset.index*1;
    this.data.list[index].hidden=!this.data.list[index].hidden;
    this.setData({list:this.data.list});
  },

  ticketSearch_back:function(e){
    var flIndex=e.currentTarget.dataset.flIndex*1;
    var alIndex=e.currentTarget.dataset.alIndex*1;
    var itemFight=this.data.list[flIndex];
    var itemSpace=itemFight.AirSpaceList[alIndex];
    var hasBack=!!this.productSearchParams.AirBackDate;
    var AirParams={}
    if(this.isGo())
    {
      AirParams={
         GoFlightNumber: itemFight.FightCode
        ,GoAirSpaceCode: itemSpace.AirSpaceCode
        ,GoSourceType:itemSpace.SourceType
      }
    }else{
      var newGoAir=wx.getStorageSync('goAirParams')||{};
      AirParams={
         GoFlightNumber: newGoAir.GoFlightNumber
        ,GoAirSpaceCode: newGoAir.GoAirSpaceCode
        ,GoSourceType:newGoAir.GoSourceType
        ,BackFlightNumber: itemFight.FightCode
        ,BackAirSpaceCode: itemSpace.AirSpaceCode
        ,BackSourceType:itemSpace.SourceType
      }
    }
    if(this.isGo()&&hasBack){
      wx.setStorageSync('goAirParams', AirParams);
      wx.navigateTo({url:'../airticket/airticket?type=2'});
    }else{
      wx.setStorageSync('productSearchParams',Object.assign({},this.productSearchParams,AirParams));
      this.refreahData();
      wx.navigateBack({delta:this.type*1});
    }
  },
  refreahData:function(){
    var fn=app.globalData.refreshSearchData;
    if(typeof fn=='function'){
      setTimeout(fn,0);
    }
  },
  onUnload:function(){
  // 页面关闭
  },
  // 机票预订页面
  go:function(ev){
    if(this.data.hidden == true
      ){
      this.setData({
        hidden:false,
      })
    }
  },

})
