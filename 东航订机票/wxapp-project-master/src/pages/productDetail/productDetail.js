let app = getApp();
let compose = require('../../utils/compose');
let dateFormat = require('../../utils/dateutil');
let utils = require('../../utils/utils');
let productSearchParams;
Page({
  data: {
    nextStep: {
      totalPrice: '--',
      btnWord: '下一步'
    },
    loading: true,
    costDetail: {
      show: false
    },
    warnAlert: {
      show: false
    }
  },

  onLoad: function(){//加载时获取请求的参数
    //加载前设置loading为true
    this.setData({
      loading: true
    });

    productSearchParams = wx.getStorageSync('productSearchParams');

    let productParams = Object.assign({}, productSearchParams,{//选择航班酒店的信息
      AirGoDate: compose(dateFormat.formatTime, dateFormat.detimestamp)(productSearchParams.AirGoDate),
      AirGoDate2: compose(dateFormat.formatDay2, dateFormat.detimestamp)(productSearchParams.AirGoDate),
      HotelCheckInDate: compose(dateFormat.formatDay, dateFormat.detimestamp)(productSearchParams.HotelCheckInDate),
      HotelCheckOutDate: compose(dateFormat.formatDay, dateFormat.detimestamp)(productSearchParams.HotelCheckOutDate),
      isBackFlight: false
    });
    if(!!productSearchParams.AirBackDate){//判断是否有返程，如果有返程
      Object.assign(productParams, {
        AirBackDate: compose(dateFormat.formatTime, dateFormat.detimestamp)(productSearchParams.AirBackDate),
        AirBackDate2: compose(dateFormat.formatDay2, dateFormat.detimestamp)(productSearchParams.AirBackDate),
        isBackFlight: true
      });
    }
    this.setData({
      productParams: productParams
    });

    productSearchParams.FlightSourceType=productSearchParams.GoSourceType;
    app.post('api/Product/SearchProductList', productSearchParams).then((data) => {
      if(this.isUnload)return;
      if(data.Code == 201 && data.BCode == 501){
        app.globalData.errMsg = data.Msg;
        wx.redirectTo({
          url: '../verySorry/verySorry?level=1'
        })
      }else if(data.Code == 200){
        let StartFightInfo = data.Data.StartFightInfo;
        let EndFightInfo = data.Data.EndFightInfo;
        let HotelInfo = data.Data.HotelInfo;

        if(!StartFightInfo || !HotelInfo){
          console.log('error');

          wx.redirectTo({
            url: '../verySorry/verySorry?level=1'
          })
          return 0;
        }

        let that = this;
        HotelInfo.RoomList.forEach((item) => {
          item.CanAddBed = that.canAddBed(item.CanAddBed);
          item.BedType = that.bedType(item.BedType);
        })

        let productDetail = {
          startfightinfo: {
            FSTime: compose(dateFormat.formatHour, dateFormat.detimestamp)(StartFightInfo.FightStartDate),
            FETime: compose(dateFormat.formatHour, dateFormat.detimestamp)(StartFightInfo.FightEndDate),
            StartAirport: `${StartFightInfo.StartAirportName}${StartFightInfo.StartTerminalName}`,
            EndAirport: `${StartFightInfo.EndAirportName}${StartFightInfo.EndTerminalName}`,
            IsDirectArrive:  this.directArrive(StartFightInfo.IsDirectArrive),
            AirlineName: `${StartFightInfo.AirlineName}${StartFightInfo.FightCode}`,
            AirType: StartFightInfo.AirType
          },
          hotelinfo: HotelInfo,
          isBackFlight: false
        }

        if(!!productSearchParams.AirBackDate){//判断是否有返程，如果有返程
          Object.assign(productDetail, {
            endfightinfo: {
              FSTime: compose(dateFormat.formatHour, dateFormat.detimestamp)(EndFightInfo.FightStartDate),
              FETime: compose(dateFormat.formatHour, dateFormat.detimestamp)(EndFightInfo.FightEndDate),
              StartAirport: `${EndFightInfo.StartAirportName}${EndFightInfo.StartTerminalName}`,
              EndAirport: `${EndFightInfo.EndAirportName}${EndFightInfo.EndTerminalName}`,
              IsDirectArrive:  this.directArrive(EndFightInfo.IsDirectArrive),
              AirlineName: `${EndFightInfo.AirlineName}${EndFightInfo.FightCode}`,
              AirType: EndFightInfo.AirType
            },
            isBackFlight: true
          })
        }


        this.setData({//加载成功后赋值
          productDetail: productDetail,
          nextStep: Object.assign(this.data.nextStep,{
            totalPrice: data.Data.TotalPrice
          }),
          loading: false,
          specialWarn: HotelInfo.BookingLimit
        })
      }else{
        wx.redirectTo({
          url: '../verySorry/verySorry?level=1'
        })
      }
      this.setParams(data.Data,productSearchParams);
    }).catch(function(e){
      console.log(e);
    })
  },

  setParams:function(data,params){
    if(!data)return;
    params.ShoppingID=data.ShoppingKey;

    if (data.StartFightInfo) {
        params.GoFlightNumber = data.StartFightInfo.FightCode;
        params.GoAirSpaceCode = data.StartFightInfo.AirSpaceList[0].AirSpaceCode;
        params.GoSourceType=data.StartFightInfo.AirSpaceList[0].SourceType;
    }else{
        params.GoFlightNumber=params.GoAirSpaceCode=params.GoSourceType=undefined;
    }
    if (data.EndFightInfo) {
        params.BackFlightNumber = data.EndFightInfo.FightCode;
        params.BackAirSpaceCode = data.EndFightInfo.AirSpaceList[0].AirSpaceCode;
        params.BackSourceType=data.EndFightInfo.AirSpaceList[0].SourceType;
    }else{
        params.BackFlightNumber=params.BackAirSpaceCode=params.BackSourceType=undefined;
    }

    if (data.HotelInfo) {
        (data.HotelInfo.RoomList||[]).some(function(itemRoom){
            if(itemRoom.IsDefault){
                params.RoomID = itemRoom.ID;
                params.RoomNumber = itemRoom.BookingQuantity;;
                params.AddBedNumber = itemRoom.AddBedNum || 0;
                params.RoomProviderID=itemRoom.ProviderID;
                params.RoomRatePlanID=itemRoom.RatePlanID;
                return true;
            }
        })
    }

    params.FlightSourceType=params.GoSourceType;

    wx.setStorageSync('productSearchParams', params);

  },

  //是否直达
  directArrive: function(bol){
    return !!bol ? '直达' : '中转';
  },

  //床型
  bedType: function(type){
    var bedType=['','/大床','/双床','/单人床','/多床','/大床/双床','/圆床','/榻榻米','/水床'];
		return bedType[type]||'';
  },

  canAddBed: function(bol){
    return !!bol ? '可加床': '不可加床';
  },

  //更换机票
  changeFlight: function(){
    var that=this;
    app.globalData.refreshSearchData = function(){
      that.onLoad();
    }
    wx.navigateTo({
      url: '../airticket/airticket?type=1'
    })
  },

  //更换酒店
  changeHotel: function(){

    let getHotelListParams = {
       "SelectedRoomID": this.data.productDetail.hotelinfo.RoomList[0].ID,
       "SelectedRoomProviderID": this.data.productDetail.hotelinfo.RoomList[0].ProviderID,
       "SelectedRoomRatePlanID": this.data.productDetail.hotelinfo.RoomList[0].RatePlanID,
       "SelectedRoomNumber": this.data.productDetail.hotelinfo.RoomList[0].BookingQuantity,
       "HotelCityName": productSearchParams.HotelCityName,
       "HotelCheckInDate": productSearchParams.HotelCheckInDate,
       "HotelCheckOutDate": productSearchParams.HotelCheckOutDate,
       "AdultNum": productSearchParams.AdultNum,
       "ChildrenNum": productSearchParams.ChildrenNum,
       "PageSize": 5,
       "PageNum": 1
    }

    wx.setStorageSync('getHotelListParams', getHotelListParams);//同步缓存hotelList请求数据

    //保存refreshSearchData方法
    var that = this;
    app.globalData.refreshSearchData = function(){
      that.onLoad();
    }

    wx.navigateTo({
      url: '../hotelChange/hotelChange'
    })
  },

  //特别提示
  bindspecialWarn: function(){
    this.setData({
      warnAlert: {
        show: true,
        info: utils.replaceHtml(this.data.specialWarn)
      }
    })
  },

  //隐藏特别提示
  hideWarnAlert(){
    this.setData({
      warnAlert: {
        show: false
      }
    })
  },

  //酒店详情跳转
  bindHotelDetail: function(){
    wx.setStorageSync('selectHotelInfo', this.data.productDetail.hotelinfo);//存入选中的酒店的信息

    //保存refreshSearchData方法
    var that = this;
    app.globalData.refreshSearchData = function(){
      that.onLoad();
    }

    wx.navigateTo({
      url: '../hotelDetails/hotelDetails?level=1'
    })
  },

  //隐藏和显示费用明细
  hideCostDetail(){
    this.setData({
      costDetail: {
        show: false
      }
    })
  },

  showCostDetail(){
    this.setData({
      costDetail: {
        show: true
      }
    })
  },

  //下一步
  nextStepOrder: function(){
    let ProductKey='';

    app.post('api/Product/SubmitSelectedProduct',{
      BasicInfo:{
           HotelCityName: productSearchParams.HotelCityName
           , HotelCheckInDate: productSearchParams.HotelCheckInDate
           , HotelCheckOutDate: productSearchParams.HotelCheckOutDate
           , AirStartCityName: productSearchParams.AirStartCityName
           , AirArriveCityName: productSearchParams.AirArriveCityName
           , AirGoDate: productSearchParams.AirGoDate
           , AirBackDate: productSearchParams.AirBackDate
           , AdultNum:productSearchParams.AdultNum
           , ChildrenNum:productSearchParams.ChildrenNum
           , IsRequireHotel:true
           , IsRequireTransfer:false
       }
      , ShoppingKey: productSearchParams.ShoppingID
      , SelectedStartFlightNumber: productSearchParams.GoFlightNumber
      , SelectedStartAirSpaceCode: productSearchParams.GoAirSpaceCode
      , SelectedBackAirSpaceCode: productSearchParams.BackAirSpaceCode
      , SelectedBackFlightNumber: productSearchParams.BackFlightNumber
      , FlightSourceType:productSearchParams.GoSourceType
      , SelectedRoomInfo:{
          RoomID:productSearchParams.RoomID
          , RoomProviderID:productSearchParams.RoomProviderID
          , RoomRatePlanID:productSearchParams.RoomRatePlanID
          , RoomNumber:productSearchParams.RoomNumber
          , AddBedNumber:productSearchParams.AddBedNumber
      }
    }).then((data)=>{
      wx.hideToast();
      if(this.isUnload)return;
      if(data.Code==200){
        wx.navigateTo({
          url: `../order/order?productKey=${data.Data.key}&adultNum=${productSearchParams.AdultNum}&childrenNum=${productSearchParams.ChildrenNum}`
        })
      }else if(data.Msg){
        wx.showModal({
        title: '提示',
        showCancel:false,
        content: data.Msg
        })
      }else if(data.Code==201&&data.BCode==501){
        wx.showModal({
        title: '提示',
        showCancel:false,
        content: '很抱歉，您长时间没有操作，航班可能发生变动，请重新查询!'
        })
      }
    })

    utils.loadingShow();

  },
  onUnload:function(){
    this.isUnload=true;
  }
})
