// pages/index/index.js
var stepList = ['立论阶段', '驳立论阶段', '质辩阶段','自由辩论','陈词阶段'];
var leftMove = 0 ; //左边初始偏移的角度
var rightMove = 0 ; //右边初始偏移的角度
Page({
  data:{
    currentStep:{}, //当前第一个阶段
    currentStepList:[], //当前可利用阶段对象，包含第一个元素名字，第二个为描述，第三个为时间限制,都为数组，位置一一对应
    leftAnimationData:{},
    rightAnimationData:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    //在缓存中取出每一阶段的设置
    var configs = wx.getStorageSync('configs');
    var currentStepList = [];
    var currentStepNameList = []; //阶段名字list
    var currentStepDescList = [];// 阶段描述list
    var currentStepTimeList = [];//阶段时间list
    var currentStep = {};
    var current = true;
    for(var config in configs){
      var step = configs[config];
      if(step.state){
        currentStepNameList.push(step.name);
        currentStepDescList.push(step.desc);
        currentStepTimeList.push(step.time);
        if(current){
          var desc = step.desc.replace(/@/g,step.time + '秒'); //时间描述替换
          currentStep.name = step.name;
          currentStep.desc = desc;
          this.setData({
            currentStep:currentStep
          })
          current = !current;
        }
      }
    }
    currentStepList.push(currentStepNameList);
    currentStepList.push(currentStepDescList);
    currentStepList.push(currentStepTimeList);
    this.setData({
      currentStepList:currentStepList
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //改变阶段
  changeStep:function(){
    var page = this;
    var currentStepList = this.data.currentStepList;
    var currentStepNameList = currentStepList[0];//名字
    var currentStepdescList = currentStepList[1];//描述
    var currentStepTimeList = currentStepList[2];//时间
    if( !currentStepNameList || currentStepNameList.length == 0){
        wx.showModal({
            title: '小提示',
            content: '请至少开启一个阶段',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/config/config',
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
            }
          })
    }
    wx.showActionSheet({
      itemList: currentStepNameList,
      success: function(res) {
        if (!res.cancel) {
          var index = res.tapIndex;
          var currentStep= {};
          currentStep.name = currentStepNameList[index];
          currentStep.desc = currentStepdescList[index].replace(/@/g,currentStepTimeList[index] + '秒');
          page.setData({
            currentStep:currentStep
          })
        }
      }
    })
  },
  //leftStart --正方
  leftStart:function(){
      var animation = this.createAnimation();

      animation.rotate(leftMove+=100).step();

      this.setData({
        leftAnimationData:animation.export()
      });
  },
  //rightStart 反方
  rightStart:function(){
      var animation = this.createAnimation();

      animation.rotate(rightMove+=100).step();

      this.setData({
        rightAnimationData:animation.export()
      });
  },

  //创建动画对象
  createAnimation:function(){
     var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50% 0'
      });

      return animation;
  }
})