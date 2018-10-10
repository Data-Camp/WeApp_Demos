const App = getApp()

Page({
    data: {
        hidden: !0,
        type  : null,
        goods : {},
        prompt: {
            hidden: !0,
            icon: '../../../assets/images/iconfont-empty.png',
        },
    },
    onLoad(option) {
        this.goods = App.HttpResource('/goods/:id', {id: '@id'})
        this.setData({
            type: option.type, 
            keyword: option.keyword && decodeURI(option.keyword), 
        })
    },
    onShow() {
        this.onPullDownRefresh()
    },
    onReady() {
        const keyword = this.data.keyword
        
        keyword && App.WxService.setNavigationBarTitle({
            title: `搜索商品：${keyword}`, 
        })
    },
    initData() {
        const type = this.data.type
        const keyword = this.data.keyword

        this.setData({
            goods: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                    type : type,
                    keyword : keyword,
                },
                paginate: {}
            }
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/goods/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getGoods() {
        const goods = this.data.goods
        const params = goods.params

        // App.HttpService.getGoods(params)
        this.goods.queryAsync(params)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
                goods.items = [...goods.items, ...data.data.items]
                goods.paginate = data.data.paginate
                goods.params.page = data.data.paginate.next
                goods.params.limit = data.data.paginate.perPage
                this.setData({
                    goods: goods,
                    'prompt.hidden': goods.items.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        this.initData()
        this.getGoods()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.goods.paginate.hasNext) return
        this.getGoods()
    },
})