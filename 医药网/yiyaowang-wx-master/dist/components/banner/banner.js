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

//import { connect } from 'labrador-redux';

var array = _labradorImmutable.PropTypes.array,
    bool = _labradorImmutable.PropTypes.bool,
    number = _labradorImmutable.PropTypes.number,
    string = _labradorImmutable.PropTypes.string;

var banner = function (_Component) {
  (0, _inherits3.default)(banner, _Component);

  function banner(props) {
    (0, _classCallCheck3.default)(this, banner);

    var _this = (0, _possibleConstructorReturn3.default)(this, (banner.__proto__ || (0, _getPrototypeOf2.default)(banner)).call(this, props));

    console.log('====== banner', _this.props.itemArr);
    _this.state = (0, _seamlessImmutable2.default)({});
    return _this;
  }

  (0, _createClass3.default)(banner, [{
    key: 'onReady',
    value: function onReady() {
      console.log('====== banner', this.props.itemArr);
    }
  }, {
    key: 'foo',
    value: function foo() {
      console.log('foo foo');
    }
  }]);
  return banner;
}(_labradorImmutable.Component);

banner.propTypes = {
  title: string,
  indicatorDots: bool,
  autoplay: bool,
  interval: number,
  duration: number,
  itemArr: array
};
banner.defaultProps = {
  title: 'noName',
  indicatorDots: true,
  autoplay: true,
  interval: 5000,
  duration: 1000,
  itemArr: []
};
exports.default = banner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbm5lci5qcyJdLCJuYW1lcyI6WyJhcnJheSIsImJvb2wiLCJudW1iZXIiLCJzdHJpbmciLCJiYW5uZXIiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJpdGVtQXJyIiwic3RhdGUiLCJwcm9wVHlwZXMiLCJ0aXRsZSIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUNBOztJQUVRQSxLLGdDQUFBQSxLO0lBQU9DLEksZ0NBQUFBLEk7SUFBTUMsTSxnQ0FBQUEsTTtJQUFRQyxNLGdDQUFBQSxNOztJQUV2QkMsTTs7O0FBbUJKLGtCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsc0lBQ1hBLEtBRFc7O0FBRWpCQyxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QixNQUFLRixLQUFMLENBQVdHLE9BQXhDO0FBQ0EsVUFBS0MsS0FBTCxHQUFhLGlDQUFVLEVBQVYsQ0FBYjtBQUhpQjtBQUlsQjs7Ozs4QkFFUztBQUNSSCxjQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QixLQUFLRixLQUFMLENBQVdHLE9BQXhDO0FBQ0Q7OzswQkFFSztBQUNKRixjQUFRQyxHQUFSLENBQVksU0FBWjtBQUNEOzs7OztBQS9CR0gsTSxDQUNHTSxTLEdBQVk7QUFDakJDLFNBQU9SLE1BRFU7QUFFakJTLGlCQUFlWCxJQUZFO0FBR2pCWSxZQUFVWixJQUhPO0FBSWpCYSxZQUFVWixNQUpPO0FBS2pCYSxZQUFVYixNQUxPO0FBTWpCTSxXQUFTUjtBQU5RLEM7QUFEZkksTSxDQVVHWSxZLEdBQWU7QUFDcEJMLFNBQU8sUUFEYTtBQUVwQkMsaUJBQWUsSUFGSztBQUdwQkMsWUFBVSxJQUhVO0FBSXBCQyxZQUFVLElBSlU7QUFLcEJDLFlBQVUsSUFMVTtBQU1wQlAsV0FBUztBQU5XLEM7a0JBeUJUSixNIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ2xhYnJhZG9yLWltbXV0YWJsZSc7XG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG4vL2ltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdsYWJyYWRvci1yZWR1eCc7XG5cbmNvbnN0IHsgYXJyYXksIGJvb2wsIG51bWJlciwgc3RyaW5nIH0gPSBQcm9wVHlwZXM7XG5cbmNsYXNzIGJhbm5lciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdGl0bGU6IHN0cmluZyxcbiAgICBpbmRpY2F0b3JEb3RzOiBib29sLFxuICAgIGF1dG9wbGF5OiBib29sLFxuICAgIGludGVydmFsOiBudW1iZXIsXG4gICAgZHVyYXRpb246IG51bWJlcixcbiAgICBpdGVtQXJyOiBhcnJheVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdGl0bGU6ICdub05hbWUnLFxuICAgIGluZGljYXRvckRvdHM6IHRydWUsXG4gICAgYXV0b3BsYXk6IHRydWUsXG4gICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgaXRlbUFycjogW11cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zb2xlLmxvZygnPT09PT09IGJhbm5lcicsIHRoaXMucHJvcHMuaXRlbUFycik7XG4gICAgdGhpcy5zdGF0ZSA9IGltbXV0YWJsZSh7fSk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIGNvbnNvbGUubG9nKCc9PT09PT0gYmFubmVyJywgdGhpcy5wcm9wcy5pdGVtQXJyKTtcbiAgfVxuXG4gIGZvbygpIHtcbiAgICBjb25zb2xlLmxvZygnZm9vIGZvbycpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFubmVyO1xuIl19