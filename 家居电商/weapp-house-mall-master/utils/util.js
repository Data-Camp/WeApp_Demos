function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
}
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function accMul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c); 
} 
//加法运算中级解决办法
function accAdd(a, b) {   
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (a * e + b * e) / e; 
} 
//返回值：arg1减上arg2的精确结果   
function accSub(a,b){      
   var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (a * e - b * e) / e;
}
//返回值：arg1除以arg2的精确结果
function accDiv(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), c / d * Math.pow(10, f - e);
} 
module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  accMul: accMul,
  accAdd:accAdd,
  accDiv:accDiv,
  accSub:accSub
}
