"use strict";var exports=module.exports={};
var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || (typeof actual === 'undefined' ? 'undefined' : (0, _typeof3.default)(actual)) != 'object' && (typeof expected === 'undefined' ? 'undefined' : (0, _typeof3.default)(expected)) != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return (typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === (typeof b === 'undefined' ? 'undefined' : (0, _typeof3.default)(b));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBTbGljZSIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJvYmplY3RLZXlzIiwicmVxdWlyZSIsImlzQXJndW1lbnRzIiwiZGVlcEVxdWFsIiwibW9kdWxlIiwiZXhwb3J0cyIsImFjdHVhbCIsImV4cGVjdGVkIiwib3B0cyIsIkRhdGUiLCJnZXRUaW1lIiwic3RyaWN0Iiwib2JqRXF1aXYiLCJpc1VuZGVmaW5lZE9yTnVsbCIsInZhbHVlIiwidW5kZWZpbmVkIiwiaXNCdWZmZXIiLCJ4IiwibGVuZ3RoIiwiY29weSIsImEiLCJiIiwiaSIsImtleSIsImNhbGwiLCJrYSIsImtiIiwiZSIsInNvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBU0MsTUFBTUMsU0FBTixDQUFnQkMsS0FBN0I7QUFDQSxJQUFJQyxhQUFhQyxRQUFRLGVBQVIsQ0FBakI7QUFDQSxJQUFJQyxjQUFjRCxRQUFRLHVCQUFSLENBQWxCOztBQUVBLElBQUlFLFlBQVlDLE9BQU9DLE9BQVAsR0FBaUIsVUFBVUMsTUFBVixFQUFrQkMsUUFBbEIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQ2pFLE1BQUksQ0FBQ0EsSUFBTCxFQUFXQSxPQUFPLEVBQVA7QUFDWDtBQUNBLE1BQUlGLFdBQVdDLFFBQWYsRUFBeUI7QUFDdkIsV0FBTyxJQUFQO0FBRUQsR0FIRCxNQUdPLElBQUlELGtCQUFrQkcsSUFBbEIsSUFBMEJGLG9CQUFvQkUsSUFBbEQsRUFBd0Q7QUFDN0QsV0FBT0gsT0FBT0ksT0FBUCxPQUFxQkgsU0FBU0csT0FBVCxFQUE1Qjs7QUFFRjtBQUNBO0FBQ0MsR0FMTSxNQUtBLElBQUksQ0FBQ0osTUFBRCxJQUFXLENBQUNDLFFBQVosSUFBd0IsUUFBT0QsTUFBUCx1REFBT0EsTUFBUCxNQUFpQixRQUFqQixJQUE2QixRQUFPQyxRQUFQLHVEQUFPQSxRQUFQLE1BQW1CLFFBQTVFLEVBQXNGO0FBQzNGLFdBQU9DLEtBQUtHLE1B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ckIsRUFBd0JJLEtBQUssQ0FBN0IsRUFBZ0NBLEdBQWhDLEVBQXFDO0FBQ25DQyxVQUFNRSxHQUFHSCxDQUFILENBQU47QUFDQSxRQUFJLENBQUNuQixVQUFVaUIsRUFBRUcsR0FBRixDQUFWLEVBQWtCRixFQUFFRSxHQUFGLENBQWxCLEVBQTBCZixJQUExQixDQUFMLEVBQXNDLE9BQU8sS0FBUDtBQUN2QztBQUNELFNBQU8sUUFBT1ksQ0FBUCx1REFBT0EsQ0FBUCxlQUFvQkMsQ0FBcEIsdURBQW9CQSxDQUFwQixFQUFQO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbInZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4vbGliL2tleXMuanMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vbGliL2lzX2FyZ3VtZW50cy5qcycpO1xuXG52YXIgZGVlcEVxdWFsID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYWN0dWFsLCBleHBlY3RlZCwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhY3R1YWwuZ2V0VGltZSgpID09PSBleHBlY3RlZC5nZXRUaW1lKCk7XG5cbiAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkIHx8IHR5cGVvZiBhY3R1YWwgIT0gJ29iamVjdCcgJiYgdHlwZW9mIGV4cGVjdGVkICE9ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcbiAgLy8gZGV0ZXJtaW5lZCBieSBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGFzIHZlcmlmaWVkXG4gIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuICAvLyBjb3JyZXNwb25kaW5nIGtleSwgYW5kIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS4gTm90ZTogdGhpc1xuICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCwgb3B0cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyICh4KSB7XG4gIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHgubGVuZ3RoICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuICB2YXIgaSwga2V5O1xuICBpZiAoaXNVbmRlZmluZWRPck51bGwoYSkgfHwgaXNVbmRlZmluZWRPck51bGwoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG4gIGlmIChhLnByb3RvdHlwZSAhPT0gYi5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgLy9+fn5JJ3ZlIG1hbmFnZWQgdG8gYnJlYWsgT2JqZWN0LmtleXMgdGhyb3VnaCBzY3Jld3kgYXJndW1lbnRzIHBhc3NpbmcuXG4gIC8vICAgQ29udmVydGluZyB0byBhcnJheSBzb2x2ZXMgdGhlIHByb2JsZW0uXG4gIGlmIChpc0FyZ3VtZW50cyhhKSkge1xuICAgIGlmICghaXNBcmd1bWVudHMoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIG9wdHMpO1xuICB9XG4gIGlmIChpc0J1ZmZlcihhKSkge1xuICAgIGlmICghaXNCdWZmZXIoYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB0cnkge1xuICAgIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICAgIGtiID0gb2JqZWN0S2V5cyhiKTtcbiAgfSBjYXRjaCAoZSkgey8vaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3RcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuICAvLyBoYXNPd25Qcm9wZXJ0eSlcbiAgaWYgKGthLmxlbmd0aCAhPSBrYi5sZW5ndGgpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG4gIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgYSA9PT0gdHlwZW9mIGI7XG59XG4iXX0=