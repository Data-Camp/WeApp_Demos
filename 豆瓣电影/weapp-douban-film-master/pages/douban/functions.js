var store = require('./store.js')
var config = require('./config.js')
module.exports = {
  getLocation: function(cb){
    var location = store.location 
    if(location){
      cb(location)
      return;
    }
    wx.getLocation({
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude
        fetch('https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1').then(function(response){
          response.json().then(function(data){
            store.location = data.result
            cb(data.result)
          })
        })
      }
    })
  },
  getCity: function(cb){
    this.getLocation(function(location){
      cb(location.addressComponent.city.replace('市', ''))
    })
  },
  fetchFilms: function(url, city, start, count, cb){
    var that = this
    fetch(url + '?city=' + city + '&start=' + start + '&count=' + count).then(function(response){
      response.json().then(function(data){
        if(data.subjects.length === 0){
          that.setData({
            hasMore: false,
          })
        }else{
          that.setData({
            films: that.data.films.concat(data.subjects),
            start: that.data.start + data.subjects.length
          })
        }
        cb(data)
      })
    })
  }
}