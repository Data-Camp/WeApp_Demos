//index.js
//获取应用实例
var app = getApp()

Page({
  data:{
    hero:[],
    welcome:true,
    pageAmima:false,
    animationData: {},
    animationData2:{},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    swiperImgs: [
        {
            src:'http://pic2.ooopic.com/13/60/80/83b2OOOPIC4f.jpg',
        },
        {
            src:'http://pic.baike.soso.com/p/20131212/20131212110545-1954567595.jpg',
        },
        {
            src:'http://imgsrc.baidu.com/forum/w%3D580/sign=99b9dd39a6efce1bea2bc8c29f50f3e8/a769fe0e7bec54e73f8784d1b8389b504ec26a68.jpg',
        }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200,
    startX:0,
    startY:0,
    direction:0,
    menuIsopen:false,
  },
  //第一步
  onLoad:function(options){
    console.log('加载成功',options)
    setTimeout(()=>{
        var animation = wx.createAnimation({
        })
         this.animation = animation
        animation.opacity(1).step()
        this.setData({
            welcome:false,
            animationData:animation.export(),
        })
    },3000)
  },
  //第二步
  onShow:function(){
    console.log('监听页面显示')
    
  },
  //第三步
  onReady:function(e){
    console.log('渲染完成',e)
    this.setData({
        hero:getApp().globalData.heroes
    })

    var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'ease',
    })

    this.animation = animation
    animation.opacity(1).scale(1, 1).step()
    this.setData({
      animationData:animation.export()
    })

    
  },
  tapMe:function(e){
    console.log(this)
    console.log(e.currentTarget.dataset)
    console.log(e)

    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../detail/detail?=',
      success:function(){
        console.log('跳转成功')
        
        wx.setStorage({
          key:"detailID",
          data:id
        });
      }
    })
  },

  changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeVertical: function (e) {
        this.setData({
            vertical: !this.data.vertical
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    ontouchStart:function(e){
        console.log('开始',e)

        this.setData({
            startX : e.touches[0].pageX,
            startY : e.touches[0].pageY
        })
    },
    ontouchMove:function(e){
        console.log('移动',e)

        var endX, endY;  
        endX = e.touches[0].pageX;  
        endY = e.touches[0].pageY;  
        var direction = this.getDirection(this.data.startX, this.data.startY, endX, endY);  

        this.setData({
            direction:direction
        })
        // switch(direction) {  
        //     case 0:  
        //         alert("没滑动");  
        //         break;  
        //     case 1:  
        //         alert("向上");  
        //         break;  
        //     case 2:  
        //         alert("向下");  
        //         break;  
        //     case 3:  
        //         alert("向左");  
        //         alert("!");  
        //         break;  
        //     case 4:  
        //         alert("向右");  
        //         break;  
        //     default:             
        // }  
        console.log()
    },
    ontouchEnd:function(e){
        console.log(this.data.direction)
        if(this.data.direction === 4){
            this.setData({
                menuIsopen:true,
            })
        }else if(this.data.direction === 3){
            this.setData({
                menuIsopen:false
            })
        }
        console.log('结束',e)
    },
    //获取角度
    getAngle:function(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    getDirection:function(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = this.getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
  
  
})
