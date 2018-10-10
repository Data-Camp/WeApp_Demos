"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.setStore = exports.getStore = undefined;

var _connect = require('./src/connect.js');

var _connect2 = _interopRequireDefault(_connect);

var _store = require('./src/util/store.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-09
 * @author Li <li@maichong.it>
 */

exports.getStore = _store.getStore;
exports.setStore = _store.setStore;
exports.connect = _connect2.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdldFN0b3JlIiwic2V0U3RvcmUiLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBTUE7Ozs7QUFDQTs7OztBQVBBOzs7Ozs7UUFTU0EsUTtRQUFVQyxRO1FBQVVDLE8iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTExLTA5XG4gKiBAYXV0aG9yIExpIDxsaUBtYWljaG9uZy5pdD5cbiAqL1xuXG5pbXBvcnQgY29ubmVjdCBmcm9tICcuL3NyYy9jb25uZWN0JztcbmltcG9ydCB7IGdldFN0b3JlLCBzZXRTdG9yZSB9IGZyb20gJy4vc3JjL3V0aWwvc3RvcmUnO1xuXG5leHBvcnQgeyBnZXRTdG9yZSwgc2V0U3RvcmUsIGNvbm5lY3QgfTtcbiJdfQ==