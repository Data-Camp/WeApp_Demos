"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('../babel-runtime/regenerator/index.js');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('../babel-runtime/helpers/asyncToGenerator.js');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.create = create;

var _labrador = require('../labrador/index.js');

var _labrador2 = _interopRequireDefault(_labrador);

var _stringify = require('../qs/lib/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 默认获取SessionID方法
 * @returns {string}
 */
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-19
 * @author Liang <liang@maichong.it>
 */

function defaultGetSession() {
  return _labrador2.default.app.sessionId;
}

/**
 * 默认设置SessionID方法
 * @param {string} sessionId
 */
function defaultSetSession(sessionId) {
  _labrador2.default.app.sessionId = sessionId;
}

// 有效HTTP方法列表
var methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'];

/**
 * 创建API Request客户端
 * @param {Object} options 选项
 * @returns {Function}
 */
function create(options) {

  /**
   * 通用Alaska RESTFUL风格API请求,如果alaska接口返回错误,则抛出异常
   * @param {string} [method] 请求方法,可选默认GET,有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   * @param {string} apiName  API名称,必选
   * @param {object} [data]   数据,可选,如果方法为GET或DELETE,则此对象中的所有数据将传入URL query
   * @param {object} [header] HTTP头对象,可选
   * @returns {*}
   */
  var request = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(method, apiName, data, header) {
      var apiRoot, updateKey, headerKey, getSession, setSession, defaultHeader, url, querystring, sessionId, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              apiRoot = options.apiRoot || {};
              updateKey = options.updateKey || '_session';
              headerKey = options.headerKey || 'Session';
              getSession = options.getSession || defaultGetSession;
              setSession = options.setSession || defaultSetSession;
              defaultHeader = options.defaultHeader;


              if (methods.indexOf(method) === -1) {
                header = data;
                data = apiName;
                apiName = method;
                method = 'GET';
              }

              url = apiRoot + apiName;


              if (['POST', 'PUT'].indexOf(method) === -1 && data) {
                querystring = (0, _stringify2.default)(data);

                if (url.indexOf('?') > -1) {
                  url += '&' + querystring;
                } else {
                  url += '?' + querystring;
                }
                data = undefined;
              }

              header = (0, _assign2.default)({}, defaultHeader, header);

              if (options.session !== false) {
                sessionId = getSession();

                if (sessionId) {
                  header[headerKey] = sessionId;
                }
              }

              _context.next = 13;
              return _labrador2.default.request({
                method: method,
                url: url,
                data: data,
                header: header
              });

            case 13:
              res = _context.sent;


              if (options.session !== false && res.data && res.data[updateKey]) {
                if (res.data && res.data[updateKey]) {
                  setSession(res.data[updateKey]);
                }
              }

              if (!(res.data && res.data.error)) {
                _context.next = 17;
                break;
              }

              throw new Error(res.data.error);

            case 17:
              return _context.abrupt('return', res.data);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function request(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();

  options = options || {};

  methods.forEach(function (method) {
    request[method.toLowerCase()] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return request.apply(undefined, [method].concat(args));
    };
  });

  request.setOptions = function (newOptions) {
    options = newOptions || {};
  };

  return request;
}

/**
 * 导出默认API客户端
 */
exports.default = create({
  apiRoot: typeof "http://localhost:5000/" === 'undefined' ? '' : "http://localhost:5000/"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsImRlZmF1bHRHZXRTZXNzaW9uIiwiYXBwIiwic2Vzc2lvbklkIiwiZGVmYXVsdFNldFNlc3Npb24iLCJtZXRob2RzIiwib3B0aW9ucyIsIm1ldGhvZCIsImFwaU5hbWUiLCJkYXRhIiwiaGVhZGVyIiwiYXBpUm9vdCIsInVwZGF0ZUtleSIsImhlYWRlcktleSIsImdldFNlc3Npb24iLCJzZXRTZXNzaW9uIiwiZGVmYXVsdEhlYWRlciIsImluZGV4T2YiLCJ1cmwiLCJxdWVyeXN0cmluZyIsInVuZGVmaW5lZCIsInNlc3Npb24iLCJyZXF1ZXN0IiwicmVzIiwiZXJyb3IiLCJFcnJvciIsImZvckVhY2giLCJ0b0xvd2VyQ2FzZSIsImFyZ3MiLCJzZXRPcHRpb25zIiwibmV3T3B0aW9ucyIsIkFQSV9ST09UIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQ2dCQSxNLEdBQUFBLE07O0FBM0JoQjs7OztBQUNBOzs7Ozs7QUFFQTs7OztBQVRBOzs7Ozs7QUFhQSxTQUFTQyxpQkFBVCxHQUE2QjtBQUMzQixTQUFPLG1CQUFHQyxHQUFILENBQU9DLFNBQWQ7QUFDRDs7QUFFRDs7OztBQUlBLFNBQVNDLGlCQUFULENBQTJCRCxTQUEzQixFQUFzQztBQUNwQyxxQkFBR0QsR0FBSCxDQUFPQyxTQUFQLEdBQW1CQSxTQUFuQjtBQUNEOztBQUVEO0FBQ0EsSUFBTUUsVUFBVSxDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLEtBQWhCLEVBQXVCLFFBQXZCLEVBQWlDLFNBQWpDLEVBQTRDLE1BQTVDLEVBQW9ELE9BQXBELEVBQTZELFNBQTdELENBQWhCOztBQUVBOzs7OztBQUtPLFNBQVNMLE1BQVQsQ0FBZ0JNLE9BQWhCLEVBQXlCOztBQUc5Qjs7Ozs7Ozs7QUFIOEI7QUFBQSwwRUFXOUIsaUJBQXVCQyxNQUF2QixFQUErQkMsT0FBL0IsRUFBd0NDLElBQXhDLEVBQThDQyxNQUE5QztBQUFBO0FBQUE7QUFB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QUFDcEJXLFdBQVMsT0FBT29CLFFBQVAsS0FBb0IsV0FBcEIsR0FBa0MsRUFBbEMsR0FBdUNBO0FBRDVCLENBQVAsQyIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAY29weXJpZ2h0IE1haWNob25nIFNvZnR3YXJlIEx0ZC4gMjAxNiBodHRwOi8vbWFpY2hvbmcuaXRcbiAqIEBkYXRlIDIwMTYtMTEtMTlcbiAqIEBhdXRob3IgTGlhbmcgPGxpYW5nQG1haWNob25nLml0PlxuICovXG5cbmltcG9ydCB3eCBmcm9tICdsYWJyYWRvcic7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJ3FzL2xpYi9zdHJpbmdpZnknO1xuXG4vKipcbiAqIOm7mOiupOiOt+WPllNlc3Npb25JROaWueazlVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdEdldFNlc3Npb24oKSB7XG4gIHJldHVybiB3eC5hcHAuc2Vzc2lvbklkO1xufVxuXG4vKipcbiAqIOm7mOiupOiuvue9rlNlc3Npb25JROaWueazlVxuICogQHBhcmFtIHtzdHJpbmd9IHNlc3Npb25JZFxuICovXG5mdW5jdGlvbiBkZWZhdWx0U2V0U2Vzc2lvbihzZXNzaW9uSWQpIHtcbiAgd3guYXBwLnNlc3Npb25JZCA9IHNlc3Npb25JZDtcbn1cblxuLy8g5pyJ5pWISFRUUOaWueazleWIl+ihqFxuY29uc3QgbWV0aG9kcyA9IFsnR0VUJywgJ1BPU1QnLCAnUFVUJywgJ0RFTEVURScsICdPUFRJT05TJywgJ0hFQUQnLCAnVFJBQ0UnLCAnQ09OTkVDVCddO1xuXG4vKipcbiAqIOWIm+W7ukFQSSBSZXF1ZXN05a6i5oi356uvXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDpgInpoblcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIC8qKlxuICAgKiDpgJrnlKhBbGFza2EgUkVTVEZVTOmjjuagvEFQSeivt+axgizlpoLmnpxhbGFza2HmjqXlj6Pov5Tlm57plJnor68s5YiZ5oqb5Ye65byC5bi4XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbWV0aG9kXSDor7fmsYLmlrnms5Us5Y+v6YCJ6buY6K6kR0VULOacieaViOWAvO+8mk9QVElPTlMsIEdFVCwgSEVBRCwgUE9TVCwgUFVULCBERUxFVEUsIFRSQUNFLCBDT05ORUNUXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhcGlOYW1lICBBUEnlkI3np7As5b+F6YCJXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZGF0YV0gICDmlbDmja4s5Y+v6YCJLOWmguaenOaWueazleS4ukdFVOaIlkRFTEVURSzliJnmraTlr7nosaHkuK3nmoTmiYDmnInmlbDmja7lsIbkvKDlhaVVUkwgcXVlcnlcbiAgICogQHBhcmFtIHtvYmplY3R9IFtoZWFkZXJdIEhUVFDlpLTlr7nosaEs5Y+v6YCJXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdChtZXRob2QsIGFwaU5hbWUsIGRhdGEsIGhlYWRlcikge1xuICAgIGNvbnN0IGFwaVJvb3QgPSBvcHRpb25zLmFwaVJvb3QgfHwge307XG4gICAgY29uc3QgdXBkYXRlS2V5ID0gb3B0aW9ucy51cGRhdGVLZXkgfHwgJ19zZXNzaW9uJztcbiAgICBjb25zdCBoZWFkZXJLZXkgPSBvcHRpb25zLmhlYWRlcktleSB8fCAnU2Vzc2lvbic7XG4gICAgY29uc3QgZ2V0U2Vzc2lvbiA9IG9wdGlvbnMuZ2V0U2Vzc2lvbiB8fCBkZWZhdWx0R2V0U2Vzc2lvbjtcbiAgICBjb25zdCBzZXRTZXNzaW9uID0gb3B0aW9ucy5zZXRTZXNzaW9uIHx8IGRlZmF1bHRTZXRTZXNzaW9uO1xuICAgIGNvbnN0IGRlZmF1bHRIZWFkZXIgPSBvcHRpb25zLmRlZmF1bHRIZWFkZXI7XG5cbiAgICBpZiAobWV0aG9kcy5pbmRleE9mKG1ldGhvZCkgPT09IC0xKSB7XG4gICAgICBoZWFkZXIgPSBkYXRhO1xuICAgICAgZGF0YSA9IGFwaU5hbWU7XG4gICAgICBhcGlOYW1lID0gbWV0aG9kO1xuICAgICAgbWV0aG9kID0gJ0dFVCc7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IGFwaVJvb3QgKyBhcGlOYW1lO1xuXG4gICAgaWYgKFsnUE9TVCcsICdQVVQnXS5pbmRleE9mKG1ldGhvZCkgPT09IC0xICYmIGRhdGEpIHtcbiAgICAgIGxldCBxdWVyeXN0cmluZyA9IHN0cmluZ2lmeShkYXRhKTtcbiAgICAgIGlmICh1cmwuaW5kZXhPZignPycpID4gLTEpIHtcbiAgICAgICAgdXJsICs9ICcmJyArIHF1ZXJ5c3RyaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsICs9ICc/JyArIHF1ZXJ5c3RyaW5nO1xuICAgICAgfVxuICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBoZWFkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0SGVhZGVyLCBoZWFkZXIpO1xuXG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbiAhPT0gZmFsc2UpIHtcbiAgICAgIGxldCBzZXNzaW9uSWQgPSBnZXRTZXNzaW9uKCk7XG4gICAgICBpZiAoc2Vzc2lvbklkKSB7XG4gICAgICAgIGhlYWRlcltoZWFkZXJLZXldID0gc2Vzc2lvbklkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXMgPSBhd2FpdCB3eC5yZXF1ZXN0KHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHVybCxcbiAgICAgIGRhdGEsXG4gICAgICBoZWFkZXJcbiAgICB9KTtcblxuXG4gICAgaWYgKG9wdGlvbnMuc2Vzc2lvbiAhPT0gZmFsc2UgJiYgcmVzLmRhdGEgJiYgcmVzLmRhdGFbdXBkYXRlS2V5XSkge1xuICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhW3VwZGF0ZUtleV0pIHtcbiAgICAgICAgc2V0U2Vzc2lvbihyZXMuZGF0YVt1cGRhdGVLZXldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEuZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihyZXMuZGF0YS5lcnJvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5kYXRhO1xuICB9XG5cbiAgbWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICByZXF1ZXN0W21ldGhvZC50b0xvd2VyQ2FzZSgpXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdChtZXRob2QsIC4uLmFyZ3MpO1xuICAgIH07XG4gIH0pO1xuXG4gIHJlcXVlc3Quc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChuZXdPcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG5ld09wdGlvbnMgfHwge307XG4gIH07XG5cbiAgcmV0dXJuIHJlcXVlc3Q7XG59XG5cbi8qKlxuICog5a+85Ye66buY6K6kQVBJ5a6i5oi356uvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZSh7XG4gIGFwaVJvb3Q6IHR5cGVvZiBBUElfUk9PVCA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6IEFQSV9ST09UXG59KTtcbiJdfQ==