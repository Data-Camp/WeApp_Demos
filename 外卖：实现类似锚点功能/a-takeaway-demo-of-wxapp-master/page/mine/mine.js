var app = getApp();
var server = require('../../utils/server');
Page({
	data: {},
	onLoad: function () {
	},
	onShow: function () {
		this.setData({
			userInfo: app.globalData.userInfo
		});
	}
});

