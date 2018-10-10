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

var _request = require('../../utils/request.js');

var _request2 = _interopRequireDefault(_request);

var _banner = require('../../components/banner/banner.js');

var _banner2 = _interopRequireDefault(_banner);

var _navibtns = require('../../components/navibtns/navibtns.js');

var _navibtns2 = _interopRequireDefault(_navibtns);

var _specialitem = require('../../components/specialitem/specialitem.js');

var _specialitem2 = _interopRequireDefault(_specialitem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var any = _labradorImmutable.PropTypes.any;

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home(props) {
    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

    _this.state = (0, _seamlessImmutable2.default)({});
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'children',
    value: function children() {
      var banArrs = this.state.baseData.index_lb;
      var naviArrs = this.state.baseData.button;
      var listArrs = this.state.baseData.templates.slice(4);
      //console.log('****', listArrs);
      return {
        banner: {
          component: _banner2.default,
          props: {
            itemArr: banArrs
          }
        },
        navibtns: {
          component: _navibtns2.default,
          props: {
            itemArr: naviArrs
          }
        },
        speciallist: listArrs.map(function (item) {
          return {
            component: _specialitem2.default,
            key: listArrs.indexOf(item),
            props: {
              content: item.contents[0],
              itemsToTemplate: item.itemsToTemplate
            }
          };
        })
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      _request2.default.fetchHomeData().then(function (result) {
        //console.log('*********', result);

        _this2.setState({
          baseData: result.data.data
        });
        //console.log('===== state' + result.data.data);
      }).then(function (error) {
        //console.log(error);
      });
    }
  }]);
  return Home;
}(_labradorImmutable.Component);


