"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-08
 * @author Liang <liang@maichong.it>
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('../babel-runtime/helpers/defineProperty.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('../babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _deepEqual = require('../deep-equal/index.js');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Labrador组件基类
 * @class Component
 */
var Component = function () {

  /**
   * @param {object} [props] 组件props初始数据
   */

  // setState变更列表

  // setState计时器

  // 父组件

  // 组件props

  // 组件key，不等同于_listKey


  // 组件ID

  // children() 方法返回的子控件配置缓存

  // 当前组件在列表中的唯一key，即children()方法返回的配置项key属性，如果为undefined代表当前组件不在列表中


  // 组件是否已经初始化

  // 默认props
  function Component(props) {
    (0, _classCallCheck3.default)(this, Component);

    this.props = (0, _assign2.default)({}, this.constructor.defaultProps, props);
    this._setStateQueue = [];
    this._setStateCallbacks = [];
  }

  /**
   * 设置模板数据
   * @param {object|function} nextState
   * @param {function} [callback]
   */

  // 延迟更新计时器

  // setState回调函数队列

  // 组件所属page对象

  // 组件内部state

  // 组件路径

  // 组件key，

  // 组件实例化时的参数

  // 当前组件的所有子组件KV对

  // 当前组件在列表中的索引，如果为undefined代表当前组件不在列表中

  // 组件props类型定义，必须为static


  (0, _createClass3.default)(Component, [{
    key: 'setState',
    value: function setState(nextState, callback) {
      var _this = this;

      if (true) {
        if (typeof nextState === 'string') {
          console.error(this.id + '#setState() 第一个参数不能为字符串');
        }
      }
      if (!this._inited) {
        console.error(this.id + ' 组件未自动初始化之前请勿调用setState()，如果在组件构造函数中请直接使用"this.state={}"赋值语法');
      }
      this._setStateQueue.push(nextState);
      if (callback) {
        this._setStateCallbacks.push(callback);
      }

      if (this._setStateTimer) return;

      this._setStateTimer = setTimeout(function () {
        _this._setStateTimer = 0;
        var state = _this.state;
        var stateChanged = false;
        _this._setStateQueue.forEach(function (item) {
          if (typeof item === 'function') {
            item = item(state, _this.props);
          }
          if (!utils.shouldUpdate(state, item)) {
            // 如果没有发生变化，则忽略更新，优化性能
            if (true) {
              console.log('%c%s setState(%o) ignored', 'color:#fcc', _this.id, utils.getDebugObject(item));
            }
            return;
          }

          stateChanged = true;

          if (true) {
            // Development 环境打印state变化
            var original = utils.getDebugObject(state);
            var append = utils.getDebugObject(item);
            state = (0, _assign2.default)({}, state, item);
            console.log('%c%s setState(%o) : %o -> %o Component:%o', 'color:#2a8f99', _this.id, append, original, utils.getDebugObject(state), _this);
          } else {
            state = (0, _assign2.default)({}, state, item);
          }
        });

        _this.state = state;
        _this._setStateQueue = [];
        _this._setStateCallbacks.forEach(function (fn) {
          return fn();
        });
        _this._setStateCallbacks = [];

        if (!stateChanged) return;

        _this._update();
      });
    }

    /**
     * 初始化组件
     * @private
     * @param {string} key         组件key
     * @param {Component} [parent] 父组件
     * @param {number} [listIndex] 组件在列表中的index
     * @param {number} [listKey]   组件在列表中的key定义
     */

  }, {
    key: '_init',
    value: function _init(key, parent, listIndex, listKey) {
      if (this._inited) return;
      this._setKey(key, parent, listIndex, listKey);
      if (true) {
        if (this.data) {
          console.error(this.id + ' Component data属性和 setData方法已经废弃,请使用state 和 setState代替');
        }
        console.log('%c%s init %o', 'color:#9a23cc', this.id, this);
      }
      // console.log(this.path + '#init', this);
      if (!this.state) {
        this.state = {};
      }
      this._children = {};

      if (true) {
        this._checkProps();
      }

      if (key && this.onLoad) {
        if (true) {
          console.log('%c%s onLoad()', 'color:#9a23cc', this.id);
        }
        this.onLoad(this.page._loadOptions);
      }

      if (key && this.page._ready) {
        // 如果 key 不为空，则代表当前组件不是页面根组件
        // 如果 page._ready 则代表页面已经ready，说明当前组件是页面ready后才动态生成的
        utils.callLifecycle(this, 'onReady');
      }

      if (key && this.page._show) {
        utils.callLifecycle(this, 'onShow');
      }

      // 更新页面数据
      this._inited = true;
      this._update();
    }

    /**
     * 初始化时，更新组件的key、id、path等属性
     * @param {string} key         组件key
     * @param {Component} [parent] 父组件
     * @param {number} [listIndex] 组件在列表中的index
     * @param {number} [listKey]   组件在列表中的key定义
     * @private
     */

  }, {
    key: '_setKey',
    value: function _setKey(key, parent, listIndex, listKey) {
      this.key = key;
      this._listIndex = listIndex;
      this._listKey = listKey;
      if (parent) {
        this.page = parent.page;
        this.id = parent.id + ':' + key;
      }
      this.parent = parent;
      if (key && parent && parent.path) {
        this.path = parent.path + '.' + key;
      } else {
        this.path = key;
      }
      if (typeof listIndex === 'number') {
        this.path += '.' + listIndex;
        this.id += '.' + listIndex;
      }
      this.name = this.constructor.name || this.path;
      if (true && (key === 'props' || key === 'state')) {
        // $Flow 我们知道parent一定存在，但是Flow不知道
        console.error(parent.id + ' \u7684\u5B50\u7EC4\u4EF6\'' + this.name + '\'\u7684\'key\'\u4E0D\u80FD\u8BBE\u7F6E\u4E3A\'props\'\u6216\'state\'\uFF0C\u8BF7\u4FEE\u6539 ' + parent.id + '#children() \u65B9\u6CD5\u7684\u8FD4\u56DE\u503C');
      }
    }

    /**
     * 更新组件
     * @private
     */

  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      if (this._updateTimer) return;
      this._updateTimer = setTimeout(function () {
        _this2._updateTimer = 0;

        // 内部state数据更新后，自动更新页面数据

        var path = _this2.path ? _this2.path + '.' : '';
        var newData = {};
        newData[path + 'props'] = _this2.props;
        newData[path + 'state'] = _this2.state;
        _this2.page.updateData(newData);

        // 更新子组件列表
        _this2._updateChildren();
      });
    }

    /**
     * Development环境下检查propsTypes属性设置
     * @private
     */

  }, {
    key: '_checkProps',
    value: function _checkProps() {
      var _this3 = this;

      if (true && this.propsTypes) {
        console.warn('组件"' + this.name + '"的"propsTypes"属性应该为静态static');
      }

      if (true && this.constructor.propTypes) {
        (0, _keys2.default)(this.constructor.propTypes).forEach(function (propName) {
          var validator = _this3.constructor.propTypes[propName];
          if (typeof validator !== 'function') {
            console.warn('组件"' + _this3.name + '"的"' + propName + '"属性类型检测器不是一个有效函数');
            return;
          }
          var error = validator(_this3.props, propName, _this3.name);
          if (error) {
            console.warn(error.message);
          }
        });
      }
    }

    /**
     * 更新所有子控件，负责实例化子控件以及更新其props
     * 调用组件的children()方法获取子组件列表，如果对应的子组件存在则调用子组件onUpdate更新props，否者自动创建子组件
     * @private
     */

  }, {
    key: '_updateChildren',
    value: function _updateChildren() {
      var _this4 = this;

      var children = this._children || {};
      var configs = this.children && this.children();
      // 性能优化，当children返回的配置发生变化后才真正更新子控件
      if (!(0, _deepEqual2.default)(configs, this._childrenConfigs)) {
        if (true) {
          console.log('%c%s %s -> %o', 'color:#9a23cc', this.id, 'children()', configs);
        }
        // 遍历子组件配置列表
        (0, _keys2.default)(configs).forEach(function (key) {
          var config = configs[key];
          if (Array.isArray(config)) {
            (function () {
              // 如果子组件是一个列表

              var map = {}; // 依据列表中每个子组件key生成的原来组件映射
              var used = []; // 存放已知的子组件key，用来检测多个子组件是否重复使用同一个key
              var list = children[key];
              if (list && Array.isArray(list)) {
                list.forEach(function (item) {
                  var _listKey = item._listKey;
                  if (_listKey || _listKey === 0) {
                    map[_listKey] = item;
                  }
                });
              }
              list = [];
              config.forEach(function (c, listIndex) {
                if (true && c.key === undefined) {
                  console.warn('"' + _this4.name + '"\u7684\u5B50\u7EC4\u4EF6"' + key + '"\u5217\u8868\u9879\u5FC5\u987B\u5305\u542B"key"\u5C5E\u6027\u5B9A\u4E49');
                }
                var com = void 0;
                var childKey = c.key !== null && c.key !== undefined ? String(c.key) : '';
                if (childKey && map.hasOwnProperty(childKey)) {
                  if (used.indexOf(childKey) === -1) {
                    com = map[childKey];
                    delete map[childKey];
                  } else if (true) {
                    console.warn('"' + _this4.name + '"\u7684\u5B50\u7EC4\u4EF6"' + key + '"\u5217\u8868\u9879\u5FC5\u987B"key"\u5C5E\u6027\u5B9A\u4E49\u53D1\u73B0\u91CD\u590D\u503C\uFF1A"' + childKey + '"');
                  }
                  used.push(childKey);
                }
                list.push(_this4._updateChild(key, com, c, listIndex));
              });

              // 销毁没有用处的子组件
              (0, _keys2.default)(map).forEach(function (k) {
                utils.callLifecycle(map[k], 'onUnload');
              });
              children[key] = list;
              // 子组件列表更新后，统一更新列表对应的页面数据
              var newData = [];
              list.forEach(function (com) {
                newData.push({
                  props: com.props,
                  state: com.state,
                  __k: com._listKey
                });
              });
              var path = _this4.path ? _this4.path + '.' + key : key;
              _this4.page.updateData((0, _defineProperty3.default)({}, path, newData));
            })();
          } else {
            // 子组件是单个组件，不是列表
            var component = children[key]; // 原来的组件
            children[key] = _this4._updateChild(key, component, config);
            if (component) {
              // 如果子组件原来就存在，则更后自动更新页面数据
              var _newData = {};
              _newData[component.path + '.props'] = component.props;
              _newData[component.path + '.state'] = component.state;
              _this4.page.updateData(_newData);
            }
          }
        });
      }
      this._childrenConfigs = configs;
      this._children = children;
      return children;
    }

    /**
     * 更新单个子组件
     * @param {string} key 组件key
     * @param {Component} component
     * @param {Object} config
     * @param {number} listIndex
     * @returns {Component}
     * @private
     */

  }, {
    key: '_updateChild',
    value: function _updateChild(key, component, config, listIndex) {
      if (component) {
        // 找到了原有实例，更新props
        component._setKey(key, this, listIndex, config.key);
        if (config.props && utils.shouldUpdate(component.props, config.props)) {
          var nextProps = void 0;
          if (component.props && component.props.merge && component.props.asMutable) {
            // 如果 props.merge 存在，则代表props是一个Immutable对象
            nextProps = component.props.merge(config.props);
          } else {
            nextProps = (0, _assign2.default)({}, component.props, config.props);
          }
          if (component.onUpdate) {
            if (true) {
              // Development
              var original = utils.getDebugObject(component.props);
              component.onUpdate(nextProps);
              console.log('%c%s onUpdate(%o) -> %o Component:%o', 'color:#2a8f99', this.id, original, utils.getDebugObject(component.props), component);
            } else {
              component.onUpdate(nextProps);
            }
          }
          component.props = nextProps;
          component._update();
        }
      } else {
        // 没有找到原有实例，实例化一个新的
        var ComponentClass = config.component;
        component = new ComponentClass(config.props);
        component._config = config;
        component._init(key, this, listIndex, config.key);
      }
      return component;
    }
  }]);
  return Component;
}();

