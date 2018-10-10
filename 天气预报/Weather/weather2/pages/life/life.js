Page({
    data:{
        life: [],
        AK:'hWtYHdhw2fIwi9PWsWX09IVmGtLVp2UG',
        city:'',
        lifeImgBaseUrl: '../assets/img/',
        lifeImg: ['cloth.png','car.png','medicine.png','sport.png','uv.png']
    },
    onLoad: function() {
        var that = this;
        wx.getLocation({
            "type": "gcj02",
            "success": function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var AK = that.data.AK;
                that.loadCity(latitude, longitude, AK,that.loadWeather)
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
                var city = res.data.result.addressComponent.city;
                that.setData({city :city});
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
                for(var i = 0, max = res.data.results[0].index.length; i< max; i++) {
                    res.data.results[0].index[i].img = that.data.lifeImgBaseUrl + that.data.lifeImg[i];
                }
                that.setData({
                    life: res.data.results[0].index
                });
            console.log(that.data.life);
            }
        })
    },
})