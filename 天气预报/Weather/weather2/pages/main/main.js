Page({
    data:{
        AK: 'hWtYHdhw2fIwi9PWsWX09IVmGtLVp2UG',
        city: '',
        temp: '',
        todayDayImg: '',
        todayNightImg: '',
        weather: '',
        todayDate: '',
        todayTime: ''
    },
    // 监听页面加载
    onLoad: function () {
        this.loadInfo();
        this.getTime();
    },
    // 监听页面初次渲染完成
    onReady: function () {

    },
    // 监听页面显示
    onShow: function () {

    },
    // 监听页面隐藏
    onHide: function () {

    },
    // 监听页面卸载
    onUpload: function () {

    },
    // 监听用户下拉动作
    onPullDownRefresh: function () {
        this.getTime();
    },
    // 监听页面上拉触底
    onReachBottom: function () {

    },
    loadInfo: function () {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var AK = that.data.AK;
               that.loadCity(latitude, longitude, AK, that.loadWeather);
               console.log(that.data.city);
            //    that.loadWeather(that.data.city, AK);
            }
        })
    },
    loadCity: function (latitude, longitude, AK, callback) {
        var that = this;
        var url = 'https://api.map.baidu.com/geocoder/v2/?location=' + latitude + ',' + longitude + '&output=json&ak=' + AK;
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                console.log(res);
                var city = res.data.result.addressComponent.city;
                that.setData({city :city});
                console.log(that.data.city);
                callback && callback(city, AK);
            }
        })
    },
    loadWeather: function (city, AK) {
        var that  = this;
        var url = 'https://api.map.baidu.com/telematics/v3/weather?location=' + city + '&output=json&ak=' + AK;
        console.log(url);
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                var desNum = that.random(5);
                console.log(res);
                var future = res.data.results[0].weather_data.filter(function(ele, index) {
                    return index > 0;
                });
                var temReg = /\d+℃/;
                that.setData({
                    temp: res.data.results[0].weather_data[0].date.match(temReg)[0],
                    todayDayImg: res.data.results[0].weather_data[0].dayPictureUrl,
                    todayNightImg: res.data.results[0].weather_data[0].nightPictureUrl,
                    weather: res.data.results[0].weather_data[0].weather + ' | ' + res.data.results[0].weather_data[0].wind,
                });
            console.log(that.data.future);

            }
        })
    },
    random: function(max, min) {
        var min = min || 0;
        return Math.floor(Math.random() * (max - min +1) + min);
    },
    getTime: function () {
        var date = new Date();
        var minute = date.getMinutes() >=10 ? date.getMinutes() : ('0' + date.getMinutes());
        var hour = date.getHours() >=10 ? date.getHours() : ('0' + date.getHours());
        var now = date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate());
        var todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + now;
        var todayTime = hour + ':' + minute;
        this.setData({
            todayDate: todayDate,
            todayTime: todayTime
        })
    }
})