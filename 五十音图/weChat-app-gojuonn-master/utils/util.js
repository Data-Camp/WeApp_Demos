function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// //数据的回调 绑定在 page实例上
// function addEventHandleCb(obj,cbName,cbFn){
//   obj[cbName] = function(){
//     cbFn(obj);
//   }
// }

module.exports = {
  formatTime: formatTime
  // ,
  // addEventHandleCb
}
