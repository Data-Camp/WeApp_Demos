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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Category = function (_Component) {
  (0, _inherits3.default)(Category, _Component);

  function Category(props) {
    (0, _classCallCheck3.default)(this, Category);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Category.__proto__ || (0, _getPrototypeOf2.default)(Category)).call(this, props));

    console.log('======== init');
    _this.state = {
      leftArr: [],
      rightArr: [],
      selectIndex: 0,
      scrollTop: 0
    };
    return _this;
  }

  (0, _createClass3.default)(Category, [{
    key: 'children',
    value: function children() {
      return {};
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this2 = this;

      _request2.default.fetchFirstCategory().then(function (result) {
        console.log('***fetchFirstCategory()', result);
        _this2.setState({
          leftArr: result.data.data.categoryinfo
        });
        console.log('=====', _this2.state.leftArr);
      }).then(function (error) {
        console.log(error);
      });

      _request2.default.fetchSecondCategory().then(function (result) {
        // console.log('***fetchFirstCategory()', result);
        _this2.setState({
          rightArr: result.data.data.categoryinfo
        });
        console.log('=====', _this2.state.rightArr);
      }).then(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'requestSecondCategory',
    value: function requestSecondCategory(fatherid) {
      var _this3 = this;

      _request2.default.fetchSecondCategory(fatherid).then(function (result) {
        // console.log('***fetchFirstCategory()', result);
        _this3.setState({
          rightArr: result.data.data.categoryinfo,
          scrollTop: 0
        });
        // console.log('=====', this.state.rightArr);
      }).then(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'handleTap',
    value: function handleTap(e) {
      // console.log(e.currentTarget.id);
      this.setState({
        selectIndex: e.currentTarget.id,
        scrollTop: -10
      });
      var fatherid = this.state.leftArr[e.currentTarget.id].id;
      this.requestSecondCategory(fatherid);
    }
  }]);
  return Category;
}(_labradorImmutable.Component);


//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwic3RhdGUiLCJsZWZ0QXJyIiwicmlnaHRBcnIiLCJzZWxlY3RJbmRleCIsInNjcm9sbFRvcCIsImZldGNoRmlyc3RDYXRlZ29yeSIsInRoZW4iLCJyZXN1bHQiLCJzZXRTdGF0ZSIsImRhdGEiLCJjYXRlZ29yeWluZm8iLCJlcnJvciIsImZldGNoU2Vjb25kQ2F0ZWdvcnkiLCJmYXRoZXJpZCIsImUiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJyZXF1ZXN0U2Vjb25kQ2F0ZWdvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFE7OztBQUdKLG9CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMElBQ1hBLEtBRFc7O0FBRWpCQyxZQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxlQUFTLEVBREU7QUFFWEMsZ0JBQVUsRUFGQztBQUdYQyxtQkFBYSxDQUhGO0FBSVhDLGlCQUFXO0FBSkEsS0FBYjtBQUhpQjtBQVNsQjs7OzsrQkFFVTtBQUNULGFBQU8sRUFBUDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCx3QkFBUUMsa0JBQVIsR0FDQ0MsSUFERCxDQUNNLFVBQUNDLE1BQUQsRUFBWTtBQUNoQlQsZ0JBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1Q1EsTUFBdkM7QUFDQSxlQUFLQyxRQUFMLENBQWM7QUFDWlAsbUJBQVNNLE9BQU9FLElBQVAsQ0FBWUEsSUFBWixDQUFpQkM7QUFEZCxTQUFkO0FBR0FaLGdCQUFRQyxHQUFSLENBQVksT0FBWixFQUFxQixPQUFLQyxLQUFMLENBQVdDLE9BQWhDO0FBQ0QsT0FQRCxFQVFDSyxJQVJELENBUU0sVUFBQ0ssS0FBRCxFQUFXO0FBQ2ZiLGdCQUFRQyxHQUFSLENBQVlZLEtBQVo7QUFDRCxPQVZEOztBQVlBLHdCQUFRQyxtQkFBUixHQUNDTixJQURELENBQ00sVUFBQ0MsTUFBRCxFQUFZO0FBQ2hCO0FBQ0EsZUFBS0MsUUFBTCxDQUFjO0FBQ1pOLG9CQUFVSyxPQUFPRSxJQUFQLENBQVlBLElBQVosQ0FBaUJDO0FBRGYsU0FBZDtBQUdBWixnQkFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUIsT0FBS0MsS0FBTCxDQUFXRSxRQUFoQztBQUNELE9BUEQsRUFRQ0ksSUFSRCxDQVFNLFVBQUNLLEtBQUQsRUFBVztBQUNmYixnQkFBUUMsR0FBUixDQUFZWSxLQUFaO0FBQ0QsT0FWRDtBQVdEOzs7MENBR3FCRSxRLEVBQVU7QUFBQTs7QUFDOUIsd0JBQVFELG1CQUFSLENBQTRCQyxRQUE1QixFQUNDUCxJQURELENBQ00sVUFBQ0MsTUFBRCxFQUFZO0FBQ2hCO0FBQ0EsZUFBS0MsUUFBTCxDQUFjO0FBQ1pOLG9CQUFVSyxPQUFPRSxJQUFQLENBQVlBLElBQVosQ0FBaUJDLFlBRGY7QUFFWk4scUJBQVc7QUFGQyxTQUFkO0FBSUE7QUFDRCxPQVJELEVBU0NFLElBVEQsQ0FTTSxVQUFDSyxLQUFELEVBQVc7QUFDZmIsZ0JBQVFDLEdBQVIsQ0FBWVksS0FBWjtBQUNELE9BWEQ7QUFZRDs7OzhCQUVTRyxDLEVBQUc7QUFDWDtBQUNBLFdBQUtOLFFBQUwsQ0FBYztBQUNaTCxxQkFBYVcsRUFBRUMsYUFBRixDQUFnQkMsRUFEakI7QUFFWlosbUJBQVcsQ0FBQztBQUZBLE9BQWQ7QUFJQSxVQUFJUyxXQUFXLEtBQUtiLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQmEsRUFBRUMsYUFBRixDQUFnQkMsRUFBbkMsRUFBdUNBLEVBQXREO0FBQ0EsV0FBS0MscUJBQUwsQ0FBMkJKLFFBQTNCO0FBQ0Q7Ozs7O2tCQUtZakIsUSIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdsYWJyYWRvci1pbW11dGFibGUnO1xuaW1wb3J0IGltbXV0YWJsZSBmcm9tICdzZWFtbGVzcy1pbW11dGFibGUnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAnLi4vLi4vdXRpbHMvcmVxdWVzdCc7XG5cbmNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnNvbGUubG9nKCc9PT09PT09PSBpbml0Jyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxlZnRBcnI6IFtdLFxuICAgICAgcmlnaHRBcnI6IFtdLFxuICAgICAgc2VsZWN0SW5kZXg6IDAsXG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9O1xuICB9XG5cbiAgY2hpbGRyZW4oKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgb25Mb2FkKCkge1xuICAgIHJlcXVlc3QuZmV0Y2hGaXJzdENhdGVnb3J5KClcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnKioqZmV0Y2hGaXJzdENhdGVnb3J5KCknLCByZXN1bHQpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxlZnRBcnI6IHJlc3VsdC5kYXRhLmRhdGEuY2F0ZWdvcnlpbmZvXG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCc9PT09PScsIHRoaXMuc3RhdGUubGVmdEFycik7XG4gICAgfSlcbiAgICAudGhlbigoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcblxuICAgIHJlcXVlc3QuZmV0Y2hTZWNvbmRDYXRlZ29yeSgpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coJyoqKmZldGNoRmlyc3RDYXRlZ29yeSgpJywgcmVzdWx0KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICByaWdodEFycjogcmVzdWx0LmRhdGEuZGF0YS5jYXRlZ29yeWluZm9cbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJz09PT09JywgdGhpcy5zdGF0ZS5yaWdodEFycik7XG4gICAgfSlcbiAgICAudGhlbigoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgcmVxdWVzdFNlY29uZENhdGVnb3J5KGZhdGhlcmlkKSB7XG4gICAgcmVxdWVzdC5mZXRjaFNlY29uZENhdGVnb3J5KGZhdGhlcmlkKVxuICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCcqKipmZXRjaEZpcnN0Q2F0ZWdvcnkoKScsIHJlc3VsdCk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcmlnaHRBcnI6IHJlc3VsdC5kYXRhLmRhdGEuY2F0ZWdvcnlpbmZvLFxuICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coJz09PT09JywgdGhpcy5zdGF0ZS5yaWdodEFycik7XG4gICAgfSlcbiAgICAudGhlbigoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVRhcChlKSB7XG4gICAgLy8gY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmlkKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlbGVjdEluZGV4OiBlLmN1cnJlbnRUYXJnZXQuaWQsXG4gICAgICBzY3JvbGxUb3A6IC0xMFxuICAgIH0pO1xuICAgIGxldCBmYXRoZXJpZCA9IHRoaXMuc3RhdGUubGVmdEFycltlLmN1cnJlbnRUYXJnZXQuaWRdLmlkO1xuICAgIHRoaXMucmVxdWVzdFNlY29uZENhdGVnb3J5KGZhdGhlcmlkKTtcbiAgfVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2F0ZWdvcnk7XG4iXX0=
Page(require('../../npm/labrador/index.js')._createPage(Category));
