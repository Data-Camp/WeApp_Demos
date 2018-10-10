function __args() {
	var setting = {};
	if (arguments.length === 1 && typeof arguments[0] !== 'string') {
		setting = arguments[0];
	} else {
		setting.url = arguments[0];
		if (typeof arguments[1] === 'object') {
			setting.data = arguments[1];
			setting.success = arguments[2];
		} else {
			setting.success = arguments[1];
		}
	}
	if (setting.url.indexOf('https://') !== 0) {
		setting.url = 'https://wxapp.im20.com.cn' + setting.url;
	}
	return setting;
}
function __json(method, setting) {
	setting.method = method;
	setting.header = {
		'content-type': 'application/json'
	};
	wx.request(setting);
}

module.exports = {
	getJSON: function () {
		__json('GET', __args.apply(this, arguments));
	},
	postJSON: function () {
		__json('POST', __args.apply(this, arguments));
	},
	sendTemplate: function(formId, templateData, success, fail) {
		var app = getApp();
		this.getJSON({
			url: '/WxAppApi/sendTemplate',
			data: {
				rd_session: app.rd_session,
				form_id: formId,
				data: templateData,
			},
			success: success,   // errorcode==0时发送成功
			fail: fail
		});
	}
}
