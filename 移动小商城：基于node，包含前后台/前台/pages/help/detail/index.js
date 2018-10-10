const App = getApp()

Page({
    data: {
        helps: {
            item: {}
        }
    },
    onLoad(option) {
        this.helps = App.HttpResource('/help/:id', {id: '@id'})
        this.setData({
            id: option.id
        })
    },
    onShow() {
        this.getDetail(this.data.id)
    },
    onReady() {
        const item = this.data.helps.item
        const title = item && item.title
        
        App.WxService.setNavigationBarTitle({
            title: title, 
        })
    },
    getDetail(id) {
        this.helps.getAsync({id: id})
        .then(data => {
        	console.log(data)
        	if (data.meta.code == 0) {
        		this.setData({
                    'helps.item': data.data
                })
        	}
        })
    },
})