"use strict";var exports=module.exports={};var isObject = require('./_is-object.js');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};