// 对微信网络请求的异步封装

module.exports = (options) => {
    return new Promise((resolve, reject) => {
        options = Object.assign(options, {
            success(result) {
                if (result.statusCode === 200) {
                    resolve(result.data);
                } else {
                    reject(result);
                }
            },

            fail: reject,
        });

        wx.request(options);
    });
};
