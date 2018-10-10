"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _labradorStorage = require('../npm/labrador-storage/index.js');

var _labradorStorage2 = _interopRequireDefault(_labradorStorage);

var _immutableTransform = require('../utils/immutable-transform.js');

var _immutableTransform2 = _interopRequireDefault(_immutableTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Redux 数据持久化设置
exports.default = {
  storage: _labradorStorage2.default,
  //blacklist: [], // 可选，你【不想】存储的Redux store数据key列表
  // whitelist: ['todos', 'user'], // 可选，你【只想】存储的Redux store数据key列表
  transforms: [_immutableTransform2.default]
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHV4LXBlcnNpc3QuanMiXSwibmFtZXMiOlsic3RvcmFnZSIsInRyYW5zZm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBO2tCQUNlO0FBQ2JBLG9DQURhO0FBRWI7QUFDQTtBQUNBQyxjQUFZO0FBSkMsQyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzeW5jU3RvcmFnZSBmcm9tICdsYWJyYWRvci1zdG9yYWdlJztcbmltcG9ydCBpbW11dGFibGVUcmFuc2Zvcm0gZnJvbSAnLi4vdXRpbHMvaW1tdXRhYmxlLXRyYW5zZm9ybSc7XG5cbi8vIFJlZHV4IOaVsOaNruaMgeS5heWMluiuvue9rlxuZXhwb3J0IGRlZmF1bHQge1xuICBzdG9yYWdlOiBBc3luY1N0b3JhZ2UsXG4gIC8vYmxhY2tsaXN0OiBbXSwgLy8g5Y+v6YCJ77yM5L2g44CQ5LiN5oOz44CR5a2Y5YKo55qEUmVkdXggc3RvcmXmlbDmja5rZXnliJfooahcbiAgLy8gd2hpdGVsaXN0OiBbJ3RvZG9zJywgJ3VzZXInXSwgLy8g5Y+v6YCJ77yM5L2g44CQ5Y+q5oOz44CR5a2Y5YKo55qEUmVkdXggc3RvcmXmlbDmja5rZXnliJfooahcbiAgdHJhbnNmb3JtczogW2ltbXV0YWJsZVRyYW5zZm9ybV1cbn07XG4iXX0=