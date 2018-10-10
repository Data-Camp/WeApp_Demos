const App = getApp()

Page({
    data: {
        helps: {},
        prompt: {
            hidden: !0,
            icon: '../../../assets/images/iconfont-empty.png',
        },
    },
    onLoad() {
        this.helps = App.HttpResource('/help/:id', {id: '@id'})
    },
    onShow() {
        this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            helps: {
                items: [],
                params: {
                    page : 1,
                    limit: 10,
                },
                paginate: {}
            }
        })
    },
    navigateTo(e) {
        console.log(e)
        App.WxService.navigateTo('/pages/help/detail/index', {
            id: e.currentTarget.dataset.id
        })
    },
    getHelps() {
        const helps = this.data.helps
        const params = helps.params

        this.helps.queryAsync(params)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                helps.items = [...helps.items, ...data.data.items]
                helps.paginate = data.data.paginate
                helps.params.page = data.data.paginate.next
                helps.params.limit = data.data.paginate.perPage
                this.setData({
                    helps: helps,
                    'prompt.hidden': helps.items.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        this.initData()
        this.getHelps()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.helps.paginate.hasNext) return
        this.getHelps()
    },
})