"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');require('./es6.array.iterator.js');
var global        = require('./_global.js')
  , hide          = require('./_hide.js')
  , Iterators     = require('./_iterators.js')
  , TO_STRING_TAG = require('./_wks.js')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}