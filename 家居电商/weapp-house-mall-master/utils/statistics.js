var config = require("../config.js");
var getorder = function (url,data,fn){
        wx.request({
                url: config.HTTP_BASE_URL + url, //仅为示例，并非真实的接口地址
                data: data,
                method:"GET",
                header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                fn(res);
            }
        })
}

var setUv = function (data){
    var url = "?c=userlog&a=writeLog"
    getorder(url,data,function(req){
        console.log(req);
    });
}


function statistics(date) {

    var timestamp=new Date().getTime();
    var time = Math.round(new Date().getTime()/1000);
    var gettime = wx.getStorageSync('statiTime');
    var sessionid = wx.getStorageSync('sessionid');
    

    if(sessionid){

        //过时则执行
        if(!gettime || time > gettime){
            setUv({
                appid:config.APPID,
                sessionid:sessionid,
                uv:1
            });
            wx.setStorageSync('statiTime',time + 86400);
        }
        setUv({
            appid:config.APPID,
            sessionid:sessionid,
            pv:1
        });
    }else {
        //初始化
        getorder("?c=userlog&a=writeLog",{
            appid:config.APPID,
            award:1,
            share:1,
            uv:1,
            pv:1,
            ext1:1,
            ext2:1,
            ext3:1,
            ext4:1,
        },function(req){
            wx.setStorageSync('sessionid',req.data.data.sessionid);
            wx.setStorageSync('statiTime',time + 86400);
        });

        
    }
    

    
}




module.exports = statistics;

