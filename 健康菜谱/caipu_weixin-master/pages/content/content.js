var app = getApp()
Page({
    data: {
        title:null,
        arr_res: {},
        message: null,
        request_fail: false
    },
    onLoad: function(options) {
        console.log(options.id);
        console.log(options.name);
        this.setData({
            title:options.name
        })
        var that = this;
        // 动态设置标题栏。。。无效
        wx.setNavigationBarTitle({
            title: options.name,
            fail: function() {
                console.log("更改标题失败");
            },
            success: function() {
                console.log("更改标题成功");
            }
        });

        //get请求
        wx.request({
            url: app.globalData.globalUrl + "show",
            data: {
                id: options.id,
            },
            success: function(res) {
                that.setData({
                    arr_res: res.data,
                    message: that.html_encode(res.data.message)
                });
                console.log(that.data.arr_res);
                console.log(that.data.message);
            },
            fail: function(error) {
                console.log(error);
                that.setData({
                    request_fail: true
                })
            }
        })
    },
    html_encode: function(str) {
        if (str.length == 0) return "";
        str = str.replace(/<h2>/, '');
        str = str.replace(/<h2>/g, '\n\n\n');
        str = str.replace(/<p>/g, '\n');
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/&nbsp;/g, '');
        str = str.replace('材料', '材料：');
        str = str.replace('菜谱简介', '菜谱简介：');
        str = str.replace('做法', '做法：');
        str = str.replace('小诀窍', '小诀窍：');

        str.value = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白

        return str;
    }
})
