"use strict";var exports=module.exports={};var $export = require('./_export.js')
  , $task   = require('./_task.js');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});