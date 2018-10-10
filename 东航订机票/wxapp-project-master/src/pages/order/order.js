let app = getApp();
let utils = require('../../utils/utils');
let dateFormat = require('../../utils/dateutil');
Page({
     data:{
        hasInvoice:false,
        hasCoupon:false,
        hasAgree:false,
        totalPrice: '--',
        nextStep: {
           btnWord: '去支付'
        },
        costDetail: {
           show: false
        },
        loading:true
   },
   //添加乘机人
   addp:function(e){
      this.refreshPassengerHandle();
      let passengerInfo= wx.getStorageSync('passengerInfo');
      if(this.productKey==passengerInfo.productKey){
        let passengerList=passengerInfo.passengerList;
        if(!passengerList||passengerList.length==0){
          wx.navigateTo({
            url: '../createTraveller/createTraveller?type=1'
           })
        }else{
           wx.navigateTo({
            url: '../selectpassengers/selectpassengers',
           })
        }
      }else{
        wx.navigateTo({
            url: '../createTraveller/createTraveller?type=1'
        })
      }
   },
   onLoad:function(params){
      if(this.loadCount>5)
      {
        app.message('请求失败！')
        return;
      }
      this.loadCount=this.loadCount||0;
      this.loadCount++;
      this.productKey=params.productKey;
      this.childrenNum=params.childrenNum;
      this.adultNum=params.adultNum;
      let that=this;

      app.globalData.afterLogin.then(()=>{
          app.post('api/Product/Booking',{
          ProductKey: this.productKey
          }).then((data)=>{
            if(this.isUnload)return;
            if(data.Code==4){
              app.login().then(()=>{
                this.onLoad(params);
              })
            }else if(data.Code==200){
              that.setBookingData(data.Data.BookingInfo);
            }

            that.setData({
              loading:false
            })
          }).catch(function(e){
            console.log(e);
          })

          this.setData({
            loading:true,
            childrenNum:this.childrenNum,
            adultNum:this.adultNum
          })
      })


   },

   setBookingData:function(bookingInfo){
      let that=this;
      let departureDate= dateFormat.formatDay(new Date(bookingInfo.PkgProductInfo.PkgProduct_Schedule[0].DepartureDate));
      let departureCityName = bookingInfo.PkgProductInfo.DepartureTravelCityName;
      let destinationCityName = bookingInfo.PkgProductInfo.DestinationCityName;
      let contactInfo=this.contactInfo= bookingInfo.ContactInfo||{};
      let invoiceInfo=this.invoiceInfo= contactInfo.InvoiceInfo||{};
      this.isInternational = bookingInfo.PkgProductInfo.IsInternational;
      let segLeg=bookingInfo.PkgProductInfo.PkgProduct_Segment.length-1;
      this.lastDepartureTime=bookingInfo.PkgProductInfo.PkgProduct_Segment[segLeg].DepartureTime;
      //获取价格信息
      (bookingInfo.PackageProductPriceInfoList||[]).forEach(function(item){
        switch(item.PriceType){
          case 0:
            that.flightAndHotelPrice=item.TotalAmount;
            break;
          case 3:
            that.taxPrice=item.TotalAmount;
            break;
        }
      })
      let totalPrice=this.getTotalPrice();
      let passengerList=bookingInfo.PassengerInfoList;
      this.passengerInfo={
          productKey:this.productKey,
          passengerList:passengerList,
          selectedPassengerList:[],
          childrenNum:this.childrenNum,
          adultNum:this.adultNum,
          lastDepartureTime:this.lastDepartureTime,
          isInternational:this.isInternational
      };
      wx.setStorageSync('passengerInfo',this.passengerInfo);
      this.setData({
          productName:bookingInfo.PkgProductInfo.ProductName,
          departureDate:departureDate,
          departureCityName:departureCityName,
          destinationCityName:destinationCityName,
          totalPrice:totalPrice,
          flightAndHotelPrice:this.flightAndHotelPrice,
          taxPrice:this.taxPrice,
          contactName:contactInfo.ReceivingName||'',
          contactPhone:contactInfo.MobilePhone||'',
          contactEmail:contactInfo.Email||'',
          invoiceTitle:invoiceInfo.Title||'',
          invoiceAddress:invoiceInfo.DetailAddress||'',
          postCode:invoiceInfo.PostCode||'',
          invoicePhone:invoiceInfo.MobilePhone||'',
          invoiceName:invoiceInfo.Name||'',
          isInternational:this.isInternational,
          passengerList:[]
      })
   },
   getSelectedPassengerList:function(list,selectedIds){
      let that=this;

      return (list||[]).filter(function(item){
        return selectedIds.indexOf(item.ID)>-1;
      }).map(function(item){
        let passengerType=utils.isChild(new Date(item.Birthday),that.lastDepartureTime)?'儿童':(utils.isAdult(new Date(item.Birthday),that.lastDepartureTime)?'成人':'婴儿');
        let name =utils.getName(item);
        return {
          id:item.ID,
          name:name,
          cardType:item.CardType,
          CardNo:item.CardNo,
          passengerType:passengerType
        }
      })
   }
   ,
   refreshPassengerHandle:function(){
      var that=this;
      app.globalData.refreshPassenger=function(){
        let passengerInfo= wx.getStorageSync('passengerInfo');
        if(that.productKey==passengerInfo.productKey){
          that.passengerInfo=passengerInfo;
          let passengerList=passengerInfo.passengerList;
          let selectedPassengerList=passengerInfo.selectedPassengerList;
          that.setData({
            passengerList:that.getSelectedPassengerList(passengerList,selectedPassengerList)
          })
          app.globalData.refreshPassenger=null;
        }
      }
   }
   ,
   getTotalPrice:function(){
       let totalPrice= Math.floor(((this.flightAndHotelPrice||0)+(this.taxPrice||0)-(this.couponPrice||0))*100)/100;
       return totalPrice>0?totalPrice:0;
   },

   inputChangeHandle:function(e){
      var key=e.currentTarget.id;
      var data={};
      data[key]=e.detail.value;
      this.setData(data);
   },

   bindKeyInput: function(e) {
      this.inputChangeHandle(e);
   }
   ,
    //开关函数
   switch1Change: function (e){
     this.inputChangeHandle(e);
  },

   // 遮罩层
 showMask:function(e){
    //  console.log(e)
     this.setData({
     modalhidden:false
     })
   },
   hiddenMask:function(e){
     this.setData({
     modalhidden:true
     })
   },

  //  活动弹窗
  showactivity:function(e){
    console.log(e)
      this.setData({
      activityhide:false
     })
  },
  deleteHandle:function(e){
    let id=e.currentTarget.dataset.id;
    let that=this;
    utils.confirm('是否删除旅客？',function(res){
      if(!res.confirm)return;
      that.passengerInfo.selectedPassengerList=that.passengerInfo.selectedPassengerList.filter(function(item){
        return item!=id;
      })
      wx.setStorageSync('passengerInfo',that.passengerInfo);
      let passengerList=that.data.passengerList.filter(function(item){
        return item.id!=id;
      })
      that.setData({
        passengerList:passengerList
      })
    })
  },
  editHandle:function(e){
    this.refreshPassengerHandle();
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'../createTraveller/createTraveller?type=1&id='+id
    })
  },

  //选择
  catchTapHandle:function(){

  },
  verify:function(value) {
      var total = this.adultNum * 1 + this.childrenNum * 1,
          msg = '',
          selectedLists=[],
          billShow=this.data.hasInvoice,
          hasAgree=this.data.hasAgree;
      let passengerInfo= wx.getStorageSync('passengerInfo');
      if(this.productKey==passengerInfo.productKey){
        let passengerList=passengerInfo.passengerList;
        let selectedPassengerList=passengerInfo.selectedPassengerList;
        selectedLists= passengerList.filter((item)=>{
          return selectedPassengerList.indexOf(item.ID)>-1;
        })
      }

      if (this.isInternational) {
          msg = this.verifyInterPassener(selectedLists);
      }
      else {
          msg = this.verifyPassener(selectedLists);
      }

      if(!hasAgree){
        return '同意须知项方能进行下一步预定！';
      }
      else if (msg)
          return msg;
      else if (selectedLists.length < total) {
          msg = '选择的旅客人数不能小于出行人数！';
      }else if(!value.contactName){
          msg = '联系人姓名为空！';
      }else if(!utils.verifyName(value.contactName)){
          msg = '联系人姓名格式错误！';
      }else if (!value.contactPhone) {
          msg = '联系人手机号为空！';
      }else if (!utils.verifyPhone(value.contactPhone)) {
          msg = '联系人手机号格式错误！'
      }else if (!value.contactEmail){
          msg = '联系人邮箱为空！'
      }else if (!utils.verifyEmail(value.contactEmail)){
          msg = '联系人邮箱格式错误！';
      }else if (billShow && !utils.isChinaOrNumbOrLett(value.invoiceTitle)) {
          msg = '发票抬头为空或包含特殊字符！';
      }else if (billShow && ! value.invoiceName) {
          msg = '发票收件人为空！';
      }else if (billShow && !utils.verifyName(value.invoiceName)){
          msg = '发票收件人格式错误！'
      }else if (billShow && !value.invoicePhone) {
          msg = '收件人电话号码为空！';
      }else if (billShow && !utils.verifyPhone(value.invoicePhone)) {
          msg = '收件人电话号码格式错误！';
      }else if (billShow && !utils.isChinaOrNumbOrLett(value.invoiceAddress)) {
          msg = '地址为空或包含特殊字符！';
      }else if (billShow && !value.postCode) {
          msg = '邮政编码为空！';
      }else if (billShow && !utils.verifyPostCode(value.postCode)) {
          msg = '邮政编码格式不正确！';
      }
      return msg;
  },
  verifyInterPassener:function(passengerLists) {
      let msg = '',
          selectChild=0,
          selectAdult=0;
      passengerLists.some((item)=> {
          if(item.Birthday){
              let birDay=new Date(dateFormat.timestamp(item.Birthday,1)),
                  nowDate=new Date();
              if(utils.isChild(birDay,this.lastDepartureTime)){
                  selectChild++;
              }else if(utils.isAdult(birDay,this.lastDepartureTime)){
                  selectAdult++;
              }

          }

          if (!item.PassengerNameEN || item.PassengerNameEN == '/')
              msg = '英文名为空！';
          else if (item.CardType == null||item.CardType==0)//国际旅客没有身份证
              msg = '证件号码为空！';
          else if (!item.CardNo)
              msg = '证件号为空！';
          else if (!item.CheckCity) {
              msg = '签发地为空！';
          }
          else if (!item.CheckDate) {
              msg = '签发日期为空！';
          }
          else if (!item.PassportExpireDate) {
              msg = '证件有效期为空！';
          }
          else if (!item.CountryCode) {
              msg = '国籍为空！';
          }
          else if (!item.Birthday)
              msg = '生日为空！';
          else if(item.CardType==1&&!utils.varifyPassport(item.CardNo)){
              msg='护照格式错误，其由5-15位的字母和数字组成！';
          }else if(!utils.verifyName_2(item.PassengerName)){
              msg='中文姓名格式错误！';
          }

          if (msg) {
              msg = item.PassengerName + msg
              return true;
          }
      })
      if(!msg){
          if(selectChild==0&&selectAdult==0)
              msg='请您添加旅客！';
          else if(selectAdult!=this.adultNum)
              msg='成人人数不匹配,请修改后重新提交';
          else if(selectChild!=this.childrenNum)
              msg='儿童人数不匹配,请修改后重新提交';
      }

      return msg;
  },
  verifyPassener:function(passengerLists) {
    var msg = '',
        selectChild=0,
        selectAdult=0;
    passengerLists.some((item)=> {
        if(item.Birthday){
            let birDay=new Date(dateFormat.timestamp(item.Birthday,1)),
                nowDate=new Date();
            if(utils.isChild(birDay,this.lastDepartureTime)){
                selectChild++;
            }else if(utils.isAdult(birDay,this.lastDepartureTime)){
                selectAdult++;
            }
        }

        if (!item.PassengerName)
            msg = '中文名为空！';
        else if (item.CardType == null)
            msg = '证件类型为空！'
        else if (!item.CardNo)
            msg = '证件号为空！';
        else if (!item.Birthday)
            msg = '生日为空！';
        else if(item.CardType==1&&!utils.varifyPassport(item.CardNo)){
            msg='护照格式错误，其由5-15位的字母和数字组成！';
        }else if(!utils.verifyName_2(item.PassengerName)){
            msg='中文姓名格式错误！';
        }
        if (msg) {
            msg = item.PassengerNameEN + msg
            return true;
        }
    })
    if(!msg){
        if(selectChild==0&&selectAdult==0)
            msg='请您添加旅客！';
        else if(selectAdult!=this.adultNum)
            msg='成人人数不匹配,请修改后重新提交';
        else if(selectChild!=this.childrenNum)
            msg='儿童人数不匹配,请修改后重新提交';
    }

    return msg;
  },
  agreeChange:function(e){
    var key=e.currentTarget.id;
    var data={};
    data[key]=!this.data[key];
    this.setData(data);
  },

  //表单验证
  formBindsubmit:function(e){
    var value=e.detail.value;
    var msg=this.verify(value);
    if(msg){
      utils.message(msg);
    }else{
      app.globalData.afterLogin.then(()=>{
          let passengerInfo= wx.getStorageSync('passengerInfo');
          let selectedPassengerList=[];
          let hasInvoice=this.data.hasInvoice;
          let contactInfo=Object.assign({},this.contactInfo,{
              ReceivingName:value.contactName,
              MobilePhone:value.contactPhone,
              Email:value.contactEmail
          })
          let invoiceInfo;
          if(hasInvoice){
            invoiceInfo=Object.assign({},this.invoiceInfo,{
                DetailAddress:value.invoiceAddress,
                Name:value.invoiceName,
                MobilePhone:value.invoicePhone,
                Title:value.invoiceTitle,
                PostCode:value.postCode
            })
          }

          contactInfo.InvoiceInfo=invoiceInfo;

          if(this.productKey==passengerInfo.productKey){
              selectedPassengerList=passengerInfo.selectedPassengerList;
          }
          utils.loadingShow();
          if(this.loading)return;
          this.loading=true;
          app.post('api/Order/CreateOrder',{
            ProductKey: this.productKey,
            PassengerIDList: selectedPassengerList,
            ContactInfo: contactInfo,
            CouponIDList: [],
            CouponCodeList:[],
            Point:0
          }).then((data)=>{
            this.loading=false;
            if(this.isUnload)return;
            wx.hideToast();
            if(data.Code==4){
              app.login().then(()=>{
                utils.message('网络请求失败，请重新提交！');
              })
            }else if(data.Code==200){
              this.goPay(data.Data);
              let fn=app.globalData.reloadOrderList;
              if(typeof fn=='function'){
                setTimeout(fn,0);
              }
            }else if(data.Msg){
              utils.message(data.Msg);
            }
          }).catch((e)=>console.log(e))
      }).catch((e)=>console.log(e))
    }
  },
  goPay:function(data){
    wx.requestPayment({
      'timeStamp': data.TimeStamp,
      'nonceStr': data.NonceStr,
      'package': data.Package,
      'signType': data.SignType,
      'paySign': data.PaySign,
      success: ()=>{
        utils.message('支付成功！',function(){
          wx.switchTab({
            url: '../orderlist/orderlist'
          })
        })
      },
      fail: ()=>{
        utils.message('支付失败！');
      }
    })
  }
  ,
  showCostDetail(){
    this.setData({
      costDetail: {
        show: true
      }
    })
  },

  hideCostDetail(){
    this.setData({
      costDetail: {
        show: false
      }
    })
  },
  onUnload:function(){
    this.isUnload=true;
  }
})
