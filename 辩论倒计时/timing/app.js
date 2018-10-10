//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据--配置数据
    var configs = wx.getStorageSync('configs');
    if(!configs){
      configs = this.initConfigs();
    }
    wx.setStorageSync('configs', configs)
  },
  //初始化化configs
  initConfigs:function(){
    var configs = Object.create(null);
    var step1 = Object.create(null);
    step1.id = "step1";
    step1.name = "立论阶段";
    step1.state = true;
    step1.time = 180;
    step1.voice = 15;
    step1.desc = "\n(一) 正方一辩开篇立论,@  \n\n (二) 反方一辩开篇立论,@";
    configs.step1 = step1;

    var step2 = Object.create(null);
    step2.id = "step2";
    step2.name = "驳立论阶段";
    step2.state = true;
    step2.time = 120;
    step2.voice = 15;
    step2.desc = "\n(一) 反方二辩驳对方立论,@  \n\n(二) 正方二辩驳对方立论,@";
    configs.step2 = step2;

    var step3 = Object.create(null);
    step3.id = "step3";
    step3.name = "质辩阶段";
    step3.state = true;
    step3.time = 90;
    step3.voice = 15;
    step3.desc = "\n(一) 正方三辩提问反方一，二，四辨各一个问题,反方辩手分别应答,累计时间为@ \n\n (二) 反方三辩提问正方一，二，四辨各一个问题,正方辩手分别应答,累计时间为@";
    configs.step3 = step3;

    var step4 = Object.create(null);
    step4.id = "step4";
    step4.name = "自由辩论";
    step4.state = true;
    step4.time = 240;
    step4.voice = 15;
    step4.desc = "\n(一) 自由辩论,@";
    configs.step4 = step4;

    var step5 = Object.create(null);
    step5.id = "step5";
    step5.name = "陈词阶段";
    step5.state = true;
    step5.time = 180;
    step5.voice = 15;
    step5.desc = "\n(一) 反方四辩总结陈词,@ \n\n(二) 正方四辩总结陈词,@";
    configs.step5 = step5;

    return configs;
  }
})