
var Promise = require('../plugins/bluebird.core.min.js')
var HtmlToJson = require('../plugins/html2wxml')

var MARS = function () { }

MARS.query = function (options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: options.url,
            data: Object.assign({}, options.data),
            header: { 'content-type': 'application/json' },
            success: resolve,
            fail: reject
        })
    })
}

MARS.result = function (options) {
    return this.query(options).then(res => res)
}

MARS.html2json = function (html) {
    if (arguments.length > 1) {
        throw new Error('params error');
    }
    let r = /\s+(?=<)/g;
    html = html.replace(r, '');
    let nhtml = HtmlToJson.html2json(html);
    return nhtml;
}

MARS.json2html = function (json) {
    if (arguments.length > 1) {
        throw new Error('params error');
    }
    return HtmlToJson.json2html(json);
}


module.exports = MARS
