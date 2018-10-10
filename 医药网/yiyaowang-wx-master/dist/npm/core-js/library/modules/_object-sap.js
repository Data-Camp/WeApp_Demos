"use strict";var exports=module.exports={};// most Object methods by ES6 should accept primitives
var $export = require('./_export.js')
  , core    = require('./_core.js')
  , fails   = require('./_fails.js');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};