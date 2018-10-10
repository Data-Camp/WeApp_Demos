"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storages = exports.purgeStoredState = exports.persistStore = exports.getStoredState = exports.createTransform = exports.createPersistor = exports.autoRehydrate = undefined;

var _asyncLocalStorage = require('./defaults/asyncLocalStorage.js');

var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);

var _autoRehydrate = require('./autoRehydrate.js');

var _autoRehydrate2 = _interopRequireDefault(_autoRehydrate);

var _createPersistor = require('./createPersistor.js');

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _createTransform = require('./createTransform.js');

var _createTransform2 = _interopRequireDefault(_createTransform);

var _getStoredState = require('./getStoredState.js');

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _persistStore = require('./persistStore.js');

var _persistStore2 = _interopRequireDefault(_persistStore);

var _purgeStoredState = require('./purgeStoredState.js');

var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storageDeprecatedMessage = function storageDeprecatedMessage(type) {
  return '\n  To import async' + type + 'Storage please import from \'redux-persist/storages\'. For Example:\n  `import { async' + type + 'Storage } from \'redux-persist/storages\'`\n  or `var async' + type + 'Storage = require(\'redux-persist/storages\').async' + type + 'Storage`\n';
};

var storages = {
  asyncLocalStorage: (0, _asyncLocalStorage2.default)('local', { deprecated: storageDeprecatedMessage('Local') }),
  asyncSessionStorage: (0, _asyncLocalStorage2.default)('session', { deprecated: storageDeprecatedMessage('Session') })
};

exports.autoRehydrate = _autoRehydrate2.default;
exports.createPersistor = _createPersistor2.default;
exports.createTransform = _createTransform2.default;
exports.getStoredState = _getStoredState2.default;
exports.persistStore = _persistStore2.default;
exports.purgeStoredState = _purgeStoredState2.default;
exports.storages = storages;
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInN0b3JhZ2VEZXByZWNhdGVkTWVzc2FnZSIsInR5cGUiLCJzdG9yYWdlcyIsImFzeW5jTG9jYWxTdG9yYWdlIiwiZGVwcmVjYXRlZCIsImFzeW5jU2Vzc2lvblN0b3JhZ2UiLCJhdXRvUmVoeWRyYXRlIiwiY3JlYXRlUGVyc2lzdG9yIiwiY3JlYXRlVHJhbnNmb3JtIiwiZ2V0U3RvcmVkU3RhdGUiLCJwZXJzaXN0U3RvcmUiLCJwdXJnZVN0b3JlZFN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLDJCQUEyQixTQUFTQSx3QkFBVCxDQUFrQ0MsSUFBbEMsRUFBd0M7QUFDckUsU0FBTyx3QkFBd0JBLElBQXhCLEdBQStCLHdGQUEvQixHQUEwSEEsSUFBMUgsR0FBaUksNkRBQWpJLEdBQWlNQSxJQUFqTSxHQUF3TSxxREFBeE0sR0FBZ1FBLElBQWhRLEdBQXVRLFlBQTlRO0FBQ0QsQ0FGRDs7QUFJQSxJQUFJQyxXQUFXO0FBQ2JDLHFCQUFtQixpQ0FBd0IsT0FBeEIsRUFBaUMsRUFBRUMsWUFBWUoseUJBQXlCLE9BQXpCLENBQWQsRUFBakMsQ0FETjtBQUViSyx1QkFBcUIsaUNBQXdCLFNBQXhCLEVBQW1DLEVBQUVELFlBQVlKLHlCQUF5QixTQUF6QixDQUFkLEVBQW5DO0FBRlIsQ0FBZjs7UUFLU00sYTtRQUFlQyxlO1FBQWlCQyxlO1FBQWlCQyxjO1FBQWdCQyxZO1FBQWNDLGdCO1FBQWtCVCxRLEdBQUFBLFEiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVBc3luY0xvY2FsU3RvcmFnZSBmcm9tICcuL2RlZmF1bHRzL2FzeW5jTG9jYWxTdG9yYWdlJztcblxuaW1wb3J0IGF1dG9SZWh5ZHJhdGUgZnJvbSAnLi9hdXRvUmVoeWRyYXRlJztcbmltcG9ydCBjcmVhdGVQZXJzaXN0b3IgZnJvbSAnLi9jcmVhdGVQZXJzaXN0b3InO1xuaW1wb3J0IGNyZWF0ZVRyYW5zZm9ybSBmcm9tICcuL2NyZWF0ZVRyYW5zZm9ybSc7XG5pbXBvcnQgZ2V0U3RvcmVkU3RhdGUgZnJvbSAnLi9nZXRTdG9yZWRTdGF0ZSc7XG5pbXBvcnQgcGVyc2lzdFN0b3JlIGZyb20gJy4vcGVyc2lzdFN0b3JlJztcbmltcG9ydCBwdXJnZVN0b3JlZFN0YXRlIGZyb20gJy4vcHVyZ2VTdG9yZWRTdGF0ZSc7XG5cbnZhciBzdG9yYWdlRGVwcmVjYXRlZE1lc3NhZ2UgPSBmdW5jdGlvbiBzdG9yYWdlRGVwcmVjYXRlZE1lc3NhZ2UodHlwZSkge1xuICByZXR1cm4gJ1xcbiAgVG8gaW1wb3J0IGFzeW5jJyArIHR5cGUgKyAnU3RvcmFnZSBwbGVhc2UgaW1wb3J0IGZyb20gXFwncmVkdXgtcGVyc2lzdC9zdG9yYWdlc1xcJy4gRm9yIEV4YW1wbGU6XFxuICBgaW1wb3J0IHsgYXN5bmMnICsgdHlwZSArICdTdG9yYWdlIH0gZnJvbSBcXCdyZWR1eC1wZXJzaXN0L3N0b3JhZ2VzXFwnYFxcbiAgb3IgYHZhciBhc3luYycgKyB0eXBlICsgJ1N0b3JhZ2UgPSByZXF1aXJlKFxcJ3JlZHV4LXBlcnNpc3Qvc3RvcmFnZXNcXCcpLmFzeW5jJyArIHR5cGUgKyAnU3RvcmFnZWBcXG4nO1xufTtcblxudmFyIHN0b3JhZ2VzID0ge1xuICBhc3luY0xvY2FsU3RvcmFnZTogY3JlYXRlQXN5bmNMb2NhbFN0b3JhZ2UoJ2xvY2FsJywgeyBkZXByZWNhdGVkOiBzdG9yYWdlRGVwcmVjYXRlZE1lc3NhZ2UoJ0xvY2FsJykgfSksXG4gIGFzeW5jU2Vzc2lvblN0b3JhZ2U6IGNyZWF0ZUFzeW5jTG9jYWxTdG9yYWdlKCdzZXNzaW9uJywgeyBkZXByZWNhdGVkOiBzdG9yYWdlRGVwcmVjYXRlZE1lc3NhZ2UoJ1Nlc3Npb24nKSB9KVxufTtcblxuZXhwb3J0IHsgYXV0b1JlaHlkcmF0ZSwgY3JlYXRlUGVyc2lzdG9yLCBjcmVhdGVUcmFuc2Zvcm0sIGdldFN0b3JlZFN0YXRlLCBwZXJzaXN0U3RvcmUsIHB1cmdlU3RvcmVkU3RhdGUsIHN0b3JhZ2VzIH07Il19