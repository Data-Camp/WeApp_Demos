const App = getApp()

Page({
    data: {
        classify: {},
        prompt: {
            hidden: !0,
        },
    },
    onLoad() {
        this.classify = App.HttpResource('/classify/:id', {id: '@id'})
    },
    onShow() {
        this.onPullDownRefresh()
    },
    initData() {
        this.setData({
            classify: {
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
        App.WxService.navigateTo('/pages/goods/list/index', {
            type: e.currentTarget.dataset.id
        })
    },
    getClassify() {
        const classify = this.data.classify
        const params = classify.params

        // App.HttpService.getClassify(params)
        this.classify.queryAsync(params)
        .then(data => {
            console.log(data)
            if (data.meta.code == 0) {
                classify.items = [...classify.items, ...data.data.items]
                classify.paginate = data.data.paginate
                classify.params.page = data.data.paginate.next
                classify.params.limit = data.data.paginate.perPage
                this.setData({
                    classify: classify,
                    'prompt.hidden': classify.items.length,
                })
            }
        })
    },
    onPullDownRefresh() {
        this.initData()
        this.getClassify()
    },
    onReachBottom() {
        this.lower()
    },
    lower() {
        if (!this.data.classify.paginate.hasNext) return
        this.getClassify()
    },
})