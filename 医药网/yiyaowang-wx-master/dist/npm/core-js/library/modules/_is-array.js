"use strict";var exports=module.exports={};// 7.2.2 IsArray(argument)
var cof = require('./_cof.js');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};