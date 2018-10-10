"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('../npm/redux/es/index.js');

var _createStore = require('./createStore.js');

var _createStore2 = _interopRequireDefault(_createStore);

var _sagas = require('../sagas//index.js');

var _sagas2 = _interopRequireDefault(_sagas);

var _cart = require('./cart.js');

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStore() {
  var rootReducer = (0, _redux.combineReducers)({
    cart: _cart2.default
    // login: loginReducer,
    // user: userReducer,
    // todos: todosReducer
  });

  return (0, _createStore2.default)(rootReducer, _sagas2.default);
}

// import loginReducer from './login';
// import userReducer from './user';
// import todosReducer from './todos';
exports.default = createStore();
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZVN0b3JlIiwicm9vdFJlZHVjZXIiLCJjYXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBS0E7Ozs7OztBQUdBLFNBQVNBLFdBQVQsR0FBdUI7QUFDckIsTUFBTUMsY0FBYyw0QkFBZ0I7QUFDbENDO0FBQ0E7QUFDQTtBQUNBO0FBSmtDLEdBQWhCLENBQXBCOztBQU9BLFNBQU8sMkJBQWVELFdBQWYsa0JBQVA7QUFDRDs7QUFmRDtBQUNBO0FBQ0E7a0JBZWVELGEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCByb290U2FnYSBmcm9tICcuLi9zYWdhcy8nO1xuXG4vLyBpbXBvcnQgbG9naW5SZWR1Y2VyIGZyb20gJy4vbG9naW4nO1xuLy8gaW1wb3J0IHVzZXJSZWR1Y2VyIGZyb20gJy4vdXNlcic7XG4vLyBpbXBvcnQgdG9kb3NSZWR1Y2VyIGZyb20gJy4vdG9kb3MnO1xuaW1wb3J0IGNhcnRzUmVkdWNlciBmcm9tICcuL2NhcnQnO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xuICBjb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgY2FydDogY2FydHNSZWR1Y2VyXG4gICAgLy8gbG9naW46IGxvZ2luUmVkdWNlcixcbiAgICAvLyB1c2VyOiB1c2VyUmVkdWNlcixcbiAgICAvLyB0b2RvczogdG9kb3NSZWR1Y2VyXG4gIH0pO1xuXG4gIHJldHVybiBjb25maWd1cmVTdG9yZShyb290UmVkdWNlciwgcm9vdFNhZ2EpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZSgpO1xuIl19