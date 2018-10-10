"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (rootReducer, rootSaga) {
  var middleware = [];
  var enhancers = [];

  // saga中间件
  var sagaMiddleware = (0, _reduxSaga2.default)();
  middleware.push(sagaMiddleware);

  // log中间件
  var SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];
  if (true) {
    var logger = (0, _reduxLogger2.default)({
      predicate: function predicate(getState, _ref) {
        var type = _ref.type;
        return SAGA_LOGGING_BLACKLIST.indexOf(type) === -1;
      }
    });
    middleware.push(logger);
  }

  // 合并中间件
  enhancers.push(_redux.applyMiddleware.apply(undefined, middleware));

  // persist rehydrate
  enhancers.push((0, _reduxPersist.autoRehydrate)());

  var store = (0, _redux.createStore)(rootReducer, _redux.compose.apply(undefined, enhancers));

  // persist
  (0, _reduxPersist.persistStore)(store, _reduxPersist3.default, function () {
    return store.dispatch(StartupActions.startup());
  });

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};

var _redux = require('../npm/redux/es/index.js');

var _reduxPersist = require('../npm/redux-persist/es/index.js');

var _reduxLogger = require('../npm/redux-logger/lib/index.js');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxSaga = require('../npm/redux-saga/es/index.js');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reduxPersist2 = require('../config/redux-persist.js');

var _reduxPersist3 = _interopRequireDefault(_reduxPersist2);

var _startup = require('./startup.js');

