"use strict";var exports=module.exports={};var listCacheClear = require('./_listCacheClear.js'),
    listCacheDelete = require('./_listCacheDelete.js'),
    listCacheGet = require('./_listCacheGet.js'),
    listCacheHas = require('./_listCacheHas.js'),
    listCacheSet = require('./_listCacheSet.js');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;
