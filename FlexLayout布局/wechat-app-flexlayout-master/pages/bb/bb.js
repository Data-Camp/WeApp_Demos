//获取应用实例
Page({
    data: {
        new: 'top-hoverd-btn',
        good: '',
        child: '',
        mom: '',
        girl: '',
        shoe: '',
        home: '',
        beauti: '',
        food: '',
        hidden: false
    },
    toNew: function(){
        console.log('new');
         this.updateBtnStatus('new');
    },
    toGood: function(){
        console.log('good');
         this.updateBtnStatus('good');
    },
    toChild: function(){
        console.log('child');
         this.updateBtnStatus('child');
    },
    toMom: function(){
        console.log('mom');
         this.updateBtnStatus('mom');
    },
    toGirl: function(){
        console.log('girl');
         this.updateBtnStatus('girl');
    },
    toShoe: function(){
        console.log('shoe');
         this.updateBtnStatus('shoe');
    },
    toHome: function(){
        console.log('home');
         this.updateBtnStatus('home');
    },
    toBeauti: function(){
        console.log('beauti');
         this.updateBtnStatus('beauti');
    },
    toFood: function(){
        console.log('food');
         this.updateBtnStatus('food');
    },
    onLaunch: function () {
        console.log('bb Launching ...');
    },
    onShow: function(){
         var that = this;
         setTimeout(function(){
            that.setData({
                hidden: true
            });
         }, 1500);
    },
    updateBtnStatus: function(k){
        this.setData({
            new: this.getHoverd('new', k),
            good: this.getHoverd('good', k),
            child: this.getHoverd('child', k),
            mom: this.getHoverd('mom', k),
            girl: this.getHoverd('girl', k),
            shoe: this.getHoverd('shoe', k),
            home: this.getHoverd('home', k),
            beauti: this.getHoverd('beauti', k),
            food: this.getHoverd('food', k)
        });
    },
    getHoverd: function(src, dest){
        return (src === dest ?  'top-hoverd-btn' : '');
    }
});
