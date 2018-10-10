/**
 * App() 函数
 * 
 * 用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。
 * 
 * @param onLaunch // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
 * @param onShow   // 当小程序启动，或从后台进入前台显示，会触发 onShow
 * @param onHide   // 当小程序从前台进入后台，会触发 onHide
 * @param getUserInfo // 获取用户信息
 * 
 * @author marsliang <marsliang@tencent.com>
 * @date   2016‎-11-‎14 ‎20:07:04
 * @update 2016-11-17
 */

App({

	onLaunch: function() {
		console.log('APP-onLaunch 生命周期函数--监听小程序初始化');
	},

	onShow: function() {
		console.log('App-onShow 生命周期函数--监听小程序显示');
	},

	onHide: function() {
		console.log('App-onHide 生命周期函数--监听小程序隐藏');
	},

	getUserInfo: function(cb) {
		var that = this

		if (this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo)
		} else {
			//调用登录接口
			wx.login({
				success: function(r) {
					
					// 获取用户信息 
					wx.getUserInfo({
						success: function(res) {
							that.globalData.userInfo = res.userInfo
							typeof cb == "function" && cb(that.globalData.userInfo)
						}
					})
					
					// 获取用户openid
					wx.request({
						url: 'https://www.cpcsign.com/api/login',
						data: {
							'js_code': r.code
						},
						method: 'GET',
						success: function(res) {
							console.log('---code 换取 openid---');
							wx.setStorageSync('openId', res.data.openid);
						}
					})
				}
			})
		}
	},

	globalData: {
		userInfo: null,
		openId: ''
	}
})