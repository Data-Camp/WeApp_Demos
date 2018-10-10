var util = require('./util')
var config = require('./config');
// var Promise = require('../bluebird.min.js')
var url = config.url;

function selectBooks(params, cb) {
    var option = {
        method: 'POST',
        url: url + 'select',
        data: params
    };

    util.request(option, (res, err) => {
        if (err) {
            cb(err);
        } else {
            cb(res);
        }
    });

    // util.request(option).then(function (res, err) {
    //     if (err) {
    //         reject(err);
    //     } else {
    //         resolve(res);
    //     }
    // });

}

function selectBookFromDouban(isbn13, cb) {
    var option = {
        method: 'GET',
        url: config.doubanUrl + isbn13
    };

    util.request(option, (res, err) => {
        if (err) {
            cb(err);
        } else {
            cb(res);
        }
    });

    // return new Promise(function (resolve, reject) {
    //     util.request(option).then(function (res, err) {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(res);
    //         }
    //     });
    // })
}







function put(option, cb) {

    util.request(option, (res, err) => {
        if (err) {
            cb(err);
        } else {
            cb(res);
        }
    });

    // return new Promise(function (resolve, reject) {
    //     util.request(option).then(function (res, err) {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(res);
    //         }
    //     });
    // });
}

function getOpenId(code, cb) {

    var appID = config.appID;
    var appSecret = config.appSecret;
    var options = {
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    };

    util.request(option, (res, err) => {
        if (err) {
            cb(err);
        } else {
            cb(res);
        }
    });

}



module.exports = {
    selectBooks: selectBooks,
    selectBookFromDouban: selectBookFromDouban,
    put: put,
    getOpenId: getOpenId
}