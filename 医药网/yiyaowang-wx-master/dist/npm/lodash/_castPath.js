"use strict";var exports=module.exports={};var isArray = require('./isArray.js'),
    isKey = require('./_isKey.js'),
    stringToPath = require('./_stringToPath.js'),
    toString = require('./toString.js');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;
