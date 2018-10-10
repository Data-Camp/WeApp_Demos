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
     * 页面渲染事件
     */
    onShow: function() {
        var item = this.data.item;
        item.key = app.globalData.hotapp.genPrimaryKey('item');
        this.setData({
            item: item
        });
    },

    /**
     * 保存数据事件
     */
    onSubmit: function(event) {
        console.log(event)
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
        item.create_time = now;
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
    }
});