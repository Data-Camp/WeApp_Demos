"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('../babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('../babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _labrador = require('../labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  /**
   * @param key
   * @param callback
   * @returns {*}
   */
  getItem: function getItem(key, callback) {
    var _this = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _labrador2.default.getStorage({ key: key });

            case 3:
              res = _context.sent;

              if (callback) callback(null, res.data);
              return _context.abrupt('return', res.data);

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              if (callback) callback(_context.t0);
              throw _context.t0;

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 8]]);
    }))();
  },


  /**
   * @param key
   * @param data
   * @param callback
   */
  setItem: function setItem(key, data, callback) {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _labrador2.default.setStorage({ key: key, data: data });

            case 3:
              if (callback) callback(null);
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](0);

              if (callback) callback(_context2.t0);
              throw _context2.t0;

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 6]]);
    }))();
  },


  /**
   * @param key
   * @param callback
   */
  removeItem: function removeItem(key, callback) {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _labrador2.default.removeStorage({ key: key });

            case 3:
              if (callback) callback(null);
              _context3.next = 10;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3['catch'](0);

              if (callback) callback(_context3.t0);
              throw _context3.t0;

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3, [[0, 6]]);
    }))();
  },


  /**
   * @param callback
   */
  clear: function clear(callback) {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _labrador2.default.clearStorage();
              if (callback) callback(null);

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },


  /**
   * @param callback
   */
  getAllKeys: function getAllKeys(callback) {
    var _this5 = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var res;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _labrador2.default.getStorageInfo();

            case 3:
              res = _context5.sent;

              if (callback) callback(null, res.keys);
              _context5.next = 11;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5['catch'](0);

              if (callback) callback(_context5.t0);
              throw _context5.t0;

            case 11:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this5, [[0, 7]]);
    }))();
  }
}; /**
    * @copyright Maichong Software Ltd. 2016 http://maichong.it
    * @date 2016-11-19
    * @author Liang <liang@maichong.it>
    */
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImdldEl0ZW0iLCJrZXkiLCJjYWxsYmFjayIsImdldFN0b3JhZ2UiLCJyZXMiLCJkYXRhIiwic2V0SXRlbSIsInNldFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwicmVtb3ZlU3RvcmFnZSIsImNsZWFyIiwiY2xlYXJTdG9yYWdlIiwiZ2V0QWxsS2V5cyIsImdldFN0b3JhZ2VJbmZvIiwia2V5cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFNQTs7Ozs7O2tCQUVlOztBQUViOzs7OztBQUtNQSxTQVBPLG1CQU9DQyxHQVBELEVBT01DLFFBUE4sRUFPZ0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRVQsbUJBQUdDLFVBQUgsQ0FBYyxFQUFFRixRQUFGLEVBQWQsQ0FGUzs7QUFBQTtBQUVyQkcsaUJBRnFCOztBQUd6QixrQkFBSUYsUUFBSixFQUFjQSxTQUFTLElBQVQsRUFBZUUsSUFBSUMsSUFBbkI7QUFIVywrQ0FJbEJELElBQUlDLElBSmM7O0FBQUE7QUFBQTtBQUFBOztBQU16QixrQkFBSUgsUUFBSixFQUFjQTtBQU5XOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUzVCLEdBaEJZOzs7QUFrQmI7Ozs7O0FBS01JLFNBdkJPLG1CQXVCQ0wsR0F2QkQsRUF1Qk1JLElBdkJOLEVBdUJZSCxRQXZCWixFQXVCc0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUV6QixtQkFBR0ssVUFBSCxDQUFjLEVBQUVOLFFBQUYsRUFBT0ksVUFBUCxFQUFkLENBRnlCOztBQUFBO0FBRy9CLGtCQUFJSCxRQUFKLEVBQWNBLFNBQVMsSUFBVDtBQUhpQjtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFLL0Isa0JBQUlBLFFBQUosRUFBY0E7QUFMaUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRbEMsR0EvQlk7OztBQWlDYjs7OztBQUlNTSxZQXJDTyxzQkFxQ0lQLEdBckNKLEVBcUNTQyxRQXJDVCxFQXFDbUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUV0QixtQkFBR08sYUFBSCxDQUFpQixFQUFFUixRQUFGLEVBQWpCLENBRnNCOztBQUFBO0FBRzVCLGtCQUFJQyxRQUFKLEVBQWNBLFNBQVMsSUFBVDtBQUhjO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUs1QixrQkFBSUEsUUFBSixFQUFjQTtBQUxjOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUS9CLEdBN0NZOzs7QUErQ2I7OztBQUdNUSxPQWxETyxpQkFrRERSLFFBbERDLEVBa0RTO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNwQixpQ0FBR1MsWUFBSDtBQUNBLGtCQUFJVCxRQUFKLEVBQWNBLFNBQVMsSUFBVDs7QUFGTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdyQixHQXJEWTs7O0FBdURiOzs7QUFHTVUsWUExRE8sc0JBMERJVixRQTFESixFQTBEYztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFUCxtQkFBR1csY0FBSCxFQUZPOztBQUFBO0FBRW5CVCxpQkFGbUI7O0FBR3ZCLGtCQUFJRixRQUFKLEVBQWNBLFNBQVMsSUFBVCxFQUFlRSxJQUFJVSxJQUFuQjtBQUhTO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUt2QixrQkFBSVosUUFBSixFQUFjQTtBQUxTOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUTFCO0FBbEVZLEMsRUFSZiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IE1haWNob25nIFNvZnR3YXJlIEx0ZC4gMjAxNiBodHRwOi8vbWFpY2hvbmcuaXRcbiAqIEBkYXRlIDIwMTYtMTEtMTlcbiAqIEBhdXRob3IgTGlhbmcgPGxpYW5nQG1haWNob25nLml0PlxuICovXG5cbmltcG9ydCB3eCBmcm9tICdsYWJyYWRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAvKipcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBhc3luYyBnZXRJdGVtKGtleSwgY2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHJlcyA9IGF3YWl0IHd4LmdldFN0b3JhZ2UoeyBrZXkgfSk7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKG51bGwsIHJlcy5kYXRhKTtcbiAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBhc3luYyBzZXRJdGVtKGtleSwgZGF0YSwgY2FsbGJhY2spIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgd3guc2V0U3RvcmFnZSh7IGtleSwgZGF0YSB9KTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sobnVsbCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgYXN5bmMgcmVtb3ZlSXRlbShrZXksIGNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHd4LnJlbW92ZVN0b3JhZ2UoeyBrZXkgfSk7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKG51bGwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBhc3luYyBjbGVhcihjYWxsYmFjaykge1xuICAgIHd4LmNsZWFyU3RvcmFnZSgpO1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sobnVsbCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cbiAgYXN5bmMgZ2V0QWxsS2V5cyhjYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVzID0gYXdhaXQgd3guZ2V0U3RvcmFnZUluZm8oKTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2sobnVsbCwgcmVzLmtleXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==