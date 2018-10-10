//home.js
//获取应用实例
// var ajax = require('../../utils/ajax.js')
// var CountDown = require('../../utils/countdown.js');

var app = getApp()
Page({
  data: {
    scrollTop:0,
    height:"1000px",
    /*轮播图*/
    swiper:{
      height:"420rpx",
      imgUrls: [],
      changeHandler:function(e){
        console.log(e.detail.current)
      },
      indicatorDots: false,
      autoplay: false,
      interval: 0,
      duration: 0
    },
    /*类目列表*/
    sortRows:[
      [
        {
          image:"./images/wx.png",
          title:"文胸",
          url:"./"
        },
        {
          image:"./images/nk.png",
          title:"内裤",
          url:"./"
        },
        {
          image:"./images/jjf.png",
          title:"家居服",
          url:"./"
        },
        {
          image:"./images/ssy.png",
          title:"塑身衣",
          url:"./"
        },
        {
          image:"./images/wp.png",
          title:"袜品",
          url:"./"
        }
      ],[
        {
          image:"./images/bnny.png",
          title:"保暖内衣",
          url:"./"
        },
        {
          image:"./images/cgny.png",
          title:"常规内衣",
          url:"./"
        },
        {
          image:"./images/ddk.png",
          title:"打底裤",
          url:"./"
        },
        {
          image:"./images/ssdp.png",
          title:"时尚单品",
          url:"./"
        },
        {
          image:"./images/more.png",
          title:"更多",
          url:"./"
        }
      ]
    ],
    /*拼团*/
    groups:[
      {
        teamBuyingDesc:"秋衣扎在秋裤里秋裤扎在袜子里这是对冬天最起码的尊重，但是首先你要有秋衣和秋裤。壹级采本期为您推荐37度恒温发热衣，秋衣秋裤纯棉系列，秋衣秋裤莫代尔系列，一定要看哦！",
        teamBuyingId:28,
        teamBuyingImg:"http://img-service.yijicai.cn/modTeamBuying/ab041947-54ed-4251-a4a4-635c89fdaeb6.png",
        teamBuyingTitle:"【天天拼货团-秋衣秋裤专场】",
        time:6000
      }
    ]

  },
  onLoad: function (opts) {
   console.log("onload");
   console.log(opts);
   console.log("onload");
   this.loadData();
  },
  onUnload: function (opts) {
   console.log("onUnload");
   
  },
  onReady:function(){
  },
  onShow:function(opts){
    console.log("onshow");
   console.log(opts);
   console.log("onshow");
  },
  //加载页面数据
  loadData:function(){
    var vm = this;
    // 加载轮播和拼团
    wx.request({
      url: 'https://safe.yijicai.cn/wap/data/get?action=tbIndex', //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var data = res.data;
        var result = data.result;
        var teamBuying = result.teamBuying;
        teamBuying = [
          {
            teamBuyingImg: "http://img-service.yijicai.cn/addTeamBuying/5096903f-c0b6-4f98-8917-26fc46c65544.png",
            teamBuyingId: 30,
            time: -26000,
            teamBuyingTitle: "【天天拼货团-厂家内裤专场】",
            teamBuyingDesc: "秋天纯棉内裤专场会。"
          },
          {
            teamBuyingImg: "http://img-service.yijicai.cn/addTeamBuying/69bba867-fdd4-405d-80e8-e93db36e27e2.png",
            teamBuyingId: 29,
            time: 27000,
            teamBuyingTitle: "【天天拼货团-打底保暖专场】",
            teamBuyingDesc: "降温了！客户说必须到“壹级采”采购保暖衣、打底裤回来卖！壹级采搜罗了爆款跑量的加绒保暖衣，百搭内搭外穿打底裤，保证品质，绝对低价！"
          },
          {
            teamBuyingImg: "http://img-service.yijicai.cn/modTeamBuying/ab041947-54ed-4251-a4a4-635c89fdaeb6.png",
            teamBuyingId: 28,
            time: 28000,
            teamBuyingTitle: "【天天拼货团-秋衣秋裤专场】",
            teamBuyingDesc: "秋衣扎在秋裤里秋裤扎在袜子里这是对冬天最起码的尊重，但是首先你要有秋衣和秋裤。壹级采本期为您推荐37度恒温发热衣，秋衣秋裤纯棉系列，秋衣秋裤莫代尔系列，一定要看哦！"
          },
          {
            teamBuyingImg: "http://img-service.yijicai.cn/addTeamBuying/2629d616-2029-4fa9-9ef5-748c3f0acb44.png",
            teamBuyingId: 27,
            time: 29000,
            teamBuyingTitle: "【天天拼货团-可爱袖套专场】",
            teamBuyingDesc: "冬季,各式各样的温暖大衣将会成为唯一热卖的单品... 一个实用的单品横空出世,不仅解决了保暖问题,同时也成为冬季时尚不可或缺的搭配,那就是袖套.壹级采为您推荐卡哇依16年新款袖套！"
          },
          {
            teamBuyingImg: "http://img-service.yijicai.cn/addTeamBuying/4a6913f7-07e5-4055-a14b-c70c12c5ae39.png",
            teamBuyingId: 25,
            time: 30000,
            teamBuyingTitle: "【天天拼货团-冬季棉拖专场（50双发货）】",
            teamBuyingDesc: "万佳鑫热销爆款棉拖又来了！本期壹级采为您推荐万佳鑫包跟拖鞋，更暖，更舒适，一定要关注哟！"
          }
        ];
        
        vm.setData({
          groups:teamBuying,
          'swiper.imgUrls':result.ads.map(function(item,index){
            return item.adsImg
          })
        });



        var timeArr =  teamBuying.map(function(item,index){
          return {
            time: item.time,
            index: index
          };
        });
        // new CountDown.CountDown({
        //   timeArr:timeArr,
        //   fn:function(){

        //   }
        // })

        function countDown(){
          var item;
          var update = {};
          for(var i=0;i<timeArr.length;i++){
            item = timeArr[i];
            item.time -= 100;
            // debugger;
            update["groups["+item.index+"].time"] = item.time;
            update["groups["+item.index+"].timeObj"] = timeConverter(item.time);
            if( item.time <= 0){
              timeArr.splice(i--,1);
            }
          }
          console.log("countdown.......");
          vm.setData(update);
          if(timeArr.length){
              setTimeout(countDown,100);
          }
        }
        countDown();
        function timeConverter(time){
          time=parseInt(time);
          // 分秒（毫秒）
          var minSec=parseInt( (time % 1000) / 100 );
          var sec= parseInt( time % 60000 / 1000 );
          sec=sec>=10?sec+"":"0"+sec;
          var min=parseInt( time % 3600000 / 60000 );
          min=min>=10?min+"":"0"+min;
          var hour=parseInt( time / 3600000 );
          hour=hour>=10?hour+"":"0"+hour;
          return {
            minSec:minSec,
            sec:sec,
            min:min,
            hour:hour
          }
        }
      }
   });

   //加载推荐商品
   wx.request({
    url: 'test.php', //仅为示例，并非真实的接口地址
    data: {
      x: '' ,
      y: ''
    },
    header: {
        'content-type': 'application/json'
    },
    success: function(res) {
      console.log(res.data)
    }
  });


  },
  //搜索框点击
  searchtap:function(event){
    // console.log(event.currentTarget.dataset);
    // wx.navigateTo({
    //   url: '../productDetail/productDetail'
    // });
    // console.log(11111);
  },
  //拼团
  grouptap:function(event){
    var id=event.currentTarget.dataset.id;
    console.log(id);
    // wx.navigateTo({
    //   url: '../?id='+id
    // });
  },
  //页面竖向滚动(触发频率太低了)
  scrollY:function(event){
    var that=this;
    var scrollTop=event.detail.scrollTop;
    that.setData({
        scrollTop:scrollTop
    });
    console.log(scrollTop);
  },
  /*跳转页面 */
  pageTo:function(page){
    wx.navigateTo({
      url: page,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }

})

