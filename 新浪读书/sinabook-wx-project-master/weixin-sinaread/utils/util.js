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


//【判断传入的对象是否是函数】
function isFunction( obj ) { return typeof obj === 'function'; }
//【去除字符串两头空格】
function trim(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
/*
 * 【将 Date 转化为指定格式的String】    
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
 * eg:
 * pattern(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423    
 * pattern(new Date(),"yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       
 * pattern(new Date(),"yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * pattern(new Date(),"yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04     
 * pattern(new Date(),"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */ 
function pattern(dateObj,fmt) {
    var o = {
        "M+": dateObj.getMonth() + 1, //月份       
        "d+": dateObj.getDate(), //日       
        "h+": dateObj.getHours() % 12 == 0 ? 12 : dateObj.getHours() % 12, //小时       
        "H+": dateObj.getHours(), //小时       
        "m+": dateObj.getMinutes(), //分       
        "s+": dateObj.getSeconds(), //秒       
        "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度       
        "S": dateObj.getMilliseconds() //毫秒       
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if ( /(y+)/ .test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if ( /(E+)/ .test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[dateObj.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
/*
【计算2个日期之间的天数】
* 传入格式：yyyy-mm-dd(2015-01-31)
*/
function dayMinus(startDate, endDate){
    if(startDate instanceof Date && endDate instanceof Date){
        var days = Math.floor((endDate-startDate)/(1000 * 60 * 60 * 24));
        return days;
    }else{
        return "Param error,date type!";
    }
}
 
 //【判断是否是中文】
function isChina(str){
    var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
    if(reg.test(str)){
        return false;
    }
    return true;
}

//【输出任意值到任意值的随机整数 】
function fRandomBy(under, over){ 
   switch(arguments.length){ 
     case 1: return parseInt(Math.random()*under+1); 
     case 2: return parseInt(Math.random()*(over-under+1) + under); 
     default: return 0; 
   } 
} 

/*【生成随机RGB颜色】示例：
getColor(1, 0, 0,0.8)  颜色为红色类别的随机颜色，不透明度0.8 。
getColor(1, 0, 1,1)  颜色为紫色类别的随机颜色，不透明度1 。
getColor(1, 1, 1,0.5)  颜色为全部类别的随机颜色（全彩），不透明度0.5 。
getColor(0, 0, 0,1)  颜色为黑白颜色类别的随机颜色（黑白灰），不透明度1 。
*/

function getColor(r, g, b, a) {//输出rgba颜色格式  
  var rgb = 155;  
  var c = Math.floor(Math.random() * (255 - rgb) + rgb);  
  if (r * g * b == 1) {  
    r = Math.floor(Math.random() * 255);  
    g = Math.floor(Math.random() * 255);  
    b = Math.floor(Math.random() * 255);  
  } else if (r + g + b == 0) {  
    var t = Math.floor(Math.random() * 255);  
    r = t;  
    g = t;  
    b = t;  
  } else {  
    r = r == 1 ? (Math.floor(Math.random() * (255 - rgb) + rgb)) : (Math.floor(Math.random() * (c / 2)));  
    g = g == 1 ? Math.floor(Math.random() * (255 - rgb) + rgb) : Math.floor(Math.random() * (c / 2));  
    b = b == 1 ? Math.floor(Math.random() * (255 - rgb) + rgb) : Math.floor(Math.random() * (c / 2));  
  }  
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";  
}  

module.exports = { 
    isFunction: isFunction,  //判断传入的对象是否是函数
    trim:trim,  //去除字符串两头空格
    pattern:pattern,  //将 Date 转化为指定格式的String
    dayMinus:dayMinus,  //计算2个日期之间的天数
    isChina:isChina,  //判断是否是中文
    fRandomBy:fRandomBy,  //输出任意值到任意值的随机整数 
    getColor:getColor,  //生成随机RGB颜色
    formatTime: formatTime
}

