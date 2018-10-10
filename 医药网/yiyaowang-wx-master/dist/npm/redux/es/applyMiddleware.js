"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

exports.default = applyMiddleware;

var _compose = require('./compose.js');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2.default.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcGx5TWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJhcHBseU1pZGRsZXdhcmUiLCJfZXh0ZW5kcyIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfbGVuIiwibWlkZGxld2FyZXMiLCJBcnJheSIsIl9rZXkiLCJjcmVhdGVTdG9yZSIsInJlZHVjZXIiLCJwcmVsb2FkZWRTdGF0ZSIsImVuaGFuY2VyIiwic3RvcmUiLCJfZGlzcGF0Y2giLCJkaXNwYXRjaCIsImNoYWluIiwibWlkZGxld2FyZUFQSSIsImdldFN0YXRlIiwiYWN0aW9uIiwibWFwIiwibWlkZGxld2FyZSIsImFwcGx5IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQW9Cd0JBLGU7O0FBbEJ4Qjs7Ozs7O0FBRkEsSUFBSUMsV0FBVyxvQkFBaUIsVUFBVUMsTUFBVixFQUFrQjtBQUFFLE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJQyxVQUFVQyxNQUE5QixFQUFzQ0YsR0FBdEMsRUFBMkM7QUFBRSxRQUFJRyxTQUFTRixVQUFVRCxDQUFWLENBQWIsQ0FBMkIsS0FBSyxJQUFJSSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtBQUFFLFVBQUlFLE9BQU9DLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ0wsTUFBckMsRUFBNkNDLEdBQTdDLENBQUosRUFBdUQ7QUFBRUwsZUFBT0ssR0FBUCxJQUFjRCxPQUFPQyxHQUFQLENBQWQ7QUFBNEI7QUFBRTtBQUFFLEdBQUMsT0FBT0wsTUFBUDtBQUFnQixDQUFoUTs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCZSxTQUFTRixlQUFULEdBQTJCO0FBQ3hDLE9BQUssSUFBSVksT0FBT1IsVUFBVUMsTUFBckIsRUFBNkJRLGNBQWNDLE1BQU1GLElBQU4sQ0FBM0MsRUFBd0RHLE9BQU8sQ0FBcEUsRUFBdUVBLE9BQU9ILElBQTlFLEVBQW9GRyxNQUFwRixFQUE0RjtBQUMxRkYsZ0JBQVlFLElBQVosSUFBb0JYLFVBQVVXLElBQVYsQ0FBcEI7QUFDRDs7QUFFRCxTQUFPLFVBQVVDLFdBQVYsRUFBdUI7QUFDNUIsV0FBTyxVQUFVQyxPQUFWLEVBQW1CQyxjQUFuQixFQUFtQ0MsUUFBbkMsRUFBNkM7QUFDbEQsVUFBSUMsUUFBUUosWUFBWUMsT0FBWixFQUFxQkMsY0FBckIsRUFBcUNDLFFBQXJDLENBQVo7QUFDQSxVQUFJRSxZQUFZRCxNQUFNRSxRQUF0QjtBQUNBLFVBQUlDLFFBQVEsRUFBWjs7QUFFQSxVQUFJQyxnQkFBZ0I7QUFDbEJDLGtCQUFVTCxNQUFNSyxRQURFO0FBRWxCSCxrQkFBVSxTQUFTQSxRQUFULENBQWtCSSxNQUFsQixFQUEwQjtBQUNsQyxpQkFBT0wsVUFBVUssTUFBVixDQUFQO0FBQ0Q7QUFKaUIsT0FBcEI7QUFNQUgsY0FBUVYsWUFBWWMsR0FBWixDQUFnQixVQUFVQyxVQUFWLEVBQXNCO0FBQzVDLGVBQU9BLFdBQVdKLGFBQVgsQ0FBUDtBQUNELE9BRk8sQ0FBUjtBQUdBSCxrQkFBWSxrQkFBUVEsS0FBUixDQUFjQyxTQUFkLEVBQXlCUCxLQUF6QixFQUFnQ0gsTUFBTUUsUUFBdEMsQ0FBWjs7QUFFQSxhQUFPckIsU0FBUyxFQUFULEVBQWFtQixLQUFiLEVBQW9CO0FBQ3pCRSxrQkFBVUQ7QUFEZSxPQUFwQixDQUFQO0FBR0QsS0FuQkQ7QUFvQkQsR0FyQkQ7QUFzQkQiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBseU1pZGRsZXdhcmUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpO1xuICAgICAgdmFyIF9kaXNwYXRjaCA9IHN0b3JlLmRpc3BhdGNoO1xuICAgICAgdmFyIGNoYWluID0gW107XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn0iXX0=