const https = require('../../public/js/douban.js')
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    isLoading:false,//加载
    isNoFirst:true,//当前页是否不是第一次做答
    swiper:{
      active:0
    },
    layerlayer:{
      isLayerShow:false,//默认弹窗
      layerAnimation:{},//弹窗动画
    },
    answers:{
      onLoadUrl:'?m=Exam&c=Server&a=getQuestionID',//题目号链接      
      start:0,//初始题号
      end:0,//结束题号
      allLists:[],//题号数据
      activeNum:0,//当前显示条数
      onceLoadLength:5,//一次向俩端加载条数
      url:'?m=Exam&c=Server&a=getQuestion',//题目详情链接
      isShowTip:false//默认是否显示提示
    }
  },
  //单选逻辑
  tapRadio:function(e){
    var thisOption=e.currentTarget.dataset.option.split(",");
    var list = this.data.answers.list[thisOption[2]].options.map(function(option,i){ 
      if(thisOption[1] == i && option.class != 'active'){
        option.Select = true;
      }else{
        option.Select = false;        
      }
      return option
    });      
    this.data.answers.list.options = list;
    this.tapSelect(e);
  },
  //多选逻辑
  tapCheckbox:function(e){
    var thisOption=e.currentTarget.dataset.option.split(",");
    var list = this.data.answers.list.options.map(function(option,i){      
      if(thisOption[1] == i && option.class != 'active'){
        option.class = 'active';
        option.Select = true;
      }else if(thisOption[1] == i){
        option.class = '';
        option.Select = false;        
      }
      return option
    });
    this.data.answers.list.options = list;
    this.setData(this.data);   
  },
  //答案判断逻辑
  tapSelect:function(e){
    if(!this.data.isNoFirst || this.data.answers.allLists[this.data.answers.start+this.data.swiper.active].isAnswer){
      return false;
    }    
    
    this.data.isNoFirst = false;
    var bool=true,data = this.data.answers.list[this.data.swiper.active].options.map(function(option,i){
      if(option.Select && !option.correct){
        option.class ='error';
        bool=false;
      }
      if(!option.Select && option.correct){
        option.class = 'active-success';
        bool=false;
      }
      if(option.Select && option.correct){
        option.class = 'success';
      }
      return option
    });
    
    if(bool){
      this.data.answers.allLists[this.data.answers.start+this.data.swiper.active].isAnswer = 1;
      this.data.answers.success++
    }else{
      this.data.answers.allLists[this.data.answers.start+this.data.swiper.active].isAnswer = 2;      
      this.data.answers.error++
    }

    this.data.answers.list.options = data;
    this.data.isShowTip = !bool;
    this.setData(this.data);
    //延迟加载滑动
    if(this.data.answers.activeNum + 1 < this.data.answers.allLists.length){
      setTimeout(() => this.onSwiper('left'),200);
    }else{
      // 结束了
      console.log(111)
    }
  },
  //页码切换列表效果
  pageClick:function(){
    var layerAnimation = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 500,
          timingFunction: "ease",
          delay: 0
        });
    if(!this.data.layerlayer.isLayerShow){ 
      layerAnimation.translate3d(0,0,0).step();
    }else{
      layerAnimation.translate3d(0,'100%',0).step();
    }
    this.data.layerlayer.isLayerShow = !this.data.layerlayer.isLayerShow;
    this.data.layerlayer.layerAnimation =  layerAnimation; 
    this.setData(this.data);
  },
  //页码切换列表收缩
  layerFooterClick:function(){
    var layerAnimation = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 500,
          timingFunction: "ease",
          delay: 0
        });
    layerAnimation.translate3d(0,'100%',0).step();
    this.data.layerlayer.isLayerShow = false;
    this.data.layerlayer.layerAnimation =  layerAnimation; 
    this.setData(this.data);
  },
  //收藏逻辑
  collectList:function(){
    this.data.answers.list.isStore = !this.data.answers.list.isStore;
    this.setData( this.data)
  },
  //题号变更逻辑
  setActiveNum:function(e){
    var thisOption=e.currentTarget.dataset.option - 0;
    this.data.answers.activeNum = thisOption;
    this.data.isNoFirst = false;  
    this.data.isLoading = false;  
    this.layerFooterClick();
    this.getSubject();
  },
  //swiper切换
  setEvent:function(e){
    this.data.swiper.touchstartEvent = e;
    return false;
  },
  //滑动结束
  touchEnd:function(e){
    this.onSwiper(this.getDirection(this.data.swiper.touchstartEvent,e));
    return false;
  },
  //swiper切换
  onSwiper:function(dire){
    var that = this,
        active = 0,
        storeSetTime,
        animationO = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 300,
          timingFunction: "ease",
          delay: 0
        }),
        animationT = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 300,
          timingFunction: "ease",
          delay: 0
        }),
        animationS = wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 300,
          timingFunction: "ease",
          delay: 0
        });
    if(!this.$isLock){//锁屏控制
      this.$isLock = true;
      if(dire == 'bottom' || dire == 'top' || !dire){
        this.$isLock = false;
        return false;
      }
      if(dire == 'right'){
        animationO.translate3d('0',0,0).step();
        animationT.translate3d('100%',0,0).step();
        if(this.data.answers.activeNum > this.data.answers.start){
          active = - 1;
        }else{
          this.$isLock = false;
          return;
        }
      }
      if(dire == 'left'){
        animationT.translate3d('-100%',0,0).step();
        animationS.translate3d('0',0,0).step();
        if(this.data.answers.activeNum < this.data.answers.end-1 ){
          active = 1;
        }else{
          this.$isLock = false;
          return;
        }
      }
      this.data.isNoFirst =true;
      this.data.swiper.animationO = animationO.export();
      this.data.swiper.animationT = animationT.export();
      this.data.swiper.animationS = animationS.export();
      this.setData(this.data);
      
      this.data.swiper.active = this.data.swiper.active + active;
      this.data.answers.activeNum = this.data.answers.activeNum + active;
      setTimeout(function(){ 
        that.setHtmlsetHtml(active);
      },300);
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

      this.data.swiper.animationO = animationO;
      this.data.swiper.animationT = animationT;
      this.data.swiper.animationS = animationS;
      this.setData(this.data);

      //调用加载数据方法
      if( (this.data.swiper.active == 2 && this.data.answers.start > 0) || (this.data.swiper.active+2 == this.data.answers.list.length && this.data.answers.end < this.data.answers.allLists.length)){
        this.getSubject();
      }

      //调用滑动结束回调
      if(this.isLockCall && typeof this.isLockCall == 'function'){
        this.isLockCall();
        this.isLockCall = false;
      }
      this.$isLock = false;
  },
  //获得手势方向
  getDirection:function(startEvent,endEvent){
    var x = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX,
        y = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY,
        pi=360*Math.atan(y/x)/(2*Math.PI);
        if(pi<25 && pi>-25 && x>0 && Math.abs(x) > 10){
          return 'right';
        }
        if(pi<25 && pi>-25 && x<0 && Math.abs(x) > 10){
          return 'left';
        }
        if((pi<-75 || pi>750) && y>0 && Math.abs(y) > 10){
          return 'bottom';
        }
        if((pi<-75 || pi>75) && y<0 && Math.abs(y) > 10){
          return 'top';
        }
  },
  //切换题目逻辑
  getSubject:function(){
    var that=this,start = this.data.answers.activeNum - this.data.answers.onceLoadLength,end = this.data.answers.activeNum + this.data.answers.onceLoadLength;
    start = start > 0 ? start : 0 ;
    end = end > this.data.answers.allLists.length ? this.data.answers.allLists.length : end ;
    this.data.answers.start = start;
    this.data.answers.end = end;
    
    start = this.data.answers.allLists.slice(start,end);
    start = start.map(function(data){
      //后台需要int型
      return data.id-0
    });
        
    https.find(this.data.answers.url,{questionID:start})
      .then(d => {

          //注册滑动结束回调
          if(this.$isLock){
            this.isLockCall = function(){
              this.data.swiper.active = this.data.answers.activeNum-this.data.answers.start;          
              this.data.answers.list = d.data;
              this.data.isLoading = false; 
              this.data.isNoFirst = true; 
              this.setData(this.data);
            }
          }else{
            this.data.swiper.active = this.data.answers.activeNum-this.data.answers.start;          
            this.data.answers.list = d.data;
            this.data.isLoading = false; 
            this.data.isNoFirst = true; 
            this.setData(this.data);
          }
      })
      .catch(e => {
        // this.setData({ subtitle: '获取数据异常', movies: [], loading: false })
        // console.error(e)
      })
  } ,
  onLoad (params) {
      https.initialize(this.data.answers.onLoadUrl,{page:params.id,'option_type':2})
      .then(d => {
          this.data.answers.allLists = d.data;
          this.data.answers.success = d.success;
          this.data.answers.error = d.error;
          this.data.answers.loading = false;    
          this.setData(this.data);
          this.getSubject();
      })
      .catch(e => {
        
          console.log(e)
        // this.setData({ subtitle: '获取数据异常', movies: [], loading: false })
        // console.error(e)
      });
  },
});