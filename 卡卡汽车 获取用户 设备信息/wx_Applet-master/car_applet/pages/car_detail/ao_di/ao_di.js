Page({
    data: {
        imgUrls: [
            "http://img1.xcarimg.com/b63/s7736/c_20160511153957007951768554208.jpg",
            "http://img1.xcarimg.com/b63/s7736/c_20160511153948903325305587219.jpg",
            "http://img1.xcarimg.com/b63/s7736/c_20160324172935416694857347161.jpg",
            "http://img1.xcarimg.com/b63/s7736/c_20160918132004359674866549395.jpg",
            "http://img1.xcarimg.com/b63/s7736/c_20160918132002131163573867539.jpg",
            "http://img1.xcarimg.com/b63/s7736/c_20160729071450170685818327422.jpg"
        ],
        duration: 3000,

        btn_load: false,
        plain: true,

        hidden: false
    },

    setLoad: function() {
        this.setData({
            btn_load: !this.data.btn_load
        })   
    },
    // 页面加载显示事件
    loadingChange: function() {
        setTimeout(() => {
            this.setData({
                hidden: true
            })
        }, 1200)
    },
    // 页面初始化执行
    onLoad() {
        this.loadingChange()
    }
})