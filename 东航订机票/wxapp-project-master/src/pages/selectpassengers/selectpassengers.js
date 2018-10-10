let app = getApp();
let utils = require('../../utils/utils');
//获取应用实例
Page({
  data: {
  },
  onLoad:function(){
    let passengerInfo=this.passengerInfo= wx.getStorageSync('passengerInfo');
    this.passengerList=passengerInfo.passengerList;
    this.selectedPassengerList=passengerInfo.selectedPassengerList||[];
    this.lastDepartureTime=passengerInfo.lastDepartureTime;
    this.childrenNum=passengerInfo.childrenNum*1||0;
    this.adultNum=passengerInfo.adultNum*1||0;
    this.setData({
      childrenNum:this.childrenNum,
      adultNum:this.adultNum,
      passengerList:this.getPassengerList(this.passengerList)
    })
    
  },
   getPassengerList:function(list){
    let that=this;

    return (list||[]).map(function(item){
      let passengerType=utils.isChild(new Date(item.Birthday),that.lastDepartureTime)?'儿童':(utils.isAdult(new Date(item.Birthday),that.lastDepartureTime)?'成人':'婴儿');
      let name =utils.getName(item);
      let type=utils.getCardType(item.CardType);
      let selected=that.selectedPassengerList.indexOf(item.ID)>-1;
      return {
        id:item.ID,
        name:name,
        cardType:type,
        CardNo:item.CardNo,
        passengerType:passengerType,
        selected:selected
      }
    })
   }
  ,
  selectHanlder:function(e){
    let id=e.currentTarget.id*1;
    let index=e.currentTarget.dataset.index;
    let passengerItem=this.data.passengerList[index];
    let selected= !passengerItem.selected;
    if(selected){
      let len=this.selectedPassengerList.length;
      if(len==this.adultNum+this.childrenNum){
        utils.message('选择旅客人数不能超过出行人数!');

        return;
      }
      if(this.selectedPassengerList.indexOf(id)==-1){
        this.selectedPassengerList.push(id);
      }
    }else{
      this.selectedPassengerList=this.selectedPassengerList.filter(function(item){
        return item!=id;
      })
    }
    
    passengerItem.selected=selected;
    this.setData({
      passengerList:this.data.passengerList
    })
  },
  catchTapHandle:function(){

  }
  ,
  
  confirm:function(){
    wx.setStorageSync('passengerInfo',Object.assign({},this.passengerInfo,{
      selectedPassengerList:this.selectedPassengerList
    }));
    let fn=app.globalData.refreshPassenger;
    if(typeof fn=='function')
      setTimeout(fn,0);
    wx.navigateBack({
      delta:1
    })
  },
  add:function(){
    wx.navigateTo({
      url:'../createTraveller/createTraveller?type=2'
    })
  }


})
