let app = getApp();
let loginCount = 0;

Page({
    data: {
      page:1,
      size: 20,
      hasMore: true,
      login: true,
      orderList: []
    },

    onLoad: function() {
      this.loadMore();
      this.refreshHandle();
    },

    loadMore(){
      if(!this.data.hasMore) return

      app.globalData.afterLogin.then(() => {
        app.post('api/Order/GetOrderAppListView',{
          PageIndex: this.data.page++,
          PageSize: this.data.size
        }).then((data) =>{
          if(data.Code == 4){
            if(loginCount < 3){
              app.login().then(this.loadMore)
              loginCount++;
            }else{
              this.setData({
                login: false
              });
              return;
            }
          }else if(data.Code === 200 && data.Data.OrderList.length){
            this.editOrderList(data.Data.OrderList);

            this.setData({
              orderList: this.data.orderList.concat(data.Data.OrderList)
            });

            if(data.Data.OrderList.length < this.data.size){
              this.setData({ hasMore: false })
            }
          }else{
            this.setData({ hasMore: false })
          }
        });
      })
    },

    refreshHandle:function(){
      app.globalData.reloadOrderList=()=>{
        app.post('api/Order/GetOrderAppListView',{
          PageIndex: 1,
          PageSize: this.data.size
        }).then((data) =>{
          if(data.Code === 200 && data.Data.OrderList.length){
            this.editOrderList(data.Data.OrderList);

            this.setData({
              orderList: data.Data.OrderList,
              page:1
            });

            if(data.Data.OrderList.length < this.data.size){
              this.setData({ hasMore: false })
            }
          }
        });
      }
    },

    //跳到订单详情页
    tapdetail(e) {
      let order = e.currentTarget.dataset.order;

      let that = this;
      app.globalData.refreshOrderList = function(mergeData){
        if(mergeData instanceof Object){
          that.data.orderList.forEach((item) => {
            if(item.OrderID == mergeData.OrderID){
              item.OrderStatus = mergeData.OrderStatus
            }
          });
          that.setData({
            orderList: that.data.orderList
          })
        }
      }
      wx.navigateTo({
        url: `../orderdetail/orderdetail?order=${order}`
      })
    },

    editOrderList(array){//修改订单的状态
      if(array instanceof Array){
        array.forEach((item) => {
          item.OrderStatus = app.orderStatus(item.OrderStatus)
        });
        return array;
      }
    }
})
