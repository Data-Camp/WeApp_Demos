"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-11
 * @author Liang <liang@maichong.it>
 */


// $Flow

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('../babel-runtime/core-js/get-iterator.js');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set2 = require('../lodash/set.js');

var _set3 = _interopRequireDefault(_set2);

var _get2 = require('../lodash/get.js');

var _get3 = _interopRequireDefault(_get2);

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 构建列表数据项
 * @param list   原始列表
 * @param item   新列表
 * @returns {{_: *}}
 */
function buildListItem(list, item) {
  if (list && list.length && item.__k !== undefined) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(list), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var t = _step.value;

        if (t.__k !== undefined && t.__k === item.__k) {
          return (0, _assign2.default)({}, t, item);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return item;
}
// $Flow


module.exports = function createPage(ComponentClass) {
  var config = {};
  var root = void 0;
  var page = void 0;

  config.data = {};
  config.name = '';

  config._dispatch = function (event) {
    var com = root;
    var path = event.currentTarget.dataset.path || '';
    // $Flow
    var handler = event.currentTarget.dataset['bind' + event.type] || event.currentTarget.dataset['catch' + event.type];
    while (path) {
      var index = path.indexOf('.');
      var key = '';
      if (index === -1) {
        key = path;
        path = '';
      } else {
        key = path.substr(0, index);
        path = path.substr(index + 1);
      }
      if (Array.isArray(com)) {
        com = com[parseInt(key)];
      } else {
        com = com._children[key];
      }
      if (!com) {
        console.error('Can not resolve component by path ' + event.currentTarget.dataset.path);
        return undefined;
      }
    }
    if (com[handler]) {
      if (true) {
        // $Flow
        console.log('%c%s %s(%o)', 'color:#2abb40', com.id, handler, event);
      }
      return com[handler](event);
    }
    // $Flow 我们知道com在这里一定是一个组件，而非组件数组，但是Flow不知道
    console.error('Can not resolve event handle ' + com.id + '#' + handler);
    return undefined;
  };

  ['onRouteEnd', 'onUnload', 'onPullDownRefresh', 'onReachBottom'].forEach(function (name) {
    config[name] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      utils.callLifecycle(root, name, args);
    };
  });

  config.onLoad = function (options) {
    page = this;
    page.page = page;
    page._show = false;
    page._ready = false;
    page._loadOptions = options;

    page.updateData = function (newData) {
      // if (true) {
      //   console.log('%c%s updateData(%o)', 'color:#2a8f99', page.__route__, utils.getDebugObject(newData));
      // }
      var data = page.data;

      (0, _keys2.default)(newData).forEach(function (path) {
        var dataMap = newData[path];
        if (Array.isArray(dataMap)) {
          (function () {
            // 如果是组件列表，需要与之前列表数据合并，这样主要为了在子组件嵌套情况下，不丢失底层子组件数据
            var list = (0, _get3.default)(data, path); //原有data中列表数据
            var newList = dataMap.map(function (item) {
              return buildListItem(list, item);
            });
            (0, _set3.default)(data, path, newList);
          })();
        } else {
          (0, _set3.default)(data, path.split('.'), dataMap);
        }
      });

      page.setData(data);
    };

    page.root = root = new ComponentClass({});
    root._config = {};
    root.page = page;

    root.id = page.__route__;
    root.page = page;
    try {
      root._init('');
    } catch (error) {
      console.error(error.stack);
    }
    if (root.onLoad) {
      root.onLoad(options);
    }
  };

  config.onReady = function () {
    page._ready = true;
    utils.callLifecycle(root, 'onReady');
  };

  config.onShow = function () {
    page._show = true;
    utils.callLifecycle(root, 'onShow');
  };

  config.onHide = function () {
    page._show = false;
    utils.callLifecycle(root, 'onHide');
  };

  return config;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1wYWdlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwiYnVpbGRMaXN0SXRlbSIsImxpc3QiLCJpdGVtIiwibGVuZ3RoIiwiX19rIiwidW5kZWZpbmVkIiwidCIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVQYWdlIiwiQ29tcG9uZW50Q2xhc3MiLCJjb25maWciLCJyb290IiwicGFnZSIsImRhdGEiLCJuYW1lIiwiX2Rpc3BhdGNoIiwiZXZlbnQiLCJjb20iLCJwYXRoIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJoYW5kbGVyIiwidHlwZSIsImluZGV4IiwiaW5kZXhPZiIsImtleSIsInN1YnN0ciIsIkFycmF5IiwiaXNBcnJheSIsInBhcnNlSW50IiwiX2NoaWxkcmVuIiwiY29uc29sZSIsImVycm9yIiwiX19ERVZfXyIsImxvZyIsImlkIiwiZm9yRWFjaCIsImFyZ3MiLCJjYWxsTGlmZWN5Y2xlIiwib25Mb2FkIiwib3B0aW9ucyIsIl9zaG93IiwiX3JlYWR5IiwiX2xvYWRPcHRpb25zIiwidXBkYXRlRGF0YSIsIm5ld0RhdGEiLCJkYXRhTWFwIiwibmV3TGlzdCIsIm1hcCIsInNwbGl0Iiwic2V0RGF0YSIsIl9jb25maWciLCJfX3JvdXRlX18iLCJfaW5pdCIsInN0YWNrIiwib25SZWFkeSIsIm9uU2hvdyIsIm9uSGlkZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQVFBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxLOzs7Ozs7QUFFWjs7Ozs7O0FBTUEsU0FBU0MsYUFBVCxDQUF1QkMsSUFBdkIsRUFBOENDLElBQTlDLEVBQXdFO0FBQ3RFLE1BQUlELFFBQVFBLEtBQUtFLE1BQWIsSUFBdUJELEtBQUtFLEdBQUwsS0FBYUMsU0FBeEMsRUFBbUQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDakQsc0RBQWNKLElBQWQsNEdBQW9CO0FBQUEsWUFBWEssQ0FBVzs7QUFDbEIsWUFBSUEs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O0FBQ0QsS0FGRCxDQUVFLE9BQU9yQixLQUFQLEVBQWM7QUFDZEQsY0FBUUMsS0FBUixDQUFjQSxNQUFNc0IsS0FBcEI7QUFDRDtBQUNELFFBQUkzQyxLQUFLNEIsTUFBVCxFQUFpQjtBQUNmNUIsV0FBSzRCLE1BQUwsQ0FBWUMsT0FBWjtBQUNEO0FBQ0YsR0ExQ0Q7O0FBNENBOUIsU0FBTzZDLE9BQVAsR0FBaUIsWUFBWTtBQUMzQjNDLFNBQUs4QixNQUFMLEdBQWMsSUFBZDtBQUNBNUMsVUFBTXdDLGFBQU4sQ0FBb0IzQixJQUFwQixFQUEwQixTQUExQjtBQUNELEdBSEQ7O0FBS0FELFNBQU84QyxNQUFQLEdBQWdCLFlBQVk7QUFDMUI1QyxTQUFLNkIsS0FBTCxHQUFhLElBQWI7QUFDQTNDLFVBQU13QyxhQUFOLENBQW9CM0IsSUFBcEIsRUFBMEIsUUFBMUI7QUFDRCxHQUhEOztBQUtBRCxTQUFPK0MsTUFBUCxHQUFnQixZQUFZO0FBQzFCN0MsU0FBSzZCLEtBQUwsR0FBYSxLQUFiO0FBQ0EzQyxVQUFNd0MsYUFBTixDQUFvQjNCLElBQXBCLEVBQTBCLFFBQTFCO0FBQ0QsR0FIRDs7QUFLQSxTQUFPRCxNQUFQO0FBQ0QsQ0EvR0QiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTEwLTExXG4gKiBAYXV0aG9yIExpYW5nIDxsaWFuZ0BtYWljaG9uZy5pdD5cbiAqL1xuXG4vLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vICRGbG93XG5pbXBvcnQgX3NldCBmcm9tICdsb2Rhc2gvc2V0Jztcbi8vICRGbG93XG5pbXBvcnQgX2dldCBmcm9tICdsb2Rhc2gvZ2V0JztcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICog5p6E5bu65YiX6KGo5pWw5o2u6aG5XG4gKiBAcGFyYW0gbGlzdCAgIOWOn+Wni+WIl+ihqFxuICogQHBhcmFtIGl0ZW0gICDmlrDliJfooahcbiAqIEByZXR1cm5zIHt7XzogKn19XG4gKi9cbmZ1bmN0aW9uIGJ1aWxkTGlzdEl0ZW0obGlzdDogQXJyYXk8JERhdGFNYXA+LCBpdGVtOiAkRGF0YU1hcCk6ICREYXRhTWFwIHtcbiAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGggJiYgaXRlbS5fX2sgIT09IHVuZGVmaW5lZCkge1xuICAgIGZvciAobGV0IHQgb2YgbGlzdCkge1xuICAgICAgaWYgKHQuX19rICE9PSB1bmRlZmluZWQgJiYgdC5fX2sgPT09IGl0ZW0uX19rKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0LCBpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGl0ZW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlUGFnZShDb21wb25lbnRDbGFzczogQ2xhc3M8Q29tcG9uZW50Pikge1xuICBsZXQgY29uZmlnID0ge307XG4gIGxldCByb290OiBDb21wb25lbnQ7XG4gIGxldCBwYWdlOiAkUGFnZTtcblxuICBjb25maWcuZGF0YSA9IHt9O1xuICBjb25maWcubmFtZSA9ICcnO1xuXG4gIGNvbmZpZy5fZGlzcGF0Y2ggPSBmdW5jdGlvbiAoZXZlbnQ6ICRFdmVudCk6ID9zdHJpbmcge1xuICAgIGxldCBjb206ICRDaGlsZCA9IHJvb3Q7XG4gICAgbGV0IHBhdGggPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucGF0aCB8fCAnJztcbiAgICAvLyAkRmxvd1xuICAgIGxldCBoYW5kbGVyID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0WydiaW5kJyArIGV2ZW50LnR5cGVdIHx8IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldFsnY2F0Y2gnICsgZXZlbnQudHlwZV07XG4gICAgd2hpbGUgKHBhdGgpIHtcbiAgICAgIGxldCBpbmRleCA9IHBhdGguaW5kZXhPZignLicpO1xuICAgICAgbGV0IGtleSA9ICcnO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBrZXkgPSBwYXRoO1xuICAgICAgICBwYXRoID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBrZXkgPSBwYXRoLnN1YnN0cigwLCBpbmRleCk7XG4gICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cihpbmRleCArIDEpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tKSkge1xuICAgICAgICBjb20gPSBjb21bcGFyc2VJbnQoa2V5KV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb20gPSBjb20uX2NoaWxkcmVuW2tleV07XG4gICAgICB9XG4gICAgICBpZiAoIWNvbSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYW4gbm90IHJlc29sdmUgY29tcG9uZW50IGJ5IHBhdGggJyArIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5wYXRoKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbVtoYW5kbGVyXSkge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgLy8gJEZsb3dcbiAgICAgICAgY29uc29sZS5sb2coJyVjJXMgJXMoJW8pJywgJ2NvbG9yOiMyYWJiNDAnLCBjb20uaWQsIGhhbmRsZXIsIGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb21baGFuZGxlcl0oZXZlbnQpO1xuICAgIH1cbiAgICAvLyAkRmxvdyDmiJHku6znn6XpgZNjb23lnKjov5nph4zkuIDlrprmmK/kuIDkuKrnu4Tku7bvvIzogIzpnZ7nu4Tku7bmlbDnu4TvvIzkvYbmmK9GbG935LiN55+l6YGTXG4gICAgY29uc29sZS5lcnJvcignQ2FuIG5vdCByZXNvbHZlIGV2ZW50IGhhbmRsZSAnICsgY29tLmlkICsgJyMnICsgaGFuZGxlcik7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICBbJ29uUm91dGVFbmQnLCAnb25VbmxvYWQnLCAnb25QdWxsRG93blJlZnJlc2gnLCAnb25SZWFjaEJvdHRvbSddLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBjb25maWdbbmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgdXRpbHMuY2FsbExpZmVjeWNsZShyb290LCBuYW1lLCBhcmdzKTtcbiAgICB9O1xuICB9KTtcblxuICBjb25maWcub25Mb2FkID0gZnVuY3Rpb24gKG9wdGlvbnM6IE9iamVjdCkge1xuICAgIHBhZ2UgPSB0aGlzO1xuICAgIHBhZ2UucGFnZSA9IHBhZ2U7XG4gICAgcGFnZS5fc2hvdyA9IGZhbHNlO1xuICAgIHBhZ2UuX3JlYWR5ID0gZmFsc2U7XG4gICAgcGFnZS5fbG9hZE9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgcGFnZS51cGRhdGVEYXRhID0gZnVuY3Rpb24gKG5ld0RhdGE6IE9iamVjdCkge1xuICAgICAgLy8gaWYgKF9fREVWX18pIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJyVjJXMgdXBkYXRlRGF0YSglbyknLCAnY29sb3I6IzJhOGY5OScsIHBhZ2UuX19yb3V0ZV9fLCB1dGlscy5nZXREZWJ1Z09iamVjdChuZXdEYXRhKSk7XG4gICAgICAvLyB9XG4gICAgICBsZXQgZGF0YSA9IHBhZ2UuZGF0YTtcblxuICAgICAgT2JqZWN0LmtleXMobmV3RGF0YSkuZm9yRWFjaCgocGF0aCkgPT4ge1xuICAgICAgICBsZXQgZGF0YU1hcCA9IG5ld0RhdGFbcGF0aF07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFNYXApKSB7XG4gICAgICAgICAgLy8g5aaC5p6c5piv57uE5Lu25YiX6KGo77yM6ZyA6KaB5LiO5LmL5YmN5YiX6KGo5pWw5o2u5ZCI5bm277yM6L+Z5qC35Li76KaB5Li65LqG5Zyo5a2Q57uE5Lu25bWM5aWX5oOF5Ya15LiL77yM5LiN5Lii5aSx5bqV5bGC5a2Q57uE5Lu25pWw5o2uXG4gICAgICAgICAgbGV0IGxpc3QgPSBfZ2V0KGRhdGEsIHBhdGgpOyAvL+WOn+aciWRhdGHkuK3liJfooajmlbDmja5cbiAgICAgICAgICBsZXQgbmV3TGlzdCA9IGRhdGFNYXAubWFwKChpdGVtKSA9PiBidWlsZExpc3RJdGVtKGxpc3QsIGl0ZW0pKTtcbiAgICAgICAgICBfc2V0KGRhdGEsIHBhdGgsIG5ld0xpc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9zZXQoZGF0YSwgcGF0aC5zcGxpdCgnLicpLCBkYXRhTWFwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHBhZ2Uuc2V0RGF0YShkYXRhKTtcbiAgICB9O1xuXG4gICAgcGFnZS5yb290ID0gcm9vdCA9IG5ldyBDb21wb25lbnRDbGFzcyh7fSk7XG4gICAgcm9vdC5fY29uZmlnID0ge307XG4gICAgcm9vdC5wYWdlID0gcGFnZTtcblxuICAgIHJvb3QuaWQgPSBwYWdlLl9fcm91dGVfXztcbiAgICByb290LnBhZ2UgPSBwYWdlO1xuICAgIHRyeSB7XG4gICAgICByb290Ll9pbml0KCcnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvci5zdGFjayk7XG4gICAgfVxuICAgIGlmIChyb290Lm9uTG9hZCkge1xuICAgICAgcm9vdC5vbkxvYWQob3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbmZpZy5vblJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHBhZ2UuX3JlYWR5ID0gdHJ1ZTtcbiAgICB1dGlscy5jYWxsTGlmZWN5Y2xlKHJvb3QsICdvblJlYWR5Jyk7XG4gIH07XG5cbiAgY29uZmlnLm9uU2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBwYWdlLl9zaG93ID0gdHJ1ZTtcbiAgICB1dGlscy5jYWxsTGlmZWN5Y2xlKHJvb3QsICdvblNob3cnKTtcbiAgfTtcblxuICBjb25maWcub25IaWRlID0gZnVuY3Rpb24gKCkge1xuICAgIHBhZ2UuX3Nob3cgPSBmYWxzZTtcbiAgICB1dGlscy5jYWxsTGlmZWN5Y2xlKHJvb3QsICdvbkhpZGUnKTtcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcbiJdfQ==