"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');var isObject = require('./_is-object.js')
  , document = require('./_global.js').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};