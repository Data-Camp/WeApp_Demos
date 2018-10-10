"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../npm/babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

exports.add = add;
exports.sleep = sleep;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(a, b) {
  return a + b;
}

function sleep(ms) {
  return new _promise2.default(function (resolve) {
    return setTimeout(resolve, ms);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImFkZCIsInNsZWVwIiwiYSIsImIiLCJtcyIsInJlc29sdmUiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1FBQWdCQSxHLEdBQUFBLEc7UUFJQUMsSyxHQUFBQSxLOzs7O0FBSlQsU0FBU0QsR0FBVCxDQUFhRSxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQjtBQUN4QixTQUFPRCxJQUFJQyxDQUFYO0FBQ0Q7O0FBRU0sU0FBU0YsS0FBVCxDQUFlRyxFQUFmLEVBQW1CO0FBQ3hCLFNBQU8sc0JBQVksVUFBQ0MsT0FBRDtBQUFBLFdBQWFDLFdBQVdELE9BQVgsRUFBb0JELEVBQXBCLENBQWI7QUFBQSxHQUFaLENBQVA7QUFDRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGFkZChhLCBiKSB7XG4gIHJldHVybiBhICsgYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuIl19