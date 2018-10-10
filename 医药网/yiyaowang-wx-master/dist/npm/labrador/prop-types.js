"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-11
 * @author Liang <liang@maichong.it>
 */

/* eslint no-inner-declarations:0 no-inner-declarations:0 */


var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberTag = '[object Number]';
var boolTag = '[object Boolean]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';

function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object';
}

function objectToString(value) {
  return Object.prototype.toString.call(value);
}

function getType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }

  var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);

  if (type === 'function') {
    return 'func';
  }
  if (type === 'number' || isObjectLike(value) && objectToString(value) === numberTag) {
    return 'number';
  }
  if (value === true || value === false || isObjectLike(value) && objectToString(value) === boolTag) {
    return 'bool';
  }
  if (type === 'string' || isObjectLike(value) && objectToString(value) === stringTag) {
    return 'string';
  }
  if (type === 'object' && value !== null) {
    return 'object';
  }
  if (type === 'symbol' || isObjectLike(value) && objectToString(value) === symbolTag) {
    return 'symbol';
  }
  return 'unknown';
}

function generate(name, allowNull) {
  var validator = function validator(props, propName, componentName) {
    var value = props[propName];
    if (value === undefined || allowNull && value === null) return null;
    var type = getType(value);
    return type === name ? null : new Error('组件"' + componentName + '"的属性"' + propName + '"类型声明为"' + name + '"，却得到"' + type + '"');
  };
  validator.isRequired = function (props, propName, componentName) {
    var value = props[propName];
    if (value === undefined || value === null) {
      return new Error('组件"' + componentName + '"的必要属性"' + propName + '"缺失，得到"' + value + '"');
    }
    return validator(props, propName, componentName);
  };
  return validator;
}

var any = function any() {};

