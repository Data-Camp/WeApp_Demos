var app = getApp();
var bsurl=require('../../../utils/bsurl.js');
var common = require('../../../utils/util.js');
Page({
    data: {
        rec: {},
        main: {},
        loading: true,
        limit: 20,
        offset: 0,
        recid: 0,
    },
    onLoad: function (options) {
        var id = options.id,
            fromtype = options.type,
            that = this;
        this.setData({
            recid: id,
            loading: true,
        })
        common.loadrec(this.data.offset, this.data.limit, id, function (data) {
            that.setData({
                loading: false,
                rec: data,
                loading: false,
                offset: data.comments.length
            });
            wx.setNavigationBarTitle({
                title: '评论(' + data.total + ")"
            })
        })
    },
    loadmore: function () {
        if (this.data.rec.more) {
            var that = this;
            this.setData({
                loading:true
            })
            common.loadrec(this.data.offset, this.data.limit, this.data.recid, function (data) {
                var rec = that.data.rec;
                var offset = that.data.offset + data.comments.length
                data.comments = rec.comments.concat(data.comments);
                data.hotComments=rec.hotComments;
                that.setData({
                    loading: false,
                    rec: data,
                    loading: false,
                    offset: offset
                });
            })
        }
    }

})