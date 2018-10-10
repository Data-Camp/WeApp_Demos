"use strict";var exports=module.exports={};var shared = require('./_shared.js')('keys')
  , uid    = require('./_uid.js');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};