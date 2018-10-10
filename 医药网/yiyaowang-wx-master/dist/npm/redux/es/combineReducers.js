"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

exports.default = combineReducers;

var _createStore = require('./createStore.js');

var _isPlainObject = require('../../lodash/isPlainObject.js');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning.js');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = (0, _keys2.default)(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2.default)(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = (0, _keys2.default)(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  (0, _keys2.default)(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = (0, _keys2.default)(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2.default)('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = (0, _keys2.default)(finalReducers);

  if ("development" !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2.default)(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbWJpbmVSZWR1Y2Vycy5qcyJdLCJuYW1lcyI6WyJjb21iaW5lUmVkdWNlcnMiLCJnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZSIsImtleSIsImFjdGlvbiIsImFjdGlvblR5cGUiLCJ0eXBlIiwiYWN0aW9uTmFtZSIsInRvU3RyaW5nIiwiZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZSIsImlucHV0U3RhdGUiLCJyZWR1Y2VycyIsInVuZXhwZWN0ZWRLZXlDYWNoZSIsInJlZHVjZXJLZXlzIiwiYXJndW1lbnROYW1lIiwiSU5JVCIsImxlbmd0aCIsImNhbGwiLCJtYXRjaCIsImpvaW4iLCJ1bmV4cGVjdGVkS2V5cyIsImZpbHRlciIsImhhc093blByb3BlcnR5IiwiZm9yRWFjaCIsImFzc2VydFJlZHVjZXJTYW5pdHkiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwidW5kZWZpbmVkIiwiRXJyb3IiLCJNYXRoIiwicmFuZG9tIiwic3Vic3RyaW5nIiwic3BsaXQiLCJmaW5hbFJlZHVjZXJzIiwiaSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImZpbmFsUmVkdWNlcktleXMiLCJzYW5pdHlFcnJvciIsImUiLCJjb21iaW5hdGlvbiIsInN0YXRlIiwiYXJndW1lbnRzIiwid2FybmluZ01lc3NhZ2UiLCJoYXNDaGFuZ2VkIiwibmV4dFN0YXRlIiwicHJldmlvdXNTdGF0ZUZvcktleSIsIm5leHRTdGF0ZUZvcktleSIsImVycm9yTWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkFvRXdCQSxlOztBQXBFeEI7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0MsNkJBQVQsQ0FBdUNDLEdBQXZDLEVBQTRDQyxNQUE1QyxFQUFvRDtBQUNsRCxNQUFJQyxhQUFhRCxVQUFVQSxPQUFPRSxJQUFsQztBQUNBLE1BQUlDLGFBQWFGLGNBQWMsTUFBTUEsV0FBV0csUUFBWCxFQUFOLEdBQThCLEdBQTVDLElBQW1ELFdBQXBF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QVUsQ0FBVixDQUFiOztBQUVBLFFBQUlKLFdBQUosRUFBaUI7QUFDZixZQUFNQSxXQUFOO0FBQ0Q7O0FBRUQsUUFBSUosUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLFVBQUlPLGlCQUFpQm5DLHNDQUFzQ2lDLEtBQXRDLEVBQTZDVCxhQUE3QyxFQUE0RDdCLE1BQTVELEVBQW9FUSxrQkFBcEUsQ0FBckI7QUFDQSxVQUFJZ0MsY0FBSixFQUFvQjtBQUNsQiwrQkFBUUEsY0FBUjtBQUNEO0FBQ0Y7O0FBRUQsUUFBSUMsYUFBYSxLQUFqQjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxTQUFLLElBQUlaLElBQUksQ0FBYixFQUFnQkEsSUFBSUksaUJBQWlCdEIsTUFBckMsRUFBNkNrQixHQUE3QyxFQUFrRDtBQUNoRCxVQUFJL0IsTUFBTW1DLGlCQUFpQkosQ0FBakIsQ0FBVjtBQUNBLFVBQUlULFVBQVVRLGNBQWM5QixHQUFkLENBQWQ7QUFDQSxVQUFJNEMsc0JBQXNCTCxNQUFNdkMsR0FBTixDQUExQjtBQUNBLFVBQUk2QyxrQkFBa0J2QixRQUFRc0IsbUJBQVIsRUFBNkIzQyxNQUE3QixDQUF0QjtBQUNBLFVBQUksT0FBTzRDLGVBQVAsS0FBMkIsV0FBL0IsRUFBNEM7QUFDMUMsWUFBSUMsZUFBZS9DLDhCQUE4QkMsR0FBOUIsRUFBbUNDLE1BQW5DLENBQW5CO0FBQ0EsY0FBTSxJQUFJd0IsS0FBSixDQUFVcUIsWUFBVixDQUFOO0FBQ0Q7QUFDREgsZ0JBQVUzQyxHQUFWLElBQWlCNkMsZUFBakI7QUFDQUgsbUJBQWFBLGNBQWNHLG9CQUFvQkQsbUJBQS9DO0FBQ0Q7QUFDRCxXQUFPRixhQUFhQyxTQUFiLEdBQXlCSixLQUFoQztBQUNELEdBOUJEO0FBK0JEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25UeXBlcyB9IGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi91dGlscy93YXJuaW5nJztcblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25OYW1lID0gYWN0aW9uVHlwZSAmJiAnXCInICsgYWN0aW9uVHlwZS50b1N0cmluZygpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuICByZXR1cm4gJ0dpdmVuIGFjdGlvbiAnICsgYWN0aW9uTmFtZSArICcsIHJlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZC4gJyArICdUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuJztcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCFpc1BsYWluT2JqZWN0KGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcblxuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNhbml0eShyZWR1Y2Vycykge1xuICBPYmplY3Qua2V5cyhyZWR1Y2VycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIEFjdGlvblR5cGVzLklOSVQgKyAnIG9yIG90aGVyIGFjdGlvbnMgaW4gXCJyZWR1eC8qXCIgJykgKyAnbmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgJyArICdjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCAnICsgJ2luIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSAnICsgJ2FjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3YXJuaW5nKCdObyByZWR1Y2VyIHByb3ZpZGVkIGZvciBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNhbml0eUVycm9yO1xuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTYW5pdHkoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzYW5pdHlFcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChzYW5pdHlFcnJvcikge1xuICAgICAgdGhyb3cgc2FuaXR5RXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBmaW5hbFJlZHVjZXJLZXlzW2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbmV4dFN0YXRlW2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59Il19