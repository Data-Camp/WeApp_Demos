Page({
  global : {
      timer : null ,
      isRand : false
  },
  data: {
    dice : ['first','second','third','fourth','fifth','sixth'],
    buttonType : 'primary',
    buttonValue : '摇一摇',
    isShow:'hidden',
    num1 : 0,
    num2 : 0,
    num3 : 0,
    total: 0
  },
  shakeClick: function () { 
    let me = this;
    this.global.isRand = !this.global.isRand;
    if ( this.global.isRand ) {
      this.global.timer = setInterval(function (){
        let num1 = Math.floor(Math.random()*6);
        let num2 = Math.floor(Math.random()*6);
        let num3 = Math.floor(Math.random()*6);
        me.setData({num1 : num1});
        me.setData({num2 : num2});
        me.setData({num3 : num3});
        me.setData({total : num1+num2+num3+3});
      },50);
    } else {
      clearInterval(this.global.timer);
    }

    this.setData({
      dice: this.data.dice, 
      buttonType : (this.global.isRand) ? 'default' : 'primary',
      buttonValue : (this.global.isRand) ? '停止' : '摇一摇',
      isShow: (this.global.isRand) ? 'hidden':'show',
    });

  },
})
