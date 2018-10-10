"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('../../babel-runtime/core-js/promise.js');

var _promise2 = _interopRequireDefault(_promise);

exports.default = purgeStoredState;

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function purgeStoredState(config, keys) {
  var storage = config.storage;
  var keyPrefix = config.keyPrefix !== undefined ? config.keyPrefix : _constants.KEY_PREFIX;

  // basic validation
  if (Array.isArray(config)) throw new Error('redux-persist: purgeStoredState requires config as a first argument (found array). An array of keys is the optional second argument.');
  if (!storage) throw new Error('redux-persist: config.storage required in purgeStoredState');

  if (typeof keys === 'undefined') {
    // if keys is not defined, purge all keys
    return new _promise2.default(function (resolve, reject) {
      storage.getAllKeys(function (err, allKeys) {
        if (err && "development" !== 'production') {
          console.warn('redux-persist: error during purgeStoredState in storage.getAllKeys');
          reject(err);
        } else {
          resolve(purgeStoredState(config, allKeys.filter(function (key) {
            return key.indexOf(keyPrefix) === 0;
          }).map(function (key) {
            return key.slice(keyPrefix.length);
          })));
        }
      });
    });
  } else {
    // otherwise purge specified keys
    return _promise2.default.all(keys.map(function (key) {
      return storage.removeItem('' + keyPrefix + key, warnIfRemoveError(key));
    }));
  }
}

