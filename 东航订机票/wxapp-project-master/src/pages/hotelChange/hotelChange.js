let app = getApp();
let compose = require('../../utils/compose');
let dateFormat = require('../../utils/dateutil');
Page({
  data: {
    loading: true
  },

  onLoad(){
    this.setData({
      loading: true
    });

    let getHotelListParams = wx.getStorageSync('getHotelListParams');
    this.setData({
      hotelCityName: getHotelListParams.HotelCityName,
      hotelCheckInDate: compose(dateFormat.formatTime, dateFormat.detimestamp)(getHotelListParams.HotelCheckInDate),
      hotelCheckOutDate: compose(dateFormat.formatTime, dateFormat.detimestamp)(getHotelListParams.HotelCheckOutDate),
    })

    app.post('api/Product/GetHotelList', getHotelListParams).then((data) => {
      let hotelList = data.Data.HotelList;

      hotelList.forEach((hotelItem) => {
        hotelItem.RoomList.forEach((roomItem) => {
          roomItem.CanAddBed = this.canAddBed(roomItem.CanAddBed);
          roomItem.BedType = this.canAddBed(roomItem.BedType);
        })
      })


      this.setData({
        hotelList: hotelList,
        loading: false
      })
    })
  },

  gotoHotelDetails(e){
    let selectIndex = e.currentTarget.dataset.index;

    wx.setStorageSync('selectHotelInfo', this.data.hotelList[selectIndex]);

    wx.navigateTo({
      url: '../hotelDetails/hotelDetails?level=2'
    })
  },

  //床型
  bedType: function(type){
    var bedType=['','/大床','/双床','/单人床','/多床','/大床/双床','/圆床','/榻榻米','/水床'];
    return bedType[type]||'';
  },

  canAddBed: function(bol){
    return !!bol ? '可加床': '不可加床';
  }

})
