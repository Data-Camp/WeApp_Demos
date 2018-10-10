"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('../npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = root;

var _reduxSaga = require('../npm/redux-saga/es/index.js');

var _cart = require('../redux/cart.js');

var _cart2 = require('./cart.js');

var cartSaga = _interopRequireWildcard(_cart2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [root].map(_regenerator2.default.mark);

// 当action触发时，执行特定saga
function root() {
  return _regenerator2.default.wrap(function root$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return [(0, _reduxSaga.takeLatest)(_cart.ADD, cartSaga.addSaga)];

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInJvb3QiLCJjYXJ0U2FnYSIsImFkZFNhZ2EiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBS3lCQSxJOztBQUx6Qjs7QUFDQTs7QUFDQTs7SUFBWUMsUTs7Ozs7O2VBR2FELEk7O0FBRHpCO0FBQ2UsU0FBVUEsSUFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFDUCxDQUNKLHNDQUFnQkMsU0FBU0MsT0FBekIsQ0FESSxDQURPOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlTGF0ZXN0IH0gZnJvbSAncmVkdXgtc2FnYSc7XG5pbXBvcnQgeyBBREQgfSBmcm9tICcuLi9yZWR1eC9jYXJ0JztcbmltcG9ydCAqIGFzIGNhcnRTYWdhIGZyb20gJy4vY2FydCc7XG5cbi8vIOW9k2FjdGlvbuinpuWPkeaXtu+8jOaJp+ihjOeJueWumnNhZ2FcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiByb290KCkge1xuICB5aWVsZCBbXG4gICAgdGFrZUxhdGVzdChBREQsIGNhcnRTYWdhLmFkZFNhZ2EpXG5cbiAgXTtcbn1cbiJdfQ==