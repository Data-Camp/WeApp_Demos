// 基于腾讯地图API的地理位置功能封装

const config = require('../config.js');
const request = require('request.js');

const statusCodeMap = {  // 请求失败原因映射
    110: '请求来源未被授权',
    301: '请求参数信息有误',
    311: 'key格式错误',
    306: '请求有护持信息请检查字符串',
}

module.exports = {

    // 地图API请求方法
    mapRequest(method, params, callback) {
        var url = [config.map.baseUrl, method, 'v1/'].join('/');
        let param = Object.assign({'key': config.map.key}, params);
        let queryString = Object.keys(param).map(q => [q, param[q]].join('=')).join('&');
        url += '?' + queryString;

        request({'method': 'GET', 'url': url}).then(resp => {
            if (resp.status != 0) {
                console.log('请求错误：' + (statusCodeMap[resp.status] || resp.message));
                request
            }

            return callback(resp);
        }).catch(err => {console.log(err);});
    },

    // 格式化地理位置
    formatLocation(loc) {
        return [loc.latitude, loc.longitude].map(f => f.toString()).join(',');
    },
}
