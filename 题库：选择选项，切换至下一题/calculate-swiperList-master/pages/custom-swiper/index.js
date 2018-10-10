const https = require('../../public/js/douban.js')

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    onLoadUrl:'?m=Exam&c=Server&a=getQuestionID',
    active:0
  },
  onLoad (params) {
    https.initialize(this.data.onLoadUrl,{page:params.id,'option_type':2})
      .then(d => {
        this.data.lists = d.data;
        this.setData(this.data);
      })
      .catch(e => {
        // this.setData({ subtitle: '获取数据异常', movies: [], loading: false })
        // console.error(e)
      })
  },
  setEvent:function(e){
    this.data.touchstartEvent = e;
  },
  click:function(e){
    var that = this,
        active = this.data.active,
        dire = this.getDirection(this.data.touchstartEvent,e),
        storeSetTime,
        animationO = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 1000,
          timingFunction: "ease",
          delay: 0
        }),
        animationT = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 1000,
          timingFunction: "ease",
          delay: 0
        }),
        animationS = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 1000,
          timingFunction: "ease",
          delay: 0
        });
    if(!this.$isLock){//锁屏控制
      this.$isLock = true;
      if(dire == 'bottom' || dire == 'top'){
        return false;
      }
      if(dire == 'right'){
        animationO.translate3d('0',0,0).step();
        animationT.translate3d('100%',0,0).step();
        if(this.data.active > 0){
          active = this.data.active - 1;
        }else{
          this.$isLock = false;
          return;
        }
      }
      if(dire == 'left'){
        animationT.translate3d('-100%',0,0).step();
        animationS.translate3d('0',0,0).step();
        active = this.data.active + 1;
        if(this.data.active < 9 ){
          active = this.data.active + 1;
        }else{
          this.$isLock = false;
          return;
        }
      }
      this.setData({
        animationO:animationO.export(),
        animationT:animationT.export(),
        animationS:animationS.export(),
        lists:this.data.lists,
        active:this.data.active
      });
      setTimeout(function(){ 
        that.setHtmlsetHtml(active);
      },1000);
    }
  },
  //修改页面至正常位置
  setHtmlsetHtml:function(active){
    var animationO = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          timingFunction: "ease",
          delay: 0
        }),
        animationT = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          timingFunction: "ease",
          delay: 0
        }),
        animationS = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 0,
          timingFunction: "ease",
          delay: 0
        });     
      animationO.translate3d('-100%',0,0).step();
      animationT.translate3d('0',0,0).step();
      animationS.translate3d('100%',0,0).step();
      this.setData({
        lists:this.data.lists,
        animationO,
        animationT,
        animationS,
        active
      });
      this.$isLock = false;
  },
  //获得手势方向
  getDirection:function(startEvent,endEvent){
    var x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX,
        y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY,
        pi=360*Math.atan(y/x)/(2*Math.PI);
        if(pi<30 && pi>-30 && x>0 && Math.abs(x) > 20){
          return 'right';
        }
        if(pi<30 && pi>-30 && x<0 && Math.abs(x) > 20){
          return 'left';
        }
        if((pi<-60 || pi>60) && y>0 && Math.abs(y) > 20){
          return 'bottom';
        }
        if((pi<-60 || pi>60) && y<0 && Math.abs(y) > 20){
          return 'top';
        }
  }
})