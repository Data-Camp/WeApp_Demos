import config from '../../mars/conf/config'

(function (exports) {

    //执行微信请求
    exports.WxRequest = function (params, callback) {
        if (!params.method) params.method = "POST"
        wx.request({
            url: config.domain + params.url, //请求地址
            data: Object.assign({}, params.data),
            header: {
                'content-type': 'application/json'
            },
            method: params.method,
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data)
                } else {
                    throw new Error('Request "' + params.url + '" failed');
                }
            }
        })
    }

    //资讯信息列表
    exports.ArticleList = function (params, callback) {
        params.url = 'N/GetNewsList'
        exports.WxRequest(params, callback)
    }

    //资讯信息详细
    exports.ArticleDetail = function (params, callback) {
        params.url = 'N/GetNewsDetails'
        exports.WxRequest(params, callback)
    }

} (module.exports))