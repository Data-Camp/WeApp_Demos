"use strict";var exports=module.exports={};// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object.js')
  , meta     = require('./_meta.js').onFreeze;

require('./_object-sap.js')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});