var StartupActions = _interopRequireWildcard(_startup);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZVN0b3JlLmpzIl0sIm5hbWVzIjpbInJvb3RSZWR1Y2VyIiwicm9vdFNhZ2EiLCJtaWRkbGV3YXJlIiwiZW5oYW5jZXJzIiwic2FnYU1pZGRsZXdhcmUiLCJwdXNoIiwiU0FHQV9MT0dHSU5HX0JMQUNLTElTVCIsIl9fREVWX18iLCJsb2dnZXIiLCJwcmVkaWNhdGUiLCJnZXRTdGF0ZSIsInR5cGUiLCJpbmRleE9mIiwic3RvcmUiLCJkaXNwYXRjaCIsIlN0YXJ0dXBBY3Rpb25zIiwic3RhcnR1cCIsInJ1biJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQWFlLFVBQVVBLFdBQVYsRUFBdUJDLFFBQXZCLEVBQWlDO0FBQzlDLE1BQU1DLGFBQWEsRUFBbkI7QUFDQSxNQUFNQyxZQUFZLEVBQWxCOztBQUVBO0FBQ0EsTUFBTUMsaUJBQWlCLDBCQUF2QjtBQUNBRixhQUFXRyxJQUFYLENBQWdCRCxjQUFoQjs7QUFFQTtBQUNBLE1BQU1FLHlCQUF5QixDQUFDLGtCQUFELEVBQXFCLGlCQUFyQixFQUF3QyxpQkFBeEMsQ0FBL0I7QUFDQSxNQUFJQyxPQUFKLEVBQWE7QUFDWCxRQUFNQyxTQUFTLDJCQUFhO0FBQzFCQyxpQkFBVyxtQkFBQ0MsUUFBRDtBQUFBLFlBQWFDLElBQWIsUUFBYUEsSUFBYjtBQUFBLGVBQXdCTCx1QkFBdUJNLE9BQXZCLENBQStCRCxJQUEvQixNQUF5QyxDQUFDLENBQWxFO0FBQUE7QUFEZSxLQUFiLENBQWY7QUFHQVQsZUFBV0csSUFBWCxDQUFnQkcsTUFBaEI7QUFDRDs7QUFFRDtBQUNBTCxZQUFVRSxJQUFWLENBQWUsd0NBQW1CSCxVQUFuQixDQUFmOztBQUVBO0FBQ0FDLFlBQVVFLElBQVYsQ0FBZSxrQ0FBZjs7QUFFQSxNQUFNUSxRQUFRLHdCQUFZYixXQUFaLEVBQXlCLGdDQUFXRyxTQUFYLENBQXpCLENBQWQ7O0FBRUE7QUFDQSxrQ0FBYVUsS0FBYiwwQkFBa0M7QUFBQSxXQUFNQSxNQUFNQyxRQUFOLENBQWVDLGVBQWVDLE9BQWYsRUFBZixDQUFOO0FBQUEsR0FBbEM7O0FBRUE7QUFDQVosaUJBQWVhLEdBQWYsQ0FBbUJoQixRQUFuQjs7QUFFQSxTQUFPWSxLQUFQO0FBQ0QsQzs7QUE3Q0Q7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlFLGMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBwZXJzaXN0U3RvcmUsIGF1dG9SZWh5ZHJhdGUgfSBmcm9tICdyZWR1eC1wZXJzaXN0JztcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJztcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCByZWR1eFBlcnNpc3QgZnJvbSAnLi4vY29uZmlnL3JlZHV4LXBlcnNpc3QnO1xuaW1wb3J0ICogYXMgU3RhcnR1cEFjdGlvbnMgZnJvbSAnLi9zdGFydHVwJztcblxuLyoqXG4gKiDliJvlu7pzdG9yZVxuICogQHBhcmFtIHJvb3RSZWR1Y2VyXG4gKiBAcGFyYW0gcm9vdFNhZ2FcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocm9vdFJlZHVjZXIsIHJvb3RTYWdhKSB7XG4gIGNvbnN0IG1pZGRsZXdhcmUgPSBbXTtcbiAgY29uc3QgZW5oYW5jZXJzID0gW107XG5cbiAgLy8gc2FnYeS4remXtOS7tlxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XG4gIG1pZGRsZXdhcmUucHVzaChzYWdhTWlkZGxld2FyZSk7XG5cbiAgLy8gbG9n5Lit6Ze05Lu2XG4gIGNvbnN0IFNBR0FfTE9HR0lOR19CTEFDS0xJU1QgPSBbJ0VGRkVDVF9UUklHR0VSRUQnLCAnRUZGRUNUX1JFU09MVkVEJywgJ0VGRkVDVF9SRUpFQ1RFRCddO1xuICBpZiAoX19ERVZfXykge1xuICAgIGNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcih7XG4gICAgICBwcmVkaWNhdGU6IChnZXRTdGF0ZSwgeyB0eXBlIH0pID0+IFNBR0FfTE9HR0lOR19CTEFDS0xJU1QuaW5kZXhPZih0eXBlKSA9PT0gLTFcbiAgICB9KTtcbiAgICBtaWRkbGV3YXJlLnB1c2gobG9nZ2VyKTtcbiAgfVxuXG4gIC8vIOWQiOW5tuS4remXtOS7tlxuICBlbmhhbmNlcnMucHVzaChhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSkpO1xuXG4gIC8vIHBlcnNpc3QgcmVoeWRyYXRlXG4gIGVuaGFuY2Vycy5wdXNoKGF1dG9SZWh5ZHJhdGUoKSk7XG5cbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyb290UmVkdWNlciwgY29tcG9zZSguLi5lbmhhbmNlcnMpKTtcblxuICAvLyBwZXJzaXN0XG4gIHBlcnNpc3RTdG9yZShzdG9yZSwgcmVkdXhQZXJzaXN0LCAoKSA9PiBzdG9yZS5kaXNwYXRjaChTdGFydHVwQWN0aW9ucy5zdGFydHVwKCkpKTtcblxuICAvLyBraWNrIG9mZiByb290IHNhZ2FcbiAgc2FnYU1pZGRsZXdhcmUucnVuKHJvb3RTYWdhKTtcblxuICByZXR1cm4gc3RvcmU7XG59XG4iXX0=