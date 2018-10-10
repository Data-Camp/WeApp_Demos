/*
***HotApp云笔记，基于HotApp小程序统计云后台
***免费云后台申请地址 https://weixin.hotapp.cn/cloud
***API 文档地址：https://weixin.hotapp.cn/api
***小程序技术讨论QQ群：173063969
*/
var app = getApp();
Page({
    data: {
        item: {
            key: "",
            value: {
                title: "",
                content: ""
            },
            create_time: "",
            update_time: "",
            state: 1
        },
        isNew: false,
        focus: true
    },

    /**
     * 页面首次加载事件
     */
    onLoad: function(options) {
        var item = this.data.item;
        item.key = options.key;
        this.setData({
            item: item
        });
    },

    /**
     * 页面渲染事件
     */
    onShow: function() {
        this.loadData(this.data.item.key);        
    },
    
    /**
     * 保存数据事件
     */
    onSubmit: function(event) {
        var item = this.data.item;
        item.value.title = event.detail.value.title;
        item.value.content = event.detail.value.content;
        this.setData({
            item: item
        });
        this.saveData();
    },
    
    /**
     * 请求服务器保存数据
     */
    saveData: function() {
        var item = this.data.item;
        var now = Date.parse(new Date()) / 1000;
        item.update_time = now;
        this.setData({
            item: item
        });
        app.store(this.data.item, function(res) {
            if (res) {
                wx.showToast({
                    title: "保存成功"
                });
                //返回首页
                wx.navigateBack();
            } else {
                wx.showToast({
                    title: "保存失败"
                });
            }
        });
    },

    /**
     * 删除记事本事件
     */
    onDelete: function(event) {
        app.destroy(this.data.item, function(res) {
            if (res) {
                wx.showToast({
                    title: "删除成功"
                });
                wx.redirectTo({
                    url: "../index/index"
                })
            } else {
                wx.showToast({
                    title: "删除失败"
                });
            }
        });
    },

    /**
     * 获取数据
     */
    loadData: function(key) {
        var that = this;
        app.show(this.data.item.key, function(res) {
            that.setData({
                item: res
            });
        });
    }
});