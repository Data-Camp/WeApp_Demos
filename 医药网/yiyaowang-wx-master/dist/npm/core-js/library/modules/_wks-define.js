"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');var global         = require('./_global.js')
  , core           = require('./_core.js')
  , LIBRARY        = require('./_library.js')
  , wksExt         = require('./_wks-ext.js')
  , defineProperty = require('./_object-dp.js').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};