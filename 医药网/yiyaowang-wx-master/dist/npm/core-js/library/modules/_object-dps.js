"use strict";var exports=module.exports={};var dP       = require('./_object-dp.js')
  , anObject = require('./_an-object.js')
  , getKeys  = require('./_object-keys.js');

module.exports = require('./_descriptors.js') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};