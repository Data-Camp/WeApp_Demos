let app = getApp();
let utils = require('../../utils/utils');
let loginCount = 0;

Page({
  data: {
    roomInfo: {
      show: false,
      infos: ''
    },
    loading: true,
    login: true
  },

  onLoad(params){
    this.setData({
      loading: true,
      login: true
    });
    this.orderId = params.order;
    this.orderDetail();
  },

  orderDetail(){
    app.globalData.afterLogin.then(() => {
      app.post(`api/Order/GetOrderAppView`,{
        OrderID: this.orderId
      }).then((data) => {
        if(data.Code == 4){
          if(loginCount < 3){
            app.login().then(() => {
              this.orderDetail();
            })
            loginCount++;
          }else{
            this.setData({
              login: false,
              loading: false
            });
            return;
          }
        }else{
          data.Data.orderModel.AirTickets.forEach((airItem) => {
            airItem.DepartTime0 = airItem.DepartTime.split(' ')[0];
            airItem.DepartTime1 = airItem.DepartTime.split(' ')[1];
            airItem.DestinationTime0 = airItem.DestinationTime.split(' ')[0];
            airItem.DestinationTime1 = airItem.DestinationTime.split(' ')[1];
          })

          data.Data.orderModel.OrderStatus = app.orderStatus(data.Data.orderModel.OrderStatus);

          data.Data.orderModel.Hotels.forEach((hotelItem) => {
            hotelItem.JoinTime0 = hotelItem.JoinTime.split(' ')[0];
            hotelItem.OutTime0 = hotelItem.OutTime.split(' ')[0];
          })

          this.setData({
            orderModel: data.Data.orderModel,
            loading: false,
            login: true
          })
        }
      })
    })
  },


  gotoPay(){ //todo
    app.post(`api/Order/GetOrderPayUrl`, {
      OrderID: this.orderId,
      PayIndex: this.data.orderModel.NextState
    }).then((data) => {
      console.log('data',data);
    }).catch((err) => {
      console.log(err)
    })
  },

  cancelOrder(){
    utils.confirm('是否取消订单？',(res) => {
      if(res.confirm){
        app.post(`api/Order/UserCancelOrder`, {
          OrderID: this.orderId
        }).then((data) => {
          if(!!data.Data.IsSuccess){

            utils.message('取消订单成功');

            this.mergeData = {
              OrderStatus: '已取消',
              NextState: 0,
              OrderID: this.orderId
            }

            this.setData({
              orderModel: Object.assign(this.data.orderModel,this.mergeData)
            })
    			}
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  },

  bindroomInfo(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      roomInfo: {
        show: true,
        infos: utils.replaceHtml(this.data.orderModel.Hotels[index].HotelDesc)
      }
    })
  },

  hideCostDetail(){
    this.setData({
      roomInfo: {
        show: false,
        infos: ''
      }
    })
  },

  onUnload(){
    let refreshOrderList = app.globalData.refreshOrderList;
    let that = this;

    if(typeof refreshOrderList === 'function'){
      setTimeout(function(){
        refreshOrderList(that.mergeData);
      },0);
    }
  }
})
