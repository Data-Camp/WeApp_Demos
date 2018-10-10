var config = require('./config.js')
module.exports = {
    fetchFilms: function(url, city, start, count, cb) {
    var that = this
      if (that.data.hasMore) {
        fetch(url + '?city=' + config.city + '&start=' + start + '&count=' + count).then(function(response){
          response.json().then(function(data){
            if(data.subjects.length === 0){
              that.setData({
                hasMore: false,
              })
            }else{
              that.setData({
                films: that.data.films.concat(data.subjects),
                start: that.data.start + data.subjects.length,
                showLoading: false
              })
            }
            typeof cb == 'function' && cb(res.data)
          })
        })
      }
    },
    fetchFilmDetail: function(url, id, cb) {
      var that = this;
      fetch(url + id).then(function(response){
        response.json().then(function(data){
          that.setData({
            showLoading: false,
            filmDetail: data
          })
          wx.setNavigationBarTitle({
              title: data.title
          })
          typeof cb == 'function' && cb(data)
        })
      })
    },
    fetchPersonDetail: function(url, id, cb) {
      var that = this;
      fetch(url + id).then(function(response){
        response.json().then(function(data){
          that.setData({
            showLoading: false,
            personDetail: data
          })
          wx.setNavigationBarTitle({
              title: data.name
          })
          typeof cb == 'function' && cb(data)
        })
      })
    },
    search: function(url, keyword, start, count, cb){
      var that = this
      var url = decodeURIComponent(url)
      if (that.data.hasMore) {
        fetch(url + keyword + '&start=' + start + '&count=' + count).then(function(response){
          response.json().then(function(data){
            if(data.subjects.length === 0){
              that.setData({
                hasMore: false,
                showLoading: false
              })
            }else{
              that.setData({
                films: that.data.films.concat(data.subjects),
                start: that.data.start + data.subjects.length,
                showLoading: false
              })
              wx.setNavigationBarTitle({
                  title: keyword
              })
            }
            typeof cb == 'function' && cb(res.data)
          })
        })
      }
    }
}