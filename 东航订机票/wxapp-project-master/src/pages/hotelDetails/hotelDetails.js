let app = getApp();
let compose = require('../../utils/compose');
let dateFormat = require('../../utils/dateutil');
let utils = require('../../utils/utils');
let level = 1;

let selectHotelInfo, productSearchParams;

Page({
  data: {
    changeRoom: {
      show: false
    }
  },

  onLoad(params){
    level = params.level; //更改跳转层级
    productSearchParams = wx.getStorageSync('productSearchParams');//酒店详情页的搜索参数
    selectHotelInfo = wx.getStorageSync('selectHotelInfo');//酒店详情页的搜索参数

    selectHotelInfo.HotelDes = utils.replaceHtml(selectHotelInfo.HotelDes); //替换html里的标签

    this.setData({
      selectHotelInfo: selectHotelInfo,
      hotelInfoDate: {
        HotelCheckInDate: compose(dateFormat.formatTime, dateFormat.detimestamp)(productSearchParams.HotelCheckInDate),
        HotelCheckOutDate: compose(dateFormat.formatTime, dateFormat.detimestamp)(productSearchParams.HotelCheckOutDate)
      }
    })
  },

  changeRoom(e){
    var index = e.currentTarget.dataset.index;

    this.setData({
      changeRoom: {
        show: true,
        selectRoomIndex: index,
        selectRoomInfo: selectHotelInfo.RoomList[index]
      }
    });
  },

  bindSelectRoom(e){
    var index = e.currentTarget.dataset.index;
    var selectedRoomInfo = this.data.selectHotelInfo.RoomList[index];

    var selectedRoomParams = {
      "RoomID": selectedRoomInfo.ID,
      "RoomProviderID": selectedRoomInfo.ProviderID,
      "RoomRatePlanID": selectedRoomInfo.RatePlanID,
      "RoomNumber": selectedRoomInfo.BookingQuantity,
    }

    Object.assign(productSearchParams, selectedRoomParams);

    wx.setStorageSync('productSearchParams', productSearchParams);


    let refreshSearchData = app.globalData.refreshSearchData;

    if(typeof refreshSearchData === 'function'){
      setTimeout(function(){
        refreshSearchData();
      },0);

      wx.navigateBack({
        delta: level*1
      })
    }

  },

  bindRoomNum(e){
    var roomNum = +e.currentTarget.dataset.num + 1;
    var index = this.data.changeRoom.selectRoomIndex;

    var bookingQuantity = this.data.selectHotelInfo.RoomList[index].BookingQuantity;
    var priceDifference = this.data.selectHotelInfo.RoomList[index].PriceDifference;
    var salePrice = this.data.selectHotelInfo.RoomList[index].SalePrice;
    var isDefault = this.data.selectHotelInfo.RoomList[index].IsDefault;

    this.data.changeRoom.selectRoomInfo.BookingQuantity = roomNum;
    this.data.selectHotelInfo.RoomList[index].PriceDifference = (roomNum - bookingQuantity) * salePrice + priceDifference;
    this.data.selectHotelInfo.RoomList[index].BookingQuantity = roomNum;
    this.data.selectHotelInfo.RoomList[index].IsDefault = false;

    this.setData({
      changeRoom: Object.assign(this.data.changeRoom,{
        show: false
      }),
      selectHotelInfo: this.data.selectHotelInfo
    })

  },

  hideLayer(){//点击蒙层隐藏修改房间的弹层
    this.setData({
      changeRoom: Object.assign(this.data.changeRoom,{
        show: false
      })
    });
  }

})
