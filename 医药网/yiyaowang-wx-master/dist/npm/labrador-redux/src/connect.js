"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('../../babel-runtime/helpers/extends.js');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = connect;

var _utils = require('../../labrador/utils.js');

var utils = _interopRequireWildcard(_utils);

var _store = require('./util/store.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultMapStateToProps = function defaultMapStateToProps() {
  return {};
}; /**
    * @copyright Maichong Software Ltd. 2016 http://maichong.it
    * @date 2016-11-09
    * @author Li <li@maichong.it>
    */


var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
  return (0, _extends3.default)({}, parentProps, stateProps, dispatchProps);
};

function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  var shouldSubscribe = !!mapStateToProps;
  mapStateToProps = mapStateToProps || defaultMapStateToProps;
  mapDispatchToProps = mapDispatchToProps || defaultMapStateToProps;
  mergeProps = mergeProps || defaultMergeProps;

  return function wrapWithConnect(component) {
    if (!shouldSubscribe && mapDispatchToProps === defaultMapStateToProps) {
      return component;
    }
    var unSubscribe = void 0;
    var onLoad = component.prototype.onLoad;
    var onUnload = component.prototype.onUnload;
    var connected = false;

    function onStateChange() {
      var store = (0, _store.getStore)();
      var mappedProps = mapStateToProps(store.getState());
      if (connected && !utils.shouldUpdate(this.props, mappedProps)) {
        return;
      }
      var dispatchProps = mapDispatchToProps(store.dispatch);
      var nextProps = mergeProps(mappedProps, dispatchProps, this.props);
      if (this.onUpdate) {
        this.onUpdate(nextProps);
        if (true) {
          // Development
          console.log('%c%s onUpdate(%o) Component:%o', 'color:#2a8f99', this.id, utils.getDebugObject(nextProps), this);
        }
      }
      this.props = nextProps;
      this._update();
    }

    component.prototype.onLoad = function () {
      var store = (0, _store.getStore)();
      if (!store) {
        console.error('store对象不存在,请前往"app.js"文件中使用"redux"创建store,并传参到"labrador-redux"的setStore()方法中');
      }
      if (shouldSubscribe) {
        // 如果指定了 mapDispatchToProps 参数才监听store
        unSubscribe = store.subscribe(onStateChange.bind(this));
      }
      onStateChange.call(this);
      if (onLoad) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        onLoad.apply(this, args);
      }
    };

    component.prototype.onUnload = function () {
      if (unSubscribe) {
        unSubscribe();
      }
      if (onUnload) {
        onUnload.call(this);
      }
    };

    return component;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3QuanMiXSwibmFtZXMiOlsiY29ubmVjdCIsInV0aWxzIiwiZGVmYXVsdE1hcFN0YXRlVG9Qcm9wcyIsImRlZmF1bHRNZXJnZVByb3BzIiwic3RhdGVQcm9wcyIsImRpc3BhdGNoUHJvcHMiLCJwYXJlbnRQcm9wcyIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm1lcmdlUHJvcHMiLCJzaG91bGRTdWJzY3JpYmUiLCJ3cmFwV2l0aENvbm5lY3QiLCJjb21wb25lbnQiLCJ1blN1YnNjcmliZSIsIm9uTG9hZCIsInByb3RvdHlwZSIsIm9uVW5sb2FkIiwiY29ubmVjdGVkIiwib25TdGF0ZUNoYW5nZSIsInN0b3JlIiwibWFwcGVkUHJvcHMiLCJnZXRTdGF0ZSIsInNob3VsZFVwZGF0ZSIsInByb3BzIiwiZGlzcGF0Y2giLCJuZXh0UHJvcHMiLCJvblVwZGF0ZSIsIl9fREVWX18iLCJjb25zb2xlIiwibG9nIiwiaWQiLCJnZXREZWJ1Z09iamVjdCIsIl91cGRhdGUiLCJlcnJvciIsInN1YnNjcmliZSIsImJpbmQiLCJjYWxsIiwiYXJncyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQWtCd0JBLE87O0FBVnhCOztJQUFZQyxLOztBQUNaOzs7Ozs7QUFFQSxJQUFNQyx5QkFBbUMsU0FBbkNBLHNCQUFtQztBQUFBLFNBQU8sRUFBUDtBQUFBLENBQXpDLEMsQ0FYQTs7Ozs7OztBQVlBLElBQU1DLG9CQUE4QixTQUE5QkEsaUJBQThCLENBQUNDLFVBQUQsRUFBYUMsYUFBYixFQUE0QkMsV0FBNUI7QUFBQSxvQ0FDL0JBLFdBRCtCLEVBRS9CRixVQUYrQixFQUcvQkMsYUFIK0I7QUFBQSxDQUFwQzs7QUFNZSxTQUFTTCxPQUFULENBQWlCTyxlQUFqQixFQUE0Q0Msa0JBQTVDLEVBQTBFQyxVQUExRSxFQUFnRztBQUM3RyxNQUFNQyxrQkFBMkIsQ0FBQyxDQUFDSCxlQUFuQztBQUNBQSxvQkFBa0JBLG1CQUFtQkwsc0JBQXJDO0FBQ0FNLHVCQUFxQkEsc0JBQXNCTixzQkFBM0M7QUFDQU8sZUFBYUEsY0FBY04saUJBQTNCOztBQUVBLFNBQU8sU0FBU1EsZUFBVCxDQUF5QkMsU0FBekIsRUFBK0M7QUFDcEQsUUFBSSxDQUFDRixlQUFELElBQW9CRix1QkFBdUJOLHNCQUEvQyxFQUF1RTtBQUNyRSxhQUFPVSxTQUFQO0FBQ0Q7QUFDRCxRQUFJQyxvQkFBSjtBQUNBLFFBQUlDLFNBQW1CRixVQUFVRyxTQUFWLENBQW9CRCxNQUEzQztBQUNBLFFBQUlFLFdBQXFCSixVQUFVRyxTQUFWLENBQW9CQyxRQUE3QztBQUNBLFFBQUlDLFlBQVksS0FBaEI7O0FBRUEsYUFBU0MsYUFBVCxHQUF5QjtBQUN2QixVQUFNQyxRQUFRLHNCQUFkO0FBQ0EsVUFBSUMsY0FBd0JiLGdCQUFnQlksTUFBTUUsUUFBTixFQUFoQixDQUE1QjtBQUNBLFVBQUlKLGFBQWEsQ0FBQ2hCLE1BQU1xQixZQUFOLENBQW1CLEtBQUtDLEtBQXhCLEVBQStCSCxXQUEvQixDQUFsQixFQUErRDtBQUM3RDtBQUNEO0FBQ0QsVUFBSWYsZ0JBQWdCRyxtQkFBbUJXLE1BQU1LLFFBQXpCLENBQXBCO0FBQ0EsVUFBSUMsWUFBc0JoQixXQUFXVyxXQUFYLEVBQXdCZixhQUF4QixFQUF1QyxLQUFLa0IsS0FBNUMsQ0FBMUI7QUFDQSxVQUFJLEtBQUtHLFFBQVQsRUFBbUI7QUFDakIsYUFBS0EsUUFBTCxDQUFjRCxTQUFkO0FBQ0EsWUFBSUUsT0FBSixFQUFhO0FBQ1g7QUFDQUMsa0JBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUNFLGVBREYsRUFFRSxLQUFLQyxFQUZQLEVBRVc3QixNQUFNOEIsY0FBTixDQUFxQk4sU0FBckIsQ0FGWCxFQUdFLElBSEY7QUFLRDtBQUNGO0FBQ0QsV0FBS0YsS0FBTCxHQUFhRSxTQUFiO0FBQ0EsV0FBS08sT0FBTDtBQUNEOztBQUVEcEIsY0FBVUcsU0FBVixDQUFvQkQsTUFBcEIsR0FBNkIsWUFBbUI7QUFDOUMsVUFBSUssUUFBa0Isc0JBQXRCO0FBQ0EsVUFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDVlMsZ0JBQVFLLEtBQVIsQ0FBYyw4RUFBZDtBQUNEO0FBQ0QsVUFBSXZCLGVBQUosRUFBcUI7QUFDbkI7QUFDQUcsc0JBQWNNLE1BQU1lLFNBQU4sQ0FBZ0JoQixjQUFjaUIsSUFBZCxDQUFtQixJQUFuQixDQUFoQixDQUFkO0FBQ0Q7QUFDRGpCLG9CQUFja0IsSUFBZCxDQUFtQixJQUFuQjtBQUNBLFVBQUl0QixNQUFKLEVBQVk7QUFBQSwwQ0FWNEJ1QixJQVU1QjtBQVY0QkEsY0FVNUI7QUFBQTs7QUFDVnZCLGVBQU93QixLQUFQLENBQWEsSUFBYixFQUFtQkQsSUFBbkI7QUFDRDtBQUNGLEtBYkQ7O0FBZUF6QixjQUFVRyxTQUFWLENBQW9CQyxRQUFwQixHQUErQixZQUFZO0FBQ3pDLFVBQUlILFdBQUosRUFBaUI7QUFDZkE7QUFDRDtBQUNELFVBQUlHLFFBQUosRUFBYztBQUNaQSxpQkFBU29CLElBQVQsQ0FBYyxJQUFkO0FBQ0Q7QUFDRixLQVBEOztBQVNBLFdBQU94QixTQUFQO0FBQ0QsR0F6REQ7QUEwREQiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBNYWljaG9uZyBTb2Z0d2FyZSBMdGQuIDIwMTYgaHR0cDovL21haWNob25nLml0XG4gKiBAZGF0ZSAyMDE2LTExLTA5XG4gKiBAYXV0aG9yIExpIDxsaUBtYWljaG9uZy5pdD5cbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBDb21wb25lbnQgfSBmcm9tICdsYWJyYWRvcic7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICdsYWJyYWRvci91dGlscyc7XG5pbXBvcnQgeyBnZXRTdG9yZSB9IGZyb20gJy4vdXRpbC9zdG9yZSc7XG5cbmNvbnN0IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHM6IEZ1bmN0aW9uID0gKCkgPT4gKHt9KTtcbmNvbnN0IGRlZmF1bHRNZXJnZVByb3BzOiBGdW5jdGlvbiA9IChzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBwYXJlbnRQcm9wcykgPT4gKHtcbiAgLi4ucGFyZW50UHJvcHMsXG4gIC4uLnN0YXRlUHJvcHMsXG4gIC4uLmRpc3BhdGNoUHJvcHNcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wczogRnVuY3Rpb24sIG1hcERpc3BhdGNoVG9Qcm9wczogRnVuY3Rpb24sIG1lcmdlUHJvcHM6IEZ1bmN0aW9uKSB7XG4gIGNvbnN0IHNob3VsZFN1YnNjcmliZTogYm9vbGVhbiA9ICEhbWFwU3RhdGVUb1Byb3BzO1xuICBtYXBTdGF0ZVRvUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMgfHwgZGVmYXVsdE1hcFN0YXRlVG9Qcm9wcztcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzIHx8IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHM7XG4gIG1lcmdlUHJvcHMgPSBtZXJnZVByb3BzIHx8IGRlZmF1bHRNZXJnZVByb3BzO1xuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwV2l0aENvbm5lY3QoY29tcG9uZW50OiBDb21wb25lbnQpIHtcbiAgICBpZiAoIXNob3VsZFN1YnNjcmliZSAmJiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHMpIHtcbiAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIGxldCB1blN1YnNjcmliZTogRnVuY3Rpb247XG4gICAgbGV0IG9uTG9hZDogRnVuY3Rpb24gPSBjb21wb25lbnQucHJvdG90eXBlLm9uTG9hZDtcbiAgICBsZXQgb25VbmxvYWQ6IEZ1bmN0aW9uID0gY29tcG9uZW50LnByb3RvdHlwZS5vblVubG9hZDtcbiAgICBsZXQgY29ubmVjdGVkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgY29uc3Qgc3RvcmUgPSBnZXRTdG9yZSgpO1xuICAgICAgbGV0IG1hcHBlZFByb3BzOiAkRGF0YU1hcCA9IG1hcFN0YXRlVG9Qcm9wcyhzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICAgIGlmIChjb25uZWN0ZWQgJiYgIXV0aWxzLnNob3VsZFVwZGF0ZSh0aGlzLnByb3BzLCBtYXBwZWRQcm9wcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoc3RvcmUuZGlzcGF0Y2gpO1xuICAgICAgbGV0IG5leHRQcm9wczogJERhdGFNYXAgPSBtZXJnZVByb3BzKG1hcHBlZFByb3BzLCBkaXNwYXRjaFByb3BzLCB0aGlzLnByb3BzKTtcbiAgICAgIGlmICh0aGlzLm9uVXBkYXRlKSB7XG4gICAgICAgIHRoaXMub25VcGRhdGUobmV4dFByb3BzKTtcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICAvLyBEZXZlbG9wbWVudFxuICAgICAgICAgIGNvbnNvbGUubG9nKCclYyVzIG9uVXBkYXRlKCVvKSBDb21wb25lbnQ6JW8nLFxuICAgICAgICAgICAgJ2NvbG9yOiMyYThmOTknLFxuICAgICAgICAgICAgdGhpcy5pZCwgdXRpbHMuZ2V0RGVidWdPYmplY3QobmV4dFByb3BzKSxcbiAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50LnByb3RvdHlwZS5vbkxvYWQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgbGV0IHN0b3JlOiAkRGF0YU1hcCA9IGdldFN0b3JlKCk7XG4gICAgICBpZiAoIXN0b3JlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3N0b3Jl5a+56LGh5LiN5a2Y5ZyoLOivt+WJjeW+gFwiYXBwLmpzXCLmlofku7bkuK3kvb/nlKhcInJlZHV4XCLliJvlu7pzdG9yZSzlubbkvKDlj4LliLBcImxhYnJhZG9yLXJlZHV4XCLnmoRzZXRTdG9yZSgp5pa55rOV5LitJyk7XG4gICAgICB9XG4gICAgICBpZiAoc2hvdWxkU3Vic2NyaWJlKSB7XG4gICAgICAgIC8vIOWmguaenOaMh+WumuS6hiBtYXBEaXNwYXRjaFRvUHJvcHMg5Y+C5pWw5omN55uR5ZCsc3RvcmVcbiAgICAgICAgdW5TdWJzY3JpYmUgPSBzdG9yZS5zdWJzY3JpYmUob25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICAgIH1cbiAgICAgIG9uU3RhdGVDaGFuZ2UuY2FsbCh0aGlzKTtcbiAgICAgIGlmIChvbkxvYWQpIHtcbiAgICAgICAgb25Mb2FkLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb21wb25lbnQucHJvdG90eXBlLm9uVW5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHVuU3Vic2NyaWJlKSB7XG4gICAgICAgIHVuU3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICBpZiAob25VbmxvYWQpIHtcbiAgICAgICAgb25VbmxvYWQuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbn1cbiJdfQ==