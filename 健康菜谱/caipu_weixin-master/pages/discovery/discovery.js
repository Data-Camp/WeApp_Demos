//list.js
var app = getApp()
var number = 1
var isLoading = false
Page({
    data: {
        arr_res: [],
        windowHeight: "500px",
        loadingHidden: true,
        lodingInfo: "加载更多",
        url:"../../pages/content/content"
    },
    onLoad: function(options) {
        //使number重置为1
        number = 1;
        console.log(app.globalData.listId);
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                var height = res.windowHeight - 45;
                console.log(height + "px");
                that.setData({
                    windowHeight: height + "px"
                })
            },
            fail: function(e) {
                console.log("获取设备信息失败" + e);
            }
        });
        wx.request({
            url: app.globalData.globalUrl + "list",
            success: function(res) {
                that.setData({
                    arr_res: res.data.tngou,
                });
                console.log(that.data.arr_res);
            },
            fail: function(error) {
                console.log(error);
                that.setData({
                    request_fail: true,
                });
            }
        })
    },
    //滑到底部监听事件
    lower: function(e) {
        console.log(e);
        var that = this;
        if (!isLoading) {
            isLoading = true;
            that.setData({
                loadingHidden: false
            })
            wx.request({
                url: app.globalData.globalUrl + "list",
                data: {
                    page: ++number
                },
                success: function(res) {
                    that.setData({
                        arr_res: that.data.arr_res.concat(res.data.tngou),
                        lodingInfo: "加载更多",
                    });
                    console.log(that.data.arr_res);
                },
                fail: function(error) {
                    number--;
                    console.log(error);
                    that.setData({
                        lodingInfo: "加载失败",
                    })
                },
                complete:function(){
                    isLoading = false;
                    that.setData({
                        loadingHidden: true,
                    })
                }
            })
        }
    },
})
