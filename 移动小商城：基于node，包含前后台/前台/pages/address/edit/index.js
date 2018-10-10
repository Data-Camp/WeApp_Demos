const App = getApp()

Page({
    data: {
    	show: !0,
        form: {
			name   : '', 
			gender : 'male', 
			tel    : '', 
			address: '', 
			is_def : !1, 
        },
        radio: [
            {
            	name: '先生', 
            	value: 'male', 
            	checked: !0, 
            },
            {
            	name: '女士', 
            	value: 'female', 
            },
        ],
    },
    onLoad(option) {
    	this.WxValidate = App.WxValidate({
			name: {
				required: true, 
				minlength: 2, 
				maxlength: 10, 
			},
			tel: {
				required: true, 
				tel: true, 
			},
			address: {
				required: true, 
				minlength: 2, 
				maxlength: 100, 
			},
		}, {
			name: {
				required: '请输入收货人姓名', 
			},
			tel: {
				required: '请输入收货人电话', 
			},
			address: {
				required: '请输入收货人地址', 
			},
		})

    	this.address = App.HttpResource('/address/:id', {id: '@id'})
    	this.setData({
    		id: option.id
    	})
    },
    onShow() {
    	this.renderForm(this.data.id)
    },
    renderForm(id) {
    	// App.HttpService.getAddressDetail(id)
    	this.address.getAsync({id: id})
		.then(data => {
			console.log(data)
			if (data.meta.code == 0) {
				const params = {
					name   : data.data.name, 
					gender : data.data.gender, 
					tel    : data.data.tel, 
					address: data.data.address, 
					is_def : data.data.is_def, 
				}

				const radio = this.data.radio
				radio.forEach(n => n.checked = n.value === data.data.gender)

				this.setData({
					show : !params.is_def, 
					radio: radio, 
					form : params, 
				})
			}
		})
    },
	submitForm(e) {
		const params = e.detail.value

		console.log(params)

		if (!this.WxValidate.checkForm(e)) {
			const error = this.WxValidate.errorList[0]
			App.WxService.showModal({
				title: '友情提示', 
					content: `${error.param} : ${error.msg}`, 
					showCancel: !1, 
			})
			return false
		}

		// App.HttpService.putAddress(id, params)
		this.address.updateAsync({id: id}, params)
		.then(data => {
			console.log(data)
			if (data.meta.code == 0) {
				this.showToast(data.meta.message)
			}
		})
	},
	delete() {
		// App.HttpService.deleteAddress(this.data.id)
		this.address.deleteAsync({id: this.data.id})
		.then(data => {
			console.log(data)
			if (data.meta.code == 0) {
				this.showToast(data.meta.message)
			}
		})
	},
	showToast(message) {
		App.WxService.showToast({
			title   : message, 
			icon    : 'success', 
			duration: 1500, 
		})
		.then(() => App.WxService.navigateBack())
	},
	chooseLocation() {
		App.WxService.chooseLocation()
	    .then(data => {
	        console.log(data)
	        this.setData({
	        	'form.address': data.address
	        })
	    })
	},
})