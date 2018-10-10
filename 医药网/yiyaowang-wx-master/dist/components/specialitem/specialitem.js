"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('../../npm/babel-runtime/core-js/object/get-prototype-of.js');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('../../npm/babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../../npm/babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('../../npm/babel-runtime/helpers/possibleConstructorReturn.js');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('../../npm/babel-runtime/helpers/inherits.js');

var _inherits3 = _interopRequireDefault(_inherits2);

var _labradorImmutable = require('../../npm/labrador-immutable/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var array = _labradorImmutable.PropTypes.array,
    object = _labradorImmutable.PropTypes.object;

var specialitem = function (_Component) {
  (0, _inherits3.default)(specialitem, _Component);

  function specialitem() {
    (0, _classCallCheck3.default)(this, specialitem);
    return (0, _possibleConstructorReturn3.default)(this, (specialitem.__proto__ || (0, _getPrototypeOf2.default)(specialitem)).apply(this, arguments));
  }

  (0, _createClass3.default)(specialitem, [{
    key: 'tap1',
    value: function tap1(e) {
      console.log(' gogo ', e);
    }
  }]);
  return specialitem;
}(_labradorImmutable.Component);

specialitem.propTypes = {
  content: object,
  itemsToTemplate: array
};
specialitem.defaultProps = {
  contents: {},
  itemsToTemplate: []
};
exports.default = specialitem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwZWNpYWxpdGVtLmpzIl0sIm5hbWVzIjpbImFycmF5Iiwib2JqZWN0Iiwic3BlY2lhbGl0ZW0iLCJlIiwiY29uc29sZSIsImxvZyIsInByb3BUeXBlcyIsImNvbnRlbnQiLCJpdGVtc1RvVGVtcGxhdGUiLCJkZWZhdWx0UHJvcHMiLCJjb250ZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUVRQSxLLGdDQUFBQSxLO0lBQU9DLE0sZ0NBQUFBLE07O0lBRVRDLFc7Ozs7Ozs7Ozs7eUJBV0NDLEMsRUFBRztBQUNOQyxjQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkYsQ0FBdEI7QUFDRDs7Ozs7QUFiR0QsVyxDQUNHSSxTLEdBQVk7QUFDakJDLFdBQVNOLE1BRFE7QUFFakJPLG1CQUFpQlI7QUFGQSxDO0FBRGZFLFcsQ0FNR08sWSxHQUFlO0FBQ3BCQyxZQUFVLEVBRFU7QUFFcEJGLG1CQUFpQjtBQUZHLEM7a0JBV1ROLFciLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAnbGFicmFkb3ItaW1tdXRhYmxlJztcblxuY29uc3QgeyBhcnJheSwgb2JqZWN0IH0gPSBQcm9wVHlwZXM7XG5cbmNsYXNzIHNwZWNpYWxpdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb250ZW50OiBvYmplY3QsXG4gICAgaXRlbXNUb1RlbXBsYXRlOiBhcnJheVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29udGVudHM6IHt9LFxuICAgIGl0ZW1zVG9UZW1wbGF0ZTogW11cbiAgfTtcblxuICB0YXAxKGUpIHtcbiAgICBjb25zb2xlLmxvZygnIGdvZ28gJywgZSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBzcGVjaWFsaXRlbTtcbiJdfQ==