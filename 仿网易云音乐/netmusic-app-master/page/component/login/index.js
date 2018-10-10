Page({
    data: {
        phone: "",
        pwd: ""
    },
    onLoad: function () {

    },
    textinput: function (event) {
        var type = event.currentTarget.dataset.type;
        if (type == 1) {
            this.setData({
                phone: event.detail.value
            })
        } else {
            this.setData({
                pwd: event.detail.value
            })
        }
    },
    login: function () {
        var that = this;
        wx.request({
            url: 'https://n.sqaiyan.com/login?phone=' + that.data.phone + '&pwd=' + that.data.pwd,
            data: {
                phone: that.data.phone,
                pwd: that.data.pwd
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
                wx.setStorageSync('logined', res.data);
                wx.redirectTo({
                    url: '../index',
                    success: function (res) {
                        // success
                    },
                    fail: function () {
                        // fail
                    },
                    complete: function () {
                        // complete
                    }
                })
            },
            fail: function () {

            },
            complete: function () {
                // complete
            }
        })
    }
})