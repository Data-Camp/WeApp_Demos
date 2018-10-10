"use strict";var exports=module.exports={};var classof   = require('./_classof.js')
  , ITERATOR  = require('./_wks.js')('iterator')
  , Iterators = require('./_iterators.js');
module.exports = require('./_core.js').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};