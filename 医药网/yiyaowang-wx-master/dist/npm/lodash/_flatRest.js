"use strict";var exports=module.exports={};var flatten = require('./flatten.js'),
    overRest = require('./_overRest.js'),
    setToString = require('./_setToString.js');

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;
