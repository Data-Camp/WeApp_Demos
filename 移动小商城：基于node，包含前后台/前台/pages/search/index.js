const App = getApp()

Page({
    data: {
        inputVal: ''
    },
    clearInput() {
        this.setData({
            inputVal: ''
        })
    },
    inputTyping(e) {
        this.setData({
            inputVal: e.detail.value
        })
        this.search()
    },
    search() {
    	if (!this.data.inputVal) return
    	App.HttpService.search({
            keyword: this.data.inputVal
        })
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
            	this.setData({
            		items: data.data
            	})
            }
        })
    },
    redirectTo(e) {
        console.log(e)
        App.WxService.redirectTo('/pages/goods/list/index', {
            keyword: e.currentTarget.dataset.keyword
        })
    },
})