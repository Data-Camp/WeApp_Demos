"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seamlessImmutable = require('../npm/seamless-immutable/src/seamless-immutable.js');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  out: function out(raw) {
    return (0, _seamlessImmutable2.default)(raw);
  },
  in: function _in(state) {
    return state.asMutable ? state.asMutable({ deep: true }) : state;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltbXV0YWJsZS10cmFuc2Zvcm0uanMiXSwibmFtZXMiOlsib3V0IiwicmF3IiwiaW4iLCJzdGF0ZSIsImFzTXV0YWJsZSIsImRlZXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7a0JBRWM7QUFDWkEsS0FEWSxlQUNSQyxHQURRLEVBQ0g7QUFDUCxXQUFPLGlDQUFVQSxHQUFWLENBQVA7QUFDRCxHQUhXO0FBSVpDLElBSlksZUFJVEMsS0FKUyxFQUlGO0FBQ1IsV0FBT0EsTUFBTUMsU0FBTixHQUFrQkQsTUFBTUMsU0FBTixDQUFnQixFQUFFQyxNQUFNLElBQVIsRUFBaEIsQ0FBbEIsR0FBb0RGLEtBQTNEO0FBQ0Q7QUFOVyxDIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW1tdXRhYmxlIGZyb20gJ3NlYW1sZXNzLWltbXV0YWJsZSc7XG5cbmV4cG9ydCBkZWZhdWx0e1xuICBvdXQocmF3KSB7XG4gICAgcmV0dXJuIGltbXV0YWJsZShyYXcpO1xuICB9LFxuICBpbihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZS5hc011dGFibGUgPyBzdGF0ZS5hc011dGFibGUoeyBkZWVwOiB0cnVlIH0pIDogc3RhdGU7XG4gIH1cbn07XG4iXX0=