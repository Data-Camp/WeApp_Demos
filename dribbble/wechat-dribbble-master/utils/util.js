const api = require('api.js');
const dateFormat = require('dateFormat.js');

const TOKEN = "f580a93a3cacd178bf7d2f2a7e79f3982c7990d908a008f7ee5cf50388f00877";

/*
 * 请求封装
 * 返回 promise
 */
function request(params) {
  return new Promise(function (resolve, reject) {

    if (!params) {
      reject(new Error(params));
    }

    params.data = params.data || {};
    params.data['access_token'] = TOKEN;

    wx.request({
      url: params.url,
      method: params.method || "GET",
      data: params.data,
      success: function(res){
        if (res.statusCode === 200 || res.statusCode === 201){
          resolve(res);
        }else{
          console.log('[error]: ', res)
          reject(res);          
        }
      },
      fail: function(res) {
        reject(res);
      }
    })
  })
}

/*
 * 过滤 html 标签
 * filterHtml("<p>hello world!</p>") => "hello world!"
*/
function filterHtml(html) {
  return (html || "").replace(/<.*?>/g,"");
}

/*
 * 每三位加上逗号
 * 123456789 => 123,456,789
*/
function addCommas(value) {
  return parseFloat(value || 0).toLocaleString();
}

module.exports = {
  api: api,
  
  filterHtml: filterHtml,
  dateFormat: dateFormat,
  request: request,
  addCommas: addCommas
}
