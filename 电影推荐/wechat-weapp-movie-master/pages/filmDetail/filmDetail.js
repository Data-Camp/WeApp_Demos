var douban = require('../../comm/script/fetch')
var url = 'https://api.douban.com/v2/movie/subject/'
var searchByTagUrl = 'https://api.douban.com/v2/movie/search?tag='
Page({
    data: {
        filmDetail: {},
        showLoading: true
    },
    onLoad: function(options) {
        var that = this
        var id = options.id
		douban.fetchFilmDetail.call(that, url, id)
    },
	viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.redirectTo({
		  url: '../personDetail/personDetail?id=' + data.id
		})
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(searchByTagUrl) + '&keyword=' + keyword
		})
	}
})