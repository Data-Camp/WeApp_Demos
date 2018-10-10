"use strict";var exports=module.exports={};var asciiToArray = require('./_asciiToArray.js'),
    hasUnicode = require('./_hasUnicode.js'),
    unicodeToArray = require('./_unicodeToArray.js');

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;
