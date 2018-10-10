"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('../babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('../babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('../babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _labrador = require('../labrador/index.js');

var _seamlessImmutable = require('../seamless-immutable/src/seamless-immutable.js');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-18
 * @author Li <li@maichong.it>
 */

wx.immutable = _seamlessImmutable2.default;

var emptyObject = (0, _seamlessImmutable2.default)({});

var ImmutableComponent = function (_Component) {
  (0, _inherits3.default)(ImmutableComponent, _Component);

  function ImmutableComponent() {
    (0, _classCallCheck3.default)(this, ImmutableComponent);
    return (0, _possibleConstructorReturn3.default)(this, (ImmutableComponent.__proto__ || (0, _getPrototypeOf2.default)(ImmutableComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(ImmutableComponent, [{
    key: 'state',
    get: function get() {
      return this._immutable_state || emptyObject;
    },
    set: function set(nextState) {
      this._immutable_state = (0, _seamlessImmutable2.default)(nextState);
    }
  }, {
    key: 'props',
    get: function get() {
      return this._immutable_props || emptyObject;
    },
    set: function set(nextProps) {
      this._immutable_props = (0, _seamlessImmutable2.default)(nextProps);
    }
  }]);
  return ImmutableComponent;
}(_labrador.Component);

exports.default = ImmutableComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ3eCIsImltbXV0YWJsZSIsImVtcHR5T2JqZWN0IiwiSW1tdXRhYmxlQ29tcG9uZW50IiwiX2ltbXV0YWJsZV9zdGF0ZSIsIm5leHRTdGF0ZSIsIl9pbW11dGFibGVfcHJvcHMiLCJuZXh0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUE7O0FBQ0E7Ozs7OztBQVBBOzs7Ozs7QUFTQUEsR0FBR0MsU0FBSDs7QUFFQSxJQUFNQyxjQUFjLGlDQUFVLEVBQVYsQ0FBcEI7O0lBRXFCQyxrQjs7Ozs7Ozs7Ozt3QkFDUDtBQUNWLGFBQU8sS0FBS0MsZ0JBQUwsSUFBeUJGLFdBQWhDO0FBQ0QsSztzQkFFU0csUyxFQUFXO0FBQ25CLFdBQUtELGdCQUFMLEdBQXdCLGlDQUFVQyxTQUFWLENBQXhCO0FBQ0Q7Ozt3QkFFVztBQUNWLGFBQU8sS0FBS0MsZ0JBQUwsSUFBeUJKLFdBQWhDO0FBQ0QsSztzQkFFU0ssUyxFQUFXO0FBQ25CLFdBQUtELGdCQUFMLEdBQXdCLGlDQUFVQyxTQUFWLENBQXhCO0FBQ0Q7Ozs7O2tCQWZrQkosa0IiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTExLTE4XG4gKiBAYXV0aG9yIExpIDxsaUBtYWljaG9uZy5pdD5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdsYWJyYWRvcic7XG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG5cbnd4LmltbXV0YWJsZSA9IGltbXV0YWJsZTtcblxuY29uc3QgZW1wdHlPYmplY3QgPSBpbW11dGFibGUoe30pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbW11dGFibGVDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBnZXQgc3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ltbXV0YWJsZV9zdGF0ZSB8fCBlbXB0eU9iamVjdDtcbiAgfVxuXG4gIHNldCBzdGF0ZShuZXh0U3RhdGUpIHtcbiAgICB0aGlzLl9pbW11dGFibGVfc3RhdGUgPSBpbW11dGFibGUobmV4dFN0YXRlKTtcbiAgfVxuXG4gIGdldCBwcm9wcygpIHtcbiAgICByZXR1cm4gdGhpcy5faW1tdXRhYmxlX3Byb3BzIHx8IGVtcHR5T2JqZWN0O1xuICB9XG5cbiAgc2V0IHByb3BzKG5leHRQcm9wcykge1xuICAgIHRoaXMuX2ltbXV0YWJsZV9wcm9wcyA9IGltbXV0YWJsZShuZXh0UHJvcHMpO1xuICB9XG59XG4iXX0=