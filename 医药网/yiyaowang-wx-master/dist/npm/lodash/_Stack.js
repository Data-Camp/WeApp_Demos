"use strict";var exports=module.exports={};var ListCache = require('./_ListCache.js'),
    stackClear = require('./_stackClear.js'),
    stackDelete = require('./_stackDelete.js'),
    stackGet = require('./_stackGet.js'),
    stackHas = require('./_stackHas.js'),
    stackSet = require('./_stackSet.js');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;
