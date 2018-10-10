const App = getApp()

Page({
    data: {
        hidden: !0,
        address: {}
    },
    onLoad(option) {
        console.log(option)
        this.setData({
            ret: option.ret
        })
    },
    onShow() {
        this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            address: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                },
                paginate: {}
            }
        })
    },
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        App.WxService.redirectTo('/pages/order/confirm/index', {
            id: e.detail.value
        })
    },
    getAddressList() {
        const address = this.data.address
        const params = address.params

        this.setData({ 
            hidden: !1
        })

        App.HttpService.getAddressList(params)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                address.items = address.items.concat(data.data.items)
                address.paginate = data.data.paginate
                address.params.page = data.data.paginate.next
                address.params.limit = data.data.paginate.perPage

                address.items.forEach((n, i) => n.checked = n._id === this.data.ret)

                this.setData({
                    address: address
                })
            }

            this.setData({ 
                hidden: !0
            })
        })
    },
    onPullDownRefresh() {
        this.initData()
        this.getAddressList()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.address.paginate.hasNext) return
        this.getAddressList()
    },
})