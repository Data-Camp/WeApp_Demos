import api from '../../api/api.js'

Page({
  data: {
    movies: [],
    lastId: 0
  },
  onLoad: function () {
    this.getMovies()
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '电影'
    })
  },
  getMovies: function () {
    let lastId = this.data.lastId
    if (lastId >= 0) {
      api.getMovieListById({
        query: {
          id: lastId
        },
        success: (res) => {
          if (res.data.res === 0) {
            let moreMovies = res.data.data
            let length = moreMovies.length
            let lastId = length ? moreMovies[length - 1].id : -1

            let movies = this.data.movies.concat(moreMovies)
            this.setData({ movies, lastId })
          }
        }
      })
    }
  },
  getDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'detail/detail?id=' + id
    })
  }
})