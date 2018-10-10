"use strict";var exports=module.exports={};
var _assign = require('../../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault2(_assign);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('./core.js');

var _helpers = require('./helpers.js');

var _defaults = require('./defaults.js');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
function createLogger() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var loggerOptions = _extends({}, _defaults2.default, options);

  var logger = loggerOptions.logger;
  var transformer = loggerOptions.transformer;
  var stateTransformer = loggerOptions.stateTransformer;
  var errorTransformer = loggerOptions.errorTransformer;
  var predicate = loggerOptions.predicate;
  var logErrors = loggerOptions.logErrors;
  var diffPredicate = loggerOptions.diffPredicate;

  // Return if 'console' object is not defined

  if (typeof logger === 'undefined') {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  if (transformer) {
    console.error('Option \'transformer\' is deprecated, use \'stateTransformer\' instead!'); // eslint-disable-line no-console
  }

  var logBuffer = [];

  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        // Exit early if predicate function returns 'false'
        if (typeof predicate === 'function' && !predicate(getState, action)) {
          return next(action);
        }

        var logEntry = {};
        logBuffer.push(logEntry);

        logEntry.started = _helpers.timer.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        var returnedValue = undefined;
        if (logErrors) {
          try {
            returnedValue = next(action);
          } catch (e) {
            logEntry.error = errorTransformer(e);
          }
        } else {
          returnedValue = next(action);
        }

        logEntry.took = _helpers.timer.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        var diff = loggerOptions.diff && typeof diffPredicate === 'function' ? diffPredicate(getState, action) : loggerOptions.diff;

        (0, _core.printBuffer)(logBuffer, _extends({}, loggerOptions, { diff: diff }));
        logBuffer.length = 0;

        if (logEntry.error) throw logEntry.error;
        return returnedValue;
      };
    };
  };
}

