var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		filterId: 1,
		address: '定位中…',
		banners: [
			{
				id: 3,
				img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/index/banner_3.jpg',
				url: '',
				name: '百亿巨惠任你抢'
			},
			{
				id: 1,
				img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/index/banner_1.jpg',
				url: '',
				name: '告别午高峰'
			},
			{
				id: 2,
				img: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/index/banner_2.jpg',
				url: '',
				name: '金牌好店'
			}
		],
		icons: [
			[
				{
					id: 1,
					img: '/imgs/index/icon_1.jpg',
					name: '美食',
					url: ''
				},
				{
					id: 2,
					img: '/imgs/index/icon_2.jpg',
					name: '超市',
					url: ''
				},
				{
					id: 3,
					img: '/imgs/index/icon_3.jpg',
					name: '鲜果购',
					url: ''
				},
				{
					id: 4,
					img: '/imgs/index/icon_4.jpg',
					name: '下午茶',
					url: ''
				},
				{
					id: 5,
					img: '/imgs/index/icon_5.jpg',
					name: '正餐优选',
					url: ''
				},
				{
					id: 6,
					img: '/imgs/index/icon_6.jpg',
					name: '外卖专送',
					url: ''
				},
				{
					id: 7,
					img: '/imgs/index/icon_7.jpg',
					name: '饮品站',
					url: ''
				},
				{
					id: 8,
					img: '/imgs/index/icon_8.jpg',
					name: '小吃馆',
					url: ''
				}
			],
			[
				{
					id: 9,
					img: '/imgs/index/icon_9.jpg',
					name: '新商家',
					url: ''
				},
				{
					id: 10,
					img: '/imgs/index/icon_10.jpg',
					name: '免配送费',
					url: ''
				},
				{
					id: 11,
					img: '/imgs/index/icon_11.jpg',
					name: '鲜花蛋糕',
					url: ''
				},
				{
					id: 12,
					img: '/imgs/index/icon_12.jpg',
					name: '名气餐厅',
					url: ''
				},
				{
					id: 13,
					img: '/imgs/index/icon_13.jpg',
					name: '异国料理',
					url: ''
				},
				{
					id: 14,
					img: '/imgs/index/icon_14.jpg',
					name: '家常菜',
					url: ''
				},
				{
					id: 15,
					img: '/imgs/index/icon_15.jpg',
					name: '能量西餐',
					url: ''
				},
				{
					id: 16,
					img: '/imgs/index/icon_16.jpg',
					name: '无辣不欢',
					url: ''
				}
			]
		],
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
	},
	onScroll: function (e) {
		if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}
	},
	tapSearch: function () {
		wx.navigateTo({url: 'search'});
	},
	toNearby: function () {
		var self = this;
		self.setData({
			scrollIntoView: 'nearby'
		});
		self.setData({
			scrollIntoView: null
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
	},
	tapBanner: function (e) {
		var name = this.data.banners[e.target.dataset.id].name;
		wx.showModal({
			title: '提示',
			content: '您点击了“' + name + '”活动链接，活动页面暂未完成！',
			showCancel: false
		});
	}
});

