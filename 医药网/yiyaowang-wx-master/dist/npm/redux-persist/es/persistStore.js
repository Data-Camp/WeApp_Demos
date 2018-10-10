"use strict";var exports=module.exports={};var global=window=require('../../labrador/global.js');
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _setImmediate2 = require('../../babel-runtime/core-js/set-immediate.js');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

exports.default = persistStore;

var _constants = require('./constants.js');

var _getStoredState = require('./getStoredState.js');

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _createPersistor = require('./createPersistor.js');

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _omit = require('../../lodash/omit.js');

var _omit2 = _interopRequireDefault(_omit);

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

// try to source setImmediate as follows: setImmediate (global) -> global.setImmediate -> setTimeout(fn, 0)
var genericSetImmediate = typeof _setImmediate3.default === 'undefined' ? global.setImmediate || function (fn) {
  return setTimeout(fn, 0);
} : _setImmediate3.default;

function persistStore(store) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onComplete = arguments[2];

  // defaults
  // @TODO remove shouldRestore
  var shouldRestore = !config.skipRestore;
  if ("development" !== 'production' && config.skipRestore) console.warn('redux-persist: config.skipRestore has been deprecated. If you want to skip restoration use `createPersistor` instead');

  var purgeKeys = null;

  // create and pause persistor
  var persistor = (0, _createPersistor2.default)(store, config);
  persistor.pause();

  // restore
  if (shouldRestore) {
    genericSetImmediate(function () {
      (0, _getStoredState2.default)(config, function (err, restoredState) {
        // do not persist state for purgeKeys
        restoredState = purgeKeys ? purgeKeys === '*' ? {} : (0, _omit2.default)(restoredState, purgeKeys) : restoredState;

        store.dispatch(rehydrateAction(restoredState, err));
        complete(err, restoredState);
      });
    });
  } else genericSetImmediate(complete);

  function complete(err, restoredState) {
    persistor.resume();
    onComplete && onComplete(err, restoredState);
  }

  return _extends({}, persistor, {
    purge: function purge(keys) {
      purgeKeys = keys || '*';
      persistor.purge(keys);
    }
  });
}

