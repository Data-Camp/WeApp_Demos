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

function getDateDiff (dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var year = day * 365;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){
    //非法操作
    return '数据出错';
  }
  var yearC = diffValue / year;
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if(yearC >= 1){
    result = parseInt(yearC) + '年以前';
  }else if(monthC >= 1){
    result = parseInt(monthC) + '个月前';
  }else if(weekC >= 1){
    result = parseInt(weekC) + '星期前';
  }else if(dayC >= 1){
    result = parseInt(dayC) + '天前';
  }else if(hourC >= 1){
    result = parseInt(hourC) + '小时前';
  }else if(minC >= 5){
    result = parseInt(minC) + '分钟前';
  }else{
    result = '刚刚发表';
  }
  return result;
}

module.exports = {
  formatTime: formatTime,
  getDateDiff: getDateDiff
}
