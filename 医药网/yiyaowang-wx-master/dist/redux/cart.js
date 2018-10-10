"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = exports.INITIAL_STATE = exports.ADD = undefined;

var _defineProperty2 = require('../npm/babel-runtime/helpers/defineProperty.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _reduxActions = require('../npm/redux-actions/lib/index.js');

var _seamlessImmutable = require('../npm/seamless-immutable/src/seamless-immutable.js');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADD = exports.ADD = 'ADD';

var INITIAL_STATE = exports.INITIAL_STATE = (0, _seamlessImmutable2.default)([]);

var add = exports.add = (0, _reduxActions.createAction)(ADD, function (todos) {
  return todos;
});

exports.default = (0, _reduxActions.handleActions)((0, _defineProperty3.default)({}, ADD, function (state, _ref) {
  var payload = _ref.payload;
  return state.map(function (todo) {
    return todo.id === payload.id ? todo.merge({ number: payload.sellStatus + 1 }) : todo;
  });
}), INITIAL_STATE);
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQUREIiwiSU5JVElBTF9TVEFURSIsImFkZCIsInRvZG9zIiwic3RhdGUiLCJwYXlsb2FkIiwibWFwIiwidG9kbyIsImlkIiwibWVyZ2UiLCJudW1iZXIiLCJzZWxsU3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFFTyxJQUFNQSxvQkFBTSxLQUFaOztBQUVBLElBQU1DLHdDQUFnQixpQ0FBVSxFQUFWLENBQXRCOztBQUVBLElBQU1DLG9CQUFNLGdDQUFhRixHQUFiLEVBQWtCLFVBQUNHLEtBQUQ7QUFBQSxTQUFZQSxLQUFaO0FBQUEsQ0FBbEIsQ0FBWjs7a0JBRVEsbUVBRVpILEdBRlksRUFFTixVQUFDSSxLQUFEO0FBQUEsTUFBVUMsT0FBVixRQUFVQSxPQUFWO0FBQUEsU0FBd0JELE1BQU1FLEdBQU4sQ0FBVSxVQUFDQyxJQUFEO0FBQUEsV0FDdkNBLEtBQUtDLEVBQUwsS0FBWUgsUUFBUUcsRUFBcEIsR0FBeUJELEtBQUtFLEtBQUwsQ0FBVyxFQUFFQyxRQUFRTCxRQUFRTSxVQUFSLEdBQXFCLENBQS9CLEVBQVgsQ0FBekIsR0FBMEVKLElBRG5DO0FBQUEsR0FBVixDQUF4QjtBQUFBLENBRk0sR0FJWk4sYUFKWSxDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVBY3Rpb24sIGhhbmRsZUFjdGlvbnMgfSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCBpbW11dGFibGUgZnJvbSAnc2VhbWxlc3MtaW1tdXRhYmxlJztcblxuZXhwb3J0IGNvbnN0IEFERCA9ICdBREQnO1xuXG5leHBvcnQgY29uc3QgSU5JVElBTF9TVEFURSA9IGltbXV0YWJsZShbXSk7XG5cbmV4cG9ydCBjb25zdCBhZGQgPSBjcmVhdGVBY3Rpb24oQURELCAodG9kb3MpID0+ICh0b2RvcykpO1xuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVBY3Rpb25zKHtcblxuICBbQUREXTogKHN0YXRlLCB7IHBheWxvYWQgfSkgPT4gc3RhdGUubWFwKCh0b2RvKSA9PiAoXG4gICAgdG9kby5pZCA9PT0gcGF5bG9hZC5pZCA/IHRvZG8ubWVyZ2UoeyBudW1iZXI6IHBheWxvYWQuc2VsbFN0YXR1cyArIDEgfSkgOiB0b2RvKSlcbn0sIElOSVRJQUxfU1RBVEUpO1xuIl19