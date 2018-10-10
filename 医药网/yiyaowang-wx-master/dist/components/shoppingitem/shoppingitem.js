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

var _seamlessImmutable = require('../../npm/seamless-immutable/src/seamless-immutable.js');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = _labradorImmutable.PropTypes.number,
    func = _labradorImmutable.PropTypes.func,
    string = _labradorImmutable.PropTypes.string;

var shoppingitem = function (_Component) {
  (0, _inherits3.default)(shoppingitem, _Component);

  function shoppingitem() {
    (0, _classCallCheck3.default)(this, shoppingitem);
    return (0, _possibleConstructorReturn3.default)(this, (shoppingitem.__proto__ || (0, _getPrototypeOf2.default)(shoppingitem)).apply(this, arguments));
  }

  (0, _createClass3.default)(shoppingitem, [{
    key: 'handleAdd',
    value: function handleAdd() {
      console.log('add run');
      this.props.onAdd(this.props.id);
    }
  }, {
    key: 'foucusme',
    value: function foucusme() {
      console.log('dian wo  a   kuaidian ');
    }
  }]);
  return shoppingitem;
}(_labradorImmutable.Component);

shoppingitem.propTypes = {
  mainimg3: string,
  productname: string,
  originalprice: string,
  id: string,
  sellStatus: number,
  onAdd: func
};
shoppingitem.defaultProps = {
  mainimg3: '',
  productname: '',
  originalprice: '',
  id: '',
  sellStatus: 0
};
exports.default = shoppingitem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BwaW5naXRlbS5qcyJdLCJuYW1lcyI6WyJudW1iZXIiLCJmdW5jIiwic3RyaW5nIiwic2hvcHBpbmdpdGVtIiwiY29uc29sZSIsImxvZyIsInByb3BzIiwib25BZGQiLCJpZCIsInByb3BUeXBlcyIsIm1haW5pbWczIiwicHJvZHVjdG5hbWUiLCJvcmlnaW5hbHByaWNlIiwic2VsbFN0YXR1cyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0lBRVFBLE0sZ0NBQUFBLE07SUFBUUMsSSxnQ0FBQUEsSTtJQUFNQyxNLGdDQUFBQSxNOztJQUVoQkMsWTs7Ozs7Ozs7OztnQ0FrQlE7QUFDVkMsY0FBUUMsR0FBUixDQUFZLFNBQVo7QUFDQSxXQUFLQyxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsS0FBS0QsS0FBTCxDQUFXRSxFQUE1QjtBQUNEOzs7K0JBRVU7QUFDVEosY0FBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0Q7Ozs7O0FBekJHRixZLENBQ0dNLFMsR0FBWTtBQUNqQkMsWUFBVVIsTUFETztBQUVqQlMsZUFBYVQsTUFGSTtBQUdqQlUsaUJBQWVWLE1BSEU7QUFJakJNLE1BQUlOLE1BSmE7QUFLakJXLGNBQVliLE1BTEs7QUFNakJPLFNBQU9OO0FBTlUsQztBQURmRSxZLENBVUdXLFksR0FBZTtBQUNwQkosWUFBVSxFQURVO0FBRXBCQyxlQUFhLEVBRk87QUFHcEJDLGlCQUFlLEVBSEs7QUFJcEJKLE1BQUksRUFKZ0I7QUFLcEJLLGNBQVk7QUFMUSxDO2tCQW1CVFYsWSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdsYWJyYWRvci1pbW11dGFibGUnO1xuaW1wb3J0IGltbXV0YWJsZSBmcm9tICdzZWFtbGVzcy1pbW11dGFibGUnO1xuXG5jb25zdCB7IG51bWJlciwgZnVuYywgc3RyaW5nIH0gPSBQcm9wVHlwZXM7XG5cbmNsYXNzIHNob3BwaW5naXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbWFpbmltZzM6IHN0cmluZyxcbiAgICBwcm9kdWN0bmFtZTogc3RyaW5nLFxuICAgIG9yaWdpbmFscHJpY2U6IHN0cmluZyxcbiAgICBpZDogc3RyaW5nLFxuICAgIHNlbGxTdGF0dXM6IG51bWJlcixcbiAgICBvbkFkZDogZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgbWFpbmltZzM6ICcnLFxuICAgIHByb2R1Y3RuYW1lOiAnJyxcbiAgICBvcmlnaW5hbHByaWNlOiAnJyxcbiAgICBpZDogJycsXG4gICAgc2VsbFN0YXR1czogMFxuICB9O1xuXG4gIGhhbmRsZUFkZCgpIHtcbiAgICBjb25zb2xlLmxvZygnYWRkIHJ1bicpO1xuICAgIHRoaXMucHJvcHMub25BZGQodGhpcy5wcm9wcy5pZCk7XG4gIH1cblxuICBmb3VjdXNtZSgpIHtcbiAgICBjb25zb2xlLmxvZygnZGlhbiB3byAgYSAgIGt1YWlkaWFuICcpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvcHBpbmdpdGVtO1xuIl19