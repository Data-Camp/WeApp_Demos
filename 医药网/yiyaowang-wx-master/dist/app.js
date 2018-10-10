"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('./npm/babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('./npm/babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('./npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('./npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _alRequest = require('./npm/al-request/index.js');

var _alRequest2 = _interopRequireDefault(_alRequest);

var _labradorRedux = require('./npm/labrador-redux/index.js');

var _utils = require('./utils/utils.js');

var _redux = require('./redux/index.js');

var _redux2 = _interopRequireDefault(_redux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (true) {
  console.log('当前为开发环境');
}

// 向labrador-redux注册store
(0, _labradorRedux.setStore)(_redux2.default);

var _class = function () {
  function _class() {
    (0, _classCallCheck3.default)(this, _class);
  }

  (0, _createClass3.default)(_class, [{
    key: 'onLaunch',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _utils.sleep)(100);

              case 3:
                _context.next = 5;
                return (0, _alRequest2.default)('api/start');

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                console.error(_context.t0);

              case 10:
                this.timer();

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function onLaunch() {
        return _ref.apply(this, arguments);
      }

      return onLaunch;
    }()
  }, {
    key: 'timer',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!true) {
                  _context2.next = 6;
                  break;
                }

                console.log('hello');
                _context2.next = 4;
                return (0, _utils.sleep)(10000);

              case 4:
                _context2.next = 0;
                break;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function timer() {
        return _ref2.apply(this, arguments);
      }

      return timer;
    }()
  }]);
  return _class;
}();

exports.default = _class;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJfX0RFVl9fIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwidGltZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxPQUFKLEVBQWE7QUFDWEMsVUFBUUMsR0FBUixDQUFZLFNBQVo7QUFDRDs7QUFFRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFLWSxrQkFBTSxHQUFOLEM7Ozs7dUJBQ0EseUJBQVEsV0FBUixDOzs7Ozs7Ozs7O0FBRU5ELHdCQUFRRSxLQUFSOzs7QUFFRixxQkFBS0MsS0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQUlPLEk7Ozs7O0FBQ0xILHdCQUFRQyxHQUFSLENBQVksT0FBWjs7dUJBQ00sa0JBQU0sS0FBTixDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdhbC1yZXF1ZXN0JztcbmltcG9ydCB7IHNldFN0b3JlIH0gZnJvbSAnbGFicmFkb3ItcmVkdXgnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCBzdG9yZSBmcm9tICcuL3JlZHV4JztcblxuaWYgKF9fREVWX18pIHtcbiAgY29uc29sZS5sb2coJ+W9k+WJjeS4uuW8gOWPkeeOr+WigycpO1xufVxuXG4vLyDlkJFsYWJyYWRvci1yZWR1eOazqOWGjHN0b3JlXG5zZXRTdG9yZShzdG9yZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgYXN5bmMgb25MYXVuY2goKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNsZWVwKDEwMCk7XG4gICAgICBhd2FpdCByZXF1ZXN0KCdhcGkvc3RhcnQnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxuICAgIHRoaXMudGltZXIoKTtcbiAgfVxuXG4gIGFzeW5jIHRpbWVyKCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGVsbG8nKTtcbiAgICAgIGF3YWl0IHNsZWVwKDEwMDAwKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
{
var __app=new exports.default();Object.getOwnPropertyNames(__app.constructor.prototype).forEach(function(name){if(name!=='constructor')__app[name]=__app.constructor.prototype[name]});App(__app);
}