//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiYW55IiwiSG9tZSIsInByb3BzIiwic3RhdGUiLCJiYW5BcnJzIiwiYmFzZURhdGEiLCJpbmRleF9sYiIsIm5hdmlBcnJzIiwiYnV0dG9uIiwibGlzdEFycnMiLCJ0ZW1wbGF0ZXMiLCJzbGljZSIsImJhbm5lciIsImNvbXBvbmVudCIsIml0ZW1BcnIiLCJuYXZpYnRucyIsInNwZWNpYWxsaXN0IiwibWFwIiwiaXRlbSIsImtleSIsImluZGV4T2YiLCJjb250ZW50IiwiY29udGVudHMiLCJpdGVtc1RvVGVtcGxhdGUiLCJmZXRjaEhvbWVEYXRhIiwidGhlbiIsInJlc3VsdCIsInNldFN0YXRlIiwiZGF0YSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVRQSxHLGdDQUFBQSxHOztJQUVGQyxJOzs7QUFLSixnQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGtJQUNYQSxLQURXOztBQUVqQixVQUFLQyxLQUFMLEdBQWEsaUNBQVUsRUFBVixDQUFiO0FBRmlCO0FBR2xCOzs7OytCQUVVO0FBQ1QsVUFBTUMsVUFBVSxLQUFLRCxLQUFMLENBQVdFLFFBQVgsQ0FBb0JDLFFBQXBDO0FBQ0EsVUFBTUMsV0FBVyxLQUFLSixLQUFMLENBQVdFLFFBQVgsQ0FBb0JHLE1BQXJDO0FBQ0EsVUFBSUMsV0FBVyxLQUFLTixLQUFMLENBQVdFLFFBQVgsQ0FBb0JLLFNBQXBCLENBQThCQyxLQUE5QixDQUFvQyxDQUFwQyxDQUFmO0FBQ0E7QUFDQSxhQUFPO0FBQ0xDLGdCQUFRO0FBQ05DLHFDQURNO0FBRU5YLGlCQUFPO0FBQ0xZLHFCQUFTVjtBQURKO0FBRkQsU0FESDtBQU9MVyxrQkFBVTtBQUNSRix1Q0FEUTtBQUVSWCxpQkFBTztBQUNMWSxxQkFBU1A7QUFESjtBQUZDLFNBUEw7QUFhTFMscUJBQWFQLFNBQVNRLEdBQVQsQ0FBYSxVQUFDQyxJQUFEO0FBQUEsaUJBQVc7QUFDbkNMLDRDQURtQztBQUVuQ00saUJBQUtWLFNBQVNXLE9BQVQsQ0FBaUJGLElBQWpCLENBRjhCO0FBR25DaEIsbUJBQU87QUFDTG1CLHVCQUFTSCxLQUFLSSxRQUFMLENBQWMsQ0FBZCxDQURKO0FBRUxDLCtCQUFpQkwsS0FBS0s7QUFGakI7QUFINEIsV0FBWDtBQUFBLFNBQWI7QUFiUixPQUFQO0FBc0JEOzs7NkJBRVE7QUFBQTs7QUFDUCx3QkFBUUMsYUFBUixHQUNDQyxJQURELENBQ00sVUFBQ0MsTUFBRCxFQUFZO0FBQ2hCOztBQUVBLGVBQUtDLFFBQUwsQ0FBYztBQUNadEIsb0JBQVVxQixPQUFPRSxJQUFQLENBQVlBO0FBRFYsU0FBZDtBQUdBO0FBQ0QsT0FSRCxFQVNDSCxJQVRELENBU00sVUFBQ0ksS0FBRCxFQUFXO0FBQ2Y7QUFDRCxPQVhEO0FBWUQ7Ozs7O2tCQUlZNUIsSSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdsYWJyYWRvci1pbW11dGFibGUnO1xuaW1wb3J0IGltbXV0YWJsZSBmcm9tICdzZWFtbGVzcy1pbW11dGFibGUnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vLi4vdXRpbHMvcmVxdWVzdCc7XG5pbXBvcnQgYmFubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYmFubmVyL2Jhbm5lcic7XG5pbXBvcnQgbmF2aWJ0bnMgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZpYnRucy9uYXZpYnRucyc7XG5pbXBvcnQgc3BlY2lhbGl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zcGVjaWFsaXRlbS9zcGVjaWFsaXRlbSc7XG5cbmNvbnN0IHsgYW55IH0gPSBQcm9wVHlwZXM7XG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0ZToge1xuICAgIGJhc2VEYXRhOiB7fVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IGltbXV0YWJsZSh7fSk7XG4gIH1cblxuICBjaGlsZHJlbigpIHtcbiAgICBjb25zdCBiYW5BcnJzID0gdGhpcy5zdGF0ZS5iYXNlRGF0YS5pbmRleF9sYjtcbiAgICBjb25zdCBuYXZpQXJycyA9IHRoaXMuc3RhdGUuYmFzZURhdGEuYnV0dG9uO1xuICAgIGxldCBsaXN0QXJycyA9IHRoaXMuc3RhdGUuYmFzZURhdGEudGVtcGxhdGVzLnNsaWNlKDQpO1xuICAgIC8vY29uc29sZS5sb2coJyoqKionLCBsaXN0QXJycyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhbm5lcjoge1xuICAgICAgICBjb21wb25lbnQ6IGJhbm5lcixcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBpdGVtQXJyOiBiYW5BcnJzXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBuYXZpYnRuczoge1xuICAgICAgICBjb21wb25lbnQ6IG5hdmlidG5zLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGl0ZW1BcnI6IG5hdmlBcnJzXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzcGVjaWFsbGlzdDogbGlzdEFycnMubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICBjb21wb25lbnQ6IHNwZWNpYWxpdGVtLFxuICAgICAgICBrZXk6IGxpc3RBcnJzLmluZGV4T2YoaXRlbSksXG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgY29udGVudDogaXRlbS5jb250ZW50c1swXSxcbiAgICAgICAgICBpdGVtc1RvVGVtcGxhdGU6IGl0ZW0uaXRlbXNUb1RlbXBsYXRlXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH07XG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgcmVxdWVzdC5mZXRjaEhvbWVEYXRhKClcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKCcqKioqKioqKionLCByZXN1bHQpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgYmFzZURhdGE6IHJlc3VsdC5kYXRhLmRhdGFcbiAgICAgIH0pO1xuICAgICAgLy9jb25zb2xlLmxvZygnPT09PT0gc3RhdGUnICsgcmVzdWx0LmRhdGEuZGF0YSk7XG4gICAgfSlcbiAgICAudGhlbigoZXJyb3IpID0+IHtcbiAgICAgIC8vY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdfQ==
Page(require('../../npm/labrador/index.js')._createPage(Home));
