"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvc2UuanMiXSwibmFtZXMiOlsiY29tcG9zZSIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJmdW5jcyIsIkFycmF5IiwiX2tleSIsImFyZyIsImxhc3QiLCJyZXN0Iiwic2xpY2UiLCJyZWR1Y2VSaWdodCIsImNvbXBvc2VkIiwiZiIsImFwcGx5IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFXd0JBLE87QUFYeEI7Ozs7Ozs7Ozs7O0FBV2UsU0FBU0EsT0FBVCxHQUFtQjtBQUNoQyxPQUFLLElBQUlDLE9BQU9DLFVBQVVDLE1BQXJCLEVBQTZCQyxRQUFRQyxNQUFNSixJQUFOLENBQXJDLEVBQWtESyxPQUFPLENBQTlELEVBQWlFQSxPQUFPTCxJQUF4RSxFQUE4RUssTUFBOUUsRUFBc0Y7QUFDcEZGLFVBQU1FLElBQU4sSUFBY0osVUFBVUksSUFBVixDQUFkO0FBQ0Q7O0FBRUQsTUFBSUYsTUFBTUQsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixXQUFPLFVBQVVJLEdBQVYsRUFBZTtBQUNwQixhQUFPQSxHQUFQO0FBQ0QsS0FGRDtBQUdEOztBQUVELE1BQUlILE1BQU1ELE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsV0FBT0MsTUFBTSxDQUFOLENBQVA7QUFDRDs7QUFFRCxNQUFJSSxPQUFPSixNQUFNQSxNQUFNRCxNQUFOLEdBQWUsQ0FBckIsQ0FBWDtBQUNBLE1BQUlNLE9BQU9MLE1BQU1NLEtBQU4sQ0FBWSxDQUFaLEVBQWUsQ0FBQyxDQUFoQixDQUFYO0FBQ0EsU0FBTyxZQUFZO0FBQ2pCLFdBQU9ELEtBQUtFLFdBQUwsQ0FBaUIsVUFBVUMsUUFBVixFQUFvQkMsQ0FBcEIsRUFBdUI7QUFDN0MsYUFBT0EsRUFBRUQsUUFBRixDQUFQO0FBQ0QsS0FGTSxFQUVKSixLQUFLTSxLQUFMLENBQVdDLFNBQVgsRUFBc0JiLFNBQXRCLENBRkksQ0FBUDtBQUdELEdBSkQ7QUFLRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHZhciBsYXN0ID0gZnVuY3NbZnVuY3MubGVuZ3RoIC0gMV07XG4gIHZhciByZXN0ID0gZnVuY3Muc2xpY2UoMCwgLTEpO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXN0LnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChjb21wb3NlZCwgZikge1xuICAgICAgcmV0dXJuIGYoY29tcG9zZWQpO1xuICAgIH0sIGxhc3QuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn0iXX0=