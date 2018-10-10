"use strict";var exports=module.exports={};// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object.js')
  , aFunction = require('./_a-function.js')
  , SPECIES   = require('./_wks.js')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};