exports.default = Component;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsIkNvbXBvbmVudCIsInByb3BzIiwiY29uc3RydWN0b3IiLCJkZWZhdWx0UHJvcHMiLCJfc2V0U3RhdGVRdWV1ZSIsIl9zZXRTdGF0ZUNhbGxiYWNrcyIsIm5leHRTdGF0ZSIsImNhbGxiYWNrIiwiX19ERVZfXyIsImNvbnNvbGUiLCJlcnJvciIsImlkIiwiX2luaXRlZCIsInB1c2giLCJfc2V0U3RhdGVUaW1lciIsInNldFRpbWVvdXQiLCJzdGF0ZSIsInN0YXRlQ2hhbmdlZCIsImZvckVhY2giLCJpdGVtIiwic2hvdWxkVXBkYXRlIiwibG9nIiwiZ2V0RGVidWdPYmplY3QiLCJvcmlnaW5hbCIsImFwcGVuZCIsImZuIiwiX3VwZGF0ZSIsImtleSIsInBhcmVudCIsImxpc3RJbmRleCIsImxpc3RLZXkiLCJfc2V0S2V5IiwiZGF0YSIsIl9jaGlsZHJlbiIsIl9jaGVja1Byb3BzIiwib25Mb2FkIiwicGFnZSIsIl9sb2FkT3B0aW9ucyIsIl9yZWFkeSIsImNhbGxMaWZlY3ljbGUiLCJfc2hvdyIsIl9saXN0SW5kZXgiLCJfbGlzdEtleSIsInBhdGgiLCJuYW1lIiwiX3VwZGF0ZVRpbWVyIiwibmV3RGF0YSIsInVwZGF0ZURhdGEiLCJfdXBkYXRlQ2hpbGRyZW4iLCJwcm9wc1R5cGVzIiwid2FybiIsInByb3BUeXBlcyIsInByb3BOYW1lIiwidmFsaWRhdG9yIiwibWVzc2FnZSIsImNoaWxkcmVuIiwiY29uZmlncyIsIl9jaGlsZHJlbkNvbmZpZ3MiLCJjb25maWciLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJ1c2VkIiwibGlzdCIsImMiLCJ1bmRlZmluZWQiLCJjb20iLCJjaGlsZEtleSIsIlN0cmluZyIsImhhc093blByb3BlcnR5IiwiaW5kZXhPZiIsIl91cGRhdGVDaGlsZCIsImsiLCJfX2siLCJjb21wb25lbnQiLCJuZXh0UHJvcHMiLCJtZXJnZSIsImFzTXV0YWJsZSIsIm9uVXBkYXRlIiwi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QjtBQUNBZ0Isa0JBQVVPLEtBQVYsQ0FBZ0J0RCxHQUFoQixFQUFxQixJQUFyQixFQUEyQkUsU0FBM0IsRUFBc0M2QixPQUFPL0IsR0FBN0M7QUFDRDtBQUNELGFBQU8rQyxTQUFQO0FBQ0Q7Ozs7O2tCQXpZa0IxRSxTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgTWFpY2hvbmcgU29mdHdhcmUgTHRkLiAyMDE2IGh0dHA6Ly9tYWljaG9uZy5pdFxuICogQGRhdGUgMjAxNi0xMC0wOFxuICogQGF1dGhvciBMaWFuZyA8bGlhbmdAbWFpY2hvbmcuaXQ+XG4gKi9cblxuLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGVlcEVxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogTGFicmFkb3Lnu4Tku7bln7rnsbtcbiAqIEBjbGFzcyBDb21wb25lbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcbiAgLy8g6buY6K6kcHJvcHNcbiAgc3RhdGljIGRlZmF1bHRQcm9wczogJERhdGFNYXA7XG4gIC8vIOe7hOS7tnByb3Bz57G75Z6L5a6a5LmJ77yM5b+F6aG75Li6c3RhdGljXG4gIHN0YXRpYyBwcm9wVHlwZXM6IHtba2V5OiBzdHJpbmddOiRQcm9wVmFsaWRhdG9yfTtcblxuICAvLyDnu4Tku7bmmK/lkKblt7Lnu4/liJ3lp4vljJZcbiAgX2luaXRlZDogYm9vbGVhbjtcbiAgLy8g5b2T5YmN57uE5Lu25Zyo5YiX6KGo5Lit55qE57Si5byV77yM5aaC5p6c5Li6dW5kZWZpbmVk5Luj6KGo5b2T5YmN57uE5Lu25LiN5Zyo5YiX6KGo5LitXG4gIF9saXN0SW5kZXg6IG51bWJlciB8IHZvaWQ7XG4gIC8vIOW9k+WJjee7hOS7tuWcqOWIl+ihqOS4reeahOWUr+S4gGtlee+8jOWNs2NoaWxkcmVuKCnmlrnms5Xov5Tlm57nmoTphY3nva7poblrZXnlsZ7mgKfvvIzlpoLmnpzkuLp1bmRlZmluZWTku6PooajlvZPliY3nu4Tku7bkuI3lnKjliJfooajkuK1cbiAgX2xpc3RLZXk6IHN0cmluZ3wgbnVtYmVyIHwgdm9pZDtcbiAgLy8g5b2T5YmN57uE5Lu255qE5omA5pyJ5a2Q57uE5Lu2S1blr7lcbiAgX2NoaWxkcmVuOiAkQ2hpbGRyZW47XG4gIC8vIGNoaWxkcmVuKCkg5pa55rOV6L+U5Zue55qE5a2Q5o6n5Lu26YWN572u57yT5a2YXG4gIF9jaGlsZHJlbkNvbmZpZ3M6ICRDaGlsZHJlbkNvbmZpZztcbiAgLy8g57uE5Lu25a6e5L6L5YyW5pe255qE5Y+C5pWwXG4gIF9jb25maWc6IHt9O1xuXG4gIC8vIOe7hOS7tklEXG4gIGlkOiBzdHJpbmc7XG4gIC8vIOe7hOS7tmtlee+8jFxuICBrZXk6IHN0cmluZztcbiAgLy8g57uE5Lu2a2V577yM5LiN562J5ZCM5LqOX2xpc3RLZXlcbiAgbmFtZTogc3RyaW5nO1xuICAvLyDnu4Tku7bot6/lvoRcbiAgcGF0aDogc3RyaW5nO1xuICAvLyDnu4Tku7Zwcm9wc1xuICBwcm9wczogJERhdGFNYXA7XG4gIC8vIOe7hOS7tuWGhemDqHN0YXRlXG4gIHN0YXRlOiAkRGF0YU1hcDtcbiAgLy8g54i257uE5Lu2XG4gIHBhcmVudDogQ29tcG9uZW50IHwgdm9pZDtcbiAgLy8g57uE5Lu25omA5bGecGFnZeWvueixoVxuICBwYWdlOiAkUGFnZTtcbiAgLy8gc2V0U3RhdGXorqHml7blmahcbiAgX3NldFN0YXRlVGltZXI6IG51bWJlcjtcbiAgLy8gc2V0U3RhdGXlm57osIPlh73mlbDpmJ/liJdcbiAgX3NldFN0YXRlQ2FsbGJhY2tzOiBBcnJheTxGdW5jdGlvbj47XG4gIC8vIHNldFN0YXRl5Y+Y5pu05YiX6KGoXG4gIF9zZXRTdGF0ZVF1ZXVlOiBBcnJheTwkRGF0YU1hcD47XG4gIC8vIOW7tui/n+abtOaWsOiuoeaXtuWZqFxuICBfdXBkYXRlVGltZXI6IG51bWJlcjtcblxuICBvbkxvYWQ6IEZ1bmN0aW9uO1xuICBvblJlYWR5OiBGdW5jdGlvbjtcbiAgb25TaG93OiBGdW5jdGlvbjtcbiAgb25IaWRlOiBGdW5jdGlvbjtcbiAgb25VbmxvYWQ6IEZ1bmN0aW9uO1xuICBvblB1bGxEb3duUmVmcmVhc2g6IEZ1bmN0aW9uO1xuICBvblVwZGF0ZTogRnVuY3Rpb247XG4gIGNoaWxkcmVuOiBGdW5jdGlvbjtcblxuICAvKipcbiAgICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc10g57uE5Lu2cHJvcHPliJ3lp4vmlbDmja5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3BzPzogJERhdGFNYXApIHtcbiAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMsIHByb3BzKTtcbiAgICB0aGlzLl9zZXRTdGF0ZVF1ZXVlID0gW107XG4gICAgdGhpcy5fc2V0U3RhdGVDYWxsYmFja3MgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7mqKHmnb/mlbDmja5cbiAgICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gICAqL1xuICBzZXRTdGF0ZShuZXh0U3RhdGU6ICREYXRhTWFwLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuaWQgKyAnI3NldFN0YXRlKCkg56ys5LiA5Liq5Y+C5pWw5LiN6IO95Li65a2X56ym5LiyJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5faW5pdGVkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKHRoaXMuaWQgKyAnIOe7hOS7tuacquiHquWKqOWIneWni+WMluS5i+WJjeivt+WLv+iwg+eUqHNldFN0YXRlKCnvvIzlpoLmnpzlnKjnu4Tku7bmnoTpgKDlh73mlbDkuK3or7fnm7TmjqXkvb/nlKhcInRoaXMuc3RhdGU9e31cIui1i+WAvOivreazlScpO1xuICAgIH1cbiAgICB0aGlzLl9zZXRTdGF0ZVF1ZXVlLnB1c2gobmV4dFN0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3NldFN0YXRlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zZXRTdGF0ZVRpbWVyKSByZXR1cm47XG5cbiAgICB0aGlzLl9zZXRTdGF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9zZXRTdGF0ZVRpbWVyID0gMDtcbiAgICAgIGxldCBzdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICBsZXQgc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICB0aGlzLl9zZXRTdGF0ZVF1ZXVlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaXRlbSA9IGl0ZW0oc3RhdGUsIHRoaXMucHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXRpbHMuc2hvdWxkVXBkYXRlKHN0YXRlLCBpdGVtKSkge1xuICAgICAgICAgIC8vIOWmguaenOayoeacieWPkeeUn+WPmOWMlu+8jOWImeW/veeVpeabtOaWsO+8jOS8mOWMluaAp+iDvVxuICAgICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJWMlcyBzZXRTdGF0ZSglbykgaWdub3JlZCcsXG4gICAgICAgICAgICAgICdjb2xvcjojZmNjJyxcbiAgICAgICAgICAgICAgdGhpcy5pZCxcbiAgICAgICAgICAgICAgdXRpbHMuZ2V0RGVidWdPYmplY3QoaXRlbSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICAvLyBEZXZlbG9wbWVudCDnjq/looPmiZPljbBzdGF0ZeWPmOWMllxuICAgICAgICAgIGxldCBvcmlnaW5hbCA9IHV0aWxzLmdldERlYnVnT2JqZWN0KHN0YXRlKTtcbiAgICAgICAgICBsZXQgYXBwZW5kID0gdXRpbHMuZ2V0RGVidWdPYmplY3QoaXRlbSk7XG4gICAgICAgICAgc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgaXRlbSk7XG4gICAgICAgICAgY29uc29sZS5sb2coJyVjJXMgc2V0U3RhdGUoJW8pIDogJW8gLT4gJW8gQ29tcG9uZW50OiVvJyxcbiAgICAgICAgICAgICdjb2xvcjojMmE4Zjk5JyxcbiAgICAgICAgICAgIHRoaXMuaWQsIGFwcGVuZCwgb3JpZ2luYWwsXG4gICAgICAgICAgICB1dGlscy5nZXREZWJ1Z09iamVjdChzdGF0ZSksXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIHRoaXMuX3NldFN0YXRlUXVldWUgPSBbXTtcbiAgICAgIHRoaXMuX3NldFN0YXRlQ2FsbGJhY2tzLmZvckVhY2goKGZuKSA9PiBmbigpKTtcbiAgICAgIHRoaXMuX3NldFN0YXRlQ2FsbGJhY2tzID0gW107XG5cbiAgICAgIGlmICghc3RhdGVDaGFuZ2VkKSByZXR1cm47XG5cbiAgICAgIHRoaXMuX3VwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMlue7hOS7tlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5ICAgICAgICAg57uE5Lu2a2V5XG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbcGFyZW50XSDniLbnu4Tku7ZcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaXN0SW5kZXhdIOe7hOS7tuWcqOWIl+ihqOS4reeahGluZGV4XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlzdEtleV0gICDnu4Tku7blnKjliJfooajkuK3nmoRrZXnlrprkuYlcbiAgICovXG4gIF9pbml0KGtleTogc3RyaW5nLCBwYXJlbnQ/OiBDb21wb25lbnQsIGxpc3RJbmRleD86IG51bWJlciwgbGlzdEtleT86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbml0ZWQpIHJldHVybjtcbiAgICB0aGlzLl9zZXRLZXkoa2V5LCBwYXJlbnQsIGxpc3RJbmRleCwgbGlzdEtleSk7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIGlmICh0aGlzLmRhdGEpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLmlkICsgJyBDb21wb25lbnQgZGF0YeWxnuaAp+WSjCBzZXREYXRh5pa55rOV5bey57uP5bqf5byDLOivt+S9v+eUqHN0YXRlIOWSjCBzZXRTdGF0ZeS7o+abvycpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coJyVjJXMgaW5pdCAlbycsICdjb2xvcjojOWEyM2NjJywgdGhpcy5pZCwgdGhpcyk7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucGF0aCArICcjaW5pdCcsIHRoaXMpO1xuICAgIGlmICghdGhpcy5zdGF0ZSkge1xuICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIH1cbiAgICB0aGlzLl9jaGlsZHJlbiA9IHt9O1xuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIHRoaXMuX2NoZWNrUHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ICYmIHRoaXMub25Mb2FkKSB7XG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICBjb25zb2xlLmxvZygnJWMlcyBvbkxvYWQoKScsICdjb2xvcjojOWEyM2NjJywgdGhpcy5pZCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9uTG9hZCh0aGlzLnBhZ2UuX2xvYWRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ICYmIHRoaXMucGFnZS5fcmVhZHkpIHtcbiAgICAgIC8vIOWmguaenCBrZXkg5LiN5Li656m677yM5YiZ5Luj6KGo5b2T5YmN57uE5Lu25LiN5piv6aG16Z2i5qC557uE5Lu2XG4gICAgICAvLyDlpoLmnpwgcGFnZS5fcmVhZHkg5YiZ5Luj6KGo6aG16Z2i5bey57uPcmVhZHnvvIzor7TmmI7lvZPliY3nu4Tku7bmmK/pobXpnaJyZWFkeeWQjuaJjeWKqOaAgeeUn+aIkOeahFxuICAgICAgdXRpbHMuY2FsbExpZmVjeWNsZSh0aGlzLCAnb25SZWFkeScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgJiYgdGhpcy5wYWdlLl9zaG93KSB7XG4gICAgICB1dGlscy5jYWxsTGlmZWN5Y2xlKHRoaXMsICdvblNob3cnKTtcbiAgICB9XG5cbiAgICAvLyDmm7TmlrDpobXpnaLmlbDmja5cbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgIHRoaXMuX3VwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMluaXtu+8jOabtOaWsOe7hOS7tueahGtleeOAgWlk44CBcGF0aOetieWxnuaAp1xuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5ICAgICAgICAg57uE5Lu2a2V5XG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBbcGFyZW50XSDniLbnu4Tku7ZcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaXN0SW5kZXhdIOe7hOS7tuWcqOWIl+ihqOS4reeahGluZGV4XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlzdEtleV0gICDnu4Tku7blnKjliJfooajkuK3nmoRrZXnlrprkuYlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zZXRLZXkoa2V5OiBzdHJpbmcsIHBhcmVudD86IENvbXBvbmVudCwgbGlzdEluZGV4PzogbnVtYmVyLCBsaXN0S2V5Pzogc3RyaW5nfG51bWJlcnx2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5fbGlzdEluZGV4ID0gbGlzdEluZGV4O1xuICAgIHRoaXMuX2xpc3RLZXkgPSBsaXN0S2V5O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhcmVudC5wYWdlO1xuICAgICAgdGhpcy5pZCA9IHBhcmVudC5pZCArICc6JyArIGtleTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKGtleSAmJiBwYXJlbnQgJiYgcGFyZW50LnBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHBhcmVudC5wYXRoICsgJy4nICsga2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGggPSBrZXk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYXRoICs9ICcuJyArIGxpc3RJbmRleDtcbiAgICAgIHRoaXMuaWQgKz0gJy4nICsgbGlzdEluZGV4O1xuICAgIH1cbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgfHwgdGhpcy5wYXRoO1xuICAgIGlmIChfX0RFVl9fICYmIChrZXkgPT09ICdwcm9wcycgfHwga2V5ID09PSAnc3RhdGUnKSkge1xuICAgICAgLy8gJEZsb3cg5oiR5Lus55+l6YGTcGFyZW505LiA5a6a5a2Y5Zyo77yM5L2G5pivRmxvd+S4jeefpemBk1xuICAgICAgY29uc29sZS5lcnJvcihgJHtwYXJlbnQuaWR9IOeahOWtkOe7hOS7ticke3RoaXMubmFtZX0n55qEJ2tleSfkuI3og73orr7nva7kuLoncHJvcHMn5oiWJ3N0YXRlJ++8jOivt+S/ruaUuSAke3BhcmVudC5pZH0jY2hpbGRyZW4oKSDmlrnms5XnmoTov5Tlm57lgLxgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5pu05paw57uE5Lu2XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLl91cGRhdGVUaW1lcikgcmV0dXJuO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVUaW1lciA9IDA7XG5cbiAgICAgIC8vIOWGhemDqHN0YXRl5pWw5o2u5pu05paw5ZCO77yM6Ieq5Yqo5pu05paw6aG16Z2i5pWw5o2uXG5cbiAgICAgIGxldCBwYXRoID0gdGhpcy5wYXRoID8gdGhpcy5wYXRoICsgJy4nIDogJyc7XG4gICAgICBsZXQgbmV3RGF0YSA9IHt9O1xuICAgICAgbmV3RGF0YVtwYXRoICsgJ3Byb3BzJ10gPSB0aGlzLnByb3BzO1xuICAgICAgbmV3RGF0YVtwYXRoICsgJ3N0YXRlJ10gPSB0aGlzLnN0YXRlO1xuICAgICAgdGhpcy5wYWdlLnVwZGF0ZURhdGEobmV3RGF0YSk7XG5cbiAgICAgIC8vIOabtOaWsOWtkOe7hOS7tuWIl+ihqFxuICAgICAgdGhpcy5fdXBkYXRlQ2hpbGRyZW4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXZlbG9wbWVudOeOr+Wig+S4i+ajgOafpXByb3BzVHlwZXPlsZ7mgKforr7nva5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja1Byb3BzKCkge1xuICAgIGlmIChfX0RFVl9fICYmIHRoaXMucHJvcHNUeXBlcykge1xuICAgICAgY29uc29sZS53YXJuKCfnu4Tku7ZcIicgKyB0aGlzLm5hbWUgKyAnXCLnmoRcInByb3BzVHlwZXNcIuWxnuaAp+W6lOivpeS4uumdmeaAgXN0YXRpYycpO1xuICAgIH1cblxuICAgIGlmIChfX0RFVl9fICYmIHRoaXMuY29uc3RydWN0b3IucHJvcFR5cGVzKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnN0cnVjdG9yLnByb3BUeXBlcykuZm9yRWFjaCgocHJvcE5hbWUpID0+IHtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IHRoaXMuY29uc3RydWN0b3IucHJvcFR5cGVzW3Byb3BOYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ+e7hOS7tlwiJyArIHRoaXMubmFtZSArICdcIueahFwiJyArIHByb3BOYW1lICsgJ1wi5bGe5oCn57G75Z6L5qOA5rWL5Zmo5LiN5piv5LiA5Liq5pyJ5pWI5Ye95pWwJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlcnJvciA9IHZhbGlkYXRvcih0aGlzLnByb3BzLCBwcm9wTmFtZSwgdGhpcy5uYW1lKTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5pu05paw5omA5pyJ5a2Q5o6n5Lu277yM6LSf6LSj5a6e5L6L5YyW5a2Q5o6n5Lu25Lul5Y+K5pu05paw5YW2cHJvcHNcbiAgICog6LCD55So57uE5Lu255qEY2hpbGRyZW4oKeaWueazleiOt+WPluWtkOe7hOS7tuWIl+ihqO+8jOWmguaenOWvueW6lOeahOWtkOe7hOS7tuWtmOWcqOWImeiwg+eUqOWtkOe7hOS7tm9uVXBkYXRl5pu05pawcHJvcHPvvIzlkKbogIXoh6rliqjliJvlu7rlrZDnu4Tku7ZcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91cGRhdGVDaGlsZHJlbigpOiAkQ2hpbGRyZW4ge1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuIHx8IHt9O1xuICAgIGxldCBjb25maWdzID0gdGhpcy5jaGlsZHJlbiAmJiB0aGlzLmNoaWxkcmVuKCk7XG4gICAgLy8g5oCn6IO95LyY5YyW77yM5b2TY2hpbGRyZW7ov5Tlm57nmoTphY3nva7lj5HnlJ/lj5jljJblkI7miY3nnJ/mraPmm7TmlrDlrZDmjqfku7ZcbiAgICBpZiAoIWRlZXBFcXVhbChjb25maWdzLCB0aGlzLl9jaGlsZHJlbkNvbmZpZ3MpKSB7XG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICBjb25zb2xlLmxvZygnJWMlcyAlcyAtPiAlbycsICdjb2xvcjojOWEyM2NjJywgdGhpcy5pZCwgJ2NoaWxkcmVuKCknLCBjb25maWdzKTtcbiAgICAgIH1cbiAgICAgIC8vIOmBjeWOhuWtkOe7hOS7tumFjee9ruWIl+ihqFxuICAgICAgT2JqZWN0LmtleXMoY29uZmlncykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCBjb25maWc6ICRDaGlsZENvbmZpZyB8IEFycmF5PCRDaGlsZENvbmZpZz4gPSBjb25maWdzW2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZykpIHtcbiAgICAgICAgICAvLyDlpoLmnpzlrZDnu4Tku7bmmK/kuIDkuKrliJfooahcblxuICAgICAgICAgIGxldCBtYXAgPSB7fTsgIC8vIOS+neaNruWIl+ihqOS4reavj+S4quWtkOe7hOS7tmtleeeUn+aIkOeahOWOn+adpee7hOS7tuaYoOWwhFxuICAgICAgICAgIGxldCB1c2VkID0gW107IC8vIOWtmOaUvuW3suefpeeahOWtkOe7hOS7tmtlee+8jOeUqOadpeajgOa1i+WkmuS4quWtkOe7hOS7tuaYr+WQpumHjeWkjeS9v+eUqOWQjOS4gOS4qmtleVxuICAgICAgICAgIGxldCBsaXN0OiBBcnJheTxDb21wb25lbnQ+ID0gY2hpbGRyZW5ba2V5XTtcbiAgICAgICAgICBpZiAobGlzdCAmJiBBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgICAgICAgICBsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgbGV0IF9saXN0S2V5ID0gaXRlbS5fbGlzdEtleTtcbiAgICAgICAgICAgICAgaWYgKF9saXN0S2V5IHx8IF9saXN0S2V5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbWFwW19saXN0S2V5XSA9IGl0ZW07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaXN0ID0gW107XG4gICAgICAgICAgY29uZmlnLmZvckVhY2goKGM6ICRDaGlsZENvbmZpZywgbGlzdEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChfX0RFVl9fICYmIGMua2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBcIiR7dGhpcy5uYW1lfVwi55qE5a2Q57uE5Lu2XCIke2tleX1cIuWIl+ihqOmhueW/hemhu+WMheWQq1wia2V5XCLlsZ7mgKflrprkuYlgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjb207XG4gICAgICAgICAgICBsZXQgY2hpbGRLZXkgPSBjLmtleSAhPT0gbnVsbCAmJiBjLmtleSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKGMua2V5KSA6ICcnO1xuICAgICAgICAgICAgaWYgKGNoaWxkS2V5ICYmIG1hcC5oYXNPd25Qcm9wZXJ0eShjaGlsZEtleSkpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZWQuaW5kZXhPZihjaGlsZEtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29tID0gbWFwW2NoaWxkS2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgbWFwW2NoaWxkS2V5XTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBcIiR7dGhpcy5uYW1lfVwi55qE5a2Q57uE5Lu2XCIke2tleX1cIuWIl+ihqOmhueW/hemhu1wia2V5XCLlsZ7mgKflrprkuYnlj5HnjrDph43lpI3lgLzvvJpcIiR7Y2hpbGRLZXl9XCJgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB1c2VkLnB1c2goY2hpbGRLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuX3VwZGF0ZUNoaWxkKGtleSwgY29tLCBjLCBsaXN0SW5kZXgpKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIOmUgOavgeayoeacieeUqOWkhOeahOWtkOe7hOS7tlxuICAgICAgICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgICAgICAgdXRpbHMuY2FsbExpZmVjeWNsZShtYXBba10sICdvblVubG9hZCcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNoaWxkcmVuW2tleV0gPSBsaXN0O1xuICAgICAgICAgIC8vIOWtkOe7hOS7tuWIl+ihqOabtOaWsOWQju+8jOe7n+S4gOabtOaWsOWIl+ihqOWvueW6lOeahOmhtemdouaVsOaNrlxuICAgICAgICAgIGxldCBuZXdEYXRhID0gW107XG4gICAgICAgICAgbGlzdC5mb3JFYWNoKChjb20pID0+IHtcbiAgICAgICAgICAgIG5ld0RhdGEucHVzaCh7XG4gICAgICAgICAgICAgIHByb3BzOiBjb20ucHJvcHMsXG4gICAgICAgICAgICAgIHN0YXRlOiBjb20uc3RhdGUsXG4gICAgICAgICAgICAgIF9fazogY29tLl9saXN0S2V5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMucGF0aCA/IHRoaXMucGF0aCArICcuJyArIGtleSA6IGtleTtcbiAgICAgICAgICB0aGlzLnBhZ2UudXBkYXRlRGF0YSh7XG4gICAgICAgICAgICBbcGF0aF06IG5ld0RhdGFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDlrZDnu4Tku7bmmK/ljZXkuKrnu4Tku7bvvIzkuI3mmK/liJfooahcbiAgICAgICAgICBsZXQgY29tcG9uZW50OiBDb21wb25lbnQgPSBjaGlsZHJlbltrZXldOyAvLyDljp/mnaXnmoTnu4Tku7ZcbiAgICAgICAgICBjaGlsZHJlbltrZXldID0gdGhpcy5fdXBkYXRlQ2hpbGQoa2V5LCBjb21wb25lbnQsIGNvbmZpZyk7XG4gICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgLy8g5aaC5p6c5a2Q57uE5Lu25Y6f5p2l5bCx5a2Y5Zyo77yM5YiZ5pu05ZCO6Ieq5Yqo5pu05paw6aG16Z2i5pWw5o2uXG4gICAgICAgICAgICBsZXQgbmV3RGF0YSA9IHt9O1xuICAgICAgICAgICAgbmV3RGF0YVtjb21wb25lbnQucGF0aCArICcucHJvcHMnXSA9IGNvbXBvbmVudC5wcm9wcztcbiAgICAgICAgICAgIG5ld0RhdGFbY29tcG9uZW50LnBhdGggKyAnLnN0YXRlJ10gPSBjb21wb25lbnQuc3RhdGU7XG4gICAgICAgICAgICB0aGlzLnBhZ2UudXBkYXRlRGF0YShuZXdEYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jaGlsZHJlbkNvbmZpZ3MgPSBjb25maWdzO1xuICAgIHRoaXMuX2NoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIOabtOaWsOWNleS4quWtkOe7hOS7tlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOe7hOS7tmtleVxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpc3RJbmRleFxuICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3VwZGF0ZUNoaWxkKGtleTogc3RyaW5nLCBjb21wb25lbnQ/OiBDb21wb25lbnQsIGNvbmZpZzogJENoaWxkQ29uZmlnLCBsaXN0SW5kZXg/OiBudW1iZXIpOiBDb21wb25lbnQge1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIC8vIOaJvuWIsOS6huWOn+acieWunuS+i++8jOabtOaWsHByb3BzXG4gICAgICBjb21wb25lbnQuX3NldEtleShrZXksIHRoaXMsIGxpc3RJbmRleCwgY29uZmlnLmtleSk7XG4gICAgICBpZiAoY29uZmlnLnByb3BzICYmIHV0aWxzLnNob3VsZFVwZGF0ZShjb21wb25lbnQucHJvcHMsIGNvbmZpZy5wcm9wcykpIHtcbiAgICAgICAgbGV0IG5leHRQcm9wcztcbiAgICAgICAgaWYgKGNvbXBvbmVudC5wcm9wcyAmJiBjb21wb25lbnQucHJvcHMubWVyZ2UgJiYgY29tcG9uZW50LnByb3BzLmFzTXV0YWJsZSkge1xuICAgICAgICAgIC8vIOWmguaenCBwcm9wcy5tZXJnZSDlrZjlnKjvvIzliJnku6Pooahwcm9wc+aYr+S4gOS4qkltbXV0YWJsZeWvueixoVxuICAgICAgICAgIG5leHRQcm9wcyA9IGNvbXBvbmVudC5wcm9wcy5tZXJnZShjb25maWcucHJvcHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5leHRQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbXBvbmVudC5wcm9wcywgY29uZmlnLnByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9uZW50Lm9uVXBkYXRlKSB7XG4gICAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICAgIC8vIERldmVsb3BtZW50XG4gICAgICAgICAgICBsZXQgb3JpZ2luYWwgPSB1dGlscy5nZXREZWJ1Z09iamVjdChjb21wb25lbnQucHJvcHMpO1xuICAgICAgICAgICAgY29tcG9uZW50Lm9uVXBkYXRlKG5leHRQcm9wcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJWMlcyBvblVwZGF0ZSglbykgLT4gJW8gQ29tcG9uZW50OiVvJyxcbiAgICAgICAgICAgICAgJ2NvbG9yOiMyYThmOTknLFxuICAgICAgICAgICAgICB0aGlzLmlkLCBvcmlnaW5hbCxcbiAgICAgICAgICAgICAgdXRpbHMuZ2V0RGVidWdPYmplY3QoY29tcG9uZW50LnByb3BzKSxcbiAgICAgICAgICAgICAgY29tcG9uZW50XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wb25lbnQub25VcGRhdGUobmV4dFByb3BzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgICBjb21wb25lbnQuX3VwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDmsqHmnInmib7liLDljp/mnInlrp7kvovvvIzlrp7kvovljJbkuIDkuKrmlrDnmoRcbiAgICAgIGxldCBDb21wb25lbnRDbGFzcyA9IGNvbmZpZy5jb21wb25lbnQ7XG4gICAgICBjb21wb25lbnQgPSBuZXcgQ29tcG9uZW50Q2xhc3MoY29uZmlnLnByb3BzKTtcbiAgICAgIGNvbXBvbmVudC5fY29uZmlnID0gY29uZmlnO1xuICAgICAgY29tcG9uZW50Ll9pbml0KGtleSwgdGhpcywgbGlzdEluZGV4LCBjb25maWcua2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxufVxuIl19