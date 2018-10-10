function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//
String.prototype.isEmpty = function () {
    if (this.replace(/(^\s*)|(\s*$)/g, '').length <= 0) {//null
        return true;
    }
    else {// not null
        return false;
    }
};
String.prototype.notEmpty = function () {
    return !this.isEmpty();
};
String.prototype.isEmail = function () {
    if (this.isEmpty() || (!/^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/.test(this))) {//格式不正确
        return false;
    } else {// 格式正确
        return true;
    }
};
String.prototype.isPhoneNumber = function () {
    if (this.isEmpty() || (!/^1([3-9][0-9]{9})$/.test(this))) {//格式不正确
        return false;
    } else {// 格式正确
        return true;
    }
};
String.prototype.isNumber = function () {
    if (this.isEmpty() || (!/^[0-9]+$/.test(this))) {
        return false;
    } else {
        return true;
    }
};
String.prototype.trim = function () {
    return this.replace(/^\s*/img, "").replace(/\s*$/img, "");
};
function json2Form(json) {
    var str = [];
    for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
}

function _checkReqParams(args) {
    if (args['url'].isEmpty()) {
        console.warn("必须设置URL");
        return false;
    }
    if (args['url'].substr(0, 5) != 'https') {
        console.warn("微信小程序只支持HTTPS");
        return false;
    }

    if (typeof args['filePath'] != 'undefined' && !args['filePath']) {
        return false;
    }

    return true;
}

function JFuploadfile(args) {
    //准备参数
    var url, filePath, name, header, formData, successFunc, failFunc, completeFunc, file_type, utoken;
    if (!_checkReqParams(args)) {
        console.warn('Illegal param,input: ' + args);
    }
    url = args['url'] + '?';
    formData = args['formData'] || {};
    file_type = args['formData']['file_type'] || 1;
    formData.file_type = file_type;
    //
    filePath = args['filePath'];
    name = args['name'];
    header = {"Content-Type": "multipart/form-data"};

    if (typeof args['success'] == 'function') {
        successFunc = args['success'];
    }
    if (typeof args['fail'] == 'function') {
        failFunc = args['fail'];
    }

    //统一处理登录问题
    completeFunc = function (serverRes) {
        if (serverRes && serverRes.data && serverRes.data.code == 110000) {
            //记录当前页面
            var pageInfo = getCurrentPages();
            var fromPage = pageInfo[0].__route__;
            setTimeout(function () {
                wx.navigateTo({
                    url: '../login/login?fromPage=' + fromPage
                });
            }, 300);
        }
        if (typeof args['complete'] == 'function') {
            args['complete'](serverRes);
        }
    };
    //查出 utoken
    wx.getStorage({
        key: 'utoken',
        complete: function (res) {
            utoken = res.data;
            if (utoken) {
                formData['utoken'] = utoken;
            }
            if (!formData.devid) {
                formData['devid'] = 'superwings-wx-app-static-devid';
            }
            if (!formData.app_ver) {
                formData['app_ver'] = '1.0';
            }
            if (!formData.client_type) {
                formData['client_type'] = 'wx_app';
            }
            //重新组织URL
            url += json2Form(formData);
            console.log(url);

            wx.uploadFile({
                url: url,
                filePath: filePath,
                name: name,
                header: header,
                formData: formData,
                success: successFunc,
                fail: failFunc,
                complete: completeFunc,
            })
        }
    });


}

function JFrequest(args) {
    //校验参数
    if (!_checkReqParams(args)) {
        console.warn('Illegal param,input: ' + args);
        return;
    }
    //配置默认参数
    var url, param, header, method, successFunc, failFunc, completeFunc, utoken;
    url = args['url'] || '';
    param = args['param'] || {};
    method = args['method'] || 'GET';
    if (method == 'GET') {
        header = {'Content-Type': 'application/json'};
    } else if (method == 'POST') {
        header = {"Content-Type": "application/x-www-form-urlencoded"};
    }
    if (typeof args['success'] == 'function') {
        successFunc = args['success'];
    }
    if (typeof args['fail'] == 'function') {
        failFunc = args['fail'];
    }

    //统一处理登录问题
    completeFunc = function (serverRes) {
        if (serverRes && serverRes.data && serverRes.data.code == 110000) {
            //记录当前页面
            var pageInfo = getCurrentPages();
            var fromPage = pageInfo[0].__route__;

            wx.navigateTo({
                url: '../login/login?fromPage=' + fromPage
            });

        }
        if (typeof args['complete'] == 'function') {
            args['complete'](serverRes);
        }

    };

    //查出 utoken
    wx.getStorage({
        key: 'utoken',
        complete: function (res) {
            utoken = res.data;
            if (utoken) {
                param['utoken'] = utoken;
            }
            if (!param.devid) {
                param['devid'] = 'superwings-wx-app-static-devid';
            }
            if (!param.app_ver) {
                param['app_ver'] = '1.0';
            }
            if (!param.client_type) {
                param['client_type'] = 'wx_app';
            }
            if (method == 'POST') {
                param = json2Form(param);
            }
            wx.request({
                url: url,
                data: param,
                header: header,
                method: method,
                success: successFunc,
                fail: failFunc,
                complete: completeFunc
            });
        }
    });
}

module.exports = {
    formatTime: formatTime,
    JFrequest: JFrequest,
    JFuploadfile: JFuploadfile
};
