"use strict";var exports=module.exports={};var baseGetAllKeys = require('./_baseGetAllKeys.js'),
    getSymbols = require('./_getSymbols.js'),
    keys = require('./keys.js');

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;
