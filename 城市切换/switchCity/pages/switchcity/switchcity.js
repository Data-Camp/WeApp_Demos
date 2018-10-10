var city = require('../../utils/city.js');


Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    tHeight:0,
    bHeight:0,
    startPageY:0,
    cityList:[],
    isShowLetter:false,
    scrollTop:0,
    city:""
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList=city.cityList();
    // console.log(cityInfo);

    var sysInfo = wx.getSystemInfoSync();
    console.log(sysInfo);
    var winHeight = sysInfo.windowHeight;

    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;

      tempObj.push(temp)
    }
    
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList:cityList
    })

    console.log(this.data.cityInfo);
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  searchStart: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    var pageY = e.touches[0].pageY;
    this.setScrollTop(this,showLetter);
    this.nowLetter(pageY,this);
      this.setData({
        showLetter: showLetter,
        startPageY: pageY,
        isShowLetter:true,
      })
  },
  searchMove: function (e) {
    var pageY = e.touches[0].pageY;
    var startPageY=this.data.startPageY;
    var tHeight=this.data.tHeight;
    var bHeight=this.data.bHeight;
    var showLetter = 0;
    console.log(pageY);
    if(startPageY-pageY>0){ //向上移动
        if(pageY<tHeight){
          // showLetter=this.mateLetter(pageY,this);
          this.nowLetter(pageY,this);
        }
    }else{//向下移动
        if(pageY>bHeight){
            // showLetter=this.mateLetter(pageY,this);
            this.nowLetter(pageY,this);
        }
    }
  },
  searchEnd: function (e) {
    // console.log(e);
    // var showLetter=e.currentTarget.dataset.letter;
    var that=this;
    setTimeout(function(){
      that.setData({
      isShowLetter:false
    })
    },1000)
    
  },
  nowLetter: function (pageY, that) {//当前选中的信息
    var letterData = this.data.searchLetter;
    var bHeight = 0;
    var tHeight = 0;
    var showLetter="";
    for (var i = 0; i < letterData.length; i++) {
      if (letterData[i].tHeight <= pageY && pageY<= letterData[i].bHeight) {
        bHeight = letterData[i].bHeight; 
        tHeight = letterData[i].tHeight;
        showLetter = letterData[i].name;
        break;
      }
    }

    this.setScrollTop(that,showLetter);

    that.setData({
      bHeight:bHeight,
      tHeight:tHeight,
      showLetter:showLetter,
      startPageY:pageY
      })
  },
  bindScroll:function(e){
    console.log(e.detail)
  },
  setScrollTop:function(that,showLetter){
      var scrollTop=0;
      var cityList=that.data.cityList;
      var cityCount=0;
      var initialCount=0;
      for(var i=0;i<cityList.length;i++){
         if(showLetter==cityList[i].initial){
           scrollTop=initialCount*30+cityCount*41;
            break;
         }else{
            initialCount++;
            cityCount+=cityList[i].cityInfo.length;
         }
      }

      that.setData({
        scrollTop:scrollTop
      })
  },
  bindCity:function(e){
    var city=e.currentTarget.dataset.city;
    this.setData({city:city})
  }
})