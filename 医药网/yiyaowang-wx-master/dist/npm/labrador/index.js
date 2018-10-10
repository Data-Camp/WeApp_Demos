"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-09-26
 * @author Liang <liang@maichong.it>
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._createPage = exports.PropTypes = exports.Component = undefined;

var _promise = require('../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

var _propTypes = require('./prop-types.js');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createPage2 = require('./create-page.js');

var _createPage3 = _interopRequireDefault(_createPage2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 特别指定的wx对象中不进行Promise封装的方法
var noPromiseMethods = {
  clearStorage: 1,
  hideToast: 1,
  showNavigationBarLoading: 1,
  hideNavigationBarLoading: 1,
  drawCanvas: 1,
  canvasToTempFilePath: 1,
  hideKeyboard: 1
};

var labrador = {
  // 原始wx对象
  wx: wx,
  // getApp() 优雅的封装
  get app() {
    return getApp();
  },

  // getCurrentPages() 优雅的封装
  get currentPages() {
    return getCurrentPages();
  }
};

if (true) {
  Object.defineProperty(labrador, 'Component', {
    get: function get() {
      console.error('labrador 0.6版本之后废弃了 wx.Component，请使用 ' + '"import wx, { Component, PropsTypes } from \'labrador\'" 代替 ' + '"import wx from \'labrador\'"');
    }
  });
  Object.defineProperty(labrador, 'PropsTypes', {
    get: function get() {
      console.error('labrador 0.6版本之后废弃了 wx.PropsTypes，请使用 ' + '"import wx, { Component, PropsTypes } from \'labrador\'" 代替 ' + '"import wx from \'labrador\'"');
    }
  });
}

(0, _keys2.default)(wx).forEach(function (key) {
  if (noPromiseMethods[key] // 特别指定的方法
  || /^(on|create|stop|pause|close)/.test(key) // 以on* create* stop* pause* close* 开头的方法
  || /\w+Sync$/.test(key) // 以Sync结尾的方法
  ) {
      // 不进行Promise封装
      labrador[key] = function () {
        if (true) {
          var res = wx[key].apply(wx, arguments);
          if (!res) {
            res = {};
          }
          if (res && (typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) === 'object') {
            res.then = function () {
              console.warn('wx.' + key + ' is not a async function, you should not use await ');
            };
          }
          return res;
        }
        return wx[key].apply(wx, arguments);
      };
      return;
    }

  // 其余方法自动Promise化
  labrador[key] = function (obj) {
    obj = obj || {};
    return new _promise2.default(function (resolve, reject) {
      obj.success = resolve;
      obj.fail = function (res) {
        if (res && res.errMsg) {
          reject(new Error(res.errMsg));
        } else {
          reject(res);
        }
      };
      wx[key](obj);
    });
  };
});

exports.default = labrador;
exports.Component = _component2.default;
exports.PropTypes = _propTypes2.default;
exports._createPage = _createPage3.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIm5vUHJvbWlzZU1ldGhvZHMiLCJjbGVhclN0b3JhZ2UiLCJoaWRlVG9hc3QiLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJkcmF3Q2FudmFzIiwiY2FudmFzVG9UZW1wRmlsZVBhdGgiLCJoaWRlS2V5Ym9hcmQiLCJsYWJyYWRvciIsInd4IiwiYXBwIiwiZ2V0QXBwIiwiY3VycmVudFBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwiX19ERVZfXyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiY29uc29sZSIsImVycm9yIiwiZm9yRWFjaCIsImtleSIsInRlc3QiLCJyZXMiLCJhcHBseSIsImFyZ3VtZW50cyIsInRoZW4iLCJ3YXJuIiwib2JqIiwicmVzb2x2ZSIsInJlamVjdCIsInN1Y2Nlc3MiLCJmYWlsIiwiZXJyTXNnIiwiRXJyb3IiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJfY3JlYXRlUGFnZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBLElBQU1BLG1CQUFtQjtBQUN2QkMsZ0JBQWMsQ0FEUztBQUV2QkMsYUFBVyxDQUZZO0FBR3ZCQyw0QkFBMEIsQ0FISDtBQUl2QkMsNEJBQTBCLENBSkg7QUFLdkJDLGNBQVksQ0FMVztBQU12QkMsd0JBQXNCLENBTkM7QUFPdkJDLGdCQUFjO0FBUFMsQ0FBekI7O0FBVUEsSUFBTUMsV0FBVztBQUNmO0FBQ0FDLFFBRmU7QUFHZjtBQUNBLE1BQUlDLEdBQUosR0FBVTtBQUNSLFdBQU9DLFFBQVA7QUFDRCxHQU5jOztBQVFmO0FBQ0EsTUFBSUMsWUFBSixHQUFtQjtBQUNqQixXQUFPQyxpQkFBUDtBQUNEO0FBWGMsQ0FBakI7O0FBY0EsSUFBSUMsT0FBSixFQUFhO0FBQ1hDLFNBQU9DLGNBQVAsQ0FBc0JSLFFBQXRCLEVBQWdDLFdBQWhDLEVBQTZDO0FBQzNDUyxPQUQyQyxpQkFDdEM7QUFDSEMsY0FBUUMsS0FBUixDQUFjLDBDQUNaLDhEQURZLEdBRVosK0JBRkY7QUFHRDtBQUwwQyxHQUE3QztBQU9BSixTQUFPQyxjQUFQLENBQXNCUixRQUF0QixFQUFnQyxZQUFoQyxFQUE4QztBQUM1Q1MsT0FENEMsaUJBQ3ZDO0FBQ0hDLGNBQVFDLEtBQVIsQ0FBYywyQ0FDWiw4REFEWSxHQUVaLCtCQUZGO0FBR0Q7QUFMMkMsR0FBOUM7QUFPRDs7QUFFRCxvQkFBWVYsRUFBWixFQUFnQlcsT0FBaEIsQ0FBd0IsVUFBQ0MsR0FBRCxFQUFTO0FBQy9CLE1BQ0VyQixpQkFBaUJxQixHQUFqQixFQUE2QztBQUE3QyxLQUNHLGdDQUFnQ0MsSUFBaEMsQ0FBcUNELEdBQXJDLENBREgsQ0FDNkM7QUFEN0MsS0FFRyxXQUFXQyxJQUFYLENBQWdCRCxHQUFoQixDQUhMLENBRytDO0FBSC9DLElBSUU7QUFDQTtBQUNBYixlQUFTYSxHQUFULElBQWdCLFlBQVk7QUFDMUIsWUFBSVAsT0FBSixFQUFhO0FBQ1gsY0FBSVMsTUFBTWQsR0FBR1ksR0FBSCxFQUFRRyxLQUFSLENBQWNmLEVBQWQsRUFBa0JnQixTQUFsQixDQUFWO0FBQ0EsY0FBSSxDQUFDRixHQUFMLEVBQVU7QUFDUkEsa0JBQU0sRUFBTjtBQUNEO0FBQ0QsY0FBSUEsT0FBTyxRQUFPQSxHQUFQLHVEQUFPQSxHQUFQLE9BQWUsUUFBMUIsRUFBb0M7QUFDbENBLGdCQUFJRyxJQUFKLEdBQVcsWUFBTTtBQUNmUixzQkFBUVMsSUFBUixDQUFhLFFBQVFOLEdBQVIsR0FBYyxxREFBM0I7QUFDRCxhQUZEO0FBR0Q7QUFDRCxpQkFBT0UsR0FBUDtBQUNEO0FBQ0QsZUFBT2QsR0FBR1ksR0FBSCxFQUFRRyxLQUFSLENBQWNmLEVBQWQsRUFBa0JnQixTQUFsQixDQUFQO0FBQ0QsT0FkRDtBQWVBO0FBQ0Q7O0FBRUQ7QUFDQWpCLFdBQVNhLEdBQVQsSUFBZ0IsVUFBVU8sR0FBVixFQUFlO0FBQzdCQSxVQUFNQSxPQUFPLEVBQWI7QUFDQSxXQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0YsVUFBSUcsT0FBSixHQUFjRixPQUFkO0FBQ0FELFVBQUlJLElBQUosR0FBVyxVQUFDVCxHQUFELEVBQVM7QUFDbEIsWUFBSUEsT0FBT0EsSUFBSVUsTUFBZixFQUF1QjtBQUNyQkgsaUJBQU8sSUFBSUksS0FBSixDQUFVWCxJQUFJVSxNQUFkLENBQVA7QUFDRCxTQUZELE1BRU87QUFDTEgsaUJBQU9QLEdBQVA7QUFDRDtBQUNGLE9BTkQ7QUFPQWQsU0FBR1ksR0FBSCxFQUFRTyxHQUFSO0FBQ0QsS0FWTSxDQUFQO0FBV0QsR0FiRDtBQWNELENBeENEOztrQkEwQ2VwQixRO1FBQ04yQixTO1FBQVdDLFM7UUFBV0MsVyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IE1haWNob25nIFNvZnR3YXJlIEx0ZC4gMjAxNiBodHRwOi8vbWFpY2hvbmcuaXRcbiAqIEBkYXRlIDIwMTYtMDktMjZcbiAqIEBhdXRob3IgTGlhbmcgPGxpYW5nQG1haWNob25nLml0PlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJy4vcHJvcC10eXBlcyc7XG5pbXBvcnQgX2NyZWF0ZVBhZ2UgZnJvbSAnLi9jcmVhdGUtcGFnZSc7XG5cbi8vIOeJueWIq+aMh+WumueahHd45a+56LGh5Lit5LiN6L+b6KGMUHJvbWlzZeWwgeijheeahOaWueazlVxuY29uc3Qgbm9Qcm9taXNlTWV0aG9kcyA9IHtcbiAgY2xlYXJTdG9yYWdlOiAxLFxuICBoaWRlVG9hc3Q6IDEsXG4gIHNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZzogMSxcbiAgaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nOiAxLFxuICBkcmF3Q2FudmFzOiAxLFxuICBjYW52YXNUb1RlbXBGaWxlUGF0aDogMSxcbiAgaGlkZUtleWJvYXJkOiAxLFxufTtcblxuY29uc3QgbGFicmFkb3IgPSB7XG4gIC8vIOWOn+Wni3d45a+56LGhXG4gIHd4LFxuICAvLyBnZXRBcHAoKSDkvJjpm4XnmoTlsIHoo4VcbiAgZ2V0IGFwcCgpIHtcbiAgICByZXR1cm4gZ2V0QXBwKCk7XG4gIH0sXG5cbiAgLy8gZ2V0Q3VycmVudFBhZ2VzKCkg5LyY6ZuF55qE5bCB6KOFXG4gIGdldCBjdXJyZW50UGFnZXMoKSB7XG4gICAgcmV0dXJuIGdldEN1cnJlbnRQYWdlcygpO1xuICB9XG59O1xuXG5pZiAoX19ERVZfXykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobGFicmFkb3IsICdDb21wb25lbnQnLCB7XG4gICAgZ2V0KCl7XG4gICAgICBjb25zb2xlLmVycm9yKCdsYWJyYWRvciAwLjbniYjmnKzkuYvlkI7lup/lvIPkuoYgd3guQ29tcG9uZW5077yM6K+35L2/55SoICcgK1xuICAgICAgICAnXCJpbXBvcnQgd3gsIHsgQ29tcG9uZW50LCBQcm9wc1R5cGVzIH0gZnJvbSBcXCdsYWJyYWRvclxcJ1wiIOS7o+abvyAnICtcbiAgICAgICAgJ1wiaW1wb3J0IHd4IGZyb20gXFwnbGFicmFkb3JcXCdcIicpO1xuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsYWJyYWRvciwgJ1Byb3BzVHlwZXMnLCB7XG4gICAgZ2V0KCl7XG4gICAgICBjb25zb2xlLmVycm9yKCdsYWJyYWRvciAwLjbniYjmnKzkuYvlkI7lup/lvIPkuoYgd3guUHJvcHNUeXBlc++8jOivt+S9v+eUqCAnICtcbiAgICAgICAgJ1wiaW1wb3J0IHd4LCB7IENvbXBvbmVudCwgUHJvcHNUeXBlcyB9IGZyb20gXFwnbGFicmFkb3JcXCdcIiDku6Pmm78gJyArXG4gICAgICAgICdcImltcG9ydCB3eCBmcm9tIFxcJ2xhYnJhZG9yXFwnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuXG5PYmplY3Qua2V5cyh3eCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gIGlmIChcbiAgICBub1Byb21pc2VNZXRob2RzW2tleV0gICAgICAgICAgICAgICAgICAgICAgICAvLyDnibnliKvmjIflrprnmoTmlrnms5VcbiAgICB8fCAvXihvbnxjcmVhdGV8c3RvcHxwYXVzZXxjbG9zZSkvLnRlc3Qoa2V5KSAvLyDku6VvbiogY3JlYXRlKiBzdG9wKiBwYXVzZSogY2xvc2UqIOW8gOWktOeahOaWueazlVxuICAgIHx8IC9cXHcrU3luYyQvLnRlc3Qoa2V5KSAgICAgICAgICAgICAgICAgICAgICAvLyDku6VTeW5j57uT5bC+55qE5pa55rOVXG4gICkge1xuICAgIC8vIOS4jei/m+ihjFByb21pc2XlsIHoo4VcbiAgICBsYWJyYWRvcltrZXldID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgbGV0IHJlcyA9IHd4W2tleV0uYXBwbHkod3gsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgcmVzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiB0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHJlcy50aGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd3eC4nICsga2V5ICsgJyBpcyBub3QgYSBhc3luYyBmdW5jdGlvbiwgeW91IHNob3VsZCBub3QgdXNlIGF3YWl0ICcpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiB3eFtrZXldLmFwcGx5KHd4LCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g5YW25L2Z5pa55rOV6Ieq5YqoUHJvbWlzZeWMllxuICBsYWJyYWRvcltrZXldID0gZnVuY3Rpb24gKG9iaikge1xuICAgIG9iaiA9IG9iaiB8fCB7fTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb2JqLnN1Y2Nlc3MgPSByZXNvbHZlO1xuICAgICAgb2JqLmZhaWwgPSAocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmVyck1zZykge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVzLmVyck1zZykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd3hba2V5XShvYmopO1xuICAgIH0pO1xuICB9O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGxhYnJhZG9yO1xuZXhwb3J0IHsgQ29tcG9uZW50LCBQcm9wVHlwZXMsIF9jcmVhdGVQYWdlIH07XG4iXX0=