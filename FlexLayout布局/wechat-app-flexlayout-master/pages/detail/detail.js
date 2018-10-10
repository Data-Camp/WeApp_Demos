var app = getApp();
Page({
    data: {
        detail: {}
    },
    onLoad: function(opts){
        console.log(app.globalData.plist[opts.index]);
        this.setData({
            detail: app.globalData.plist[opts.index]
        });
    }
});