if (true) {
  any.isRequired = function (props, propName, componentName) {
    var value = props[propName];
    if (value === undefined) {
      return new Error('组件"' + componentName + '"的必要属性"' + propName + '"缺失，得到"' + value + '"');
    }
    return null;
  };

  module.exports = {
    number: generate('number'),
    string: generate('string'),
    func: generate('func', true),
    array: generate('array'),
    bool: generate('bool'),
    object: generate('object', true),
    symbol: generate('symbol'),
    any: any
  };
} else {
  any.isRequired = function () {};
  module.exports = {
    number: any,
    string: any,
    func: any,
    array: any,
    bool: any,
    object: any,
    symbol: any,
    any: any
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3AtdHlwZXMuanMiXSwibmFtZXMiOlsibnVtYmVyVGFnIiwiYm9vbFRhZyIsInN0cmluZ1RhZyIsInN5bWJvbFRhZyIsImlzT2JqZWN0TGlrZSIsInZhbHVlIiwib2JqZWN0VG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJnZXRUeXBlIiwiQXJyYXkiLCJpc0FycmF5IiwidHlwZSIsImdlbmVyYXRlIiwibmFtZSIsImFsbG93TnVsbCIsInZhbGlkYXRvciIsInByb3BzIiwicHJvcE5hbWUiLCJjb21wb25lbnROYW1lIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJpc1JlcXVpcmVkIiwiYW55IiwiX19ERVZfXyIsIm1vZHVsZSIsImV4cG9ydHMiLCJudW1iZXIiLCJzdHJpbmciLCJmdW5jIiwiYXJyYXkiLCJib29sIiwib2JqZWN0Iiwic3ltYm9sIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBTUE7O0FBSUE7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxpQkFBbEI7QUFDQSxJQUFNQyxVQUFVLGtCQUFoQjtBQUNBLElBQU1DLFlBQVksaUJBQWxCO0FBQ0EsSUFBTUMsWUFBWSxpQkFBbEI7O0FBRUEsU0FBU0MsWUFBVCxDQUFzQkMsS0FBdEIsRUFBMkM7QUFDekMsU0FBT0EsU0FBUyxJQUFULElBQWlCLFFBQU9BLEtBQVAsdURBQU9BLEtBQVAsT0FBaUIsUUFBekM7QUFDRDs7QUFFRCxTQUFTQyxjQUFULENBQXdCRCxLQUF4QixFQUErQztBQUM3QyxTQUFPRSxPQUFPQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JMLEtBQS9CLENBQVA7QUFDRDs7QUFFRCxTQUFTTSxPQUFULENBQWlCTixLQUFqQixFQUFxQztBQUNuQyxNQUFJTyxNQUFNQyxPQUFOLENBQWNSLEtBQWQsQ0FBSixFQUEwQjtBQUN4QixXQUFPLE9BQVA7QUFDRDs7QUFFRCxNQUFNUyxjQUFjVCxLQUFkLHVEQUFjQSxLQUFkLENBQU47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QVMsTUFBVCxDQUxTO0FBTWZtQixZQUFRbkIsU0FBUyxRQUFULEVBQW1CLElBQW5CLENBTk87QUFPZm9CLFlBQVFwQixTQUFTLFFBQVQsQ0FQTztBQVFmVSxTQUFLQTtBQVJVLEdBQWpCO0FBVUQsQ0FuQkQsTUFtQk87QUFDTEEsTUFBSUQsVUFBSixHQUFpQixZQUFZLENBQzVCLENBREQ7QUFFQUcsU0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxZQUFRSixHQURPO0FBRWZLLFlBQVFMLEdBRk87QUFHZk0sVUFBTU4sR0FIUztBQUlmTyxXQUFPUCxHQUpRO0FBS2ZRLFVBQU1SLEdBTFM7QUFNZlMsWUFBUVQsR0FOTztBQU9mVSxZQUFRVixHQVBPO0FBUWZBLFNBQUtBO0FBUlUsR0FBakI7QUFVRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IE1haWNob25nIFNvZnR3YXJlIEx0ZC4gMjAxNiBodHRwOi8vbWFpY2hvbmcuaXRcbiAqIEBkYXRlIDIwMTYtMTAtMTFcbiAqIEBhdXRob3IgTGlhbmcgPGxpYW5nQG1haWNob25nLml0PlxuICovXG5cbi8qIGVzbGludCBuby1pbm5lci1kZWNsYXJhdGlvbnM6MCBuby1pbm5lci1kZWNsYXJhdGlvbnM6MCAqL1xuXG4vLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nO1xuY29uc3QgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJztcbmNvbnN0IHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuY29uc3Qgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG59XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlOiBPYmplY3QpOiBzdHJpbmcge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0VHlwZSh2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cblxuICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG4gIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuICdmdW5jJztcbiAgfVxuICBpZiAodHlwZSA9PT0gJ251bWJlcicgfHwgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcodmFsdWUpID09PSBudW1iZXJUYWcpKSB7XG4gICAgcmV0dXJuICdudW1iZXInO1xuICB9XG4gIGlmIChcbiAgICB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2VcbiAgICB8fCAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZyh2YWx1ZSkgPT09IGJvb2xUYWcpXG4gICkge1xuICAgIHJldHVybiAnYm9vbCc7XG4gIH1cbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnIHx8IChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gc3RyaW5nVGFnKSkge1xuICAgIHJldHVybiAnc3RyaW5nJztcbiAgfVxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH1cbiAgaWYgKHR5cGUgPT09ICdzeW1ib2wnIHx8IChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nKHZhbHVlKSA9PT0gc3ltYm9sVGFnKSkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuICByZXR1cm4gJ3Vua25vd24nO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZShuYW1lOiBzdHJpbmcsIGFsbG93TnVsbD86IGJvb2xlYW4pIHtcbiAgY29uc3QgdmFsaWRhdG9yID0gZnVuY3Rpb24gKHByb3BzOiBhbnksIHByb3BOYW1lOiBzdHJpbmcsIGNvbXBvbmVudE5hbWU6IHN0cmluZyk6ID9FcnJvciB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgKGFsbG93TnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHR5cGUgPSBnZXRUeXBlKHZhbHVlKTtcbiAgICByZXR1cm4gdHlwZSA9PT0gbmFtZSA/IG51bGwgOiBuZXcgRXJyb3IoJ+e7hOS7tlwiJyArIGNvbXBvbmVudE5hbWUgKyAnXCLnmoTlsZ7mgKdcIicgKyBwcm9wTmFtZSArICdcIuexu+Wei+WjsOaYjuS4ulwiJyArIG5hbWUgKyAnXCLvvIzljbTlvpfliLBcIicgKyB0eXBlICsgJ1wiJyk7XG4gIH07XG4gIHZhbGlkYXRvci5pc1JlcXVpcmVkID0gZnVuY3Rpb24gKHByb3BzOiBhbnksIHByb3BOYW1lOiBzdHJpbmcsIGNvbXBvbmVudE5hbWU6IHN0cmluZyk6ID9FcnJvciB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ+e7hOS7tlwiJyArIGNvbXBvbmVudE5hbWUgKyAnXCLnmoTlv4XopoHlsZ7mgKdcIicgKyBwcm9wTmFtZSArICdcIue8uuWkse+8jOW+l+WIsFwiJyArIHZhbHVlICsgJ1wiJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWxpZGF0b3IocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKTtcbiAgfTtcbiAgcmV0dXJuIHZhbGlkYXRvcjtcbn1cblxuY29uc3QgYW55ID0gZnVuY3Rpb24gKCkge1xufTtcblxuaWYgKF9fREVWX18pIHtcbiAgYW55LmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAocHJvcHM6IGFueSwgcHJvcE5hbWU6IHN0cmluZywgY29tcG9uZW50TmFtZTogc3RyaW5nKTogP0Vycm9yIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcign57uE5Lu2XCInICsgY29tcG9uZW50TmFtZSArICdcIueahOW/heimgeWxnuaAp1wiJyArIHByb3BOYW1lICsgJ1wi57y65aSx77yM5b6X5YiwXCInICsgdmFsdWUgKyAnXCInKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbnVtYmVyOiBnZW5lcmF0ZSgnbnVtYmVyJyksXG4gICAgc3RyaW5nOiBnZW5lcmF0ZSgnc3RyaW5nJyksXG4gICAgZnVuYzogZ2VuZXJhdGUoJ2Z1bmMnLCB0cnVlKSxcbiAgICBhcnJheTogZ2VuZXJhdGUoJ2FycmF5JyksXG4gICAgYm9vbDogZ2VuZXJhdGUoJ2Jvb2wnKSxcbiAgICBvYmplY3Q6IGdlbmVyYXRlKCdvYmplY3QnLCB0cnVlKSxcbiAgICBzeW1ib2w6IGdlbmVyYXRlKCdzeW1ib2wnKSxcbiAgICBhbnk6IGFueVxuICB9O1xufSBlbHNlIHtcbiAgYW55LmlzUmVxdWlyZWQgPSBmdW5jdGlvbiAoKSB7XG4gIH07XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIG51bWJlcjogYW55LFxuICAgIHN0cmluZzogYW55LFxuICAgIGZ1bmM6IGFueSxcbiAgICBhcnJheTogYW55LFxuICAgIGJvb2w6IGFueSxcbiAgICBvYmplY3Q6IGFueSxcbiAgICBzeW1ib2w6IGFueSxcbiAgICBhbnk6IGFueVxuICB9O1xufVxuIl19