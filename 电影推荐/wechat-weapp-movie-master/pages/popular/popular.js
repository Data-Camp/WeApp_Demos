var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var url = 'https://api.douban.com/v2/movie/in_theaters'
var searchByTagUrl = 'https://api.douban.com/v2/movie/search?tag='
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0,
		windowHeight: 0
	},
	onLoad: function() {
		var that = this
		douban.fetchFilms.call(that, url, config.city, that.data.start, config.count)
	},
	onShow: function() {
		var that = this
		wx.getSystemInfo({
		  success: function(res) {
			  that.setData({
				  windowHeight: res.windowHeight*2
			  })
		  }
		})
	},
	scroll: function(e) {
		console.log(e)
	},
	scrolltolower: function() {
		var that = this
		douban.fetchFilms.call(that, url, config.city, that.data.start, config.count)
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		douban.fetchFilms.call(that, url, config.city, that.data.start, config.count)
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id
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