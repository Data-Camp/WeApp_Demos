'use strict';
var EBOOK_HOST_URI = 'http://it-ebooks-api.info/v1/';

module.exports = {
    // 获取正在热映数据
    ebooklist: function (query, page) {
      var url = page? (EBOOK_HOST_URI +'search/'+ query + '/page/' + page) : (EBOOK_HOST_URI + 'search/' + query);
      return url;
    },
    ebookinfo: function (id) {
      return EBOOK_HOST_URI + 'book/' + id;
    }
};