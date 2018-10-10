"use strict";var exports=module.exports={};var global=window=require('../../../labrador/global.js');"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.internalErr = exports.uid = exports.is = exports.ident = exports.noop = exports.kFalse = exports.kTrue = exports.konst = exports.SAGA_ACTION = exports.CANCEL = exports.MATCH = exports.HELPER = exports.TASK = exports.sym = undefined;

var _promise = require('../../../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('../../../babel-runtime/core-js/object/define-property.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _iterator = require('../../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof3 = require('../../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault(_typeof3);

var _symbol = require('../../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

var _assign = require('../../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

exports.check = check;
exports.remove = remove;
exports.deferred = deferred;
exports.arrayOfDeffered = arrayOfDeffered;
exports.delay = delay;
exports.createMockTask = createMockTask;
exports.autoInc = autoInc;
exports.makeIterator = makeIterator;
exports.log = log;
exports.wrapSagaDispatch = wrapSagaDispatch;

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

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var sym = exports.sym = function sym(id) {
  return '@@redux-saga/' + id;
};
var TASK = exports.TASK = sym('TASK');
var HELPER = exports.HELPER = sym('HELPER');
var MATCH = exports.MATCH = sym('MATCH');
var CANCEL = exports.CANCEL = sym('cancelPromise');
var SAGA_ACTION = exports.SAGA_ACTION = sym('SAGA_ACTION');
var konst = exports.konst = function konst(v) {
  return function () {
    return v;
  };
};
var kTrue = exports.kTrue = konst(true);
var kFalse = exports.kFalse = konst(false);
var noop = exports.noop = function noop() {};
var ident = exports.ident = function ident(v) {
  return v;
};

function check(value, predicate, error) {
  if (!predicate(value)) {
    log('error', 'uncaught at check', error);
    throw new Error(error);
  }
}

var is = exports.is = {
  undef: function undef(v) {
    return v === null || v === undefined;
  },
  notUndef: function notUndef(v) {
    return v !== null && v !== undefined;
  },
  func: function func(f) {
    return typeof f === 'function';
  },
  number: function number(n) {
    return typeof n === 'number';
  },
  array: Array.isArray,
  promise: function promise(p) {
    return p && is.func(p.then);
  },
  iterator: function iterator(it) {
    return it && is.func(it.next) && is.func(it.throw);
  },
  task: function task(t) {
    return t && t[TASK];
  },
  observable: function observable(ob) {
    return ob && is.func(ob.subscribe);
  },
  buffer: function buffer(buf) {
    return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
  },
  pattern: function pattern(pat) {
    return pat && (typeof pat === 'string' || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
  },
  channel: function channel(ch) {
    return ch && is.func(ch.take) && is.func(ch.close);
  },
  helper: function helper(it) {
    return it && it[HELPER];
  }
};

function remove(array, item) {
  var index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

function deferred() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var def = _extends({}, props);
  var promise = new _promise2.default(function (resolve, reject) {
    def.resolve = resolve;
    def.reject = reject;
  });
  def.promise = promise;
  return def;
}

function arrayOfDeffered(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(deferred());
  }
  return arr;
}

function delay(ms) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var timeoutId = void 0;
  var promise = new _promise2.default(function (resolve) {
    timeoutId = setTimeout(function () {
      return resolve(val);
    }, ms);
  });

  promise[CANCEL] = function () {
    return clearTimeout(timeoutId);
  };

  return promise;
}

function createMockTask() {
  var _ref;

  var running = true;
  var _result = void 0,
      _error = void 0;

  return _ref = {}, _defineProperty(_ref, TASK, true), _defineProperty(_ref, 'isRunning', function isRunning() {
    return running;
  }), _defineProperty(_ref, 'result', function result() {
    return _result;
  }), _defineProperty(_ref, 'error', function error() {
    return _error;
  }), _defineProperty(_ref, 'setRunning', function setRunning(b) {
    return running = b;
  }), _defineProperty(_ref, 'setResult', function setResult(r) {
    return _result = r;
  }), _defineProperty(_ref, 'setError', function setError(e) {
    return _error = e;
  }), _ref;
}

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = exports.uid = autoInc();

var kThrow = function kThrow(err) {
  throw err;
};
var kReturn = function kReturn(value) {
  return { value: value, done: true };
};
function makeIterator(next) {
  var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isHelper = arguments[3];

  var iterator = { name: name, next: next, throw: thro, return: kReturn };

  if (isHelper) {
    iterator[HELPER] = true;
  }
  if (typeof _symbol2.default !== 'undefined') {
    iterator[_iterator2.default] = function () {
      return iterator;
    };
  }
  return iterator;
}

/**
  Print error in a useful way whether in a browser environment
  (with expandable error stack traces), or in a node.js environment
  (text-only log output)
 **/
function log(level, message, error) {
  /*eslint-disable no-console*/
  if (typeof window === 'undefined') {
    console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
  } else {
    console[level](message, error);
  }
}

var internalErr = exports.internalErr = function internalErr(err) {
  return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
};

function wrapSagaDispatch(dispatch) {
  return function sagaDispatch(action) {
    var wrappedAction = (0, _defineProperty3.default)(action, SAGA_ACTION, { value: true });
    return dispatch(wrappedAction);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzIl0sIm5hbWVzIjpbImNoZWNrIiwicmVtb3ZlIiwiZGVmZXJyZWQiLCJhcnJheU9mRGVmZmVyZWQiLCJkZWxheSIsImNyZWF0ZU1vY2tUYXNrIiwiYXV0b0luYyIsIm1ha2VJdGVyYXRvciIsImxvZyIsIndyYXBTYWdhRGlzcGF0Y2giLCJfZXh0ZW5kcyIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJfdHlwZW9mIiwib2JqIiwiY29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsInN5bSIsImlkIiwiVEFTSyIsIkhFTFBFUiIsIk1BVENIIiwiQ0FOQ0VMIiwiU0FHQV9BQ1RJT04iLCJrb25zdCIsInYiLCJrVHJ1ZSIsImtGYWxzZSIsIm5vb3AiLCJpZGVudCIsInByZWRpY2F0ZSIsImVycm9yIiwiRXJyb3IiLCJpcyIsInVuZGVmIiwidW5kZWZpbmVkIiwibm90VW5kZWYiLCJmdW5jIiwiZiIsIm51bWJlciIsIm4iLCJhcnJheSIsIkFycmF5IiwiaXNBcnJheSIsInByb21pc2UiLCJwIiwidGhlbiIsIml0ZXJhdG9yIiwiaXQiLCJuZXh0IiwidGhyb3ciLCJ0YXNrIiwidCIsIm9ic2VydmFibGUiLCJvYiIsInN1YnNjcmliZSIsImJ1ZmZlciIsImJ1ZiIsImlzRW1wdHkiLCJ0YWtlIiwicHV0IiwicGF0dGVybiIsInBhdCIsImNoYW5uZWwiLCJjaCIsImNsb3NlIiwiaGVscGVyIiwiaXRlbSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInByb3BzIiwiZGVmIiwicmVzb2x2ZSIsInJlamVjdCIsImFyciIsInB1c2giLCJtcyIsInZhbCIsInRpbWVvdXRJZCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJfcmVmIiwicnVubmluZyIsIl9yZXN1bHQiLCJfZXJyb3IiLCJpc1J1bm5pbmciLCJyZXN1bHQiLCJzZXRSdW5uaW5nIiwiYiIsInNldFJlc3VsdCIsInIiLCJzZXRFcnJvciIsImUiLCJzZWVkIiwidWlkIiwia1Rocm93IiwiZXJyIiwia1JldHVybiIsImRvbmUiLCJ0aHJvIiwibmFtZSIsImlzSGVscGVyIiwicmV0dXJuIiwibGV2ZWwiLCJtZXNzYWdlIiwid2luZG93IiwiY29uc29sZSIsInN0YWNrIiwiaW50ZXJuYWxFcnIiLCJkaXNwYXRjaCIsInNhZ2FEaXNwYXRjaCIsImFjdGlvbiIsIndyYXBwZWRBY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUEwQmdCQSxLLEdBQUFBLEs7UUErQ0FDLE0sR0FBQUEsTTtRQU9BQyxRLEdBQUFBLFE7UUFZQUMsZSxHQUFBQSxlO1FBUUFDLEssR0FBQUEsSztRQWlCQUMsYyxHQUFBQSxjO1FBc0JBQyxPLEdBQUFBLE87UUFnQkFDLFksR0FBQUEsWTtRQXVCQUMsRyxHQUFBQSxHO1FBYUFDLGdCLEdBQUFBLGdCOzs7O0FBL0xoQixJQUFJQyxXQUFXLG9CQUFpQixVQUFVQyxNQUFWLEVBQWtCO0FBQUUsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlDLFVBQVVDLE1BQTlCLEVBQXNDRixHQUF0QyxFQUEyQztBQUFFLFFBQUlHLFNBQVNGLFVBQVVELENBQVYsQ0FBYixDQUEyQixLQUFLLElBQUlJLEdBQVQsSUFBZ0JELE1BQWhCLEVBQXdCO0FBQUUsVUFBSUUsT0FBT0MsU0FBUCxDQUFpQkMsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFDTCxNQUFyQyxFQUE2Q0MsR0FBN0MsQ0FBSixFQUF1RDtBQUFFTCxlQUFPSyxHQUFQLElBQWNELE9BQU9DLEdBQVAsQ0FBZDtBQUE0QjtBQUFFO0FBQUUsR0FBQyxPQUFPTCxNQUFQO0FBQWdCLENBQWhROztBQUVBLElBQUlVLFVBQVUsNEJBQWtCLFVBQWxCLElBQWdDLDhDQUEyQixR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YXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmV4cG9ydCB2YXIgc3ltID0gZnVuY3Rpb24gc3ltKGlkKSB7XG4gIHJldHVybiAnQEByZWR1eC1zYWdhLycgKyBpZDtcbn07XG5leHBvcnQgdmFyIFRBU0sgPSBzeW0oJ1RBU0snKTtcbmV4cG9ydCB2YXIgSEVMUEVSID0gc3ltKCdIRUxQRVInKTtcbmV4cG9ydCB2YXIgTUFUQ0ggPSBzeW0oJ01BVENIJyk7XG5leHBvcnQgdmFyIENBTkNFTCA9IHN5bSgnY2FuY2VsUHJvbWlzZScpO1xuZXhwb3J0IHZhciBTQUdBX0FDVElPTiA9IHN5bSgnU0FHQV9BQ1RJT04nKTtcbmV4cG9ydCB2YXIga29uc3QgPSBmdW5jdGlvbiBrb25zdCh2KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHY7XG4gIH07XG59O1xuZXhwb3J0IHZhciBrVHJ1ZSA9IGtvbnN0KHRydWUpO1xuZXhwb3J0IHZhciBrRmFsc2UgPSBrb25zdChmYWxzZSk7XG5leHBvcnQgdmFyIG5vb3AgPSBmdW5jdGlvbiBub29wKCkge307XG5leHBvcnQgdmFyIGlkZW50ID0gZnVuY3Rpb24gaWRlbnQodikge1xuICByZXR1cm4gdjtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVjayh2YWx1ZSwgcHJlZGljYXRlLCBlcnJvcikge1xuICBpZiAoIXByZWRpY2F0ZSh2YWx1ZSkpIHtcbiAgICBsb2coJ2Vycm9yJywgJ3VuY2F1Z2h0IGF0IGNoZWNrJywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBpcyA9IHtcbiAgdW5kZWY6IGZ1bmN0aW9uIHVuZGVmKHYpIHtcbiAgICByZXR1cm4gdiA9PT0gbnVsbCB8fCB2ID09PSB1bmRlZmluZWQ7XG4gIH0sXG4gIG5vdFVuZGVmOiBmdW5jdGlvbiBub3RVbmRlZih2KSB7XG4gICAgcmV0dXJuIHYgIT09IG51bGwgJiYgdiAhPT0gdW5kZWZpbmVkO1xuICB9LFxuICBmdW5jOiBmdW5jdGlvbiBmdW5jKGYpIHtcbiAgICByZXR1cm4gdHlwZW9mIGYgPT09ICdmdW5jdGlvbic7XG4gIH0sXG4gIG51bWJlcjogZnVuY3Rpb24gbnVtYmVyKG4pIHtcbiAgICByZXR1cm4gdHlwZW9mIG4gPT09ICdudW1iZXInO1xuICB9LFxuICBhcnJheTogQXJyYXkuaXNBcnJheSxcbiAgcHJvbWlzZTogZnVuY3Rpb24gcHJvbWlzZShwKSB7XG4gICAgcmV0dXJuIHAgJiYgaXMuZnVuYyhwLnRoZW4pO1xuICB9LFxuICBpdGVyYXRvcjogZnVuY3Rpb24gaXRlcmF0b3IoaXQpIHtcbiAgICByZXR1cm4gaXQgJiYgaXMuZnVuYyhpdC5uZXh0KSAmJiBpcy5mdW5jKGl0LnRocm93KTtcbiAgfSxcbiAgdGFzazogZnVuY3Rpb24gdGFzayh0KSB7XG4gICAgcmV0dXJuIHQgJiYgdFtUQVNLXTtcbiAgfSxcbiAgb2JzZXJ2YWJsZTogZnVuY3Rpb24gb2JzZXJ2YWJsZShvYikge1xuICAgIHJldHVybiBvYiAmJiBpcy5mdW5jKG9iLnN1YnNjcmliZSk7XG4gIH0sXG4gIGJ1ZmZlcjogZnVuY3Rpb24gYnVmZmVyKGJ1Zikge1xuICAgIHJldHVybiBidWYgJiYgaXMuZnVuYyhidWYuaXNFbXB0eSkgJiYgaXMuZnVuYyhidWYudGFrZSkgJiYgaXMuZnVuYyhidWYucHV0KTtcbiAgfSxcbiAgcGF0dGVybjogZnVuY3Rpb24gcGF0dGVybihwYXQpIHtcbiAgICByZXR1cm4gcGF0ICYmICh0eXBlb2YgcGF0ID09PSAnc3RyaW5nJyB8fCAodHlwZW9mIHBhdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGF0KSkgPT09ICdzeW1ib2wnIHx8IGlzLmZ1bmMocGF0KSB8fCBpcy5hcnJheShwYXQpKTtcbiAgfSxcbiAgY2hhbm5lbDogZnVuY3Rpb24gY2hhbm5lbChjaCkge1xuICAgIHJldHVybiBjaCAmJiBpcy5mdW5jKGNoLnRha2UpICYmIGlzLmZ1bmMoY2guY2xvc2UpO1xuICB9LFxuICBoZWxwZXI6IGZ1bmN0aW9uIGhlbHBlcihpdCkge1xuICAgIHJldHVybiBpdCAmJiBpdFtIRUxQRVJdO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGFycmF5LCBpdGVtKSB7XG4gIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoaXRlbSk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmZXJyZWQoKSB7XG4gIHZhciBwcm9wcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdmFyIGRlZiA9IF9leHRlbmRzKHt9LCBwcm9wcyk7XG4gIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGRlZi5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICBkZWYucmVqZWN0ID0gcmVqZWN0O1xuICB9KTtcbiAgZGVmLnByb21pc2UgPSBwcm9taXNlO1xuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlPZkRlZmZlcmVkKGxlbmd0aCkge1xuICB2YXIgYXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBhcnIucHVzaChkZWZlcnJlZCgpKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXkobXMpIHtcbiAgdmFyIHZhbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICB2YXIgdGltZW91dElkID0gdm9pZCAwO1xuICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZSh2YWwpO1xuICAgIH0sIG1zKTtcbiAgfSk7XG5cbiAgcHJvbWlzZVtDQU5DRUxdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgfTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1vY2tUYXNrKCkge1xuICB2YXIgX3JlZjtcblxuICB2YXIgcnVubmluZyA9IHRydWU7XG4gIHZhciBfcmVzdWx0ID0gdm9pZCAwLFxuICAgICAgX2Vycm9yID0gdm9pZCAwO1xuXG4gIHJldHVybiBfcmVmID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfcmVmLCBUQVNLLCB0cnVlKSwgX2RlZmluZVByb3BlcnR5KF9yZWYsICdpc1J1bm5pbmcnLCBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHJ1bm5pbmc7XG4gIH0pLCBfZGVmaW5lUHJvcGVydHkoX3JlZiwgJ3Jlc3VsdCcsIGZ1bmN0aW9uIHJlc3VsdCgpIHtcbiAgICByZXR1cm4gX3Jlc3VsdDtcbiAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmLCAnZXJyb3InLCBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICByZXR1cm4gX2Vycm9yO1xuICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWYsICdzZXRSdW5uaW5nJywgZnVuY3Rpb24gc2V0UnVubmluZyhiKSB7XG4gICAgcmV0dXJuIHJ1bm5pbmcgPSBiO1xuICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWYsICdzZXRSZXN1bHQnLCBmdW5jdGlvbiBzZXRSZXN1bHQocikge1xuICAgIHJldHVybiBfcmVzdWx0ID0gcjtcbiAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmLCAnc2V0RXJyb3InLCBmdW5jdGlvbiBzZXRFcnJvcihlKSB7XG4gICAgcmV0dXJuIF9lcnJvciA9IGU7XG4gIH0pLCBfcmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXV0b0luYygpIHtcbiAgdmFyIHNlZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKytzZWVkO1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHVpZCA9IGF1dG9JbmMoKTtcblxudmFyIGtUaHJvdyA9IGZ1bmN0aW9uIGtUaHJvdyhlcnIpIHtcbiAgdGhyb3cgZXJyO1xufTtcbnZhciBrUmV0dXJuID0gZnVuY3Rpb24ga1JldHVybih2YWx1ZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IHRydWUgfTtcbn07XG5leHBvcnQgZnVuY3Rpb24gbWFrZUl0ZXJhdG9yKG5leHQpIHtcbiAgdmFyIHRocm8gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGtUaHJvdztcbiAgdmFyIG5hbWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICcnO1xuICB2YXIgaXNIZWxwZXIgPSBhcmd1bWVudHNbM107XG5cbiAgdmFyIGl0ZXJhdG9yID0geyBuYW1lOiBuYW1lLCBuZXh0OiBuZXh0LCB0aHJvdzogdGhybywgcmV0dXJuOiBrUmV0dXJuIH07XG5cbiAgaWYgKGlzSGVscGVyKSB7XG4gICAgaXRlcmF0b3JbSEVMUEVSXSA9IHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICB9O1xuICB9XG4gIHJldHVybiBpdGVyYXRvcjtcbn1cblxuLyoqXHJcbiAgUHJpbnQgZXJyb3IgaW4gYSB1c2VmdWwgd2F5IHdoZXRoZXIgaW4gYSBicm93c2VyIGVudmlyb25tZW50XHJcbiAgKHdpdGggZXhwYW5kYWJsZSBlcnJvciBzdGFjayB0cmFjZXMpLCBvciBpbiBhIG5vZGUuanMgZW52aXJvbm1lbnRcclxuICAodGV4dC1vbmx5IGxvZyBvdXRwdXQpXHJcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2cobGV2ZWwsIG1lc3NhZ2UsIGVycm9yKSB7XG4gIC8qZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSovXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnNvbGUubG9nKCdyZWR1eC1zYWdhICcgKyBsZXZlbCArICc6ICcgKyBtZXNzYWdlICsgJ1xcbicgKyAoZXJyb3IgJiYgZXJyb3Iuc3RhY2sgfHwgZXJyb3IpKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlW2xldmVsXShtZXNzYWdlLCBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IHZhciBpbnRlcm5hbEVyciA9IGZ1bmN0aW9uIGludGVybmFsRXJyKGVycikge1xuICByZXR1cm4gbmV3IEVycm9yKCdcXG4gIHJlZHV4LXNhZ2E6IEVycm9yIGNoZWNraW5nIGhvb2tzIGRldGVjdGVkIGFuIGluY29uc2lzdGVudCBzdGF0ZS4gVGhpcyBpcyBsaWtlbHkgYSBidWdcXG4gIGluIHJlZHV4LXNhZ2EgY29kZSBhbmQgbm90IHlvdXJzLiBUaGFua3MgZm9yIHJlcG9ydGluZyB0aGlzIGluIHRoZSBwcm9qZWN0XFwncyBnaXRodWIgcmVwby5cXG4gIEVycm9yOiAnICsgZXJyICsgJ1xcbicpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBTYWdhRGlzcGF0Y2goZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNhZ2FEaXNwYXRjaChhY3Rpb24pIHtcbiAgICB2YXIgd3JhcHBlZEFjdGlvbiA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhY3Rpb24sIFNBR0FfQUNUSU9OLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIHJldHVybiBkaXNwYXRjaCh3cmFwcGVkQWN0aW9uKTtcbiAgfTtcbn0iXX0=