function warnIfRemoveError(key) {
  return function removeError(err) {
    if (err && "development" !== 'production') {
      console.warn('Error storing data for key:', key, err);
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1cmdlU3RvcmVkU3RhdGUuanMiXSwibmFtZXMiOlsicHVyZ2VTdG9yZWRTdGF0ZSIsImNvbmZpZyIsImtleXMiLCJzdG9yYWdlIiwia2V5UHJlZml4IiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5IiwiRXJyb3IiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0QWxsS2V5cyIsImVyciIsImFsbEtleXMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwid2FybiIsImZpbHRlciIsImtleSIsImluZGV4T2YiLCJtYXAiLCJzbGljZSIsImxlbmd0aCIsImFsbCIsInJlbW92ZUl0ZW0iLCJ3YXJuSWZSZW1vdmVFcnJvciIsInJlbW92ZUVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQUV3QkEsZ0I7O0FBRnhCOzs7O0FBRWUsU0FBU0EsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDQyxJQUFsQyxFQUF3QztBQUNyRCxNQUFJQyxVQUFVRixPQUFPRSxPQUFyQjtBQUNBLE1BQUlDLFlBQVlILE9BQU9HLFNBQVAsS0FBcUJDLFNBQXJCLEdBQWlDSixPQUFPRyxTQUF4Qyx3QkFBaEI7O0FBRUE7QUFDQSxNQUFJRSxNQUFNQyxPQUFOLENBQWNOLE1BQWQsQ0FBSixFQUEyQixNQUFNLElBQUlPLEtBQUosQ0FBVSxzSUFBVixDQUFOO0FBQzNCLE1BQUksQ0FBQ0wsT0FBTCxFQUFjLE1BQU0sSUFBSUssS0FBSixDQUFVLDREQUFWLENBQU47O0FBRWQsTUFBSSxPQUFPTixJQUFQLEtBQWdCLFdBQXBCLEVBQWlDO0FBQy9CO0FBQ0EsV0FBTyxzQkFBWSxVQUFVTyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1Q1AsY0FBUVEsVUFBUixDQUFtQixVQUFVQyxHQUFWLEVBQWVDLE9BQWYsRUFBd0I7QUFDekMsWUFBSUQsT0FBT0UsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXBDLEVBQWtEO0FBQ2hEQyxrQkFBUUMsSUFBUixDQUFhLG9FQUFiO0FBQ0FSLGlCQUFPRSxHQUFQO0FBQ0QsU0FIRCxNQUdPO0FBQ0xILGtCQUFRVCxpQkFBaUJDLE1BQWpCLEVBQXlCWSxRQUFRTSxNQUFSLENBQWUsVUFBVUMsR0FBVixFQUFlO0FBQzdELG1CQUFPQSxJQUFJQyxPQUFKLENBQVlqQixTQUFaLE1BQTJCLENBQWxDO0FBQ0QsV0FGZ0MsRUFFOUJrQixHQUY4QixDQUUxQixVQUFVRixHQUFWLEVBQWU7QUFDcEIsbUJBQU9BLElBQUlHLEtBQUosQ0FBVW5CLFVBQVVvQixNQUFwQixDQUFQO0FBQ0QsV0FKZ0MsQ0FBekIsQ0FBUjtBQUtEO0FBQ0YsT0FYRDtBQVlELEtBYk0sQ0FBUDtBQWNELEdBaEJELE1BZ0JPO0FBQ0w7QUFDQSxXQUFPLGtCQUFRQyxHQUFSLENBQVl2QixLQUFLb0IsR0FBTCxDQUFTLFVBQVVGLEdBQVYsRUFBZTtBQUN6QyxhQUFPakIsUUFBUXVCLFVBQVIsQ0FBbUIsS0FBS3RCLFNBQUwsR0FBaUJnQixHQUFwQyxFQUF5Q08sa0JBQWtCUCxHQUFsQixDQUF6QyxDQUFQO0FBQ0QsS0FGa0IsQ0FBWixDQUFQO0FBR0Q7QUFDRjs7QUFFRCxTQUFTTyxpQkFBVCxDQUEyQlAsR0FBM0IsRUFBZ0M7QUFDOUIsU0FBTyxTQUFTUSxXQUFULENBQXFCaEIsR0FBckIsRUFBMEI7QUFDL0IsUUFBSUEsT0FBT0UsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQXBDLEVBQWtEO0FBQ2hEQyxjQUFRQyxJQUFSLENBQWEsNkJBQWIsRUFBNENFLEdBQTVDLEVBQWlEUixHQUFqRDtBQUNEO0FBQ0YsR0FKRDtBQUtEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLRVlfUFJFRklYIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwdXJnZVN0b3JlZFN0YXRlKGNvbmZpZywga2V5cykge1xuICB2YXIgc3RvcmFnZSA9IGNvbmZpZy5zdG9yYWdlO1xuICB2YXIga2V5UHJlZml4ID0gY29uZmlnLmtleVByZWZpeCAhPT0gdW5kZWZpbmVkID8gY29uZmlnLmtleVByZWZpeCA6IEtFWV9QUkVGSVg7XG5cbiAgLy8gYmFzaWMgdmFsaWRhdGlvblxuICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcpKSB0aHJvdyBuZXcgRXJyb3IoJ3JlZHV4LXBlcnNpc3Q6IHB1cmdlU3RvcmVkU3RhdGUgcmVxdWlyZXMgY29uZmlnIGFzIGEgZmlyc3QgYXJndW1lbnQgKGZvdW5kIGFycmF5KS4gQW4gYXJyYXkgb2Yga2V5cyBpcyB0aGUgb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50LicpO1xuICBpZiAoIXN0b3JhZ2UpIHRocm93IG5ldyBFcnJvcigncmVkdXgtcGVyc2lzdDogY29uZmlnLnN0b3JhZ2UgcmVxdWlyZWQgaW4gcHVyZ2VTdG9yZWRTdGF0ZScpO1xuXG4gIGlmICh0eXBlb2Yga2V5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBpZiBrZXlzIGlzIG5vdCBkZWZpbmVkLCBwdXJnZSBhbGwga2V5c1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBzdG9yYWdlLmdldEFsbEtleXMoZnVuY3Rpb24gKGVyciwgYWxsS2V5cykge1xuICAgICAgICBpZiAoZXJyICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ3JlZHV4LXBlcnNpc3Q6IGVycm9yIGR1cmluZyBwdXJnZVN0b3JlZFN0YXRlIGluIHN0b3JhZ2UuZ2V0QWxsS2V5cycpO1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocHVyZ2VTdG9yZWRTdGF0ZShjb25maWcsIGFsbEtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkuaW5kZXhPZihrZXlQcmVmaXgpID09PSAwO1xuICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5LnNsaWNlKGtleVByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgIH0pKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSBwdXJnZSBzcGVjaWZpZWQga2V5c1xuICAgIHJldHVybiBQcm9taXNlLmFsbChrZXlzLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gc3RvcmFnZS5yZW1vdmVJdGVtKCcnICsga2V5UHJlZml4ICsga2V5LCB3YXJuSWZSZW1vdmVFcnJvcihrZXkpKTtcbiAgICB9KSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2FybklmUmVtb3ZlRXJyb3Ioa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiByZW1vdmVFcnJvcihlcnIpIHtcbiAgICBpZiAoZXJyICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3Igc3RvcmluZyBkYXRhIGZvciBrZXk6Jywga2V5LCBlcnIpO1xuICAgIH1cbiAgfTtcbn0iXX0=