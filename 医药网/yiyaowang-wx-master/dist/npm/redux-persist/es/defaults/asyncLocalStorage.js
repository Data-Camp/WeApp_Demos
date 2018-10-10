"use strict";var exports=module.exports={};var process={};var global=window=require('../../../labrador/global.js');"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../../../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _setImmediate2 = require('../../../babel-runtime/core-js/set-immediate.js');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _iterator = require('../../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof3 = require('../../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault(_typeof3);

var _symbol = require('../../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function (type, config) {
  var deprecated = config && config.deprecated;
  var storage = getStorage(type);
  return {
    getAllKeys: function getAllKeys(cb) {
      // warn if deprecated
      if (deprecated) console.warn('redux-persist: ', deprecated);

      return new _promise2.default(function (resolve, reject) {
        try {
          var keys = [];
          for (var i = 0; i < storage.length; i++) {
            keys.push(storage.key(i));
          }
          nextTick(function () {
            cb && cb(null, keys);
            resolve(keys);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    getItem: function getItem(key, cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          var s = storage.getItem(key);
          nextTick(function () {
            cb && cb(null, s);
            resolve(s);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    setItem: function setItem(key, string, cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          storage.setItem(key, string);
          nextTick(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    removeItem: function removeItem(key, cb) {
      return new _promise2.default(function (resolve, reject) {
        try {
          storage.removeItem(key);
          nextTick(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

var genericSetImmediate = typeof _setImmediate3.default === 'undefined' ? global.setImmediate : _setImmediate3.default;
var nextTick = process && process.nextTick ? process.nextTick : genericSetImmediate;

var noStorage = "development" === 'production' ? function () {
  /* noop */return null;
} : function () {
  console.error('redux-persist asyncLocalStorage requires a global localStorage object. Either use a different storage backend or if this is a universal redux application you probably should conditionally persist like so: https://gist.github.com/rt2zz/ac9eb396793f95ff3c3b');
  return null;
};

function hasLocalStorage() {
  var storageExists = void 0;
  try {
    storageExists = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && !!window.localStorage;
    if (storageExists) {
      var testKey = 'redux-persist localStorage test';
      // @TODO should we also test set and remove?
      window.localStorage.getItem(testKey);
    }
  } catch (e) {
    if ("development" !== 'production') console.warn('redux-persist localStorage getItem test failed, persistence will be disabled.');
    return false;
  }
  return storageExists;
}

function hasSessionStorage() {
  try {
    return (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.sessionStorage !== 'undefined';
  } catch (e) {
    return false;
  }
}

function getStorage(type) {
  if (type === 'local') {
    return hasLocalStorage() ? window.localStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
  if (type === 'session') {
    return hasSessionStorage() ? window.sessionStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzeW5jTG9jYWxTdG9yYWdlLmpzIl0sIm5hbWVzIjpbInR5cGUiLCJjb25maWciLCJkZXByZWNhdGVkIiwic3RvcmFnZSIsImdldFN0b3JhZ2UiLCJnZXRBbGxLZXlzIiwiY2IiLCJjb25zb2xlIiwid2FybiIsInJlc29sdmUiLCJyZWplY3QiLCJrZXlzIiwiaSIsImxlbmd0aCIsInB1c2giLCJrZXkiLCJuZXh0VGljayIsImUiLCJnZXRJdGVtIiwicyIsInNldEl0ZW0iLCJzdHJpbmciLCJyZW1vdmVJdGVtIiwiX3R5cGVvZiIsIm9iaiIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiZ2VuZXJpY1NldEltbWVkaWF0ZSIsImdsb2JhbCIsInNldEltbWVkaWF0ZSIsInByb2Nlc3MiLCJub1N0b3JhZ2UiLCJlbnYiLCJOT0RFX0VOViIsImVycm9yIiwiaGFzTG9jYWxTdG9yYWdlIiwic3RvcmFnZUV4aXN0cyIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsInRlc3RLZXkiLCJoYXNTZXNzaW9uU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkE0Q2UsVUFBVUEsSUFBVixFQUFnQkMsTUFBaEIsRUFBd0I7QUFDckMsTUFBSUMsYUFBYUQsVUFBVUEsT0FBT0MsVUFBbEM7QUFDQSxNQUFJQyxVQUFVQyxXQUFXSixJQUFYLENBQWQ7QUFDQSxTQUFPO0FBQ0xLLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0JDLEVBQXBCLEVBQXdCO0FBQ2xDO0FBQ0EsVUFBSUosVUFBSixFQUFnQkssUUFBUUMsSUFBUixDQUFhLGlCQUFiLEVBQWdDTixVQUFoQzs7QUFFaEIsYUFBTyxzQkFBWSxVQUFVTyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QyxZQUFJO0FBQ0YsY0FBSUMsT0FBTyxFQUFYO0FBQ0EsZUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlULFFBQVFVLE1BQTVCLEVBQW9DRCxHQUFw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QUFDdEIsV0FBT3dDLHNCQUFzQkgsT0FBT0ksY0FBN0IsR0FBOEMsRUFBRXZCLFNBQVNhLFNBQVgsRUFBc0JYLFNBQVNXLFNBQS9CLEVBQTBDVCxZQUFZUyxTQUF0RCxFQUFpRTFCLFlBQVkwQixTQUE3RSxFQUFyRDtBQUNEO0FBQ0YiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIGdlbmVyaWNTZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbC5zZXRJbW1lZGlhdGUgOiBzZXRJbW1lZGlhdGU7XG52YXIgbmV4dFRpY2sgPSBwcm9jZXNzICYmIHByb2Nlc3MubmV4dFRpY2sgPyBwcm9jZXNzLm5leHRUaWNrIDogZ2VuZXJpY1NldEltbWVkaWF0ZTtcblxudmFyIG5vU3RvcmFnZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgPyBmdW5jdGlvbiAoKSB7XG4gIC8qIG5vb3AgKi9yZXR1cm4gbnVsbDtcbn0gOiBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUuZXJyb3IoJ3JlZHV4LXBlcnNpc3QgYXN5bmNMb2NhbFN0b3JhZ2UgcmVxdWlyZXMgYSBnbG9iYWwgbG9jYWxTdG9yYWdlIG9iamVjdC4gRWl0aGVyIHVzZSBhIGRpZmZlcmVudCBzdG9yYWdlIGJhY2tlbmQgb3IgaWYgdGhpcyBpcyBhIHVuaXZlcnNhbCByZWR1eCBhcHBsaWNhdGlvbiB5b3UgcHJvYmFibHkgc2hvdWxkIGNvbmRpdGlvbmFsbHkgcGVyc2lzdCBsaWtlIHNvOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9ydDJ6ei9hYzllYjM5Njc5M2Y5NWZmM2MzYicpO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmZ1bmN0aW9uIGhhc0xvY2FsU3RvcmFnZSgpIHtcbiAgdmFyIHN0b3JhZ2VFeGlzdHMgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgc3RvcmFnZUV4aXN0cyA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih3aW5kb3cpKSA9PT0gJ29iamVjdCcgJiYgISF3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgIGlmIChzdG9yYWdlRXhpc3RzKSB7XG4gICAgICB2YXIgdGVzdEtleSA9ICdyZWR1eC1wZXJzaXN0IGxvY2FsU3RvcmFnZSB0ZXN0JztcbiAgICAgIC8vIEBUT0RPIHNob3VsZCB3ZSBhbHNvIHRlc3Qgc2V0IGFuZCByZW1vdmU/XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGVzdEtleSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGNvbnNvbGUud2FybigncmVkdXgtcGVyc2lzdCBsb2NhbFN0b3JhZ2UgZ2V0SXRlbSB0ZXN0IGZhaWxlZCwgcGVyc2lzdGVuY2Ugd2lsbCBiZSBkaXNhYmxlZC4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHN0b3JhZ2VFeGlzdHM7XG59XG5cbmZ1bmN0aW9uIGhhc1Nlc3Npb25TdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yod2luZG93KSkgPT09ICdvYmplY3QnICYmIHR5cGVvZiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UgIT09ICd1bmRlZmluZWQnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2UodHlwZSkge1xuICBpZiAodHlwZSA9PT0gJ2xvY2FsJykge1xuICAgIHJldHVybiBoYXNMb2NhbFN0b3JhZ2UoKSA/IHdpbmRvdy5sb2NhbFN0b3JhZ2UgOiB7IGdldEl0ZW06IG5vU3RvcmFnZSwgc2V0SXRlbTogbm9TdG9yYWdlLCByZW1vdmVJdGVtOiBub1N0b3JhZ2UsIGdldEFsbEtleXM6IG5vU3RvcmFnZSB9O1xuICB9XG4gIGlmICh0eXBlID09PSAnc2Vzc2lvbicpIHtcbiAgICByZXR1cm4gaGFzU2Vzc2lvblN0b3JhZ2UoKSA/IHdpbmRvdy5zZXNzaW9uU3RvcmFnZSA6IHsgZ2V0SXRlbTogbm9TdG9yYWdlLCBzZXRJdGVtOiBub1N0b3JhZ2UsIHJlbW92ZUl0ZW06IG5vU3RvcmFnZSwgZ2V0QWxsS2V5czogbm9TdG9yYWdlIH07XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0eXBlLCBjb25maWcpIHtcbiAgdmFyIGRlcHJlY2F0ZWQgPSBjb25maWcgJiYgY29uZmlnLmRlcHJlY2F0ZWQ7XG4gIHZhciBzdG9yYWdlID0gZ2V0U3RvcmFnZSh0eXBlKTtcbiAgcmV0dXJuIHtcbiAgICBnZXRBbGxLZXlzOiBmdW5jdGlvbiBnZXRBbGxLZXlzKGNiKSB7XG4gICAgICAvLyB3YXJuIGlmIGRlcHJlY2F0ZWRcbiAgICAgIGlmIChkZXByZWNhdGVkKSBjb25zb2xlLndhcm4oJ3JlZHV4LXBlcnNpc3Q6ICcsIGRlcHJlY2F0ZWQpO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goc3RvcmFnZS5rZXkoaSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYiAmJiBjYihudWxsLCBrZXlzKTtcbiAgICAgICAgICAgIHJlc29sdmUoa2V5cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYiAmJiBjYihlKTtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0SXRlbTogZnVuY3Rpb24gZ2V0SXRlbShrZXksIGNiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBzID0gc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCwgcyk7XG4gICAgICAgICAgICByZXNvbHZlKHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2IgJiYgY2IoZSk7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNldEl0ZW06IGZ1bmN0aW9uIHNldEl0ZW0oa2V5LCBzdHJpbmcsIGNiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cmluZyk7XG4gICAgICAgICAgbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2IgJiYgY2IobnVsbCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjYiAmJiBjYihlKTtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXksIGNiKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNiICYmIGNiKG51bGwpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY2IgJiYgY2IoZSk7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59Il19