"use strict";var exports=module.exports={};var baseCreate = require('./_baseCreate.js'),
    getPrototype = require('./_getPrototype.js'),
    isPrototype = require('./_isPrototype.js');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;
