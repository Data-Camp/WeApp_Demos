"use strict";var exports=module.exports={};var castPath = require('./_castPath.js'),
    last = require('./last.js'),
    parent = require('./_parent.js'),
    toKey = require('./_toKey.js');

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;
