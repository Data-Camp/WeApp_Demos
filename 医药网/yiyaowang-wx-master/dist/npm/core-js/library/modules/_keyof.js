"use strict";var exports=module.exports={};var getKeys   = require('./_object-keys.js')
  , toIObject = require('./_to-iobject.js');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};