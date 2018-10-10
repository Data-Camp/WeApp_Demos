"use strict";var exports=module.exports={};var classof   = require('./_classof.js')
  , ITERATOR  = require('./_wks.js')('iterator')
  , Iterators = require('./_iterators.js');
module.exports = require('./_core.js').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};