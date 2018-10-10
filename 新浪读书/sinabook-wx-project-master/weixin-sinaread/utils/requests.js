var api = require('./apiurl.js'); 
var utils = require('./util.js');

function request(url, data, successCb, errorCb, completeCb) { 
    wx.request({ 
        url: url, 
        method: 'GET', 
        data: data, 
        success: function(res) { 
            utils.isFunction(successCb) && successCb(res); 
            }, 
        error: function() { 
            utils.isFunction(errorCb) && errorCb(); 
            }, 
        complete: function() { 
            utils.isFunction(completeCb) && completeCb(); } 
            }); 
        } 
//搜索图书 
function getBookListData(data, successCb, errorCb, completeCb) {
    request(api.getBookList, data, successCb, errorCb, completeCb); 
} 
//获取某本书籍
function getBookById(id, successCb, errorCb, completeCb) { 
    request(api.getBookById+id, "", successCb, errorCb, completeCb); 
    }

module.exports = {getBooklist:getBookListData,getBookById:getBookById}