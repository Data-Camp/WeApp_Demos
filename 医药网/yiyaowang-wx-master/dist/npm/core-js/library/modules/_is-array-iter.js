"use strict";var exports=module.exports={};// check on default Array iterator
var Iterators  = require('./_iterators.js')
  , ITERATOR   = require('./_wks.js')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};