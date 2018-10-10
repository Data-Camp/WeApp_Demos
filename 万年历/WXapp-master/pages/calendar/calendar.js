var util = require('../../utils/util.js')
var d = require('date.js')
var CN_Date = require('getCNDate.js');
var app = getApp()
var t = new Date();

Page({
    data:{
        monthNum:t.getMonth() + 1,
        yearNum:t.getFullYear(),
        MonthDayArray:[],
        toDate:t.getDate(),
        toMonth:t.getMonth() + 1,
        toYear:t.getFullYear(),
        fromToday:'今天',
        nongliDetail:CN_Date(t.getFullYear(), t.getMonth() + 1, t.getDate()),
    },
    
    onShow:function(){
        console.log('onShow');
        this.calcMonthDayArray();
    },

    dateClick:function(e){
        var eId = e.currentTarget.id;
        var MonArray = this.data.MonthDayArray;
        var data = this.data;
        if(eId == "")return;
        //点击效果 ，且只能选中一个日期
        //FIX 这个遍历算法可以改进
        for(var i = 0;i < MonArray.length;i++){
            for(var j = 0;j < MonArray[i].length;j++){
                if(typeof(MonArray[i][j]) == 'string'){
                    continue;
                }
                if(MonArray[i][j].num == eId){  
                    MonArray[i][j].isShowDayInfo = !MonArray[i][j].isShowDayInfo;
                }
            }
        }

        for(var i = 0;i < MonArray.length;i++){
            for(var j = 0;j < MonArray[i].length;j++){
                if(typeof(MonArray[i][j]) == 'string' || MonArray[i][j].num == eId){
                    continue;
                }
                MonArray[i][j].isShowDayInfo = false;
            }
        }

        this.setData({
            MonthDayArray:MonArray,
            toYear:data.yearNum,
            toMonth:data.monthNum,
            toDate:eId,
            fromToday:d.getFromTodayDays(eId, data.monthNum - 1, data.yearNum),
            nongliDetail:CN_Date(data.yearNum, data.monthNum, eId),
        })
    },

    monthTouch:function(e){
        var beginX = e.target.offsetLeft;
        var endX = e.changedTouches[0].clientX;
        if(beginX - endX > 125){
            this.nextMonth_Fn();
        }
        else if(beginX - endX < -125){
            this.lastMonth_Fn();
        }
    },

    nextMonth_Fn:function(){
        var n = this.data.monthNum;
        var y =this.data.yearNum;
        if(n == 12){
            this.setData({
                monthNum:1,
                yearNum:y + 1,
            });
        }
        else{
            this.setData({
                monthNum:n + 1,
            });
        }
        this.calcMonthDayArray();
    },

    lastMonth_Fn:function(){
        var n = this.data.monthNum;
        var y =this.data.yearNum;
        if(n == 1){
            this.setData({
                monthNum:12,
                yearNum:y - 1,
            });
        }
        else{
            this.setData({
                monthNum:n - 1,
            });
        }
        this.calcMonthDayArray();
    },

    calcMonthDayArray:function(){
        var data = this.data;
        var dateArray = d.paintCalendarArray(data.monthNum, data.yearNum);

        //如果不是当年当月，自动选中1号
        var notToday = (data.monthNum != t.getMonth() + 1 || data.yearNum != t.getFullYear());
        if(notToday){
            for(var i = 0;i < dateArray[0].length;i++){
                if(dateArray[0][i].num == 1){
                    dateArray[0][i].isShowDayInfo = true;
                }
            }
        }

        this.setData({
            MonthDayArray:dateArray,
            toYear:notToday ? this.data.yearNum : t.getFullYear(),
            toMonth:notToday ? this.data.monthNum : t.getMonth() + 1,
            toDate:notToday ? 1 : t.getDate(),
            fromToday:notToday ? d.getFromTodayDays(1, data.monthNum - 1, data.yearNum) : '今天',
            nongliDetail:notToday ? CN_Date(data.yearNum, data.monthNum, 1) : CN_Date(t.getFullYear(), t.getMonth() + 1, t.getDate()),
        })
    }
    
})