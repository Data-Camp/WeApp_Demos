"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iterator = require('../../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof3 = require('../../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault(_typeof3);

var _symbol = require('../../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = isStatePlainEnough;

var _isPlainObject = require('../../../lodash/isPlainObject.js');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

function isStatePlainEnough(a) {
  // isPlainObject + duck type not immutable
  if (!a) return false;
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') return false;
  if (typeof a.mergeDeep === 'function') return false;
  if (!(0, _isPlainObject2.default)(a)) return false;
  return true;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzU3RhdGVQbGFpbkVub3VnaC5qcyJdLCJuYW1lcyI6WyJpc1N0YXRlUGxhaW5Fbm91Z2giLCJfdHlwZW9mIiwib2JqIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJhIiwibWVyZ2VEZWVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBSXdCQSxrQjs7QUFGeEI7Ozs7OztBQUZBLElBQUlDLFVBQVUsNEJBQWtCLFVBQWxCLElBQWdDLDhDQUEyQixRQUEzRCxHQUFzRSxVQUFVQyxHQUFWLEVBQWU7QUFBRSxnQkFBY0EsR0FBZCx1REFBY0EsR0FBZDtBQUFvQixDQUEzRyxHQUE4RyxVQUFVQSxHQUFWLEVBQWU7QUFBRSxTQUFPQSxPQUFPLDRCQUFrQixVQUF6QixJQUF1Q0EsSUFBSUMsV0FBSixxQkFBdkMsSUFBcUVELHlCQUFlRSxTQUFwRixHQUFnRyxRQUFoRyxVQUFrSEYsR0FBbEgsdURBQWtIQSxHQUFsSCxDQUFQO0FBQStILENBQTVROztBQUllLFNBQVNGLGtCQUFULENBQTRCSyxDQUE1QixFQUErQjtBQUM1QztBQUNBLE1BQUksQ0FBQ0EsQ0FBTCxFQUFRLE9BQU8sS0FBUDtBQUNSLE1BQUksQ0FBQyxPQUFPQSxDQUFQLEtBQWEsV0FBYixHQUEyQixXQUEzQixHQUF5Q0osUUFBUUksQ0FBUixDQUExQyxNQUEwRCxRQUE5RCxFQUF3RSxPQUFPLEtBQVA7QUFDeEUsTUFBSSxPQUFPQSxFQUFFQyxTQUFULEtBQXVCLFVBQTNCLEVBQXVDLE9BQU8sS0FBUDtBQUN2QyxNQUFJLENBQUMsNkJBQWNELENBQWQsQ0FBTCxFQUF1QixPQUFPLEtBQVA7QUFDdkIsU0FBTyxJQUFQO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1N0YXRlUGxhaW5Fbm91Z2goYSkge1xuICAvLyBpc1BsYWluT2JqZWN0ICsgZHVjayB0eXBlIG5vdCBpbW11dGFibGVcbiAgaWYgKCFhKSByZXR1cm4gZmFsc2U7XG4gIGlmICgodHlwZW9mIGEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGEpKSAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBhLm1lcmdlRGVlcCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuICBpZiAoIWlzUGxhaW5PYmplY3QoYSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59Il19