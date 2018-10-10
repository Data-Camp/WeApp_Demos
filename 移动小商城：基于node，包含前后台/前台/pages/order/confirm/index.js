const App = getApp()

Page({
    data: {
        hidden: !0,
        carts: {},
        address: {
            item: {},
        }
    },
    onLoad(option) {
        console.log(option)
        this.setData({
            address_id: option.id
        })

        const carts = {
            items: App.WxService.getStorageSync('confirmOrder'), 
            totalAmount: 0, 
        }

        carts.items.forEach(n => carts.totalAmount+=n.totalAmount)
        
        this.setData({
            carts: carts
        })

        console.log(this.data.carts)
    },
    onShow() {
        const address_id = this.data.address_id
        if (address_id) {
            this.getAddressDetail(address_id)
        } else {
            this.getDefalutAddress()
        }
    },
    redirectTo(e) {
        console.log(e)
        App.WxService.redirectTo('/pages/address/confirm/index', {
            ret: this.data.address_id
        })
    },
    getDefalutAddress() {
        App.HttpService.getDefalutAddress()
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.setData({
                    address_id: data.data._id, 
                    'address.item': data.data, 
                })
            } else {
                this.showModal()
            }
        })
    },
    showModal() {
        App.WxService.showModal({
            title: '友情提示', 
            content: '没有收货地址，请先设置', 
        })
        .then(data => {
            console.log(data)
            if (data.confirm == 1) {
                App.WxService.redirectTo('/pages/address/add/index')
            } else {
                App.WxService.navigateBack()
            }
        })
    },
    getAddressDetail(id) {
        App.HttpService.getAddressDetail(id)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                this.setData({
                    'address.item': data.data
                })
            }
        })
    },
    addOrder() {
        const address_id = this.data.address_id
        const params = {
            items: [], 
            address_id: address_id, 
        }
        this.data.carts.items.forEach(n => {
            params.items.push({
                id: n.goods._id,
                total: n.total,
            })
        })
        console.log(params)
        App.HttpService.postOrder(params)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                App.WxService.redirectTo('/pages/order/detail/index', {
                    id: data.data._id
                })
            }
        })
    },
    clear() {
        App.HttpService.clearCartByUser()
        .then(data => {
            console.log(data)
        })
    },
})