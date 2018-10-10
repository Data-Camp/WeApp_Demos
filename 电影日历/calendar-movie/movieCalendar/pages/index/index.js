//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "year":0,
    "month":0,
    "day":0,
    "week":0,
    "show_year":0,
    "comment":'',
    "directors":'',
    "title":'',
    "average":'',
    "stars":'',
    "loading_opacity": 1,
    "animationData":''
  },
  //页面初次渲染完成
  onReady: function (e) {
    this.showDate();
    var _this = this,todayDate = this.data.year+''+this.data.month+''+this.data.day;
    wx.getStorage({
      key: 'movie',
      success: function(res) {
        // console.log(res.data)
        if(res.data.date==todayDate){
          _this.setData(res.data.movieData);
          _this.loading();
        }else{
          _this.loadMovie();
        }
      },
      fail: function() {
        _this.loadMovie();
      }
    })
  },
  // 页面初始化
  onLoad:function(options){},
  //显示日期，年月日
  showDate:function(){
    var today = new Date(),_this = this,year = today.getFullYear()+'',i = 0,chineseYear='',week = today.getDay();
    //将年份转换为中文
    do{
      chineseYear = chineseYear+app.chineseDate.years[year.charAt(i)]
      i++;
    }while(i<year.length)
    //设置数据
    _this.setData({
       "year":chineseYear,
       "month":app.chineseDate.months[today.getMonth()],
       "day":today.getDate(),
       "week":app.chineseDate.years[week] 
     })
  },
  //加载top250电影信息
  loadMovie: function(){
    var _this = this,
        //请求发送的数据，随机的起始值和条数（只需要一条）
        reqData = {
          start:Math.floor(Math.random()*250),
          count:1
        };
    //发送请求，获取电影数据
    wx.request({
      url:"http://localhost:5000",
      data:reqData,
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        var movieData = res.data.subjects[0];
        // console.log(movieData);
        //设置数据，评分是整数需要补上小数点和0
        var now = new Date(),thisYear = now.getFullYear();
        var average = movieData.rating.average%1 === 0?movieData.rating.average+'.0':movieData.rating.average;
        var date = _this.data.year+''+_this.data.month+''+_this.data.day,
            renderData = {
              "show_year":thisYear-movieData.year,
              "comment":movieData.comment,
              "directors":movieData.directors,
              "title":movieData.title,
              "average":average,
              "stars":_this.starCount(movieData.rating.stars),
              "loading_opacity": 0
            };
        _this.setData(renderData);
        _this.storeData(date,renderData);
        _this.loading();
      }
    });
  },
  //计算行星显示规则
  starCount:function(originStars){
    //计算星星显示需要的数据，用数组stars存储五个值，分别对应每个位置的星星是全星、半星还是空星
    var starNum = originStars/10,stars = [],i = 0;
    do{
      if(starNum>=1){
        stars[i] = 'full';
      }else if(starNum>=0.5){
        stars[i] = 'half';
      }else{
        stars[i] = 'no';
      }
      starNum--;
      i++;
    }while(i<5)
    return stars;
  },
  //加载动画
  loading:function(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease"
    })
    animation.opacity(1).step()
    this.setData({
      animationData:animation.export()
    })
  },
  //将数据进行本地存储
  storeData: function(date,movieData){
    wx.setStorage({
      key:"movie",
      data:{
        date:date,
        movieData:movieData
      }
    })
  }
})