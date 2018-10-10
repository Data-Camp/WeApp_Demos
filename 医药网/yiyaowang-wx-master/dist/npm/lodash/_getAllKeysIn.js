"use strict";var exports=module.exports={};var baseGetAllKeys = require('./_baseGetAllKeys.js'),
    getSymbolsIn = require('./_getSymbolsIn.js'),
    keysIn = require('./keysIn.js');

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;
