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

var _redux = require('../../npm/redux/es/index.js');

var _labradorRedux = require('../../npm/labrador-redux/index.js');

var _request = require('../../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _specialitem = require('../../components/specialitem/specialitem.js');

var _specialitem2 = _interopRequireDefault(_specialitem);

var _cart = require('../../redux/cart.js');

var cartActions = _interopRequireWildcard(_cart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var object = _labradorImmutable.PropTypes.object,
    func = _labradorImmutable.PropTypes.func;

var Cart = function (_Component) {
  (0, _inherits3.default)(Cart, _Component);

  function Cart(props) {
    (0, _classCallCheck3.default)(this, Cart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Cart.__proto__ || (0, _getPrototypeOf2.default)(Cart)).call(this, props));

    _this.handleAdd = function (id) {
      _this.props.addTodo(id);
    };

    _this.state = (0, _seamlessImmutable2.default)({});
    return _this;
  }

  (0, _createClass3.default)(Cart, [{
    key: 'children',
    value: function children() {
      var _this2 = this;

      var listArrs = this.state.baseData.products;
      console.log(this.handleAdd);
      return {
        shoppinglist: listArrs.map(function (item) {
          return {
            component: _specialitem2.default,
            key: listArrs.indexOf(item),
            props: {
              // info: item.productInfo,
              mainimg3: item.productInfo.mainimg3,
              productname: item.productInfo.productname,
              originalprice: item.productInfo.originalprice,
              id: item.productInfo.id,
              sellStatus: item.productInfo.sellStatus,
              onAdd: _this2.handleAdd
            }
          };
        })
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this3 = this;

      _request2.default.fetchCartData().then(function (result) {
        // console.log('***fetchCartData()', result);
        _this3.setState({
          baseData: result.data.data.venders[0]
        });
        // console.log('===== state' + this.state.itemArr);
      }).then(function (error) {
        console.log(error);
      });
    }
  }]);
  return Cart;
}(_labradorImmutable.Component);

Cart.propTypes = {
  baseData: object,
  addTodo: func
};
Cart.defaultProps = {
  baseData: {}
};
exports.default = (0, _labradorRedux.connect)(function (_ref) {
  var todos = _ref.todos;
  return { todos: todos };
}, function (dispatch) {
  return (0, _redux.bindActionCreators)({
    addTodo: cartActions.add
  }, dispatch);
})(Cart);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiY2FydEFjdGlvbnMiLCJvYmplY3QiLCJmdW5jIiwiQ2FydCIsInByb3BzIiwiaGFuZGxlQWRkIiwiaWQiLCJhZGRUb2RvIiwic3RhdGUiLCJsaXN0QXJycyIsImJhc2VEYXRhIiwicHJvZHVjdHMiLCJjb25zb2xlIiwibG9nIiwic2hvcHBpbmdsaXN0IiwibWFwIiwiaXRlbSIsImNvbXBvbmVudCIsImtleSIsImluZGV4T2YiLCJtYWluaW1nMyIsInByb2R1Y3RJbmZvIiwicHJvZHVjdG5hbWUiLCJvcmlnaW5hbHByaWNlIiwic2VsbFN0YXR1cyIsIm9uQWRkIiwiZmV0Y2hDYXJ0RGF0YSIsInRoZW4iLCJyZXN1bHQiLCJzZXRTdGF0ZSIsImRhdGEiLCJ2ZW5kZXJzIiwiZXJyb3IiLCJwcm9wVHlwZXMiLCJkZWZhdWx0UHJvcHMiLCJ0b2RvcyIsImRpc3BhdGNoIiwiYWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxXOzs7Ozs7SUFFSkMsTSxnQ0FBQUEsTTtJQUFRQyxJLGdDQUFBQSxJOztJQUVWQyxJOzs7QUFVSixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGtJQUNYQSxLQURXOztBQUFBLFVBd0NuQkMsU0F4Q21CLEdBd0NQLFVBQUNDLEVBQUQsRUFBUTtBQUNsQixZQUFLRixLQUFMLENBQVdHLE9BQVgsQ0FBbUJELEVBQW5CO0FBQ0QsS0ExQ2tCOztBQUVqQixVQUFLRSxLQUFMLEdBQWEsaUNBQVUsRUFBVixDQUFiO0FBRmlCO0FBR2xCOzs7OytCQUVVO0FBQUE7O0FBQ1QsVUFBTUMsV0FBVyxLQUFLRCxLQUFMLENBQVdFLFFBQVgsQ0FBb0JDLFFBQXJDO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBWSxLQUFLUixTQUFqQjtBQUNBLGFBQU87QUFDTFMsc0JBQWNMLFNBQVNNLEdBQVQsQ0FBYSxVQUFDQyxJQUFEO0FBQUEsaUJBQVc7QUFDcENDLDRDQURvQztBQUVwQ0MsaUJBQUtULFNBQVNVLE9BQVQsQ0FBaUJILElBQWpCLENBRitCO0FBR3BDWixtQkFBTztBQUNMO0FBQ0FnQix3QkFBVUosS0FBS0ssV0FBTCxDQUFpQkQsUUFGdEI7QUFHTEUsMkJBQWFOLEtBQUtLLFdBQUwsQ0FBaUJDLFdBSHpCO0FBSUxDLDZCQUFlUCxLQUFLSyxXQUFMLENBQWlCRSxhQUozQjtBQUtMakIsa0JBQUlVLEtBQUtLLFdBQUwsQ0FBaUJmLEVBTGhCO0FBTUxrQiwwQkFBWVIsS0FBS0ssV0FBTCxDQUFpQkcsVUFOeEI7QUFPTEMscUJBQU8sT0FBS3BCO0FBUFA7QUFINkIsV0FBWDtBQUFBLFNBQWI7QUFEVCxPQUFQO0FBZUQ7Ozs2QkFHUTtBQUFBOztBQUNQLHdCQUFRcUIsYUFBUixHQUNDQyxJQURELENBQ00sVUFBQ0MsTUFBRCxFQUFZO0FBQ2hCO0FBQ0EsZUFBS0MsUUFBTCxDQUFjO0FBQ1puQixvQkFBVWtCLE9BQU9FLElBQVAsQ0FBWUEsSUFBWixDQUFpQkMsT0FBakIsQ0FBeUIsQ0FBekI7QUFERSxTQUFkO0FBR0E7QUFDRCxPQVBELEVBUUNKLElBUkQsQ0FRTSxVQUFDSyxLQUFELEVBQVc7QUFDZnBCLGdCQUFRQyxHQUFSLENBQVltQixLQUFaO0FBQ0QsT0FWRDtBQVdEOzs7OztBQWhERzdCLEksQ0FDRzhCLFMsR0FBWTtBQUNqQnZCLFlBQVVULE1BRE87QUFFakJNLFdBQVNMO0FBRlEsQztBQURmQyxJLENBTUcrQixZLEdBQWU7QUFDcEJ4QixZQUFVO0FBRFUsQztrQkFrRFQsNEJBQ2I7QUFBQSxNQUFHeUIsS0FBSCxRQUFHQSxLQUFIO0FBQUEsU0FBZ0IsRUFBRUEsWUFBRixFQUFoQjtBQUFBLENBRGEsRUFFYixVQUFDQyxRQUFEO0FBQUEsU0FBYywrQkFBbUI7QUFDL0I3QixhQUFTUCxZQUFZcUM7QUFEVSxHQUFuQixFQUVYRCxRQUZXLENBQWQ7QUFBQSxDQUZhLEVBS2JqQyxJQUxhLEMiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAnbGFicmFkb3ItaW1tdXRhYmxlJztcbmltcG9ydCBpbW11dGFibGUgZnJvbSAnc2VhbWxlc3MtaW1tdXRhYmxlJztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdsYWJyYWRvci1yZWR1eCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcbmltcG9ydCBzaG9wcGluZ2l0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zcGVjaWFsaXRlbS9zcGVjaWFsaXRlbSc7XG5pbXBvcnQgKiBhcyBjYXJ0QWN0aW9ucyBmcm9tICcuLi8uLi9yZWR1eC9jYXJ0JztcblxuY29uc3QgeyBvYmplY3QsIGZ1bmMgfSA9IFByb3BUeXBlcztcblxuY2xhc3MgQ2FydCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgYmFzZURhdGE6IG9iamVjdCxcbiAgICBhZGRUb2RvOiBmdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBiYXNlRGF0YToge31cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gaW1tdXRhYmxlKHt9KTtcbiAgfVxuXG4gIGNoaWxkcmVuKCkge1xuICAgIGNvbnN0IGxpc3RBcnJzID0gdGhpcy5zdGF0ZS5iYXNlRGF0YS5wcm9kdWN0cztcbiAgICBjb25zb2xlLmxvZyh0aGlzLmhhbmRsZUFkZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNob3BwaW5nbGlzdDogbGlzdEFycnMubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICBjb21wb25lbnQ6IHNob3BwaW5naXRlbSxcbiAgICAgICAga2V5OiBsaXN0QXJycy5pbmRleE9mKGl0ZW0pLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIC8vIGluZm86IGl0ZW0ucHJvZHVjdEluZm8sXG4gICAgICAgICAgbWFpbmltZzM6IGl0ZW0ucHJvZHVjdEluZm8ubWFpbmltZzMsXG4gICAgICAgICAgcHJvZHVjdG5hbWU6IGl0ZW0ucHJvZHVjdEluZm8ucHJvZHVjdG5hbWUsXG4gICAgICAgICAgb3JpZ2luYWxwcmljZTogaXRlbS5wcm9kdWN0SW5mby5vcmlnaW5hbHByaWNlLFxuICAgICAgICAgIGlkOiBpdGVtLnByb2R1Y3RJbmZvLmlkLFxuICAgICAgICAgIHNlbGxTdGF0dXM6IGl0ZW0ucHJvZHVjdEluZm8uc2VsbFN0YXR1cyxcbiAgICAgICAgICBvbkFkZDogdGhpcy5oYW5kbGVBZGRcbiAgICAgICAgfVxuICAgICAgfSkpXG4gICAgfTtcbiAgfVxuXG5cbiAgb25Mb2FkKCkge1xuICAgIHJlcXVlc3QuZmV0Y2hDYXJ0RGF0YSgpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coJyoqKmZldGNoQ2FydERhdGEoKScsIHJlc3VsdCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYmFzZURhdGE6IHJlc3VsdC5kYXRhLmRhdGEudmVuZGVyc1swXVxuICAgICAgfSk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnPT09PT0gc3RhdGUnICsgdGhpcy5zdGF0ZS5pdGVtQXJyKTtcbiAgICB9KVxuICAgIC50aGVuKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQWRkID0gKGlkKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5hZGRUb2RvKGlkKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gICh7IHRvZG9zIH0pID0+ICh7IHRvZG9zIH0pLFxuICAoZGlzcGF0Y2gpID0+IGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgYWRkVG9kbzogY2FydEFjdGlvbnMuYWRkXG4gIH0sIGRpc3BhdGNoKVxuKShDYXJ0KTtcbiJdfQ==