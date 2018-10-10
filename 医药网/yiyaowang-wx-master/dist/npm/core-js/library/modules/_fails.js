"use strict";var exports=module.exports={};module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};