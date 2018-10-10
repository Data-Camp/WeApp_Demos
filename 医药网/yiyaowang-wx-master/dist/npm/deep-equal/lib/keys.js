"use strict";var exports=module.exports={};
var _keys = require('../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports = module.exports = typeof _keys2.default === 'function' ? _keys2.default : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtleXMuanMiXSwibmFtZXMiOlsiZXhwb3J0cyIsIm1vZHVsZSIsInNoaW0iLCJvYmoiLCJrZXlzIiwia2V5IiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsVUFBVUMsT0FBT0QsT0FBUCxHQUFpQiwwQkFBdUIsVUFBdkIsb0JBQ1RFLElBRGxCOztBQUdBRixRQUFRRSxJQUFSLEdBQWVBLElBQWY7QUFDQSxTQUFTQSxJQUFULENBQWVDLEdBQWYsRUFBb0I7QUFDbEIsTUFBSUMsT0FBTyxFQUFYO0FBQ0EsT0FBSyxJQUFJQyxHQUFULElBQWdCRixHQUFoQjtBQUFxQkMsU0FBS0UsSUFBTCxDQUFVRCxHQUFWO0FBQXJCLEdBQ0EsT0FBT0QsSUFBUDtBQUNEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbidcbiAgPyBPYmplY3Qua2V5cyA6IHNoaW07XG5cbmV4cG9ydHMuc2hpbSA9IHNoaW07XG5mdW5jdGlvbiBzaGltIChvYmopIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gIHJldHVybiBrZXlzO1xufVxuIl19