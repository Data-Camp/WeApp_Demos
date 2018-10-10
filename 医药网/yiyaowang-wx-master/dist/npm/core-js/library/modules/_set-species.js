"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');var global      = require('./_global.js')
  , core        = require('./_core.js')
  , dP          = require('./_object-dp.js')
  , DESCRIPTORS = require('./_descriptors.js')
  , SPECIES     = require('./_wks.js')('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};