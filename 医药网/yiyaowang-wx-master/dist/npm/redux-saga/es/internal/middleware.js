"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require('../../../babel-runtime/core-js/array/from.js');

var _from2 = _interopRequireDefault(_from);

exports.default = sagaMiddlewareFactory;

var _utils = require('./utils.js');

var _proc = require('./proc.js');

var _proc2 = _interopRequireDefault(_proc);

var _scheduler = require('./scheduler.js');

var _channel = require('./channel.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
}

function sagaMiddlewareFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var runSagaDynamically = void 0;
  var sagaMonitor = options.sagaMonitor;

  if (_utils.is.func(options)) {
    if ("development" === 'production') {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (options.logger && !_utils.is.func(options.logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if (options.onerror && !_utils.is.func(options.onerror)) {
    throw new Error('`options.onerror` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref) {
    var getState = _ref.getState,
        dispatch = _ref.dispatch;

    runSagaDynamically = runSaga;
    var sagaEmitter = (0, _channel.emitter)();
    var sagaDispatch = (0, _utils.wrapSagaDispatch)(dispatch);

    function runSaga(saga, args, sagaId) {
      return (0, _proc2.default)(saga.apply(undefined, _toConsumableArray(args)), sagaEmitter.subscribe, sagaDispatch, getState, options, sagaId, saga.name);
    }

    return function (next) {
      return function (action) {
        if (sagaMonitor) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action); // hit reducers
        if (action[_utils.SAGA_ACTION]) {
          // Saga actions are already scheduled with asap in proc/runPutEffect
          sagaEmitter.emit(action);
        } else {
          (0, _scheduler.asap)(function () {
            return sagaEmitter.emit(action);
          });
        }

        return result;
      };
    };
  }

  sagaMiddleware.run = function (saga) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (0, _utils.check)(runSagaDynamically, _utils.is.notUndef, 'Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
    (0, _utils.check)(saga, _utils.is.func, 'sagaMiddleware.run(saga, ...args): saga argument must be a Generator function!');

    var effectId = (0, _utils.uid)();
    if (sagaMonitor) {
      sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
    }
    var task = runSagaDynamically(saga, args, effectId);
    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }
    return task;
  };

  return sagaMiddleware;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pZGRsZXdhcmUuanMiXSwibmFtZXMiOlsic2FnYU1pZGRsZXdhcmVGYWN0b3J5IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImFycjIiLCJsZW5ndGgiLCJvcHRpb25zIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwicnVuU2FnYUR5bmFtaWNhbGx5Iiwic2FnYU1vbml0b3IiLCJmdW5jIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiRXJyb3IiLCJsb2dnZXIiLCJvbmVycm9yIiwic2FnYU1pZGRsZXdhcmUiLCJfcmVmIiwiZ2V0U3RhdGUiLCJkaXNwYXRjaCIsInJ1blNhZ2EiLCJzYWdhRW1pdHRlciIsInNhZ2FEaXNwYXRjaCIsInNhZ2EiLCJhcmdzIiwic2FnYUlkIiwiYXBwbHkiLCJzdWJzY3JpYmUiLCJuYW1lIiwibmV4dCIsImFjdGlvbiIsImFjdGlvbkRpc3BhdGNoZWQiLCJyZXN1bHQiLCJlbWl0IiwicnVuIiwiX2xlbiIsIl9rZXkiLCJub3RVbmRlZiIsImVmZmVjdElkIiwiZWZmZWN0VHJpZ2dlcmVkIiwicm9vdCIsInBhcmVudEVmZmVjdElkIiwiZWZmZWN0IiwidGFzayIsImVmZmVjdFJlc29sdmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQU93QkEscUI7O0FBTHhCOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFMQSxTQUFTQyxrQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUM7QUFBRSxNQUFJQyxNQUFNQyxPQUFOLENBQWNGLEdBQWQsQ0FBSixFQUF3QjtBQUFFLFNBQUssSUFBSUcsSUFBSSxDQUFSLEVBQVdDLE9BQU9ILE1BQU1ELElBQUlLLE1BQVYsQ0FBdkIsRUFBMENGLElBQUlILElBQUlLLE1BQWxELEVBQTBERixHQUExRCxFQUErRDtBQUFFQyxXQUFLRCxDQUFMLElBQVVILElBQUlHLENBQUosQ0FBVjtBQUFtQixLQUFDLE9BQU9DLElBQVA7QUFBYyxHQUE3SCxNQUFtSTtB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aUJBQWY7QUFDQSxRQUFJOUIsV0FBSixFQUFpQjtBQUNmQSxrQkFBWStCLGVBQVosQ0FBNEIsRUFBRUQsVUFBVUEsUUFBWixFQUFzQkUsTUFBTSxJQUE1QixFQUFrQ0MsZ0JBQWdCLENBQWxELEVBQXFEQyxRQUFRLEVBQUVGLE1BQU0sSUFBUixFQUFjakIsTUFBTUEsSUFBcEIsRUFBMEJDLE1BQU1BLElBQWhDLEVBQTdELEVBQTVCO0FBQ0Q7QUFDRCxRQUFJbUIsT0FBT3BDLG1CQUFtQmdCLElBQW5CLEVBQXlCQyxJQUF6QixFQUErQmMsUUFBL0IsQ0FBWDtBQUNBLFFBQUk5QixXQUFKLEVBQWlCO0FBQ2ZBLGtCQUFZb0MsY0FBWixDQUEyQk4sUUFBM0IsRUFBcUNLLElBQXJDO0FBQ0Q7QUFDRCxXQUFPQSxJQUFQO0FBQ0QsR0FqQkQ7O0FBbUJBLFNBQU8zQixjQUFQO0FBQ0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5pbXBvcnQgeyBpcywgY2hlY2ssIHVpZCBhcyBuZXh0U2FnYUlkLCB3cmFwU2FnYURpc3BhdGNoLCBTQUdBX0FDVElPTiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHByb2MgZnJvbSAnLi9wcm9jJztcbmltcG9ydCB7IGFzYXAgfSBmcm9tICcuL3NjaGVkdWxlcic7XG5pbXBvcnQgeyBlbWl0dGVyIH0gZnJvbSAnLi9jaGFubmVsJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FnYU1pZGRsZXdhcmVGYWN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdmFyIHJ1blNhZ2FEeW5hbWljYWxseSA9IHZvaWQgMDtcbiAgdmFyIHNhZ2FNb25pdG9yID0gb3B0aW9ucy5zYWdhTW9uaXRvcjtcblxuXG4gIGlmIChpcy5mdW5jKG9wdGlvbnMpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2FnYSBtaWRkbGV3YXJlIG5vIGxvbmdlciBhY2NlcHQgR2VuZXJhdG9yIGZ1bmN0aW9ucy4gVXNlIHNhZ2FNaWRkbGV3YXJlLnJ1biBpbnN0ZWFkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IHBhc3NlZCBhIGZ1bmN0aW9uIHRvIHRoZSBTYWdhIG1pZGRsZXdhcmUuIFlvdSBhcmUgbGlrZWx5IHRyeWluZyB0byBzdGFydCBhICAgICAgICBTYWdhIGJ5IGRpcmVjdGx5IHBhc3NpbmcgaXQgdG8gdGhlIG1pZGRsZXdhcmUuIFRoaXMgaXMgbm8gbG9uZ2VyIHBvc3NpYmxlIHN0YXJ0aW5nIGZyb20gMC4xMC4wLiAgICAgICAgVG8gcnVuIGEgU2FnYSwgeW91IG11c3QgZG8gaXQgZHluYW1pY2FsbHkgQUZURVIgbW91bnRpbmcgdGhlIG1pZGRsZXdhcmUgaW50byB0aGUgc3RvcmUuXFxuICAgICAgICBFeGFtcGxlOlxcbiAgICAgICAgICBpbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUgZnJvbSBcXCdyZWR1eC1zYWdhXFwnXFxuICAgICAgICAgIC4uLiBvdGhlciBpbXBvcnRzXFxuXFxuICAgICAgICAgIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKVxcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIGFwcGx5TWlkZGxld2FyZShzYWdhTWlkZGxld2FyZSkpXFxuICAgICAgICAgIHNhZ2FNaWRkbGV3YXJlLnJ1bihzYWdhLCAuLi5hcmdzKVxcbiAgICAgICcpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zLmxvZ2dlciAmJiAhaXMuZnVuYyhvcHRpb25zLmxvZ2dlcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2BvcHRpb25zLmxvZ2dlcmAgcGFzc2VkIHRvIHRoZSBTYWdhIG1pZGRsZXdhcmUgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5vbmVycm9yICYmICFpcy5mdW5jKG9wdGlvbnMub25lcnJvcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2BvcHRpb25zLm9uZXJyb3JgIHBhc3NlZCB0byB0aGUgU2FnYSBtaWRkbGV3YXJlIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2FnYU1pZGRsZXdhcmUoX3JlZikge1xuICAgIHZhciBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoID0gX3JlZi5kaXNwYXRjaDtcblxuICAgIHJ1blNhZ2FEeW5hbWljYWxseSA9IHJ1blNhZ2E7XG4gICAgdmFyIHNhZ2FFbWl0dGVyID0gZW1pdHRlcigpO1xuICAgIHZhciBzYWdhRGlzcGF0Y2ggPSB3cmFwU2FnYURpc3BhdGNoKGRpc3BhdGNoKTtcblxuICAgIGZ1bmN0aW9uIHJ1blNhZ2Eoc2FnYSwgYXJncywgc2FnYUlkKSB7XG4gICAgICByZXR1cm4gcHJvYyhzYWdhLmFwcGx5KHVuZGVmaW5lZCwgX3RvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSwgc2FnYUVtaXR0ZXIuc3Vic2NyaWJlLCBzYWdhRGlzcGF0Y2gsIGdldFN0YXRlLCBvcHRpb25zLCBzYWdhSWQsIHNhZ2EubmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAoc2FnYU1vbml0b3IpIHtcbiAgICAgICAgICBzYWdhTW9uaXRvci5hY3Rpb25EaXNwYXRjaGVkKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IG5leHQoYWN0aW9uKTsgLy8gaGl0IHJlZHVjZXJzXG4gICAgICAgIGlmIChhY3Rpb25bU0FHQV9BQ1RJT05dKSB7XG4gICAgICAgICAgLy8gU2FnYSBhY3Rpb25zIGFyZSBhbHJlYWR5IHNjaGVkdWxlZCB3aXRoIGFzYXAgaW4gcHJvYy9ydW5QdXRFZmZlY3RcbiAgICAgICAgICBzYWdhRW1pdHRlci5lbWl0KGFjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gc2FnYUVtaXR0ZXIuZW1pdChhY3Rpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIHNhZ2FNaWRkbGV3YXJlLnJ1biA9IGZ1bmN0aW9uIChzYWdhKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBjaGVjayhydW5TYWdhRHluYW1pY2FsbHksIGlzLm5vdFVuZGVmLCAnQmVmb3JlIHJ1bm5pbmcgYSBTYWdhLCB5b3UgbXVzdCBtb3VudCB0aGUgU2FnYSBtaWRkbGV3YXJlIG9uIHRoZSBTdG9yZSB1c2luZyBhcHBseU1pZGRsZXdhcmUnKTtcbiAgICBjaGVjayhzYWdhLCBpcy5mdW5jLCAnc2FnYU1pZGRsZXdhcmUucnVuKHNhZ2EsIC4uLmFyZ3MpOiBzYWdhIGFyZ3VtZW50IG11c3QgYmUgYSBHZW5lcmF0b3IgZnVuY3Rpb24hJyk7XG5cbiAgICB2YXIgZWZmZWN0SWQgPSBuZXh0U2FnYUlkKCk7XG4gICAgaWYgKHNhZ2FNb25pdG9yKSB7XG4gICAgICBzYWdhTW9uaXRvci5lZmZlY3RUcmlnZ2VyZWQoeyBlZmZlY3RJZDogZWZmZWN0SWQsIHJvb3Q6IHRydWUsIHBhcmVudEVmZmVjdElkOiAwLCBlZmZlY3Q6IHsgcm9vdDogdHJ1ZSwgc2FnYTogc2FnYSwgYXJnczogYXJncyB9IH0pO1xuICAgIH1cbiAgICB2YXIgdGFzayA9IHJ1blNhZ2FEeW5hbWljYWxseShzYWdhLCBhcmdzLCBlZmZlY3RJZCk7XG4gICAgaWYgKHNhZ2FNb25pdG9yKSB7XG4gICAgICBzYWdhTW9uaXRvci5lZmZlY3RSZXNvbHZlZChlZmZlY3RJZCwgdGFzayk7XG4gICAgfVxuICAgIHJldHVybiB0YXNrO1xuICB9O1xuXG4gIHJldHVybiBzYWdhTWlkZGxld2FyZTtcbn0iXX0=