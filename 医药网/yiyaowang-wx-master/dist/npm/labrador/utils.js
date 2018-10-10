"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('../babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getDebugObject = getDebugObject;
exports.shouldUpdate = shouldUpdate;
exports.callLifecycle = callLifecycle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取用于调试输出的对象
 * @param {Object} object
 * @returns {Object}
 */
function getDebugObject(object) {
  if (true) {
    if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object' || !object || object.asMutable) return object;
    for (var key in object) {
      if (object[key] && (0, _typeof3.default)(object[key]) === 'object' && !object[key].asMutable) return JSON.parse((0, _stringify2.default)(object));
    }
  }
  return object;
}

/**
 * 判断是否需要更新
 * @param {Object} original  原有对象
 * @param {Object} append    新增数据
 * @returns {boolean}
 */
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-04
 * @author Liang <liang@maichong.it>
 */

function shouldUpdate(original, append) {
  if (original === append) return false;
  for (var key in append) {
    var value = append[key];
    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value) {
      if (!value.asMutable || original[key] !== value) {
        return true;
      }
    } else if (original[key] !== value) {
      //bool string number null
      return true;
    }
  }
  return false;
}

/**
 * 递归调用组件的生命周期函数
 * @param {Component} component
 * @param {string} name
 * @param {array} [args]
 */
function callLifecycle(component, name, args) {
  // $Flow 安全访问生命周期函数
  if (component[name]) {
    if (true) {
      console.log('%c%s %s()', 'color:#9a23cc', component.id, name);
    }
    component[name].apply(component, args);
  }

  if (component._children) {
    for (var key in component._children) {
      var child = component._children[key];
      if (Array.isArray(child)) {
        child.forEach(function (item) {
          return callLifecycle(item, name, args);
        });
      } else {
        callLifecycle(child, name, args);
      }
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImdldERlYnVnT2JqZWN0Iiwic2hvdWxkVXBkYXRlIiwiY2FsbExpZmVjeWNsZSIsIm9iamVjdCIsIl9fREVWX18iLCJhc011dGFibGUiLCJrZXkiLCJKU09OIiwicGFyc2UiLCJvcmlnaW5hbCIsImFwcGVuZCIsInZhbHVlIiwiY29tcG9uZW50IiwibmFtZSIsImFyZ3MiLCJjb25zb2xlIiwibG9nIiwiaWQiLCJhcHBseSIsIl9jaGlsZHJlbiIsImNoaWxkIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsIml0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1FBZWdCQSxjLEdBQUFBLGM7UUFnQkFDLFksR0FBQUEsWTtRQXNCQUMsYSxHQUFBQSxhOzs7O0FBM0NoQjs7Ozs7QUFLTyxTQUFTRixjQUFULENBQXdCRyxNQUF4QixFQUFnRDtBQUNyRCxNQUFJQyxPQUFKLEVBQWE7QUFDWCxRQUFJLFFBQU9ELE1BQVAsdURBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEIsQ0FBQ0EsTUFBL0IsSUFBeUNBLE9BQU9FLFNBQXBELEVBQStELE9BQU9GLE1BQVA7QUFDL0QsU0FBSyxJQUFJRyxHQUFULElBQWdCSCxNQUFoQixFQUF3QjtBQUN0QixVQUFJQSxPQUFPRyxHQUFQLEtBQWUsc0JBQU9ILE9BQU9HLEdBQVAsQ0FBUCxNQUF1QixRQUF0QyxJQUFrRCxDQUFDSCxPQUFPRyxHQUFQLEVBQVlELFNBQW5FLEVBQThFLE9BQU9FLEtBQUtDLEtBQUwsQ0FBVyx5QkFBZUwsTUFBZixDQUFYLENBQVA7QUFDL0U7QUFDRjtBQUNELFNBQU9BLE1BQVA7QUFDRDs7QUFFRDs7Ozs7O0FBekJBOzs7Ozs7QUErQk8sU0FBU0YsWUFBVCxDQUFzQlEsUUFBdEIsRUFBd0NDLE1BQXhDLEVBQWlFO0FBQ3RFLE1BQUlELGFBQWFDLE1BQWpCLEVBQXlCLE9BQU8sS0FBUDtBQUN6QixPQUFLLElBQUlKLEdBQVQsSUFBZ0JJLE1BQWhCLEVBQXdCO0FBQ3RCLFFBQUlDLFFBQVFELE9BQU9KLEdBQVAsQ0FBWjtBQUNBLFFBQUksUUFBT0ssS0FBUCx1REFBT0EsS0FBUCxPQUFpQixRQUFqQixJQUE2QkEsS0FBakMsRUFBd0M7QUFDdEMsVUFBSSxDQUFDQSxNQUFNTixTQUFQLElBQW9CSSxTQUFTSCxHQUFULE1BQWtCSyxLQUExQyxFQUFpRDtBQUMvQyxlQUFPLElBQVA7QUFDRDtBQUNGLEtBSkQsTUFJTyxJQUFJRixTQUFTSCxHQUFULE1BQWtCSyxLQUF0QixFQUE2QjtBQUNsQztBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPLEtBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTU8sU0FBU1QsYUFBVCxDQUF1QlUsU0FBdkIsRUFBNkNDLElBQTdDLEVBQTJEQyxJQUEzRCxFQUE0RTtBQUNqRjtBQUNBLE1BQUlGLFVBQVVDLElBQVYsQ0FBSixFQUFxQjtBQUNuQixRQUFJVCxPQUFKLEVBQWE7QUFDWFcsY0FBUUMsR0FBUixDQUFZLFdBQVosRUFBeUIsZUFBekIsRUFBMENKLFVBQVVLLEVBQXBELEVBQXdESixJQUF4RDtBQUNEO0FBQ0RELGNBQVVDLElBQVYsRUFBZ0JLLEtBQWhCLENBQXNCTixTQUF0QixFQUFpQ0UsSUFBakM7QUFDRDs7QUFFRCxNQUFJRixVQUFVTyxTQUFkLEVBQXlCO0FBQ3ZCLFNBQUssSUFBSWIsR0FBVCxJQUFnQk0sVUFBVU8sU0FBMUIsRUFBcUM7QUFDbkMsVUFBSUMsUUFBZ0JSLFVBQVVPLFNBQVYsQ0FBb0JiLEdBQXBCLENBQXBCO0FBQ0EsVUFBSWUsTUFBTUMsT0FBTixDQUFjRixLQUFkLENBQUosRUFBMEI7QUFDeEJBLGNBQU1HLE9BQU4sQ0FBYztBQUFBLGlCQUFRckIsY0FBY3NCLElBQWQsRUFBb0JYLElBQXBCLEVBQTBCQyxJQUExQixDQUFSO0FBQUEsU0FBZDtBQUNELE9BRkQsTUFFTztBQUNMWixzQkFBY2tCLEtBQWQsRUFBcUJQLElBQXJCLEVBQTJCQyxJQUEzQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgTWFpY2hvbmcgU29mdHdhcmUgTHRkLiAyMDE2IGh0dHA6Ly9tYWljaG9uZy5pdFxuICogQGRhdGUgMjAxNi0xMS0wNFxuICogQGF1dGhvciBMaWFuZyA8bGlhbmdAbWFpY2hvbmcuaXQ+XG4gKi9cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcblxuLyoqXG4gKiDojrflj5bnlKjkuo7osIPor5XovpPlh7rnmoTlr7nosaFcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWJ1Z09iamVjdChvYmplY3Q6IE9iamVjdCk6IE9iamVjdCB7XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgaWYgKHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnIHx8ICFvYmplY3QgfHwgb2JqZWN0LmFzTXV0YWJsZSkgcmV0dXJuIG9iamVjdDtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAob2JqZWN0W2tleV0gJiYgdHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0JyAmJiAhb2JqZWN0W2tleV0uYXNNdXRhYmxlKSByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiDliKTmlq3mmK/lkKbpnIDopoHmm7TmlrBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW5hbCAg5Y6f5pyJ5a+56LGhXG4gKiBAcGFyYW0ge09iamVjdH0gYXBwZW5kICAgIOaWsOWinuaVsOaNrlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRVcGRhdGUob3JpZ2luYWw6IE9iamVjdCwgYXBwZW5kOiBPYmplY3QpOiBib29sZWFuIHtcbiAgaWYgKG9yaWdpbmFsID09PSBhcHBlbmQpIHJldHVybiBmYWxzZTtcbiAgZm9yIChsZXQga2V5IGluIGFwcGVuZCkge1xuICAgIGxldCB2YWx1ZSA9IGFwcGVuZFtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG4gICAgICBpZiAoIXZhbHVlLmFzTXV0YWJsZSB8fCBvcmlnaW5hbFtrZXldICE9PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9yaWdpbmFsW2tleV0gIT09IHZhbHVlKSB7XG4gICAgICAvL2Jvb2wgc3RyaW5nIG51bWJlciBudWxsXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIOmAkuW9kuiwg+eUqOe7hOS7tueahOeUn+WRveWRqOacn+WHveaVsFxuICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7YXJyYXl9IFthcmdzXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsbExpZmVjeWNsZShjb21wb25lbnQ6IENvbXBvbmVudCwgbmFtZTogc3RyaW5nLCBhcmdzPzogQXJyYXk8Kj4pIHtcbiAgLy8gJEZsb3cg5a6J5YWo6K6/6Zeu55Sf5ZG95ZGo5pyf5Ye95pWwXG4gIGlmIChjb21wb25lbnRbbmFtZV0pIHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgY29uc29sZS5sb2coJyVjJXMgJXMoKScsICdjb2xvcjojOWEyM2NjJywgY29tcG9uZW50LmlkLCBuYW1lKTtcbiAgICB9XG4gICAgY29tcG9uZW50W25hbWVdLmFwcGx5KGNvbXBvbmVudCwgYXJncyk7XG4gIH1cblxuICBpZiAoY29tcG9uZW50Ll9jaGlsZHJlbikge1xuICAgIGZvciAobGV0IGtleSBpbiBjb21wb25lbnQuX2NoaWxkcmVuKSB7XG4gICAgICBsZXQgY2hpbGQ6ICRDaGlsZCA9IGNvbXBvbmVudC5fY2hpbGRyZW5ba2V5XTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICBjaGlsZC5mb3JFYWNoKGl0ZW0gPT4gY2FsbExpZmVjeWNsZShpdGVtLCBuYW1lLCBhcmdzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsTGlmZWN5Y2xlKGNoaWxkLCBuYW1lLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==