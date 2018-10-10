"use strict";var exports=module.exports={};module.exports = !require('./_descriptors.js') && !require('./_fails.js')(function(){
  return Object.defineProperty(require('./_dom-create.js')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});