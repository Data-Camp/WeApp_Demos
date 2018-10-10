"use strict";var exports=module.exports={};// 7.1.13 ToObject(argument)
var defined = require('./_defined.js');
module.exports = function(it){
  return Object(defined(it));
};