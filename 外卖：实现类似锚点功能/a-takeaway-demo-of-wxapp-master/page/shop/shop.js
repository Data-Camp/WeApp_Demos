var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
		goods: {
			1: {
				id: 1,
				name: '娃娃菜',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 1014,
				price: 2
			},
			2: {
				id: 2,
				name: '金针菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1029,
				price: 3
			},
			3: {
				id: 3,
				name: '方便面',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1030,
				price: 2
			},
			4: {
				id: 4,
				name: '粉丝',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1059,
				price: 1
			},
			5: {
				id: 5,
				name: '生菜',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 1029,
				price: 2
			},
			6: {
				id: 6,
				name: '白菜',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 1064,
				price: 2
			},
			7: {
				id: 7,
				name: '杏鲍菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/2.jpg',
				sold: 814,
				price: 3
			},
			8: {
				id: 8,
				name: '香菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 124,
				price: 3
			},
			9: {
				id: 9,
				name: '猴头菇',
				pic: 'http://wxapp.im20.com.cn/impublic/waimai/imgs/goods/1.jpg',
				sold: 102,
				price: 5
			}
		},
		goodsList: [
			{
				id: 'hot',
				classifyName: '热销',
				goods: [1, 2, 3, 4, 5]
			},
			{
				id: 'new',
				classifyName: '新品',
				goods: [1, 3]
			},
			{
				id: 'vegetable',
				classifyName: '蔬菜',
				goods: [1, 6, 5]
			},
			{
				id: 'mushroom',
				classifyName: '蘑菇',
				goods: [2, 7, 8, 9]
			},
			{
				id: 'food',
				classifyName: '主食',
				goods: [3, 4]
			}
		],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		showCartDetail: false
	},
	onLoad: function (options) {
		var shopId = options.id;
		for (var i = 0; i < app.globalData.shops.length; ++i) {
			if (app.globalData.shops[i].id == shopId) {
				this.setData({
					shop: app.globalData.shops[i]
				});
				break;
			}
		}
	},
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function () {
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {
			var goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
	},
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},
	onGoodsScroll: function (e) {
		if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},
	tapClassify: function (e) {
		var id = e.target.dataset.id;
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
	},
	submit: function (e) {
		server.sendTemplate(e.detail.formId, null, function (res) {
			if (res.data.errorcode == 0) {
				wx.showModal({
					showCancel: false,
					title: '恭喜',
					content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
					success: function(res) {
						if (res.confirm) {
							wx.navigateBack();
						}
					}
				})
			}
		}, function (res) {
			console.log(res)
		});
	}
});

