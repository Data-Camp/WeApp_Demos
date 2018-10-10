"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn.js')
  , gOPS     = require('./_object-gops.js')
  , anObject = require('./_an-object.js')
  , Reflect  = require('./_global.js').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};