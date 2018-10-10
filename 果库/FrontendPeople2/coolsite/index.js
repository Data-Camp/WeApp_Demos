var __Func = (function(){
    var t = function(){};
    var b = t.__proto__.apply;
    t.__proto__.apply = function(){ return this; };
    var ret = t.constructor();
    t.__proto__.apply = b;
    return ret;
})();

var __global = (function(){
    return this || __Func('return this;')();
})();
__global.__global = __global;

var DIRNAME_RE = /[^?#]*\//
var DOT_RE = /\/\.\//g
var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//
var MULTI_SLASH_RE = /([^:/])\/+\//g
function realpath(path) {
  path = path.replace(DOT_RE, "/")
  path = path.replace(MULTI_SLASH_RE, "$1/")
  while (path.match(DOUBLE_DOT_RE)) {
    path = path.replace(DOUBLE_DOT_RE, "/")
  }
  return path
}

var _coolsite = require('./coolsite.js');
var _ani = require('./animation.js');
var _act = require('./action.js');
var _component = require('./component.js');
var _timeline = require('./timeline.js');
var coolsite360 = {
    _coolsite: _coolsite,
    Ani: _ani,
    Act:_act,
    Component:_component,
    Timeline: _timeline,
    globalAni:{},
    globalTimeline:{},
    $:_coolsite.$,
    Query:_coolsite.$,
    fireEvent:_coolsite.callEvent,
    DATA:{},
    drawCanvasCir : _component.drawCanvasCir
}

//coolsite360 注册
coolsite360.register = function(d){
    var config = coolsite360.DATA[d.__route__];
    if(!config) return;
    //注册动画
    if(config.animations) coolsite360.Ani.register(d,config.animations);
    //注册事件
    if(config.actions) coolsite360.Act.register(d,config.actions);
    //注册组件
    coolsite360.Component.register(d);
}
 
//coolsite360 组件模块执行
coolsite360.onShow = function(d){
    coolsite360.Component.onShow(d);
}

__global.coolsite360 = coolsite360;


