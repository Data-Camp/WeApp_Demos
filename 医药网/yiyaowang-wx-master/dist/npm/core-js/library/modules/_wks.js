"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');var store      = require('./_shared.js')('wks')
  , uid        = require('./_uid.js')
  , Symbol     = require('./_global.js').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;