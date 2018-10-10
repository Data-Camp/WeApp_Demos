"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _iterator = require('../../babel-runtime/core-js/symbol/iterator.js');

var _iterator2 = _interopRequireDefault(_iterator);

var _typeof3 = require('../../babel-runtime/helpers/typeof.js');

var _typeof4 = _interopRequireDefault(_typeof3);

var _symbol = require('../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = autoRehydrate;

var _constants = require('./constants.js');

var _isStatePlainEnough = require('./utils/isStatePlainEnough.js');

var _isStatePlainEnough2 = _interopRequireDefault(_isStatePlainEnough);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
};

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function autoRehydrate() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var stateReconciler = config.stateReconciler || defaultStateReconciler;

  return function (next) {
    return function (reducer, initialState, enhancer) {
      var store = next(liftReducer(reducer), initialState, enhancer);
      return _extends({}, store, {
        replaceReducer: function replaceReducer(reducer) {
          return store.replaceReducer(liftReducer(reducer));
        }
      });
    };
  };

  function liftReducer(reducer) {
    var rehydrated = false;
    var preRehydrateActions = [];
    return function (state, action) {
      if (action.type !== _constants.REHYDRATE) {
        if (config.log && !rehydrated) preRehydrateActions.push(action); // store pre-rehydrate actions for debugging
        return reducer(state, action);
      } else {
        if (config.log && !rehydrated) logPreRehydrate(preRehydrateActions);
        rehydrated = true;

        var inboundState = action.payload;
        var reducedState = reducer(state, action);

        return stateReconciler(state, inboundState, reducedState, config.log);
      }
    };
  }
}

function logPreRehydrate(preRehydrateActions) {
  if (preRehydrateActions.length > 0) {
    console.log('\n      redux-persist/autoRehydrate: %d actions were fired before rehydration completed. This can be a symptom of a race\n      condition where the rehydrate action may overwrite the previously affected state. Consider running these actions\n      after rehydration:\n    ', preRehydrateActions.length);
  }
}

