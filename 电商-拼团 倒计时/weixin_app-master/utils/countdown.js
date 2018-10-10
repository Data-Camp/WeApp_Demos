// function Timer(opts){
//   //倒计时时间对象
//   this.timeObj = timerConverter(opts.time); 
// }

function CountDown(opts){
 /*
  opts = {
    timeArr:[12233333,....],
    fn:function(time,index){
      // vm.setData({

      // })
      timeConverter(time)
    }
  }
  */
  // 倒计时队列
  this.fn = opts.fn;
  this.queue = opts.timeArr;
  this.timerId = null;
}
CountDown.prototype = {
  constructor:CountDown,
  init:function(){
    
  },
  go:function(){
    var THIS = this;
    var originLen = THIS.queue.length;
    (function fn(){
      var queue = THIS.queue;
      var queueLen = queue.length;
      var item;
      for(var i=j=0;i<queue.length;i++,j++){
        item = queue[i] -= 100;
        // 运行倒计时处理函数
        THIS.fn(item,j);
        if( item <= 0){
          queue.splice(i--,1);
        }
      }
      var _queueLen = queue.length;
      if(_queueLen){
        THIS.timerId = setTimeout(fn,100);
      }else if( _queueLen!==queueLen && _queueLen===0 ){
        THIS.stop();
      }
    })();

    
  },
  stop:function(){
    clearTimeout(this.timeId);
    this.timeId=null;
  }
}



// 转换time（倒计时毫秒）
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

module.exports = {
  CountDown:CountDown,
  timeConverter:timeConverter
};





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