function rehydrateAction(payload) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return {
    type: _constants.REHYDRATE,
    payload: payload,
    error: error
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNpc3RTdG9yZS5qcyJdLCJuYW1lcyI6WyJwZXJzaXN0U3RvcmUiLCJfZXh0ZW5kcyIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJnZW5lcmljU2V0SW1tZWRpYXRlIiwiZ2xvYmFsIiwic2V0SW1tZWRpYXRlIiwiZm4iLCJzZXRUaW1lb3V0Iiwic3RvcmUiLCJjb25maWciLCJ1bmRlZmluZWQiLCJvbkNvbXBsZXRlIiwic2hvdWxkUmVzdG9yZSIsInNraXBSZXN0b3JlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiY29uc29sZSIsIndhcm4iLCJwdXJnZUtleXMiLCJwZXJzaXN0b3IiLCJwYXVzZSIsImVyciIsInJlc3RvcmVkU3RhdGUiLCJkaXNwYXRjaCIsInJlaHlkcmF0ZUFjdGlvbiIsImNvbXBsZXRlIiwicmVzdW1lIiwicHVyZ2UiLCJrZXlzIiwicGF5bG9hZCIsImVycm9yIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7a0JBWXdCQSxZOztBQVZ4Qjs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUxBLElBQUlDLFdBQVcsb0JBQWlCLFVBQVVDLE1BQVYsRUFBa0I7QUFBRSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUMsVUFBVUMsTUFBOUIsRUFBc0NGLEdBQXRDLEVBQTJDO0FBQUUsUUFBSUcsU0FBU0YsVUFBVUQsQ0FBVixDQUFiLENBQTJCLEtBQUssSUFBSUksR0FBVCxJQUFnQkQsTUFBaEIsRUFBd0I7QUFBRSxVQUFJRSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNMLE1BQXJDLEVBQTZDQyxHQUE3QyxDQUFKLEVBQXVEO0FBQUVMLGVBQU9LLEdBQVAsSUFBY0QsT0FBT0MsR0FBUCxDQUFkO0FBQTRCO0FBQUU7QUFBRSxHQUFDLE9BQU9MLE1BQVA7QUFBZ0IsQ0FBaFE7O0FBT0E7QUFDQSxJQUFJVSxzQkFBc0Isa0NBQXdCLFdBQXhCLEdBQXNDQyxPQUFPQyxZQUFQLElBQXVCLFVBQVVDLEVBQVYsRUFBYztBQUNuRyxTQUFPQyxXQUFXRCxFQUFYLEVBQWUsQ0FBZixDQUFQO0FBQ0QsQ0FGeUIseUJBQTFCOztBQUllLFNBQVNmLFlBQVQsQ0FBc0JpQixLQUF0QixFQUE2QjtBQUMxQyxNQUFJQyxTQUFTZCxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxVQUFVLENBQVYsTUFBaUJlLFNBQXpDLEdBQXFEZixVQUFVLENBQVYsQ0FBckQsR0FBb0UsRUFBakY7QUFDQSxNQUFJZ0IsYUFBYWhCLFVBQVUsQ0FBVixDQUFqQjs7QUFFQTtBQUNBO0FBQ0EsTUFBSWlCLGdCQUFnQixDQUFDSCxPQUFPSSxXQUE1QjtBQUNBLE1BQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixJQUF5Q1AsT0FBT0ksV0FBcEQsRUFBaUVJLFFBQVFDLElBQVIsQ0FBYSxzSEFBYjs7QUFFakUsTUFBSUMsWUFBWSxJQUFoQjs7QUFFQTtBQUNBLE1BQUlDLFlBQVksK0JBQWdCWixLQUFoQixFQUF1QkMsTUFBdkIsQ0FBaEI7QUFDQVcsWUFBVUMsS0FBVjs7QUFFQTtBQUNBLE1BQUlULGFBQUosRUFBbUI7QUFDakJULHdCQUFvQixZQUFZO0FBQzlCLG9DQUFlTSxNQUFmLEVBQXVCLFVBQVVhLEdBQVYsRUFBZUMsYUFBZixFQUE4QjtBQUNuRDtBQUNBQSx3QkFBZ0JKLFlBQVlBLGNBQWMsR0FBZCxHQUFvQixFQUFwQixHQUF5QixvQkFBS0ksYUFBTCxFQUFvQkosU0FBcEIsQ0FBckMsR0FBc0VJLGFBQXRGOztBQUVBZixjQUFNZ0IsUUFBTixDQUFlQyxnQkFBZ0JGLGFBQWhCLEVBQStCRCxHQUEvQixDQUFmO0FBQ0FJLGlCQUFTSixHQUFULEVBQWNDLGFBQWQ7QUFDRCxPQU5EO0FBT0QsS0FSRDtBQVNELEdBVkQsTUFVT3BCLG9CQUFvQnVCLFFBQXBCOztBQUVQLFdBQVNBLFFBQVQsQ0FBa0JKLEdBQWxCLEVBQXVCQyxhQUF2QixFQUFzQztBQUNwQ0gsY0FBVU8sTUFBVjtBQUNBaEIsa0JBQWNBLFdBQVdXLEdBQVgsRUFBZ0JDLGFBQWhCLENBQWQ7QUFDRDs7QUFFRCxTQUFPL0IsU0FBUyxFQUFULEVBQWE0QixTQUFiLEVBQXdCO0FBQzdCUSxXQUFPLFNBQVNBLEtBQVQsQ0FBZUMsSUFBZixFQUFxQjtBQUMxQlYsa0JBQVlVLFFBQVEsR0FBcEI7QUFDQVQsZ0JBQVVRLEtBQVYsQ0FBZ0JDLElBQWhCO0FBQ0Q7QUFKNEIsR0FBeEIsQ0FBUDtBQU1EOztBQUVELFNBQVNKLGVBQVQsQ0FBeUJLLE9BQXpCLEVBQWtDO0FBQ2hDLE1BQUlDLFFBQVFwQyxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLElBQXdCRCxVQUFVLENBQVYsTUFBaUJlLFNBQXpDLEdBQXFEZixVQUFVLENBQVYsQ0FBckQsR0FBb0UsSUFBaEY7O0FBRUEsU0FBTztBQUNMcUMsOEJBREs7QUFFTEYsYUFBU0EsT0FGSjtBQUdMQyxXQUFPQTtBQUhGLEdBQVA7QUFLRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IHsgUkVIWURSQVRFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IGdldFN0b3JlZFN0YXRlIGZyb20gJy4vZ2V0U3RvcmVkU3RhdGUnO1xuaW1wb3J0IGNyZWF0ZVBlcnNpc3RvciBmcm9tICcuL2NyZWF0ZVBlcnNpc3Rvcic7XG5pbXBvcnQgb21pdCBmcm9tICdsb2Rhc2gtZXMvb21pdCc7XG5cbi8vIHRyeSB0byBzb3VyY2Ugc2V0SW1tZWRpYXRlIGFzIGZvbGxvd3M6IHNldEltbWVkaWF0ZSAoZ2xvYmFsKSAtPiBnbG9iYWwuc2V0SW1tZWRpYXRlIC0+IHNldFRpbWVvdXQoZm4sIDApXG52YXIgZ2VuZXJpY1NldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICd1bmRlZmluZWQnID8gZ2xvYmFsLnNldEltbWVkaWF0ZSB8fCBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIDApO1xufSA6IHNldEltbWVkaWF0ZTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyc2lzdFN0b3JlKHN0b3JlKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICB2YXIgb25Db21wbGV0ZSA9IGFyZ3VtZW50c1syXTtcblxuICAvLyBkZWZhdWx0c1xuICAvLyBAVE9ETyByZW1vdmUgc2hvdWxkUmVzdG9yZVxuICB2YXIgc2hvdWxkUmVzdG9yZSA9ICFjb25maWcuc2tpcFJlc3RvcmU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5za2lwUmVzdG9yZSkgY29uc29sZS53YXJuKCdyZWR1eC1wZXJzaXN0OiBjb25maWcuc2tpcFJlc3RvcmUgaGFzIGJlZW4gZGVwcmVjYXRlZC4gSWYgeW91IHdhbnQgdG8gc2tpcCByZXN0b3JhdGlvbiB1c2UgYGNyZWF0ZVBlcnNpc3RvcmAgaW5zdGVhZCcpO1xuXG4gIHZhciBwdXJnZUtleXMgPSBudWxsO1xuXG4gIC8vIGNyZWF0ZSBhbmQgcGF1c2UgcGVyc2lzdG9yXG4gIHZhciBwZXJzaXN0b3IgPSBjcmVhdGVQZXJzaXN0b3Ioc3RvcmUsIGNvbmZpZyk7XG4gIHBlcnNpc3Rvci5wYXVzZSgpO1xuXG4gIC8vIHJlc3RvcmVcbiAgaWYgKHNob3VsZFJlc3RvcmUpIHtcbiAgICBnZW5lcmljU2V0SW1tZWRpYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGdldFN0b3JlZFN0YXRlKGNvbmZpZywgZnVuY3Rpb24gKGVyciwgcmVzdG9yZWRTdGF0ZSkge1xuICAgICAgICAvLyBkbyBub3QgcGVyc2lzdCBzdGF0ZSBmb3IgcHVyZ2VLZXlzXG4gICAgICAgIHJlc3RvcmVkU3RhdGUgPSBwdXJnZUtleXMgPyBwdXJnZUtleXMgPT09ICcqJyA/IHt9IDogb21pdChyZXN0b3JlZFN0YXRlLCBwdXJnZUtleXMpIDogcmVzdG9yZWRTdGF0ZTtcblxuICAgICAgICBzdG9yZS5kaXNwYXRjaChyZWh5ZHJhdGVBY3Rpb24ocmVzdG9yZWRTdGF0ZSwgZXJyKSk7XG4gICAgICAgIGNvbXBsZXRlKGVyciwgcmVzdG9yZWRTdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIGdlbmVyaWNTZXRJbW1lZGlhdGUoY29tcGxldGUpO1xuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlKGVyciwgcmVzdG9yZWRTdGF0ZSkge1xuICAgIHBlcnNpc3Rvci5yZXN1bWUoKTtcbiAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCByZXN0b3JlZFN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgcGVyc2lzdG9yLCB7XG4gICAgcHVyZ2U6IGZ1bmN0aW9uIHB1cmdlKGtleXMpIHtcbiAgICAgIHB1cmdlS2V5cyA9IGtleXMgfHwgJyonO1xuICAgICAgcGVyc2lzdG9yLnB1cmdlKGtleXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlaHlkcmF0ZUFjdGlvbihwYXlsb2FkKSB7XG4gIHZhciBlcnJvciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IFJFSFlEUkFURSxcbiAgICBwYXlsb2FkOiBwYXlsb2FkLFxuICAgIGVycm9yOiBlcnJvclxuICB9O1xufSJdfQ==