function defaultStateReconciler(state, inboundState, reducedState, log) {
  var newState = _extends({}, reducedState);

  (0, _keys2.default)(inboundState).forEach(function (key) {
    // if initialState does not have key, skip auto rehydration
    if (!state.hasOwnProperty(key)) return;

    // if initial state is an object but inbound state is null/undefined, skip
    if (_typeof(state[key]) === 'object' && !inboundState[key]) {
      if (log) console.log('redux-persist/autoRehydrate: sub state for key `%s` is falsy but initial state is an object, skipping autoRehydrate.', key);
      return;
    }

    // if reducer modifies substate, skip auto rehydration
    if (state[key] !== reducedState[key]) {
      if (log) console.log('redux-persist/autoRehydrate: sub state for key `%s` modified, skipping autoRehydrate.', key);
      newState[key] = reducedState[key];
      return;
    }

    // otherwise take the inboundState
    if ((0, _isStatePlainEnough2.default)(inboundState[key]) && (0, _isStatePlainEnough2.default)(state[key])) newState[key] = _extends({}, state[key], inboundState[key]); // shallow merge
    else newState[key] = inboundState[key]; // hard set

    if (log) console.log('redux-persist/autoRehydrate: key `%s`, rehydrated to ', key, newState[key]);
  });
  return newState;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dG9SZWh5ZHJhdGUuanMiXSwibmFtZXMiOlsiYXV0b1JlaHlkcmF0ZSIsIl90eXBlb2YiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIl9leHRlbmRzIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImtleSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNvbmZpZyIsInVuZGVmaW5lZCIsInN0YXRlUmVjb25jaWxlciIsImRlZmF1bHRTdGF0ZVJlY29uY2lsZXIiLCJuZXh0IiwicmVkdWNlciIsImluaXRpYWxTdGF0ZSIsImVuaGFuY2VyIiwic3RvcmUiLCJsaWZ0UmVkdWNlciIsInJlcGxhY2VSZWR1Y2VyIiwicmVoeWRyYXRlZCIsInByZVJlaHlkcmF0ZUFjdGlvbnMiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJsb2ciLCJwdXNoIiwibG9nUHJlUmVoeWRyYXRlIiwiaW5ib3VuZFN0YXRlIiwicGF5bG9hZCIsInJlZHVjZWRTdGF0ZSIsImNvbnNvbGUiLCJuZXdTdGF0ZSIsImZvckVhY2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU93QkEsYTs7QUFIeEI7O0FBQ0E7Ozs7OztBQUxBLElBQUlDLFVBQVUsNEJBQWtCLFVBQWxCLElBQWdDLDhDQUEyQixRQUEzRCxHQUFzRSxVQUFVQyxHQUFWLEVBQWU7QUFBRSxnQkFBY0EsR0FBZCx1REFBY0EsR0FBZDtBQUFvQixDQUEzRyxHQUE4RyxVQUFVQSxHQUFWLEVBQWU7QUFBRSxTQUFPQSxPQUFPLDRCQUFrQixVQUF6QixJQUF1Q0EsSUFBSUMsV0FBSixxQkFBdkMsSUFBcUVELHlCQUFlRSxTQUFwRixHQUFnRyxRQUFoRyxVQUFrSEYsR0FBbEgsdURBQWtIQSxHQUFsSCxDQUFQO0FBQStILENBQTVROztBQUVBLElBQUlHLFdBQVcsb0JBQWlCLFVBQVVDLE1BQVYsRUFBa0I7QUFBRSxPQUFLLElBQUlDLElB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QixhQUFhdkIsR0FBYixDQUF6QyxFQUE0RDtBQUMxRCxVQUFJb0IsR0FBSixFQUFTTSxRQUFRTixHQUFSLENBQVksc0hBQVosRUFBb0lwQixHQUFwSTtBQUNUO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFJaUIsTUFBTWpCLEdBQU4sTUFBZXlCLGFBQWF6QixHQUFiLENBQW5CLEVBQXNDO0FBQ3BDLFVBQUlvQixHQUFKLEVBQVNNLFFBQVFOLEdBQVIsQ0FBWSx1RkFBWixFQUFxR3BCLEdBQXJHO0FBQ1QyQixlQUFTM0IsR0FBVCxJQUFnQnlCLGFBQWF6QixHQUFiLENBQWhCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLFFBQUksa0NBQW1CdUIsYUFBYXZCLEdBQWIsQ0FBbkIsS0FBeUMsa0NBQW1CaUIsTUFBTWpCLEdBQU4sQ0FBbkIsQ0FBN0MsRUFBNkUyQixTQUFTM0IsR0FBVCxJQUFnQk4sU0FBUyxFQUFULEVBQWF1QixNQUFNakIsR0FBTixDQUFiLEVBQXlCdUIsYUFBYXZCLEdBQWIsQ0FBekIsQ0FBaEIsQ0FBN0UsQ0FBMEk7QUFBMUksU0FDSzJCLFNBQVMzQixHQUFULElBQWdCdUIsYUFBYXZCLEdBQWIsQ0FBaEIsQ0FuQjBDLENBbUJQOztBQUV4QyxRQUFJb0IsR0FBSixFQUFTTSxRQUFRTixHQUFSLENBQVksdURBQVosRUFBcUVwQixHQUFyRSxFQUEwRTJCLFNBQVMzQixHQUFULENBQTFFO0FBQ1YsR0F0QkQ7QUF1QkEsU0FBTzJCLFFBQVA7QUFDRCIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5pbXBvcnQgeyBSRUhZRFJBVEUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgaXNTdGF0ZVBsYWluRW5vdWdoIGZyb20gJy4vdXRpbHMvaXNTdGF0ZVBsYWluRW5vdWdoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXV0b1JlaHlkcmF0ZSgpIHtcbiAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdmFyIHN0YXRlUmVjb25jaWxlciA9IGNvbmZpZy5zdGF0ZVJlY29uY2lsZXIgfHwgZGVmYXVsdFN0YXRlUmVjb25jaWxlcjtcblxuICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgICAgIHZhciBzdG9yZSA9IG5leHQobGlmdFJlZHVjZXIocmVkdWNlciksIGluaXRpYWxTdGF0ZSwgZW5oYW5jZXIpO1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICByZXBsYWNlUmVkdWNlcjogZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIocmVkdWNlcikge1xuICAgICAgICAgIHJldHVybiBzdG9yZS5yZXBsYWNlUmVkdWNlcihsaWZ0UmVkdWNlcihyZWR1Y2VyKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gbGlmdFJlZHVjZXIocmVkdWNlcikge1xuICAgIHZhciByZWh5ZHJhdGVkID0gZmFsc2U7XG4gICAgdmFyIHByZVJlaHlkcmF0ZUFjdGlvbnMgPSBbXTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgIGlmIChhY3Rpb24udHlwZSAhPT0gUkVIWURSQVRFKSB7XG4gICAgICAgIGlmIChjb25maWcubG9nICYmICFyZWh5ZHJhdGVkKSBwcmVSZWh5ZHJhdGVBY3Rpb25zLnB1c2goYWN0aW9uKTsgLy8gc3RvcmUgcHJlLXJlaHlkcmF0ZSBhY3Rpb25zIGZvciBkZWJ1Z2dpbmdcbiAgICAgICAgcmV0dXJuIHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29uZmlnLmxvZyAmJiAhcmVoeWRyYXRlZCkgbG9nUHJlUmVoeWRyYXRlKHByZVJlaHlkcmF0ZUFjdGlvbnMpO1xuICAgICAgICByZWh5ZHJhdGVkID0gdHJ1ZTtcblxuICAgICAgICB2YXIgaW5ib3VuZFN0YXRlID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICAgIHZhciByZWR1Y2VkU3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiBzdGF0ZVJlY29uY2lsZXIoc3RhdGUsIGluYm91bmRTdGF0ZSwgcmVkdWNlZFN0YXRlLCBjb25maWcubG9nKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvZ1ByZVJlaHlkcmF0ZShwcmVSZWh5ZHJhdGVBY3Rpb25zKSB7XG4gIGlmIChwcmVSZWh5ZHJhdGVBY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zb2xlLmxvZygnXFxuICAgICAgcmVkdXgtcGVyc2lzdC9hdXRvUmVoeWRyYXRlOiAlZCBhY3Rpb25zIHdlcmUgZmlyZWQgYmVmb3JlIHJlaHlkcmF0aW9uIGNvbXBsZXRlZC4gVGhpcyBjYW4gYmUgYSBzeW1wdG9tIG9mIGEgcmFjZVxcbiAgICAgIGNvbmRpdGlvbiB3aGVyZSB0aGUgcmVoeWRyYXRlIGFjdGlvbiBtYXkgb3ZlcndyaXRlIHRoZSBwcmV2aW91c2x5IGFmZmVjdGVkIHN0YXRlLiBDb25zaWRlciBydW5uaW5nIHRoZXNlIGFjdGlvbnNcXG4gICAgICBhZnRlciByZWh5ZHJhdGlvbjpcXG4gICAgJywgcHJlUmVoeWRyYXRlQWN0aW9ucy5sZW5ndGgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTdGF0ZVJlY29uY2lsZXIoc3RhdGUsIGluYm91bmRTdGF0ZSwgcmVkdWNlZFN0YXRlLCBsb2cpIHtcbiAgdmFyIG5ld1N0YXRlID0gX2V4dGVuZHMoe30sIHJlZHVjZWRTdGF0ZSk7XG5cbiAgT2JqZWN0LmtleXMoaW5ib3VuZFN0YXRlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAvLyBpZiBpbml0aWFsU3RhdGUgZG9lcyBub3QgaGF2ZSBrZXksIHNraXAgYXV0byByZWh5ZHJhdGlvblxuICAgIGlmICghc3RhdGUuaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuO1xuXG4gICAgLy8gaWYgaW5pdGlhbCBzdGF0ZSBpcyBhbiBvYmplY3QgYnV0IGluYm91bmQgc3RhdGUgaXMgbnVsbC91bmRlZmluZWQsIHNraXBcbiAgICBpZiAoX3R5cGVvZihzdGF0ZVtrZXldKSA9PT0gJ29iamVjdCcgJiYgIWluYm91bmRTdGF0ZVtrZXldKSB7XG4gICAgICBpZiAobG9nKSBjb25zb2xlLmxvZygncmVkdXgtcGVyc2lzdC9hdXRvUmVoeWRyYXRlOiBzdWIgc3RhdGUgZm9yIGtleSBgJXNgIGlzIGZhbHN5IGJ1dCBpbml0aWFsIHN0YXRlIGlzIGFuIG9iamVjdCwgc2tpcHBpbmcgYXV0b1JlaHlkcmF0ZS4nLCBrZXkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIHJlZHVjZXIgbW9kaWZpZXMgc3Vic3RhdGUsIHNraXAgYXV0byByZWh5ZHJhdGlvblxuICAgIGlmIChzdGF0ZVtrZXldICE9PSByZWR1Y2VkU3RhdGVba2V5XSkge1xuICAgICAgaWYgKGxvZykgY29uc29sZS5sb2coJ3JlZHV4LXBlcnNpc3QvYXV0b1JlaHlkcmF0ZTogc3ViIHN0YXRlIGZvciBrZXkgYCVzYCBtb2RpZmllZCwgc2tpcHBpbmcgYXV0b1JlaHlkcmF0ZS4nLCBrZXkpO1xuICAgICAgbmV3U3RhdGVba2V5XSA9IHJlZHVjZWRTdGF0ZVtrZXldO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSB0YWtlIHRoZSBpbmJvdW5kU3RhdGVcbiAgICBpZiAoaXNTdGF0ZVBsYWluRW5vdWdoKGluYm91bmRTdGF0ZVtrZXldKSAmJiBpc1N0YXRlUGxhaW5Fbm91Z2goc3RhdGVba2V5XSkpIG5ld1N0YXRlW2tleV0gPSBfZXh0ZW5kcyh7fSwgc3RhdGVba2V5XSwgaW5ib3VuZFN0YXRlW2tleV0pOyAvLyBzaGFsbG93IG1lcmdlXG4gICAgZWxzZSBuZXdTdGF0ZVtrZXldID0gaW5ib3VuZFN0YXRlW2tleV07IC8vIGhhcmQgc2V0XG5cbiAgICBpZiAobG9nKSBjb25zb2xlLmxvZygncmVkdXgtcGVyc2lzdC9hdXRvUmVoeWRyYXRlOiBrZXkgYCVzYCwgcmVoeWRyYXRlZCB0byAnLCBrZXksIG5ld1N0YXRlW2tleV0pO1xuICB9KTtcbiAgcmV0dXJuIG5ld1N0YXRlO1xufSJdfQ==