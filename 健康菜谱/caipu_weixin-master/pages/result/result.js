//list.js
var app = getApp()
Page({
    data: {
        arr_res: [],
        url:"../../pages/content/content"
    },
    onLoad: function(options) {
        this.setData({
            arr_res: app.globalData.result,
        })
        console.log(this.data.arr_res);
    },
    // //点击事件监听
    // tapItem: function(event) {
    //     app.globalData.contentId = event.target.id;
    //     console.log(app.globalData.contentId);
    //     for (var i = 0; i < this.data.arr_res.length; i++) {
    //         if (this.data.arr_res[i].id == event.target.id) {
    //             app.globalData.contentName = this.data.arr_res[i].name;
    //             break;
    //         }
    //     }
    //     console.log(app.globalData.contentName);
    //     wx.navigateTo({
    //         url: "../../pages/content/content"
    //     });
    // }
})
