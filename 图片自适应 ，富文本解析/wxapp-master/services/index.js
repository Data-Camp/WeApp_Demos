var Promise = require('./bluebird.min.js');

function get(url, params) {
	var params = params || null;
    //替换路径中的参数
    if(params){
        url = url.replace(/\{{3}(\w+)\}{3}/g, function(match, $1) {
            return params[$1] == null ? '' : params[$1];
        })
        .replace(/\{{2}(\w+)\}{2}/g, function(match, $1) {
            return encodeURIComponent(params[$1] == null ? '' : params[$1]);
        });
    }
    return new Promise(function(resolve, reject){
        wx.request({
            url: url,
            success: function(res) {
                var data = res && res.data;
                if(data && data.code === 0){
                    resolve(data.obj);
                }else{
                    reject(res);
                }
            },
            fail: function(err){
                reject(err)
            }
        })
    });
}
module.exports = {
  get: get
}
