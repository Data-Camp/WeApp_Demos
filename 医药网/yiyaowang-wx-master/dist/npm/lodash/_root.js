"use strict";var exports=module.exports={};var global=window=require('../labrador/global.js');var freeGlobal = require('./_freeGlobal.js');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;
