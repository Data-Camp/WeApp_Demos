var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		filterId: 1,
		searchWords: '',
		placeholder: '烤鸭',
		shops: app.globalData.shops
	},
	onLoad: function () {
		var self = this;
		wx.getLocation({
			type: 'gcj02',
			success: function (res) {
				var latitude = res.latitude;
				var longitude = res.longitude;
				server.getJSON('/waimai/api/location.php', {
					latitude: latitude,
					longitude: longitude
				}, function (res) {
					console.log(res)
					if (res.data.status != -1) {
						self.setData({
							address: res.data.result.address_component.street_number
						});
					} else {
						self.setData({
							address: '定位失败'
						});
					}
				});
			}
		})
	},
	onShow: function () {
		//this.setData({
		//	showResult: false
		//});
	},
	inputSearch: function (e) {
		this.setData({
			searchWords: e.detail.value
		});
	},
	doSearch: function() {
		this.setData({
			showResult: true
		});
	},
	tapFilter: function (e) {
		switch (e.target.dataset.id) {
			case '1':
				this.data.shops.sort(function (a, b) {
					return a.id > b.id;
				});
				break;
			case '2':
				this.data.shops.sort(function (a, b) {
					return a.sales < b.sales;
				});
				break;
			case '3':
				this.data.shops.sort(function (a, b) {
					return a.distance > b.distance;
				});
				break;
		}
		this.setData({
			filterId: e.target.dataset.id,
			shops: this.data.shops
		});
	}
});

