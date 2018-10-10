"use strict";var exports=module.exports={};var has          = require('./_has.js')
  , toIObject    = require('./_to-iobject.js')
  , arrayIndexOf = require('./_array-includes.js')(false)
  , IE_PROTO     = require('./_shared-key.js')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};