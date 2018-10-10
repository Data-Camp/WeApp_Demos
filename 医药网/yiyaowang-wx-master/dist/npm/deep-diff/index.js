"use strict";var exports=module.exports={};var global=window=require('../labrador/global.js');
var _defineProperties = require('../babel-runtime/core-js/object/define-properties.js');

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _create = require('../babel-runtime/core-js/object/create.js');

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * deep-diff.
 * Licensed under the MIT License.
 */
;(function (root, factory) {
  
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return factory();
    });
  } else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.DeepDiff = factory();
  }
})(undefined, function (undefined) {
  
  var $scope,
      conflict,
      conflictResolution = [];
  if ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) === 'object' && global) {
    $scope = global;
  } else if (typeof window !== 'undefined') {
    $scope = window;
  } else {
    $scope = {};
  }
  conflict = $scope.DeepDiff;
  if (conflict) {
    conflictResolution.push(function () {
      if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
        $scope.DeepDiff = conflict;
        conflict = undefined;
      }
    });
  }

  // nodejs compatible on server side and in the browser.
  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = (0, _create2.default)(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  function Diff(kind, path) {
    Object.defineProperty(this, 'kind', {
      value: kind,
      enumerable: true
    });
    if (path && path.length) {
      Object.defineProperty(this, 'path', {
        value: path,
        enumerable: true
      });
    }
  }

  function DiffEdit(path, origin, value) {
    DiffEdit.super_.call(this, 'E', path);
    Object.defineProperty(this, 'lhs', {
      value: origin,
      enumerable: true
    });
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffEdit, Diff);

  function DiffNew(path, value) {
    DiffNew.super_.call(this, 'N', path);
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffNew, Diff);

  function DiffDeleted(path, value) {
    DiffDeleted.super_.call(this, 'D', path);
    Object.defineProperty(this, 'lhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffDeleted, Diff);

  function DiffArray(path, index, item) {
    DiffArray.super_.call(this, 'A', path);
    Object.defineProperty(this, 'index', {
      value: index,
      enumerable: true
    });
    Object.defineProperty(this, 'item', {
      value: item,
      enumerable: true
    });
  }
  inherits(DiffArray, Diff);

  function arrayRemove(arr, from, to) {
    var rest = arr.slice((to || from) + 1 || arr.length);
    arr.length = from < 0 ? arr.length + from : from;
    arr.push.apply(arr, rest);
    return arr;
  }

  function realTypeOf(subject) {
    var type = typeof subject === 'undefined' ? 'undefined' : (0, _typeof3.default)(subject);
    if (type !== 'object') {
      return type;
    }

    if (subject === Math) {
      return 'math';
    } else if (subject === null) {
      return 'null';
    } else if (Array.isArray(subject)) {
      return 'array';
    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
      return 'date';
    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
      return 'regexp';
    }
    return 'object';
  }

  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
    path = path || [];
    var currentPath = path.slice(0);
    if (typeof key !== 'undefined') {
      if (prefilter) {
        if (typeof prefilter === 'function' && prefilter(currentPath, key)) {
          return;
        } else if ((typeof prefilter === 'undefined' ? 'undefined' : (0, _typeof3.default)(prefilter)) === 'object') {
          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) {
            return;
          }
          if (prefilter.normalize) {
            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
            if (alt) {
              lhs = alt[0];
              rhs = alt[1];
            }
          }
        }
      }
      currentPath.push(key);
    }

    // Use string comparison for regexes
    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
      lhs = lhs.toString();
      rhs = rhs.toString();
    }

    var ltype = typeof lhs === 'undefined' ? 'undefined' : (0, _typeof3.default)(lhs);
    var rtype = typeof rhs === 'undefined' ? 'undefined' : (0, _typeof3.default)(rhs);
    if (ltype === 'undefined') {
      if (rtype !== 'undefined') {
        changes(new DiffNew(currentPath, rhs));
      }
    } else if (rtype === 'undefined') {
      changes(new DiffDeleted(currentPath, lhs));
    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && lhs - rhs !== 0) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
      stack = stack || [];
      if (stack.indexOf(lhs) < 0) {
        stack.push(lhs);
        if (Array.isArray(lhs)) {
          var i,
              len = lhs.length;
          for (i = 0; i < lhs.length; i++) {
            if (i >= rhs.length) {
              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
            } else {
              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
            }
          }
          while (i < rhs.length) {
            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
          }
        } else {
          var akeys = (0, _keys2.default)(lhs);
          var pkeys = (0, _keys2.default)(rhs);
          akeys.forEach(function (k, i) {
            var other = pkeys.indexOf(k);
            if (other >= 0) {
              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
              pkeys = arrayRemove(pkeys, other);
            } else {
              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
            }
          });
          pkeys.forEach(function (k) {
            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
          });
        }
        stack.length = stack.length - 1;
      }
    } else if (lhs !== rhs) {
      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
        changes(new DiffEdit(currentPath, lhs, rhs));
      }
    }
  }

  function accumulateDiff(lhs, rhs, prefilter, accum) {
    accum = accum || [];
    deepDiff(lhs, rhs, function (diff) {
      if (diff) {
        accum.push(diff);
      }
    }, prefilter);
    return accum.length ? accum : undefined;
  }

  function applyArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      var it = arr[index],
          i,
          u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    } else {
      switch (change.kind) {
        case 'A':
          applyArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr = arrayRemove(arr, index);
          break;
        case 'E':
        case 'N':
          arr[index] = change.rhs;
          break;
      }
    }
    return arr;
  }

  function applyChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i = -1,
          last = change.path ? change.path.length - 1 : 0;
      while (++i < last) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = typeof change.path[i] === 'number' ? [] : {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    }
  }

  function revertArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      // the structure of the object at the index has changed...
      var it = arr[index],
          i,
          u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          delete it[change.path[i]];
          break;
      }
    } else {
      // the array item is different...
      switch (change.kind) {
        case 'A':
          revertArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr[index] = change.lhs;
          break;
        case 'E':
          arr[index] = change.lhs;
          break;
        case 'N':
          arr = arrayRemove(arr, index);
          break;
      }
    }
    return arr;
  }

  function revertChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i,
          u;
      u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          // Array was modified...
          // it will be an array...
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          // Item was deleted...
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          // Item was edited...
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          // Item is new...
          delete it[change.path[i]];
          break;
      }
    }
  }

  function applyDiff(target, source, filter) {
    if (target && source) {
      var onChange = function onChange(change) {
        if (!filter || filter(target, source, change)) {
          applyChange(target, source, change);
        }
      };
      deepDiff(target, source, onChange);
    }
  }

  (0, _defineProperties2.default)(accumulateDiff, {

    diff: {
      value: accumulateDiff,
      enumerable: true
    },
    observableDiff: {
      value: deepDiff,
      enumerable: true
    },
    applyDiff: {
      value: applyDiff,
      enumerable: true
    },
    applyChange: {
      value: applyChange,
      enumerable: true
    },
    revertChange: {
      value: revertChange,
      enumerable: true
    },
    isConflict: {
      value: function value() {
        return 'undefined' !== typeof conflict;
      },
      enumerable: true
    },
    noConflict: {
      value: function value() {
        if (conflictResolution) {
          conflictResolution.forEach(function (it) {
            it();
          });
          conflictResolution = null;
        }
        return accumulateDiff;
      },
      enumerable: true
    }
  });

  return accumulateDiff;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZGVmaW5lIiwiYW1kIiwiZXhwb3J0cyIsIm1vZHVsZSIsIkRlZXBEaWZmIiwidW5kZWZpbmVkIiwiJHNjb3BlIiwiY29uZmxpY3QiLCJjb25mbGljdFJlc29sdXRpb24iLCJnbG9iYWwiLCJ3aW5kb3ciLCJwdXNoIiwiYWNjdW11bGF0ZURpZmYiLCJpbmhlcml0cyIsImN0b3IiLCJzdXBlckN0b3IiLCJzdXBlcl8iLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiRGlmZiIsImtpbmQiLCJwYXRoIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJsZW5ndGgiLCJEaWZmRWRpdCIsIm9yaWdpbiIsImNhbGwiLCJEaWZmTmV3IiwiRGlmZkRlbGV0ZWQiLCJEaWZmQXJyYXkiLCJpbmRleCIsIml0ZW0iLCJhcnJheVJlbW92ZSIsImFyciIsImZyb20iLCJ0byIsInJlc3QiLCJzbGljZSIsImFwcGx5IiwicmVhbFR5cGVPZiIsInN1YmplY3QiLCJ0eXBlIiwiTWF0aCIsIkFycmF5IiwiaXNBcnJheSIsInRvU3RyaW5nIiwidGVzdCIsImRlZXBEaWZmIiwibGhzIiwicmhzIiwiY2hhbmdlcyIsInByZWZpbHRlciIsImtleSIsInN0YWNrIiwiY3VycmVudFBhdGgiLCJub3JtYWxpemUiLCJhbHQiLCJsdHlwZSIsInJ0eXBlIiwiaW5kZXhPZiIsImkiLCJsZW4iLCJha2V5cyIsInBrZXlzIiwiZm9yRWFjaCIsImsiLCJvdGhlciIsImlzTmFOIiwiYWNjdW0iLCJkaWZmIiwiYXBwbHlBcnJheUNoYW5nZSIsImNoYW5nZSIsIml0IiwidSIsImFwcGx5Q2hhbmdlIiwidGFyZ2V0Iiwic291cmNlIiwibGFzdCIsInJldmVydEFycmF5Q2hhbmdlIiwicmV2ZXJ0Q2hhbmdlIiwiYXBwbHlEaWZmIiwiZmlsdGVyIiwib25D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QVNRLEVBQVQsRUFBYTtBQUN0Q0E7QUFDRCxXQUZEO0FBR0FyRSwrQkFBcUIsSUFBckI7QUFDRDtBQUNELGVBQU9JLGNBQVA7QUFDRCxPQVRTO0FBVVZRLGtCQUFZO0FBVkY7QUE1QjBCLEdBQXhDOztBQTBDQSxTQUFPUixjQUFQO0FBQ0QsQ0FqYUMsQ0FBRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBkZWVwLWRpZmYuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbjsoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgcm9vdC5EZWVwRGlmZiA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbih1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciAkc2NvcGUsIGNvbmZsaWN0LCBjb25mbGljdFJlc29sdXRpb24gPSBbXTtcbiAgaWYgKHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbCkge1xuICAgICRzY29wZSA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICRzY29wZSA9IHdpbmRvdztcbiAgfSBlbHNlIHtcbiAgICAkc2NvcGUgPSB7fTtcbiAgfVxuICBjb25mbGljdCA9ICRzY29wZS5EZWVwRGlmZjtcbiAgaWYgKGNvbmZsaWN0KSB7XG4gICAgY29uZmxpY3RSZXNvbHV0aW9uLnB1c2goXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uZmxpY3QgJiYgJHNjb3BlLkRlZXBEaWZmID09PSBhY2N1bXVsYXRlRGlmZikge1xuICAgICAgICAgICRzY29wZS5EZWVwRGlmZiA9IGNvbmZsaWN0O1xuICAgICAgICAgIGNvbmZsaWN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIG5vZGVqcyBjb21wYXRpYmxlIG9uIHNlcnZlciBzaWRlIGFuZCBpbiB0aGUgYnJvd3Nlci5cbiAgZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3I7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gRGlmZihraW5kLCBwYXRoKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdraW5kJywge1xuICAgICAgdmFsdWU6IGtpbmQsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncGF0aCcsIHtcbiAgICAgICAgdmFsdWU6IHBhdGgsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIERpZmZFZGl0KHBhdGgsIG9yaWdpbiwgdmFsdWUpIHtcbiAgICBEaWZmRWRpdC5zdXBlcl8uY2FsbCh0aGlzLCAnRScsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGhzJywge1xuICAgICAgdmFsdWU6IG9yaWdpbixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmRWRpdCwgRGlmZik7XG5cbiAgZnVuY3Rpb24gRGlmZk5ldyhwYXRoLCB2YWx1ZSkge1xuICAgIERpZmZOZXcuc3VwZXJfLmNhbGwodGhpcywgJ04nLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmTmV3LCBEaWZmKTtcblxuICBmdW5jdGlvbiBEaWZmRGVsZXRlZChwYXRoLCB2YWx1ZSkge1xuICAgIERpZmZEZWxldGVkLnN1cGVyXy5jYWxsKHRoaXMsICdEJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsaHMnLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaW5oZXJpdHMoRGlmZkRlbGV0ZWQsIERpZmYpO1xuXG4gIGZ1bmN0aW9uIERpZmZBcnJheShwYXRoLCBpbmRleCwgaXRlbSkge1xuICAgIERpZmZBcnJheS5zdXBlcl8uY2FsbCh0aGlzLCAnQScsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaW5kZXgnLCB7XG4gICAgICB2YWx1ZTogaW5kZXgsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpdGVtJywge1xuICAgICAgdmFsdWU6IGl0ZW0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaW5oZXJpdHMoRGlmZkFycmF5LCBEaWZmKTtcblxuICBmdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIGZyb20sIHRvKSB7XG4gICAgdmFyIHJlc3QgPSBhcnIuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnIubGVuZ3RoKTtcbiAgICBhcnIubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnIubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gICAgYXJyLnB1c2guYXBwbHkoYXJyLCByZXN0KTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhbFR5cGVPZihzdWJqZWN0KSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdDtcbiAgICBpZiAodHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIGlmIChzdWJqZWN0ID09PSBNYXRoKSB7XG4gICAgICByZXR1cm4gJ21hdGgnO1xuICAgIH0gZWxzZSBpZiAoc3ViamVjdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc3ViamVjdCkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3ViamVjdC50b1N0cmluZyAhPT0gJ3VuZGVmaW5lZCcgJiYgL15cXC8uKlxcLy8udGVzdChzdWJqZWN0LnRvU3RyaW5nKCkpKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZXBEaWZmKGxocywgcmhzLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIHBhdGgsIGtleSwgc3RhY2spIHtcbiAgICBwYXRoID0gcGF0aCB8fCBbXTtcbiAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoLnNsaWNlKDApO1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHByZWZpbHRlcikge1xuICAgICAgICBpZiAodHlwZW9mKHByZWZpbHRlcikgPT09ICdmdW5jdGlvbicgJiYgcHJlZmlsdGVyKGN1cnJlbnRQYXRoLCBrZXkpKSB7IHJldHVybjsgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YocHJlZmlsdGVyKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpZiAocHJlZmlsdGVyLnByZWZpbHRlciAmJiBwcmVmaWx0ZXIucHJlZmlsdGVyKGN1cnJlbnRQYXRoLCBrZXkpKSB7IHJldHVybjsgfVxuICAgICAgICAgIGlmIChwcmVmaWx0ZXIubm9ybWFsaXplKSB7XG4gICAgICAgICAgICB2YXIgYWx0ID0gcHJlZmlsdGVyLm5vcm1hbGl6ZShjdXJyZW50UGF0aCwga2V5LCBsaHMsIHJocyk7XG4gICAgICAgICAgICBpZiAoYWx0KSB7XG4gICAgICAgICAgICAgIGxocyA9IGFsdFswXTtcbiAgICAgICAgICAgICAgcmhzID0gYWx0WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3VycmVudFBhdGgucHVzaChrZXkpO1xuICAgIH1cblxuICAgIC8vIFVzZSBzdHJpbmcgY29tcGFyaXNvbiBmb3IgcmVnZXhlc1xuICAgIGlmIChyZWFsVHlwZU9mKGxocykgPT09ICdyZWdleHAnICYmIHJlYWxUeXBlT2YocmhzKSA9PT0gJ3JlZ2V4cCcpIHtcbiAgICAgIGxocyA9IGxocy50b1N0cmluZygpO1xuICAgICAgcmhzID0gcmhzLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGx0eXBlID0gdHlwZW9mIGxocztcbiAgICB2YXIgcnR5cGUgPSB0eXBlb2YgcmhzO1xuICAgIGlmIChsdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChydHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY2hhbmdlcyhuZXcgRGlmZk5ldyhjdXJyZW50UGF0aCwgcmhzKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChydHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZEZWxldGVkKGN1cnJlbnRQYXRoLCBsaHMpKTtcbiAgICB9IGVsc2UgaWYgKHJlYWxUeXBlT2YobGhzKSAhPT0gcmVhbFR5cGVPZihyaHMpKSB7XG4gICAgICBjaGFuZ2VzKG5ldyBEaWZmRWRpdChjdXJyZW50UGF0aCwgbGhzLCByaHMpKTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChsaHMpID09PSAnW29iamVjdCBEYXRlXScgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJocykgPT09ICdbb2JqZWN0IERhdGVdJyAmJiAoKGxocyAtIHJocykgIT09IDApKSB7XG4gICAgICBjaGFuZ2VzKG5ldyBEaWZmRWRpdChjdXJyZW50UGF0aCwgbGhzLCByaHMpKTtcbiAgICB9IGVsc2UgaWYgKGx0eXBlID09PSAnb2JqZWN0JyAmJiBsaHMgIT09IG51bGwgJiYgcmhzICE9PSBudWxsKSB7XG4gICAgICBzdGFjayA9IHN0YWNrIHx8IFtdO1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YobGhzKSA8IDApIHtcbiAgICAgICAgc3RhY2sucHVzaChsaHMpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaHMpKSB7XG4gICAgICAgICAgdmFyIGksIGxlbiA9IGxocy5sZW5ndGg7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gcmhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmQXJyYXkoY3VycmVudFBhdGgsIGksIG5ldyBEaWZmRGVsZXRlZCh1bmRlZmluZWQsIGxoc1tpXSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRlZXBEaWZmKGxoc1tpXSwgcmhzW2ldLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIGN1cnJlbnRQYXRoLCBpLCBzdGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChpIDwgcmhzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hhbmdlcyhuZXcgRGlmZkFycmF5KGN1cnJlbnRQYXRoLCBpLCBuZXcgRGlmZk5ldyh1bmRlZmluZWQsIHJoc1tpKytdKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgYWtleXMgPSBPYmplY3Qua2V5cyhsaHMpO1xuICAgICAgICAgIHZhciBwa2V5cyA9IE9iamVjdC5rZXlzKHJocyk7XG4gICAgICAgICAgYWtleXMuZm9yRWFjaChmdW5jdGlvbihrLCBpKSB7XG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBwa2V5cy5pbmRleE9mKGspO1xuICAgICAgICAgICAgaWYgKG90aGVyID49IDApIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2tdLCByaHNba10sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICAgICAgcGtleXMgPSBhcnJheVJlbW92ZShwa2V5cywgb3RoZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2tdLCB1bmRlZmluZWQsIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwa2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgIGRlZXBEaWZmKHVuZGVmaW5lZCwgcmhzW2tdLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIGN1cnJlbnRQYXRoLCBrLCBzdGFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2subGVuZ3RoID0gc3RhY2subGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxocyAhPT0gcmhzKSB7XG4gICAgICBpZiAoIShsdHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4obGhzKSAmJiBpc05hTihyaHMpKSkge1xuICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmRWRpdChjdXJyZW50UGF0aCwgbGhzLCByaHMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhY2N1bXVsYXRlRGlmZihsaHMsIHJocywgcHJlZmlsdGVyLCBhY2N1bSkge1xuICAgIGFjY3VtID0gYWNjdW0gfHwgW107XG4gICAgZGVlcERpZmYobGhzLCByaHMsXG4gICAgICBmdW5jdGlvbihkaWZmKSB7XG4gICAgICAgIGlmIChkaWZmKSB7XG4gICAgICAgICAgYWNjdW0ucHVzaChkaWZmKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByZWZpbHRlcik7XG4gICAgcmV0dXJuIChhY2N1bS5sZW5ndGgpID8gYWNjdW0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUFycmF5Q2hhbmdlKGFyciwgaW5kZXgsIGNoYW5nZSkge1xuICAgIGlmIChjaGFuZ2UucGF0aCAmJiBjaGFuZ2UucGF0aC5sZW5ndGgpIHtcbiAgICAgIHZhciBpdCA9IGFycltpbmRleF0sXG4gICAgICAgICAgaSwgdSA9IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdTsgaSsrKSB7XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICBhcHBseUFycmF5Q2hhbmdlKGl0W2NoYW5nZS5wYXRoW2ldXSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UucmhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIGFwcGx5QXJyYXlDaGFuZ2UoYXJyW2luZGV4XSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGFyciA9IGFycmF5UmVtb3ZlKGFyciwgaW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUNoYW5nZSh0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKSB7XG4gICAgaWYgKHRhcmdldCAmJiBzb3VyY2UgJiYgY2hhbmdlICYmIGNoYW5nZS5raW5kKSB7XG4gICAgICB2YXIgaXQgPSB0YXJnZXQsXG4gICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgIGxhc3QgPSBjaGFuZ2UucGF0aCA/IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDEgOiAwO1xuICAgICAgd2hpbGUgKCsraSA8IGxhc3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdFtjaGFuZ2UucGF0aFtpXV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gKHR5cGVvZiBjaGFuZ2UucGF0aFtpXSA9PT0gJ251bWJlcicpID8gW10gOiB7fTtcbiAgICAgICAgfVxuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgYXBwbHlBcnJheUNoYW5nZShjaGFuZ2UucGF0aCA/IGl0W2NoYW5nZS5wYXRoW2ldXSA6IGl0LCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0QXJyYXlDaGFuZ2UoYXJyLCBpbmRleCwgY2hhbmdlKSB7XG4gICAgaWYgKGNoYW5nZS5wYXRoICYmIGNoYW5nZS5wYXRoLmxlbmd0aCkge1xuICAgICAgLy8gdGhlIHN0cnVjdHVyZSBvZiB0aGUgb2JqZWN0IGF0IHRoZSBpbmRleCBoYXMgY2hhbmdlZC4uLlxuICAgICAgdmFyIGl0ID0gYXJyW2luZGV4XSxcbiAgICAgICAgICBpLCB1ID0gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB1OyBpKyspIHtcbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGl0W2NoYW5nZS5wYXRoW2ldXSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoZSBhcnJheSBpdGVtIGlzIGRpZmZlcmVudC4uLlxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICByZXZlcnRBcnJheUNoYW5nZShhcnJbaW5kZXhdLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIGFycltpbmRleF0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBhcnIgPSBhcnJheVJlbW92ZShhcnIsIGluZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydENoYW5nZSh0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKSB7XG4gICAgaWYgKHRhcmdldCAmJiBzb3VyY2UgJiYgY2hhbmdlICYmIGNoYW5nZS5raW5kKSB7XG4gICAgICB2YXIgaXQgPSB0YXJnZXQsXG4gICAgICAgICAgaSwgdTtcbiAgICAgIHUgPSBjaGFuZ2UucGF0aC5sZW5ndGggLSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHU7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIGl0W2NoYW5nZS5wYXRoW2ldXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgLy8gQXJyYXkgd2FzIG1vZGlmaWVkLi4uXG4gICAgICAgICAgLy8gaXQgd2lsbCBiZSBhbiBhcnJheS4uLlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGl0W2NoYW5nZS5wYXRoW2ldXSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIC8vIEl0ZW0gd2FzIGRlbGV0ZWQuLi5cbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICAvLyBJdGVtIHdhcyBlZGl0ZWQuLi5cbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAvLyBJdGVtIGlzIG5ldy4uLlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlEaWZmKHRhcmdldCwgc291cmNlLCBmaWx0ZXIpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSkge1xuICAgICAgdmFyIG9uQ2hhbmdlID0gZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcih0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKSkge1xuICAgICAgICAgIGFwcGx5Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZGVlcERpZmYodGFyZ2V0LCBzb3VyY2UsIG9uQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhhY2N1bXVsYXRlRGlmZiwge1xuXG4gICAgZGlmZjoge1xuICAgICAgdmFsdWU6IGFjY3VtdWxhdGVEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgb2JzZXJ2YWJsZURpZmY6IHtcbiAgICAgIHZhbHVlOiBkZWVwRGlmZixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGFwcGx5RGlmZjoge1xuICAgICAgdmFsdWU6IGFwcGx5RGlmZixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGFwcGx5Q2hhbmdlOiB7XG4gICAgICB2YWx1ZTogYXBwbHlDaGFuZ2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICByZXZlcnRDaGFuZ2U6IHtcbiAgICAgIHZhbHVlOiByZXZlcnRDaGFuZ2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBpc0NvbmZsaWN0OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGNvbmZsaWN0O1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG5vQ29uZmxpY3Q6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNvbmZsaWN0UmVzb2x1dGlvbikge1xuICAgICAgICAgIGNvbmZsaWN0UmVzb2x1dGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICBpdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbmZsaWN0UmVzb2x1dGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdGVEaWZmO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBhY2N1bXVsYXRlRGlmZjtcbn0pKTtcbiJdfQ==