exports.default = createLogger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIl9leHRlbmRzIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsImtleSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiX2NvcmUiLCJyZXF1aXJlIiwiX2hlbHBlcnMiLCJfZGVmYXVsdHMiLCJfZGVmYXVsdHMyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiY3JlYXRlTG9nZ2VyIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsImxvZ2dlck9wdGlvbnMiLCJsb2dnZXIiLCJ0cmFuc2Zvcm1lciIsInN0YXRlVHJhbnNmb3JtZXIiLCJlcnJvclRyYW5zZm9ybWVyIiwicHJlZGljYXRlIiwibG9nRXJyb3JzIiwiZGlmZlByZWRpY2F0ZSIsIm5leHQiLCJhY3Rpb24iLCJjb25zb2xlIiwiZXJyb3IiLCJsb2dCdWZmZXIiLCJfcmVmIiwiZ2V0U3RhdGUiLCJsb2dFbnRyeSIsInB1c2giLCJzdGFydGVkIiwidGltZXIiLCJub3ciLCJzdGFydGVkVGltZSIsIkRhdGUiLCJwcmV2U3RhdGUiLCJyZXR1cm5lZFZhbHVlIiwiZSIsInRvb2siLCJuZXh0U3RhdGUiLCJkaWZmIiwicHJpbnRCdWZmZXIiLCJtb2R1bGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQUlBLFdBQVcsb0JBQWlCLFVBQVVDLE1BQVYsRUFBa0I7QUFBRSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUMsVUFBVUMsTUFBOUIsRUFBc0NGLEdBQXRDLEVBQTJDO0FBQUUsUUFBSUcsU0FBU0YsVUFBVUQsQ0FBVixDQUFiLENBQTJCLEtBQUssSUFBSUksR0FBVCxJQUFnQkQsTUFBaEIsRUFBd0I7QUFBRSxVQUFJRSxPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixD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QUNGLFNBTkQsTUFNTztBQUNMRCwwQkFBZ0JmLEtBQUtDLE1BQUwsQ0FBaEI7QUFDRDs7QUFFRE0saUJBQVNVLElBQVQsR0FBZ0JuQyxTQUFTNEIsS0FBVCxDQUFlQyxHQUFmLEtBQXVCSixTQUFTRSxPQUFoRDtBQUNBRixpQkFBU1csU0FBVCxHQUFxQnZCLGlCQUFpQlcsVUFBakIsQ0FBckI7O0FBRUEsWUFBSWEsT0FBTzNCLGNBQWMyQixJQUFkLElBQXNCLE9BQU9wQixhQUFQLEtBQXlCLFVBQS9DLEdBQTREQSxjQUFjTyxRQUFkLEVBQXdCTCxNQUF4QixDQUE1RCxHQUE4RlQsY0FBYzJCLElBQXZIOztBQUVBLFNBQUMsR0FBR3ZDLE1BQU13QyxXQUFWLEVBQXVCaEIsU0FBdkIsRUFBa0N0QyxTQUFTLEVBQVQsRUFBYTBCLGFBQWIsRUFBNEIsRUFBRTJCLE1BQU1BLElBQVIsRUFBNUIsQ0FBbEM7QUFDQWYsa0JBQVVsQyxNQUFWLEdBQW1CLENBQW5COztBQUVBLFlBQUlxQyxTQUFTSixLQUFiLEVBQW9CLE1BQU1JLFNBQVNKLEtBQWY7QUFDcEIsZUFBT1ksYUFBUDtBQUNELE9BbkNEO0FBb0NELEtBckNEO0FBc0NELEdBeENEO0FBeUNEOztBQUVEckMsUUFBUVUsT0FBUixHQUFrQkMsWUFBbEI7QUFDQWdDLE9BQU8zQyxPQUFQLEdBQWlCQSxRQUFRLFNBQVIsQ0FBakIiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jb3JlID0gcmVxdWlyZSgnLi9jb3JlJyk7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG52YXIgX2RlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG52YXIgX2RlZmF1bHRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGVzIGxvZ2dlciB3aXRoIGZvbGxvd2luZyBvcHRpb25zXG4gKlxuICogQG5hbWVzcGFjZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIGZvciBsb2dnZXJcbiAqIEBwYXJhbSB7c3RyaW5nIHwgZnVuY3Rpb24gfCBvYmplY3R9IG9wdGlvbnMubGV2ZWwgLSBjb25zb2xlW2xldmVsXVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmR1cmF0aW9uIC0gcHJpbnQgZHVyYXRpb24gb2YgZWFjaCBhY3Rpb24/XG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMudGltZXN0YW1wIC0gcHJpbnQgdGltZXN0YW1wIHdpdGggZWFjaCBhY3Rpb24/XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5jb2xvcnMgLSBjdXN0b20gY29sb3JzXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5sb2dnZXIgLSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYGNvbnNvbGVgIEFQSVxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmxvZ0Vycm9ycyAtIHNob3VsZCBlcnJvcnMgaW4gYWN0aW9uIGV4ZWN1dGlvbiBiZSBjYXVnaHQsIGxvZ2dlZCwgYW5kIHJlLXRocm93bj9cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jb2xsYXBzZWQgLSBpcyBncm91cCBjb2xsYXBzZWQ/XG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucHJlZGljYXRlIC0gY29uZGl0aW9uIHdoaWNoIHJlc29sdmVzIGxvZ2dlciBiZWhhdmlvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5zdGF0ZVRyYW5zZm9ybWVyIC0gdHJhbnNmb3JtIHN0YXRlIGJlZm9yZSBwcmludFxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5hY3Rpb25UcmFuc2Zvcm1lciAtIHRyYW5zZm9ybSBhY3Rpb24gYmVmb3JlIHByaW50XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLmVycm9yVHJhbnNmb3JtZXIgLSB0cmFuc2Zvcm0gZXJyb3IgYmVmb3JlIHByaW50XG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufSBsb2dnZXIgbWlkZGxld2FyZVxuICovXG5mdW5jdGlvbiBjcmVhdGVMb2dnZXIoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgdmFyIGxvZ2dlck9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgX2RlZmF1bHRzMi5kZWZhdWx0LCBvcHRpb25zKTtcblxuICB2YXIgbG9nZ2VyID0gbG9nZ2VyT3B0aW9ucy5sb2dnZXI7XG4gIHZhciB0cmFuc2Zvcm1lciA9IGxvZ2dlck9wdGlvbnMudHJhbnNmb3JtZXI7XG4gIHZhciBzdGF0ZVRyYW5zZm9ybWVyID0gbG9nZ2VyT3B0aW9ucy5zdGF0ZVRyYW5zZm9ybWVyO1xuICB2YXIgZXJyb3JUcmFuc2Zvcm1lciA9IGxvZ2dlck9wdGlvbnMuZXJyb3JUcmFuc2Zvcm1lcjtcbiAgdmFyIHByZWRpY2F0ZSA9IGxvZ2dlck9wdGlvbnMucHJlZGljYXRlO1xuICB2YXIgbG9nRXJyb3JzID0gbG9nZ2VyT3B0aW9ucy5sb2dFcnJvcnM7XG4gIHZhciBkaWZmUHJlZGljYXRlID0gbG9nZ2VyT3B0aW9ucy5kaWZmUHJlZGljYXRlO1xuXG4gIC8vIFJldHVybiBpZiAnY29uc29sZScgb2JqZWN0IGlzIG5vdCBkZWZpbmVkXG5cbiAgaWYgKHR5cGVvZiBsb2dnZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICBpZiAodHJhbnNmb3JtZXIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdPcHRpb24gXFwndHJhbnNmb3JtZXJcXCcgaXMgZGVwcmVjYXRlZCwgdXNlIFxcJ3N0YXRlVHJhbnNmb3JtZXJcXCcgaW5zdGVhZCEnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gIH1cblxuICB2YXIgbG9nQnVmZmVyID0gW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIC8vIEV4aXQgZWFybHkgaWYgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnMgJ2ZhbHNlJ1xuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiAhcHJlZGljYXRlKGdldFN0YXRlLCBhY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2dFbnRyeSA9IHt9O1xuICAgICAgICBsb2dCdWZmZXIucHVzaChsb2dFbnRyeSk7XG5cbiAgICAgICAgbG9nRW50cnkuc3RhcnRlZCA9IF9oZWxwZXJzLnRpbWVyLm5vdygpO1xuICAgICAgICBsb2dFbnRyeS5zdGFydGVkVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxvZ0VudHJ5LnByZXZTdGF0ZSA9IHN0YXRlVHJhbnNmb3JtZXIoZ2V0U3RhdGUoKSk7XG4gICAgICAgIGxvZ0VudHJ5LmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICB2YXIgcmV0dXJuZWRWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKGxvZ0Vycm9ycykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5lZFZhbHVlID0gbmV4dChhY3Rpb24pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZ0VudHJ5LmVycm9yID0gZXJyb3JUcmFuc2Zvcm1lcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ0VudHJ5LnRvb2sgPSBfaGVscGVycy50aW1lci5ub3coKSAtIGxvZ0VudHJ5LnN0YXJ0ZWQ7XG4gICAgICAgIGxvZ0VudHJ5Lm5leHRTdGF0ZSA9IHN0YXRlVHJhbnNmb3JtZXIoZ2V0U3RhdGUoKSk7XG5cbiAgICAgICAgdmFyIGRpZmYgPSBsb2dnZXJPcHRpb25zLmRpZmYgJiYgdHlwZW9mIGRpZmZQcmVkaWNhdGUgPT09ICdmdW5jdGlvbicgPyBkaWZmUHJlZGljYXRlKGdldFN0YXRlLCBhY3Rpb24pIDogbG9nZ2VyT3B0aW9ucy5kaWZmO1xuXG4gICAgICAgICgwLCBfY29yZS5wcmludEJ1ZmZlcikobG9nQnVmZmVyLCBfZXh0ZW5kcyh7fSwgbG9nZ2VyT3B0aW9ucywgeyBkaWZmOiBkaWZmIH0pKTtcbiAgICAgICAgbG9nQnVmZmVyLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgaWYgKGxvZ0VudHJ5LmVycm9yKSB0aHJvdyBsb2dFbnRyeS5lcnJvcjtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkVmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUxvZ2dlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyJdfQ==