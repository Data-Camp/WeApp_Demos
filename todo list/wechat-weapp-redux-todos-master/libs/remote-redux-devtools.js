(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["remote-redux-devtools"] = factory();
	else
		root["remote-redux-devtools"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.composeWithDevTools = exports.default = undefined;

	var _devTools = __webpack_require__(54);

	Object.defineProperty(exports, 'composeWithDevTools', {
	  enumerable: true,
	  get: function get() {
	    return _devTools.composeWithDevTools;
	  }
	});

	var _devTools2 = _interopRequireDefault(_devTools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _devTools2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(39);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(90),
	    getValue = __webpack_require__(110);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(121),
	    listCacheDelete = __webpack_require__(122),
	    listCacheGet = __webpack_require__(123),
	    listCacheHas = __webpack_require__(124),
	    listCacheSet = __webpack_require__(125);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(45);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(118);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(3),
	    isSymbol = __webpack_require__(23);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(23);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(58);

	if (!Object.create) {
	  Object.create = __webpack_require__(167);
	}

	var SCEmitter = function () {
	  Emitter.call(this);
	};

	SCEmitter.prototype = Object.create(Emitter.prototype);

	SCEmitter.prototype.emit = function (event) {
	  if (event == 'error' && this.domain) {
	    // Emit the error on the domain if it has one.
	    // See https://github.com/joyent/node/blob/ef4344311e19a4f73c031508252b21712b22fe8a/lib/events.js#L78-85
	    
	    var err = arguments[1];
	    
	    if (!err) {
	      err = new Error('Uncaught, unspecified "error" event.');
	    }
	    err.domainEmitter = this;
	    err.domain = this.domain;
	    err.domainThrown = false;
	    this.domain.emit('error', err);
	  }
	  Emitter.prototype.emit.apply(this, arguments);
	};

	module.exports.SCEmitter = SCEmitter;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2),
	    root = __webpack_require__(1);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(126),
	    mapCacheDelete = __webpack_require__(127),
	    mapCacheGet = __webpack_require__(128),
	    mapCacheHas = __webpack_require__(129),
	    mapCacheSet = __webpack_require__(130);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(14),
	    setCacheAdd = __webpack_require__(137),
	    setCacheHas = __webpack_require__(138);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(1);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(21);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(46),
	    isObjectLike = __webpack_require__(4);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(4);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(75),
	    baseKeys = __webpack_require__(93),
	    isArrayLike = __webpack_require__(46);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var cycle = __webpack_require__(59);

	var isStrict = (function () { return !this; })();

	function AuthTokenExpiredError(message, expiry) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'AuthTokenExpiredError';
	  this.message = message;
	  this.expiry = expiry;
	};
	AuthTokenExpiredError.prototype = Object.create(Error.prototype);


	function AuthTokenInvalidError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'AuthTokenInvalidError';
	  this.message = message;
	};
	AuthTokenInvalidError.prototype = Object.create(Error.prototype);


	function SilentMiddlewareBlockedError(message, type) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'SilentMiddlewareBlockedError';
	  this.message = message;
	  this.type = type;
	};
	SilentMiddlewareBlockedError.prototype = Object.create(Error.prototype);


	function InvalidActionError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'InvalidActionError';
	  this.message = message;
	};
	InvalidActionError.prototype = Object.create(Error.prototype);

	function InvalidArgumentsError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'InvalidArgumentsError';
	  this.message = message;
	};
	InvalidArgumentsError.prototype = Object.create(Error.prototype);

	function InvalidOptionsError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'InvalidOptionsError';
	  this.message = message;
	};
	InvalidOptionsError.prototype = Object.create(Error.prototype);


	function InvalidMessageError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'InvalidMessageError';
	  this.message = message;
	};
	InvalidMessageError.prototype = Object.create(Error.prototype);


	function SocketProtocolError(message, code) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'SocketProtocolError';
	  this.message = message;
	  this.code = code;
	};
	SocketProtocolError.prototype = Object.create(Error.prototype);


	function ServerProtocolError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'ServerProtocolError';
	  this.message = message;
	};
	ServerProtocolError.prototype = Object.create(Error.prototype);

	function HTTPServerError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'HTTPServerError';
	  this.message = message;
	};
	HTTPServerError.prototype = Object.create(Error.prototype);


	function ResourceLimitError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'ResourceLimitError';
	  this.message = message;
	};
	ResourceLimitError.prototype = Object.create(Error.prototype);


	function TimeoutError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'TimeoutError';
	  this.message = message;
	};
	TimeoutError.prototype = Object.create(Error.prototype);


	function BrokerError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'BrokerError';
	  this.message = message;
	};
	BrokerError.prototype = Object.create(Error.prototype);


	function ProcessExitError(message, code) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'ProcessExitError';
	  this.message = message;
	  this.code = code;
	};
	ProcessExitError.prototype = Object.create(Error.prototype);


	function UnknownError(message) {
	  if (Error.captureStackTrace && !isStrict) {
	    Error.captureStackTrace(this, arguments.callee);
	  } else {
	    this.stack = (new Error()).stack;
	  }
	  this.name = 'UnknownError';
	  this.message = message;
	};
	UnknownError.prototype = Object.create(Error.prototype);


	// Expose all error types

	module.exports = {
	  AuthTokenExpiredError: AuthTokenExpiredError,
	  AuthTokenInvalidError: AuthTokenInvalidError,
	  SilentMiddlewareBlockedError: SilentMiddlewareBlockedError,
	  InvalidActionError: InvalidActionError,
	  InvalidArgumentsError: InvalidArgumentsError,
	  InvalidOptionsError: InvalidOptionsError,
	  InvalidMessageError: InvalidMessageError,
	  SocketProtocolError: SocketProtocolError,
	  ServerProtocolError: ServerProtocolError,
	  HTTPServerError: HTTPServerError,
	  ResourceLimitError: ResourceLimitError,
	  TimeoutError: TimeoutError,
	  BrokerError: BrokerError,
	  ProcessExitError: ProcessExitError,
	  UnknownError: UnknownError
	};

	module.exports.socketProtocolErrorStatuses = {
	  1001: 'Socket was disconnected',
	  1002: 'A WebSocket protocol error was encountered',
	  1003: 'Server terminated socket because it received invalid data',
	  1005: 'Socket closed without status code',
	  1006: 'Socket hung up',
	  1007: 'Message format was incorrect',
	  1008: 'Encountered a policy violation',
	  1009: 'Message was too big to process',
	  1010: 'Client ended the connection because the server did not comply with extension requirements',
	  1011: 'Server encountered an unexpected fatal condition',
	  4000: 'Server ping timed out',
	  4001: 'Client pong timed out',
	  4002: 'Server failed to sign auth token',
	  4003: 'Failed to complete handshake',
	  4004: 'Client failed to save auth token',
	  4005: 'Did not receive #handshake from client before timeout',
	  4006: 'Failed to bind socket to message broker',
	  4007: 'Client connection establishment timed out'
	};

	module.exports.socketProtocolIgnoreStatuses = {
	  1000: 'Socket closed normally',
	  1001: 'Socket hung up'
	};

	// Properties related to error domains cannot be serialized.
	var unserializableErrorProperties = {
	  domain: 1,
	  domainEmitter: 1,
	  domainThrown: 1
	};

	module.exports.dehydrateError = function (error, includeStackTrace) {
	  var dehydratedError;
	  if (typeof error == 'string') {
	      dehydratedError = error;
	  } else {
	    dehydratedError = {
	      message: error.message
	    };
	    if (includeStackTrace) {
	      dehydratedError.stack = error.stack;
	    }
	    for (var i in error) {
	      if (!unserializableErrorProperties[i]) {
	        dehydratedError[i] = error[i];
	      }
	    }
	  }
	  return cycle.decycle(dehydratedError);
	};

	module.exports.hydrateError = function (error) {
	  var hydratedError = null;
	  if (error != null) {
	    if (typeof error == 'string') {
	      hydratedError = error;
	    } else {
	      hydratedError = new Error(error.message);
	      for (var i in error) {
	        if (error.hasOwnProperty(i)) {
	          hydratedError[i] = error[i];
	        }
	      }
	    }
	  }
	  return hydratedError;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(57)
	var ieee754 = __webpack_require__(61)
	var isArray = __webpack_require__(62)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (global !== undefined && global.TYPED_ARRAY_SUPPORT !== undefined)
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26).Buffer, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = pathGetter;

	function pathGetter(obj, path) {
	  if (path !== '$') {
	    var paths = getPaths(path);
	    for (var i = 0; i < paths.length; i++) {
	      path = paths[i].toString().replace(/\\"/g, '"');
	      obj = obj[path];
	    }
	  }
	  return obj;
	}

	function getPaths(pathString) {
	  var regex = /(?:\.(\w+))|(?:\[(\d+)\])|(?:\["((?:[^\\"]|\\.)*)"\])/g;
	  var matches = [];
	  var match;
	  while (match = regex.exec(pathString)) {
	    matches.push( match[1] || match[2] || match[3] );
	  }
	  return matches;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2),
	    root = __webpack_require__(1);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(5),
	    stackClear = __webpack_require__(141),
	    stackDelete = __webpack_require__(142),
	    stackGet = __webpack_require__(143),
	    stackHas = __webpack_require__(144),
	    stackSet = __webpack_require__(145);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(86);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(77),
	    isFlattenable = __webpack_require__(117);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(37),
	    isKey = __webpack_require__(8),
	    toKey = __webpack_require__(10);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(87),
	    isObject = __webpack_require__(11),
	    isObjectLike = __webpack_require__(4);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(19),
	    overRest = __webpack_require__(136),
	    setToString = __webpack_require__(139);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(3),
	    stringToPath = __webpack_require__(147);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(15),
	    arraySome = __webpack_require__(78),
	    cacheHas = __webpack_require__(17);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 43 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 44 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(47),
	    isLength = __webpack_require__(22);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(11);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(160);
	exports.encode = exports.stringify = __webpack_require__(161);


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var scErrors = __webpack_require__(25);
	var InvalidActionError = scErrors.InvalidActionError;

	var Response = function (socket, id) {
	  this.socket = socket;
	  this.id = id;
	  this.sent = false;
	};

	Response.prototype._respond = function (responseData) {
	  if (this.sent) {
	    throw new InvalidActionError('Response ' + this.id + ' has already been sent');
	  } else {
	    this.sent = true;
	    this.socket.send(this.socket.encode(responseData));
	  }
	};

	Response.prototype.end = function (data) {
	  if (this.id) {
	    var responseData = {
	      rid: this.id
	    };
	    if (data !== undefined) {
	      responseData.data = data;
	    }
	    this._respond(responseData);
	  }
	};

	Response.prototype.error = function (error, data) {
	  if (this.id) {
	    var err = scErrors.dehydrateError(error);

	    var responseData = {
	      rid: this.id,
	      error: err
	    };
	    if (data !== undefined) {
	      responseData.data = data;
	    }

	    this._respond(responseData);
	  }
	};

	Response.prototype.callback = function (error, data) {
	  if (error) {
	    this.error(error, data);
	  } else {
	    this.end(data);
	  }
	};

	module.exports.Response = Response;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {var SCEmitter = __webpack_require__(12).SCEmitter;
	var SCChannel = __webpack_require__(166).SCChannel;
	var Response = __webpack_require__(49).Response;
	var AuthEngine = __webpack_require__(170).AuthEngine;
	var formatter = __webpack_require__(168);
	var SCTransport = __webpack_require__(172).SCTransport;
	var querystring = __webpack_require__(48);
	var LinkedList = __webpack_require__(68);
	var base64 = __webpack_require__(56);

	var scErrors = __webpack_require__(25);
	var InvalidArgumentsError = scErrors.InvalidArgumentsError;
	var InvalidMessageError = scErrors.InvalidMessageError;
	var SocketProtocolError = scErrors.SocketProtocolError;
	var TimeoutError = scErrors.TimeoutError;

	var isBrowser = typeof window != 'undefined';


	var SCSocket = function (opts) {
	  var self = this;

	  SCEmitter.call(this);

	  this.id = null;
	  this.state = this.CLOSED;
	  this.authState = this.PENDING;
	  this.signedAuthToken = null;
	  this.authToken = null;
	  this.pendingReconnect = false;
	  this.pendingReconnectTimeout = null;
	  this.pendingConnectCallback = false;

	  this.connectTimeout = opts.connectTimeout;
	  this.ackTimeout = opts.ackTimeout;
	  this.channelPrefix = opts.channelPrefix || null;
	  this.disconnectOnUnload = opts.disconnectOnUnload == null ? true : opts.disconnectOnUnload;

	  // pingTimeout will be ackTimeout at the start, but it will
	  // be updated with values provided by the 'connect' event
	  this.pingTimeout = this.ackTimeout;

	  var maxTimeout = Math.pow(2, 31) - 1;

	  var verifyDuration = function (propertyName) {
	    if (self[propertyName] > maxTimeout) {
	      throw new InvalidArgumentsError('The ' + propertyName +
	        ' value provided exceeded the maximum amount allowed');
	    }
	  };

	  verifyDuration('connectTimeout');
	  verifyDuration('ackTimeout');
	  verifyDuration('pingTimeout');

	  this._localEvents = {
	    'connect': 1,
	    'connectAbort': 1,
	    'disconnect': 1,
	    'message': 1,
	    'error': 1,
	    'raw': 1,
	    'fail': 1,
	    'kickOut': 1,
	    'subscribe': 1,
	    'unsubscribe': 1,
	    'subscribeStateChange': 1,
	    'authStateChange': 1,
	    'authenticate': 1,
	    'deauthenticate': 1,
	    'removeAuthToken': 1,
	    'subscribeRequest': 1
	  };

	  this.connectAttempts = 0;

	  this._emitBuffer = new LinkedList();
	  this._channels = {};

	  this.options = opts;

	  this._cid = 1;

	  this.options.callIdGenerator = function () {
	    return self._callIdGenerator();
	  };

	  if (this.options.autoReconnect) {
	    if (this.options.autoReconnectOptions == null) {
	      this.options.autoReconnectOptions = {};
	    }

	    // Add properties to the this.options.autoReconnectOptions object.
	    // We assign the reference to a reconnectOptions variable to avoid repetition.
	    var reconnectOptions = this.options.autoReconnectOptions;
	    if (reconnectOptions.initialDelay == null) {
	      reconnectOptions.initialDelay = 10000;
	    }
	    if (reconnectOptions.randomness == null) {
	      reconnectOptions.randomness = 10000;
	    }
	    if (reconnectOptions.multiplier == null) {
	      reconnectOptions.multiplier = 1.5;
	    }
	    if (reconnectOptions.maxDelay == null) {
	      reconnectOptions.maxDelay = 60000;
	    }
	  }

	  if (this.options.subscriptionRetryOptions == null) {
	    this.options.subscriptionRetryOptions = {};
	  }

	  if (this.options.authEngine) {
	    this.auth = this.options.authEngine;
	  } else {
	    this.auth = new AuthEngine();
	  }

	  if (this.options.codecEngine) {
	    this.codec = this.options.codecEngine;
	  } else {
	    // Default codec engine
	    this.codec = formatter;
	  }

	  this.options.path = this.options.path.replace(/\/$/, '') + '/';

	  this.options.query = opts.query || {};
	  if (typeof this.options.query == 'string') {
	    this.options.query = querystring.parse(this.options.query);
	  }

	  this.connect();

	  this._channelEmitter = new SCEmitter();

	  if (isBrowser && this.disconnectOnUnload) {
	    var unloadHandler = function () {
	      self.disconnect();
	    };

	    if (global.attachEvent) {
	      global.attachEvent('onunload', unloadHandler);
	    } else if (global.addEventListener) {
	      global.addEventListener('beforeunload', unloadHandler, false);
	    }
	  }
	};

	SCSocket.prototype = Object.create(SCEmitter.prototype);

	SCSocket.CONNECTING = SCSocket.prototype.CONNECTING = SCTransport.prototype.CONNECTING;
	SCSocket.OPEN = SCSocket.prototype.OPEN = SCTransport.prototype.OPEN;
	SCSocket.CLOSED = SCSocket.prototype.CLOSED = SCTransport.prototype.CLOSED;

	SCSocket.AUTHENTICATED = SCSocket.prototype.AUTHENTICATED = 'authenticated';
	SCSocket.UNAUTHENTICATED = SCSocket.prototype.UNAUTHENTICATED = 'unauthenticated';
	SCSocket.PENDING = SCSocket.prototype.PENDING = 'pending';

	SCSocket.ignoreStatuses = scErrors.socketProtocolIgnoreStatuses;
	SCSocket.errorStatuses = scErrors.socketProtocolErrorStatuses;

	SCSocket.prototype._privateEventHandlerMap = {
	  '#publish': function (data) {
	    var undecoratedChannelName = this._undecorateChannelName(data.channel);
	    var isSubscribed = this.isSubscribed(undecoratedChannelName, true);

	    if (isSubscribed) {
	      this._channelEmitter.emit(undecoratedChannelName, data.data);
	    }
	  },
	  '#kickOut': function (data) {
	    var undecoratedChannelName = this._undecorateChannelName(data.channel);
	    var channel = this._channels[undecoratedChannelName];
	    if (channel) {
	      SCEmitter.prototype.emit.call(this, 'kickOut', data.message, undecoratedChannelName);
	      channel.emit('kickOut', data.message, undecoratedChannelName);
	      this._triggerChannelUnsubscribe(channel);
	    }
	  },
	  '#setAuthToken': function (data, response) {
	    var self = this;

	    if (data) {
	      var triggerAuthenticate = function (err) {
	        if (err) {
	          // This is a non-fatal error, we don't want to close the connection
	          // because of this but we do want to notify the server and throw an error
	          // on the client.
	          response.error(err);
	          self._onSCError(err);
	        } else {
	          self._changeToAuthenticatedState(data.token);
	          response.end();
	        }
	      };

	      this.auth.saveToken(this.options.authTokenName, data.token, {}, triggerAuthenticate);
	    } else {
	      response.error(new InvalidMessageError('No token data provided by #setAuthToken event'));
	    }
	  },
	  '#removeAuthToken': function (data, response) {
	    var self = this;

	    this.auth.removeToken(this.options.authTokenName, function (err, oldToken) {
	      if (err) {
	        // Non-fatal error - Do not close the connection
	        response.error(err);
	        self._onSCError(err);
	      } else {
	        SCEmitter.prototype.emit.call(self, 'removeAuthToken', oldToken);
	        self._changeToUnauthenticatedState();
	        response.end();
	      }
	    });
	  },
	  '#disconnect': function (data) {
	    this.transport.close(data.code, data.data);
	  }
	};

	SCSocket.prototype._callIdGenerator = function () {
	  return this._cid++;
	};

	SCSocket.prototype.getState = function () {
	  return this.state;
	};

	SCSocket.prototype.getBytesReceived = function () {
	  return this.transport.getBytesReceived();
	};

	SCSocket.prototype.deauthenticate = function (callback) {
	  var self = this;

	  this.auth.removeToken(this.options.authTokenName, function (err, oldToken) {
	    if (err) {
	      // Non-fatal error - Do not close the connection
	      self._onSCError(err);
	    } else {
	      self.emit('#removeAuthToken');
	      SCEmitter.prototype.emit.call(self, 'removeAuthToken', oldToken);
	      self._changeToUnauthenticatedState();
	    }
	    callback && callback(err);
	  });
	};

	SCSocket.prototype.connect = SCSocket.prototype.open = function () {
	  var self = this;

	  if (this.state == this.CLOSED) {
	    this.pendingReconnect = false;
	    this.pendingReconnectTimeout = null;
	    clearTimeout(this._reconnectTimeoutRef);

	    this.state = this.CONNECTING;
	    this._changeToPendingAuthState();

	    if (this.transport) {
	      this.transport.off();
	    }

	    this.transport = new SCTransport(this.auth, this.codec, this.options);

	    this.transport.on('open', function (status) {
	      self.state = self.OPEN;
	      self._onSCOpen(status);
	    });

	    this.transport.on('error', function (err) {
	      self._onSCError(err);
	    });

	    this.transport.on('close', function (code, data) {
	      self.state = self.CLOSED;
	      self._onSCClose(code, data);
	    });

	    this.transport.on('openAbort', function (code, data) {
	      self.state = self.CLOSED;
	      self._onSCClose(code, data, true);
	    });

	    this.transport.on('event', function (event, data, res) {
	      self._onSCEvent(event, data, res);
	    });
	  }
	};

	SCSocket.prototype.reconnect = function () {
	  this.disconnect();
	  this.connect();
	};

	SCSocket.prototype.disconnect = function (code, data) {
	  code = code || 1000;

	  if (this.state == this.OPEN) {
	    var packet = {
	      code: code,
	      data: data
	    };
	    this.transport.emit('#disconnect', packet);
	    this.transport.close(code, data);

	  } else if (this.state == this.CONNECTING) {
	    this.transport.close(code, data);
	  } else {
	    this.pendingReconnect = false;
	    this.pendingReconnectTimeout = null;
	    clearTimeout(this._reconnectTimeoutRef);
	  }
	};

	SCSocket.prototype._changeToPendingAuthState = function () {
	  if (this.authState != this.PENDING) {
	    var oldState = this.authState;
	    this.authState = this.PENDING;
	    var stateChangeData = {
	      oldState: oldState,
	      newState: this.authState
	    };
	    SCEmitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
	  }
	};

	SCSocket.prototype._changeToUnauthenticatedState = function () {
	  if (this.authState != this.UNAUTHENTICATED) {
	    var oldState = this.authState;
	    this.authState = this.UNAUTHENTICATED;
	    this.signedAuthToken = null;
	    this.authToken = null;

	    var stateChangeData = {
	      oldState: oldState,
	      newState: this.authState
	    };
	    SCEmitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
	    if (oldState == this.AUTHENTICATED) {
	      SCEmitter.prototype.emit.call(this, 'deauthenticate');
	    }
	    SCEmitter.prototype.emit.call(this, 'authTokenChange', this.signedAuthToken);
	  }
	};

	SCSocket.prototype._changeToAuthenticatedState = function (signedAuthToken) {
	  this.signedAuthToken = signedAuthToken;
	  this.authToken = this._extractAuthTokenData(signedAuthToken);

	  if (this.authState != this.AUTHENTICATED) {
	    var oldState = this.authState;
	    this.authState = this.AUTHENTICATED;
	    var stateChangeData = {
	      oldState: oldState,
	      newState: this.authState,
	      signedAuthToken: signedAuthToken,
	      authToken: this.authToken
	    };
	    this.processPendingSubscriptions();

	    SCEmitter.prototype.emit.call(this, 'authStateChange', stateChangeData);
	    SCEmitter.prototype.emit.call(this, 'authenticate', signedAuthToken);
	  }
	  SCEmitter.prototype.emit.call(this, 'authTokenChange', signedAuthToken);
	};

	SCSocket.prototype.decodeBase64 = function (encodedString) {
	  var decodedString;
	  if (typeof Buffer == 'undefined') {
	    if (global.atob) {
	      decodedString = global.atob(encodedString);
	    } else {
	      decodedString = base64.decode(encodedString);
	    }
	  } else {
	    var buffer = new Buffer(encodedString, 'base64');
	    decodedString = buffer.toString('utf8');
	  }
	  return decodedString;
	};

	SCSocket.prototype.encodeBase64 = function (decodedString) {
	  var encodedString;
	  if (typeof Buffer == 'undefined') {
	    if (global.btoa) {
	      encodedString = global.btoa(decodedString);
	    } else {
	      encodedString = base64.encode(decodedString);
	    }
	  } else {
	    var buffer = new Buffer(decodedString, 'utf8');
	    encodedString = buffer.toString('base64');
	  }
	  return encodedString;
	};

	SCSocket.prototype._extractAuthTokenData = function (signedAuthToken) {
	  var tokenParts = (signedAuthToken || '').split('.');
	  var encodedTokenData = tokenParts[1];
	  if (encodedTokenData != null) {
	    var tokenData = encodedTokenData;
	    try {
	      tokenData = this.decodeBase64(tokenData);
	      return JSON.parse(tokenData);
	    } catch (e) {
	      return tokenData;
	    }
	  }
	  return null;
	};

	SCSocket.prototype.getAuthToken = function () {
	  return this.authToken;
	};

	SCSocket.prototype.getSignedAuthToken = function () {
	  return this.signedAuthToken;
	};

	// Perform client-initiated authentication by providing an encrypted token string
	SCSocket.prototype.authenticate = function (signedAuthToken, callback) {
	  var self = this;

	  this._changeToPendingAuthState();

	  this.emit('#authenticate', signedAuthToken, function (err, authStatus) {
	    if (authStatus && authStatus.authError) {
	      authStatus.authError = scErrors.hydrateError(authStatus.authError);
	    }
	    if (err) {
	      self._changeToUnauthenticatedState();
	      callback && callback(err, authStatus);
	    } else {
	      self.auth.saveToken(self.options.authTokenName, signedAuthToken, {}, function (err) {
	        callback && callback(err, authStatus);
	        if (err) {
	          self._changeToUnauthenticatedState();
	          self._onSCError(err);
	        } else {
	          if (authStatus.isAuthenticated) {
	            self._changeToAuthenticatedState(signedAuthToken);
	          } else {
	            self._changeToUnauthenticatedState();
	          }
	        }
	      });
	    }
	  });
	};

	SCSocket.prototype._tryReconnect = function (initialDelay) {
	  var self = this;

	  var exponent = this.connectAttempts++;
	  var reconnectOptions = this.options.autoReconnectOptions;
	  var timeout;

	  if (initialDelay == null || exponent > 0) {
	    var initialTimeout = Math.round(reconnectOptions.initialDelay + (reconnectOptions.randomness || 0) * Math.random());

	    timeout = Math.round(initialTimeout * Math.pow(reconnectOptions.multiplier, exponent));
	  } else {
	    timeout = initialDelay;
	  }

	  if (timeout > reconnectOptions.maxDelay) {
	    timeout = reconnectOptions.maxDelay;
	  }

	  clearTimeout(this._reconnectTimeoutRef);

	  this.pendingReconnect = true;
	  this.pendingReconnectTimeout = timeout;
	  this._reconnectTimeoutRef = setTimeout(function () {
	    self.connect();
	  }, timeout);
	};

	SCSocket.prototype._onSCOpen = function (status) {
	  var self = this;

	  if (status) {
	    this.id = status.id;
	    this.pingTimeout = status.pingTimeout;
	    this.transport.pingTimeout = this.pingTimeout;
	    if (status.isAuthenticated) {
	      this._changeToAuthenticatedState(status.authToken);
	    } else {
	      this._changeToUnauthenticatedState();
	    }
	  } else {
	    this._changeToUnauthenticatedState();
	  }

	  this.connectAttempts = 0;
	  if (this.options.autoProcessSubscriptions) {
	    this.processPendingSubscriptions();
	  } else {
	    this.pendingConnectCallback = true;
	  }

	  // If the user invokes the callback while in autoProcessSubscriptions mode, it
	  // won't break anything - The processPendingSubscriptions() call will be a no-op.
	  SCEmitter.prototype.emit.call(this, 'connect', status, function () {
	    self.processPendingSubscriptions();
	  });

	  this._flushEmitBuffer();
	};

	SCSocket.prototype._onSCError = function (err) {
	  var self = this;

	  // Throw error in different stack frame so that error handling
	  // cannot interfere with a reconnect action.
	  setTimeout(function () {
	    if (self.listeners('error').length < 1) {
	      throw err;
	    } else {
	      SCEmitter.prototype.emit.call(self, 'error', err);
	    }
	  }, 0);
	};

	SCSocket.prototype._suspendSubscriptions = function () {
	  var channel, newState;
	  for (var channelName in this._channels) {
	    if (this._channels.hasOwnProperty(channelName)) {
	      channel = this._channels[channelName];
	      if (channel.state == channel.SUBSCRIBED ||
	        channel.state == channel.PENDING) {

	        newState = channel.PENDING;
	      } else {
	        newState = channel.UNSUBSCRIBED;
	      }

	      this._triggerChannelUnsubscribe(channel, newState);
	    }
	  }
	};

	SCSocket.prototype._onSCClose = function (code, data, openAbort) {
	  var self = this;

	  this.id = null;

	  if (this.transport) {
	    this.transport.off();
	  }
	  this.pendingReconnect = false;
	  this.pendingReconnectTimeout = null;
	  clearTimeout(this._reconnectTimeoutRef);

	  this._changeToPendingAuthState();
	  this._suspendSubscriptions();

	  // Try to reconnect
	  // on server ping timeout (4000)
	  // or on client pong timeout (4001)
	  // or on close without status (1005)
	  // or on handshake failure (4003)
	  // or on socket hung up (1006)
	  if (this.options.autoReconnect) {
	    if (code == 4000 || code == 4001 || code == 1005) {
	      // If there is a ping or pong timeout or socket closes without
	      // status, don't wait before trying to reconnect - These could happen
	      // if the client wakes up after a period of inactivity and in this case we
	      // want to re-establish the connection as soon as possible.
	      this._tryReconnect(0);

	      // Codes 4500 and above will be treated as permanent disconnects.
	      // Socket will not try to auto-reconnect.
	    } else if (code != 1000 && code < 4500) {
	      this._tryReconnect();
	    }
	  }

	  if (openAbort) {
	    SCEmitter.prototype.emit.call(self, 'connectAbort', code, data);
	  } else {
	    SCEmitter.prototype.emit.call(self, 'disconnect', code, data);
	  }

	  if (!SCSocket.ignoreStatuses[code]) {
	    var failureMessage;
	    if (data) {
	      failureMessage = 'Socket connection failed: ' + data;
	    } else {
	      failureMessage = 'Socket connection failed for unknown reasons';
	    }
	    var err = new SocketProtocolError(SCSocket.errorStatuses[code] || failureMessage, code);
	    this._onSCError(err);
	  }
	};

	SCSocket.prototype._onSCEvent = function (event, data, res) {
	  var handler = this._privateEventHandlerMap[event];
	  if (handler) {
	    handler.call(this, data, res);
	  } else {
	    SCEmitter.prototype.emit.call(this, event, data, function () {
	      res && res.callback.apply(res, arguments);
	    });
	  }
	};

	SCSocket.prototype.decode = function (message) {
	  return this.transport.decode(message);
	};

	SCSocket.prototype.encode = function (object) {
	  return this.transport.encode(object);
	};

	SCSocket.prototype._flushEmitBuffer = function () {
	  var currentNode = this._emitBuffer.head;
	  var nextNode;

	  while (currentNode) {
	    nextNode = currentNode.next;
	    var eventObject = currentNode.data;
	    currentNode.detach();
	    this.transport.emitRaw(eventObject);
	    currentNode = nextNode;
	  }
	};

	SCSocket.prototype._handleEventAckTimeout = function (eventObject, eventNode) {
	  if (eventNode) {
	    eventNode.detach();
	  }
	  var error = new TimeoutError("Event response for '" + eventObject.event + "' timed out");
	  var callback = eventObject.callback;
	  if (callback) {
	    delete eventObject.callback;
	    callback.call(eventObject, error, eventObject);
	  }
	};

	SCSocket.prototype._emit = function (event, data, callback) {
	  var self = this;

	  if (this.state == this.CLOSED) {
	    this.connect();
	  }
	  var eventObject = {
	    event: event,
	    data: data,
	    callback: callback
	  };

	  var eventNode = new LinkedList.Item();
	  eventNode.data = eventObject;

	  eventObject.timeout = setTimeout(function () {
	    self._handleEventAckTimeout(eventObject, eventNode);
	  }, this.ackTimeout);

	  this._emitBuffer.append(eventNode);

	  if (this.state == this.OPEN) {
	    this._flushEmitBuffer();
	  }
	};

	SCSocket.prototype.send = function (data) {
	  this.transport.send(data);
	};

	SCSocket.prototype.emit = function (event, data, callback) {
	  if (this._localEvents[event] == null) {
	    this._emit(event, data, callback);
	  } else {
	    SCEmitter.prototype.emit.call(this, event, data);
	  }
	};

	SCSocket.prototype.publish = function (channelName, data, callback) {
	  var pubData = {
	    channel: this._decorateChannelName(channelName),
	    data: data
	  };
	  this.emit('#publish', pubData, callback);
	};

	SCSocket.prototype._triggerChannelSubscribe = function (channel, subscriptionOptions) {
	  var channelName = channel.name;

	  if (channel.state != channel.SUBSCRIBED) {
	    var oldState = channel.state;
	    channel.state = channel.SUBSCRIBED;

	    var stateChangeData = {
	      channel: channelName,
	      oldState: oldState,
	      newState: channel.state,
	      subscriptionOptions: subscriptionOptions
	    };
	    channel.emit('subscribeStateChange', stateChangeData);
	    channel.emit('subscribe', channelName, subscriptionOptions);
	    SCEmitter.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
	    SCEmitter.prototype.emit.call(this, 'subscribe', channelName, subscriptionOptions);
	  }
	};

	SCSocket.prototype._triggerChannelSubscribeFail = function (err, channel, subscriptionOptions) {
	  var channelName = channel.name;
	  var meetsAuthRequirements = !channel.waitForAuth || this.authState == this.AUTHENTICATED;

	  if (channel.state != channel.UNSUBSCRIBED && meetsAuthRequirements) {
	    channel.state = channel.UNSUBSCRIBED;

	    channel.emit('subscribeFail', err, channelName, subscriptionOptions);
	    SCEmitter.prototype.emit.call(this, 'subscribeFail', err, channelName, subscriptionOptions);
	  }
	};

	// Cancel any pending subscribe callback
	SCSocket.prototype._cancelPendingSubscribeCallback = function (channel) {
	  if (channel._pendingSubscriptionCid != null) {
	    this.transport.cancelPendingResponse(channel._pendingSubscriptionCid);
	    delete channel._pendingSubscriptionCid;
	  }
	};

	SCSocket.prototype._decorateChannelName = function (channelName) {
	  if (this.channelPrefix) {
	    channelName = this.channelPrefix + channelName;
	  }
	  return channelName;
	};

	SCSocket.prototype._undecorateChannelName = function (decoratedChannelName) {
	  if (this.channelPrefix && decoratedChannelName.indexOf(this.channelPrefix) == 0) {
	    return decoratedChannelName.replace(this.channelPrefix, '');
	  }
	  return decoratedChannelName;
	};

	SCSocket.prototype._trySubscribe = function (channel) {
	  var self = this;

	  var meetsAuthRequirements = !channel.waitForAuth || this.authState == this.AUTHENTICATED;

	  // We can only ever have one pending subscribe action at any given time on a channel
	  if (this.state == this.OPEN && !this.pendingConnectCallback &&
	    channel._pendingSubscriptionCid == null && meetsAuthRequirements) {

	    var options = {
	      noTimeout: true
	    };

	    var subscriptionOptions = {
	      channel: this._decorateChannelName(channel.name)
	    };
	    if (channel.waitForAuth) {
	      options.waitForAuth = true;
	      subscriptionOptions.waitForAuth = options.waitForAuth;
	    }
	    if (channel.data) {
	      subscriptionOptions.data = channel.data;
	    }

	    channel._pendingSubscriptionCid = this.transport.emit(
	      '#subscribe', subscriptionOptions, options,
	      function (err) {
	        delete channel._pendingSubscriptionCid;
	        if (err) {
	          self._triggerChannelSubscribeFail(err, channel, subscriptionOptions);
	        } else {
	          self._triggerChannelSubscribe(channel, subscriptionOptions);
	        }
	      }
	    );
	    SCEmitter.prototype.emit.call(this, 'subscribeRequest', channel.name, subscriptionOptions);
	  }
	};

	SCSocket.prototype.subscribe = function (channelName, options) {
	  var channel = this._channels[channelName];

	  if (!channel) {
	    channel = new SCChannel(channelName, this, options);
	    this._channels[channelName] = channel;
	  } else if (options) {
	    channel.setOptions(options);
	  }

	  if (channel.state == channel.UNSUBSCRIBED) {
	    channel.state = channel.PENDING;
	    this._trySubscribe(channel);
	  }

	  return channel;
	};

	SCSocket.prototype._triggerChannelUnsubscribe = function (channel, newState) {
	  var channelName = channel.name;
	  var oldState = channel.state;

	  if (newState) {
	    channel.state = newState;
	  } else {
	    channel.state = channel.UNSUBSCRIBED;
	  }
	  this._cancelPendingSubscribeCallback(channel);

	  if (oldState == channel.SUBSCRIBED) {
	    var stateChangeData = {
	      channel: channelName,
	      oldState: oldState,
	      newState: channel.state
	    };
	    channel.emit('subscribeStateChange', stateChangeData);
	    channel.emit('unsubscribe', channelName);
	    SCEmitter.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
	    SCEmitter.prototype.emit.call(this, 'unsubscribe', channelName);
	  }
	};

	SCSocket.prototype._tryUnsubscribe = function (channel) {
	  var self = this;

	  if (this.state == this.OPEN) {
	    var options = {
	      noTimeout: true
	    };
	    // If there is a pending subscribe action, cancel the callback
	    this._cancelPendingSubscribeCallback(channel);

	    // This operation cannot fail because the TCP protocol guarantees delivery
	    // so long as the connection remains open. If the connection closes,
	    // the server will automatically unsubscribe the socket and thus complete
	    // the operation on the server side.
	    var decoratedChannelName = this._decorateChannelName(channel.name);
	    this.transport.emit('#unsubscribe', decoratedChannelName, options);
	  }
	};

	SCSocket.prototype.unsubscribe = function (channelName) {

	  var channel = this._channels[channelName];

	  if (channel) {
	    if (channel.state != channel.UNSUBSCRIBED) {

	      this._triggerChannelUnsubscribe(channel);
	      this._tryUnsubscribe(channel);
	    }
	  }
	};

	SCSocket.prototype.channel = function (channelName, options) {
	  var currentChannel = this._channels[channelName];

	  if (!currentChannel) {
	    currentChannel = new SCChannel(channelName, this, options);
	    this._channels[channelName] = currentChannel;
	  }
	  return currentChannel;
	};

	SCSocket.prototype.destroyChannel = function (channelName) {
	  var channel = this._channels[channelName];
	  channel.unwatch();
	  channel.unsubscribe();
	  delete this._channels[channelName];
	};

	SCSocket.prototype.subscriptions = function (includePending) {
	  var subs = [];
	  var channel, includeChannel;
	  for (var channelName in this._channels) {
	    if (this._channels.hasOwnProperty(channelName)) {
	      channel = this._channels[channelName];

	      if (includePending) {
	        includeChannel = channel && (channel.state == channel.SUBSCRIBED ||
	          channel.state == channel.PENDING);
	      } else {
	        includeChannel = channel && channel.state == channel.SUBSCRIBED;
	      }

	      if (includeChannel) {
	        subs.push(channelName);
	      }
	    }
	  }
	  return subs;
	};

	SCSocket.prototype.isSubscribed = function (channelName, includePending) {
	  var channel = this._channels[channelName];
	  if (includePending) {
	    return !!channel && (channel.state == channel.SUBSCRIBED ||
	      channel.state == channel.PENDING);
	  }
	  return !!channel && channel.state == channel.SUBSCRIBED;
	};

	SCSocket.prototype.processPendingSubscriptions = function () {
	  var self = this;

	  this.pendingConnectCallback = false;

	  for (var i in this._channels) {
	    if (this._channels.hasOwnProperty(i)) {
	      (function (channel) {
	        if (channel.state == channel.PENDING) {
	          self._trySubscribe(channel);
	        }
	      })(this._channels[i]);
	    }
	  }
	};

	SCSocket.prototype.watch = function (channelName, handler) {
	  if (typeof handler != 'function') {
	    throw new InvalidArgumentsError('No handler function was provided');
	  }
	  this._channelEmitter.on(channelName, handler);
	};

	SCSocket.prototype.unwatch = function (channelName, handler) {
	  if (handler) {
	    this._channelEmitter.removeListener(channelName, handler);
	  } else {
	    this._channelEmitter.removeAllListeners(channelName);
	  }
	};

	SCSocket.prototype.watchers = function (channelName) {
	  return this._channelEmitter.listeners(channelName);
	};

	module.exports = SCSocket;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(26).Buffer))

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = configureStore;

	var _reduxDevtoolsInstrument = __webpack_require__(162);

	var _reduxDevtoolsInstrument2 = _interopRequireDefault(_reduxDevtoolsInstrument);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore(next, subscriber, options) {
	  return (0, _reduxDevtoolsInstrument2.default)(subscriber, options)(next);
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var defaultSocketOptions = exports.defaultSocketOptions = {
	  secure: true,
	  hostname: 'remotedev.io',
	  port: 443,
	  autoReconnect: true,
	  autoReconnectOptions: {
	    randomness: 30000
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = devTools;
	exports.preDevTools = preDevTools;
	exports.composeWithDevTools = composeWithDevTools;

	var _jsan = __webpack_require__(63);

	var _socketclusterClient = __webpack_require__(169);

	var _socketclusterClient2 = _interopRequireDefault(_socketclusterClient);

	var _configureStore = __webpack_require__(52);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _constants = __webpack_require__(53);

	var _reactNative = __webpack_require__(55);

	var _remotedevUtils = __webpack_require__(165);

	var _catchErrors = __webpack_require__(163);

	var _catchErrors2 = _interopRequireDefault(_catchErrors);

	var _filters = __webpack_require__(164);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var instanceId = void 0;
	var instanceName = void 0;
	var socketOptions = void 0;
	var socket = void 0;
	var channel = void 0;
	var store = {};
	var lastAction = void 0;
	var filters = void 0;
	var isExcess = void 0;
	var isMonitored = void 0;
	var started = void 0;
	var startOn = void 0;
	var stopOn = void 0;
	var sendOn = void 0;
	var sendOnError = void 0;
	var sendTo = void 0;
	var lastErrorMsg = void 0;
	var locked = void 0;
	var paused = void 0;
	var actionCreators = void 0;
	var stateSanitizer = void 0;
	var actionSanitizer = void 0;

	function getLiftedState() {
	  return (0, _filters.filterStagedActions)(store.liftedStore.getState(), filters);
	}

	function send() {
	  if (!instanceId) instanceId = socket && socket.id || Math.random().toString(36).substr(2);
	  try {
	    fetch(sendTo, {
	      method: 'POST',
	      headers: {
	        'content-type': 'application/json'
	      },
	      body: JSON.stringify({
	        type: 'STATE',
	        id: instanceId,
	        name: instanceName,
	        payload: (0, _jsan.stringify)(getLiftedState())
	      })
	    }).catch(function (err) {
	      console.log(err);
	    });
	  } catch (err) {
	    console.log(err);
	  }
	}

	function relay(type, state, action, nextActionId) {
	  if ((0, _filters.isFiltered)(action, filters)) return;
	  var message = {
	    type: type,
	    id: socket.id,
	    name: instanceName
	  };
	  if (state) {
	    message.payload = type === 'ERROR' ? state : (0, _jsan.stringify)((0, _filters.filterState)(state, type, filters, stateSanitizer, actionSanitizer, nextActionId));
	  }
	  if (type === 'ACTION') {
	    message.action = (0, _jsan.stringify)(!actionSanitizer ? action : actionSanitizer(action.action, nextActionId - 1));
	    message.isExcess = isExcess;
	    message.nextActionId = nextActionId;
	  } else if (action) {
	    message.action = action;
	  }
	  socket.emit(socket.id ? 'log' : 'log-noid', message);
	}

	function dispatchRemotely(action) {
	  try {
	    var result = (0, _remotedevUtils.evalAction)(action, actionCreators);
	    store.dispatch(result);
	  } catch (e) {
	    relay('ERROR', e.message);
	  }
	}

	function handleMessages(message) {
	  if (message.type === 'IMPORT' || message.type === 'SYNC' && socket.id && message.id !== socket.id) {
	    store.liftedStore.dispatch({
	      type: 'IMPORT_STATE', nextLiftedState: (0, _jsan.parse)(message.state)
	    });
	  } else if (message.type === 'UPDATE') {
	    relay('STATE', getLiftedState());
	  } else if (message.type === 'START') {
	    isMonitored = true;
	    if (typeof actionCreators === 'function') actionCreators = actionCreators();
	    relay('STATE', getLiftedState(), actionCreators);
	  } else if (message.type === 'STOP' || message.type === 'DISCONNECTED') {
	    isMonitored = false;
	    relay('STOP');
	  } else if (message.type === 'ACTION') {
	    dispatchRemotely(message.action);
	  } else if (message.type === 'DISPATCH') {
	    store.liftedStore.dispatch(message.action);
	  }
	}

	function async(fn) {
	  setTimeout(fn, 0);
	}

	function sendError(errorAction) {
	  // Prevent flooding
	  if (errorAction.message && errorAction.message === lastErrorMsg) return;
	  lastErrorMsg = errorAction.message;

	  async(function () {
	    store.dispatch(errorAction);
	    if (!started) send();
	  });
	}

	function str2array(str) {
	  return typeof str === 'string' ? [str] : str && str.length;
	}

	function init(options) {
	  instanceName = options.name;
	  if (options.filters) {
	    filters = options.filters;
	  }
	  if (options.port) {
	    socketOptions = {
	      port: options.port,
	      hostname: options.hostname || 'localhost',
	      secure: options.secure
	    };
	  } else socketOptions = _constants.defaultSocketOptions;

	  startOn = str2array(options.startOn);
	  stopOn = str2array(options.stopOn);
	  sendOn = str2array(options.sendOn);
	  sendOnError = options.sendOnError;
	  if (sendOn || sendOnError) {
	    sendTo = options.sendTo || (socketOptions.secure ? 'https' : 'http') + '://' + socketOptions.hostname + ':' + socketOptions.port;
	    instanceId = options.id;
	  }
	  if (sendOnError === 1) (0, _catchErrors2.default)(sendError);

	  if (options.actionCreators) actionCreators = function actionCreators() {
	    return (0, _remotedevUtils.getActionsArray)(options.actionCreators);
	  };
	  stateSanitizer = options.stateSanitizer;
	  actionSanitizer = options.actionSanitizer;
	}

	function login() {
	  socket.emit('login', 'master', function (err, channelName) {
	    if (err) {
	      console.log(err);return;
	    }
	    channel = channelName;
	    socket.subscribe(channelName).watch(handleMessages);
	    socket.on(channelName, handleMessages);
	  });
	  started = true;
	  relay('START');
	}

	function stop(keepConnected) {
	  started = false;
	  isMonitored = false;
	  if (!socket) return;
	  socket.destroyChannel(channel);
	  if (keepConnected) {
	    socket.off(channel, handleMessages);
	  } else {
	    socket.off();
	    socket.disconnect();
	  }
	}

	function start() {
	  if (started || socket && socket.getState() === socket.CONNECTING) return;

	  socket = _socketclusterClient2.default.connect(socketOptions);
	  socket.on('error', function (err) {
	    console.log(err);
	  });
	  socket.on('connect', function () {
	    login();
	  });
	  socket.on('disconnect', function () {
	    stop(true);
	  });
	}

	function checkForReducerErrors() {
	  var liftedState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : store.liftedStore.getState();

	  if (liftedState.computedStates[liftedState.currentStateIndex].error) {
	    if (started) relay('STATE', (0, _filters.filterStagedActions)(liftedState, filters));else send();
	    return true;
	  }
	  return false;
	}

	function monitorReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];

	  lastAction = action.type;
	  if (!started && sendOnError === 2 && store.liftedStore) async(checkForReducerErrors);else if (action.action) {
	    if (startOn && !started && startOn.indexOf(action.action.type) !== -1) async(start);else if (stopOn && started && stopOn.indexOf(action.action.type) !== -1) async(stop);else if (sendOn && !started && sendOn.indexOf(action.action.type) !== -1) async(send);
	  }
	  return state;
	}

	function handleChange(state, liftedState, maxAge) {
	  if (checkForReducerErrors(liftedState)) return;

	  if (lastAction === 'PERFORM_ACTION') {
	    var nextActionId = liftedState.nextActionId;
	    var liftedAction = liftedState.actionsById[nextActionId - 1];
	    relay('ACTION', state, liftedAction, nextActionId);
	    if (!isExcess && maxAge) isExcess = liftedState.stagedActionIds.length >= maxAge;
	  } else {
	    if (lastAction === 'JUMP_TO_STATE') return;
	    if (lastAction === 'PAUSE_RECORDING') {
	      paused = liftedState.isPaused;
	    } else if (lastAction === 'LOCK_CHANGES') {
	      locked = liftedState.isLocked;
	    }
	    if (paused) {
	      if (lastAction) lastAction = undefined;else return;
	    }
	    relay('STATE', (0, _filters.filterStagedActions)(liftedState, filters));
	  }
	}

	function devTools() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  init(_extends({}, options, {
	    hostname: (0, _reactNative.getHostForRN)(options.hostname)
	  }));
	  var realtime = typeof options.realtime === 'undefined' ? ("development") === 'development' : options.realtime;
	  if (!realtime && !(startOn || sendOn || sendOnError)) return function (f) {
	    return f;
	  };

	  var maxAge = options.maxAge || 30;
	  return function (next) {
	    return function (reducer, initialState) {
	      store = (0, _configureStore2.default)(next, monitorReducer, {
	        maxAge: maxAge,
	        shouldCatchErrors: !!sendOnError,
	        shouldHotReload: options.shouldHotReload,
	        shouldRecordChanges: options.shouldRecordChanges,
	        shouldStartLocked: options.shouldStartLocked,
	        pauseActionType: options.pauseActionType || '@@PAUSED'
	      })(reducer, initialState);

	      if (realtime) start();
	      store.subscribe(function () {
	        if (isMonitored) handleChange(store.getState(), store.liftedStore.getState(), maxAge);
	      });
	      return store;
	    };
	  };
	}

	function preDevTools(createStore) {
	  return function (reducer, preloadedState, enhancer) {
	    store = createStore(reducer, preloadedState, enhancer);
	    return _extends({}, store, {
	      dispatch: function dispatch(action) {
	        return locked ? action : store.dispatch(action);
	      }
	    });
	  };
	}

	devTools.updateStore = function (newStore) {
	  store = newStore;
	};

	function composeWithDevTools() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return devTools;
	  }

	  if (funcs.length === 1 && _typeof(funcs[0]) === 'object') {
	    return devTools(funcs[0]);
	  }

	  return function (options) {
	    return function () {
	      return [preDevTools].concat(funcs).reduceRight(function (composed, f) {
	        return f(composed);
	      }, devTools(options).apply(undefined, arguments));
	    };
	  };
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.getHostForRN = getHostForRN;
	/*
	 * Get React Native server IP if hostname is `localhost`
	 * On Android emulator, the IP of host is `10.0.2.2` (Genymotion: 10.0.3.2)
	 */
	function getHostForRN(hostname) {
	  if ((hostname === 'localhost' || hostname === '127.0.0.1') && typeof window !== 'undefined' && window.__fbBatchedBridge && window.__fbBatchedBridge.RemoteModules && window.__fbBatchedBridge.RemoteModules.AndroidConstants) {
	    var _window$__fbBatchedBr = window.__fbBatchedBridge.RemoteModules.AndroidConstants.ServerHost;
	    var ServerHost = _window$__fbBatchedBr === undefined ? hostname : _window$__fbBatchedBr;

	    return ServerHost.split(':')[0];
	  }

	  return hostname;
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
	;(function(root) {

		// Detect free variables `exports`.
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`.
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code, and use
		// it as `root`.
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var InvalidCharacterError = function(message) {
			this.message = message;
		};
		InvalidCharacterError.prototype = new Error;
		InvalidCharacterError.prototype.name = 'InvalidCharacterError';

		var error = function(message) {
			// Note: the error messages used throughout this file match those used by
			// the native `atob`/`btoa` implementation in Chromium.
			throw new InvalidCharacterError(message);
		};

		var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// http://whatwg.org/html/common-microsyntaxes.html#space-character
		var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

		// `decode` is designed to be fully compatible with `atob` as described in the
		// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
		// The optimized base64-decoding algorithm used is based on @atk’s excellent
		// implementation. https://gist.github.com/atk/1020396
		var decode = function(input) {
			input = String(input)
				.replace(REGEX_SPACE_CHARACTERS, '');
			var length = input.length;
			if (length % 4 == 0) {
				input = input.replace(/==?$/, '');
				length = input.length;
			}
			if (
				length % 4 == 1 ||
				// http://whatwg.org/C#alphanumeric-ascii-characters
				/[^+a-zA-Z0-9/]/.test(input)
			) {
				error(
					'Invalid character: the string to be decoded is not correctly encoded.'
				);
			}
			var bitCounter = 0;
			var bitStorage;
			var buffer;
			var output = '';
			var position = -1;
			while (++position < length) {
				buffer = TABLE.indexOf(input.charAt(position));
				bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
				// Unless this is the first of a group of 4 characters…
				if (bitCounter++ % 4) {
					// …convert the first 8 bits to a single ASCII character.
					output += String.fromCharCode(
						0xFF & bitStorage >> (-2 * bitCounter & 6)
					);
				}
			}
			return output;
		};

		// `encode` is designed to be fully compatible with `btoa` as described in the
		// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
		var encode = function(input) {
			input = String(input);
			if (/[^\0-\xFF]/.test(input)) {
				// Note: no need to special-case astral symbols here, as surrogates are
				// matched, and the input is supposed to only contain ASCII anyway.
				error(
					'The string to be encoded contains characters outside of the ' +
					'Latin1 range.'
				);
			}
			var padding = input.length % 3;
			var output = '';
			var position = -1;
			var a;
			var b;
			var c;
			var d;
			var buffer;
			// Make sure any padding is handled outside of the loop.
			var length = input.length - padding;

			while (++position < length) {
				// Read three bytes, i.e. 24 bits.
				a = input.charCodeAt(position) << 16;
				b = input.charCodeAt(++position) << 8;
				c = input.charCodeAt(++position);
				buffer = a + b + c;
				// Turn the 24 bits into four chunks of 6 bits each, and append the
				// matching character for each of them to the output.
				output += (
					TABLE.charAt(buffer >> 18 & 0x3F) +
					TABLE.charAt(buffer >> 12 & 0x3F) +
					TABLE.charAt(buffer >> 6 & 0x3F) +
					TABLE.charAt(buffer & 0x3F)
				);
			}

			if (padding == 2) {
				a = input.charCodeAt(position) << 8;
				b = input.charCodeAt(++position);
				buffer = a + b;
				output += (
					TABLE.charAt(buffer >> 10) +
					TABLE.charAt((buffer >> 4) & 0x3F) +
					TABLE.charAt((buffer << 2) & 0x3F) +
					'='
				);
			} else if (padding == 1) {
				buffer = input.charCodeAt(position);
				output += (
					TABLE.charAt(buffer >> 2) +
					TABLE.charAt((buffer << 4) & 0x3F) +
					'=='
				);
			}

			return output;
		};

		var base64 = {
			'encode': encode,
			'decode': decode,
			'version': '0.1.0'
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return base64;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = base64;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in base64) {
					base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.base64 = base64;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)(module), (function() { return this; }())))

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 58 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 59 */
/***/ function(module, exports) {

	/*
	    cycle.js
	    2013-02-19

	    Public Domain.

	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html

	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.
	*/

	/*jslint evil: true, regexp: true */

	/*members $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
	    retrocycle, stringify, test, toString
	*/

	var cycle = exports;

	cycle.decycle = function decycle(object) {
	    'use strict';

	// Make a deep copy of an object or array, assuring that there is at most
	// one instance of each object or array in the resulting structure. The
	// duplicate references (which might be forming cycles) are replaced with
	// an object of the form
	//      {$ref: PATH}
	// where the PATH is a JSONPath string that locates the first occurance.
	// So,
	//      var a = [];
	//      a[0] = a;
	//      return JSON.stringify(JSON.decycle(a));
	// produces the string '[{"$ref":"$"}]'.

	// JSONPath is used to locate the unique object. $ indicates the top level of
	// the object or array. [NUMBER] or [STRING] indicates a child member or
	// property.

	    var objects = [],   // Keep a reference to each unique object or array
	        paths = [];     // Keep the path to each unique object or array

	    return (function derez(value, path) {

	// The derez recurses through the object, producing the deep copy.

	        var i,          // The loop counter
	            name,       // Property name
	            nu;         // The new object or array

	// typeof null === 'object', so go on if this value is really an object but not
	// one of the weird builtin objects.

	        if (typeof value === 'object' && value !== null &&
	                !(value instanceof Boolean) &&
	                !(value instanceof Date)    &&
	                !(value instanceof Number)  &&
	                !(value instanceof RegExp)  &&
	                !(value instanceof String)) {

	// If the value is an object or array, look to see if we have already
	// encountered it. If so, return a $ref/path object. This is a hard way,
	// linear search that will get slower as the number of unique objects grows.

	            for (i = 0; i < objects.length; i += 1) {
	                if (objects[i] === value) {
	                    return {$ref: paths[i]};
	                }
	            }

	// Otherwise, accumulate the unique value and its path.

	            objects.push(value);
	            paths.push(path);

	// If it is an array, replicate the array.

	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                nu = [];
	                for (i = 0; i < value.length; i += 1) {
	                    nu[i] = derez(value[i], path + '[' + i + ']');
	                }
	            } else {

	// If it is an object, replicate the object.

	                nu = {};
	                for (name in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, name)) {
	                        nu[name] = derez(value[name],
	                            path + '[' + JSON.stringify(name) + ']');
	                    }
	                }
	            }
	            return nu;
	        }
	        return value;
	    }(object, '$'));
	};


	cycle.retrocycle = function retrocycle($) {
	    'use strict';

	// Restore an object that was reduced by decycle. Members whose values are
	// objects of the form
	//      {$ref: PATH}
	// are replaced with references to the value found by the PATH. This will
	// restore cycles. The object will be mutated.

	// The eval function is used to locate the values described by a PATH. The
	// root object is kept in a $ variable. A regular expression is used to
	// assure that the PATH is extremely well formed. The regexp contains nested
	// * quantifiers. That has been known to have extremely bad performance
	// problems on some browsers for very long strings. A PATH is expected to be
	// reasonably short. A PATH is allowed to belong to a very restricted subset of
	// Goessner's JSONPath.

	// So,
	//      var s = '[{"$ref":"$"}]';
	//      return JSON.retrocycle(JSON.parse(s));
	// produces an array containing a single element which is the array itself.

	    var px =
	        /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

	    (function rez(value) {

	// The rez function walks recursively through the object looking for $ref
	// properties. When it finds one that has a value that is a path, then it
	// replaces the $ref object with a reference to the value that is found by
	// the path.

	        var i, item, name, path;

	        if (value && typeof value === 'object') {
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	                for (i = 0; i < value.length; i += 1) {
	                    item = value[i];
	                    if (item && typeof item === 'object') {
	                        path = item.$ref;
	                        if (typeof path === 'string' && px.test(path)) {
	                            value[i] = eval(path);
	                        } else {
	                            rez(item);
	                        }
	                    }
	                }
	            } else {
	                for (name in value) {
	                    if (typeof value[name] === 'object') {
	                        item = value[name];
	                        if (item) {
	                            path = item.$ref;
	                            if (typeof path === 'string' && px.test(path)) {
	                                value[name] = eval(path);
	                            } else {
	                                rez(item);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }($));
	    return $;
	};


/***/ },
/* 60 */
/***/ function(module, exports) {

	/* global window */
	var GetParams = function (func) {
		'use strict';

		if (typeof func !== 'function') {
			return [];
		}

		var patternComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var patternArguments = /([^\s,]+)/g;

		var funcString = func
			.toString()
			.replace(patternComments, '');

		var result = funcString
			.slice(
				funcString.indexOf('(') + 1,
				funcString.indexOf(')')
			)
			.match(patternArguments);

		if (result === null) {
			return [];
		}

		return result;
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = GetParams;
	}

	if (typeof window !== 'undefined') {
		window.GetParams = GetParams;
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 62 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var pathGetter = __webpack_require__(27);
	var utils = __webpack_require__(66);

	// Based on https://github.com/douglascrockford/JSON-js/blob/master/cycle.js

	exports.decycle = function decycle(object, options, replacer) {
	  'use strict';

	  var objects = [],   // Keep a reference to each unique object or array
	      paths = [];     // Keep the path to each unique object or array

	  return (function derez(_value, path, key) {

	    // The derez recurses through the object, producing the deep copy.

	    var i,          // The loop counter
	      name,       // Property name
	      nu;         // The new object or array

	    // typeof null === 'object', so go on if this value is really an object but not
	    // one of the weird builtin objects.

	    var value = replacer ? replacer(key || '', _value) : _value;

	    if (options.date && value instanceof Date) {
	      return {$jsan: 'd' + value.getTime()};
	    }
	    if (options.regex && value instanceof RegExp) {
	      return {$jsan: 'r' + utils.getRegexFlags(value) + ',' + value.source};
	    }
	    if (options['function'] && typeof value === 'function') {
	      return {$jsan: 'f' + utils.stringifyFunction(value, options['function'])}
	    }
	    if (options['undefined'] && value === undefined) {
	      return {$jsan: 'u'}
	    }
	    if (options['error'] && value instanceof Error) {
	      return {$jsan: 'e' + value.message}
	    }

	    if (value && typeof value.toJSON === 'function') {
	      value = value.toJSON();
	    }

	    if (typeof value === 'object' && value !== null &&
	      !(value instanceof Boolean) &&
	      !(value instanceof Date)    &&
	      !(value instanceof Number)  &&
	      !(value instanceof RegExp)  &&
	      !(value instanceof String)  &&
	      !(value instanceof Error)) {

	        // If the value is an object or array, look to see if we have already
	        // encountered it. If so, return a $ref/path object. This is a hard way,
	        // linear search that will get slower as the number of unique objects grows.

	      for (i = 0; i < objects.length; i += 1) {
	          if (objects[i] === value) {
	              return {$jsan: paths[i]};
	          }
	      }

	      // Otherwise, accumulate the unique value and its path.

	      objects.push(value);
	      paths.push(path);

	      // If it is an array, replicate the array.

	      if (Object.prototype.toString.apply(value) === '[object Array]') {
	          nu = [];
	          for (i = 0; i < value.length; i += 1) {
	              nu[i] = derez(value[i], path + '[' + i + ']', i);
	          }
	      } else {

	        // If it is an object, replicate the object.

	        nu = {};
	        for (name in value) {
	          if (Object.prototype.hasOwnProperty.call(value, name)) {
	            var nextPath = /^\w+$/.test(name) ?
	              '.' + name :
	              '[' + JSON.stringify(name) + ']';
	            nu[name] = name === '$jsan' ? [derez(value[name], path + nextPath)] : derez(value[name], path + nextPath, name);
	          }
	        }
	      }
	      return nu;
	    }
	    return value;
	  }(object, '$'));
	};


	exports.retrocycle = function retrocycle($) {
	  'use strict';


	  (function rez(value) {

	    // The rez function walks recursively through the object looking for $jsan
	    // properties. When it finds one that has a value that is a path, then it
	    // replaces the $jsan object with a reference to the value that is found by
	    // the path.

	    var i, item, name, path;

	    if (value && typeof value === 'object') {
	      if (Object.prototype.toString.apply(value) === '[object Array]') {
	        for (i = 0; i < value.length; i += 1) {
	          item = value[i];
	          if (item && typeof item === 'object') {
	            if (item.$jsan) {
	              value[i] = utils.restore(item.$jsan, $);
	            } else {
	              rez(item);
	            }
	          }
	        }
	      } else {
	        for (name in value) {
	          if (name === '$jsan') {
	            value[name] = value[name][0];
	          }
	          if (typeof value[name] === 'object') {
	            item = value[name];
	            if (item && typeof item === 'object') {
	              if (item.$jsan) {
	                value[name] = utils.restore(item.$jsan, $);
	              } else {
	                rez(item);
	              }
	            }
	          }
	        }
	      }
	    }
	  }($));
	  return $;
	};


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var cycle = __webpack_require__(64);

	exports.stringify = function stringify(value, replacer, space, _options) {

	  if (arguments.length < 4) {
	    try {
	      if (arguments.length === 1) {
	        return JSON.stringify(value);
	      } else {
	        return JSON.stringify.apply(JSON, arguments);
	      }
	    } catch (e) {}
	  }

	  var options = _options || false;
	  if (typeof options === 'boolean') {
	    options = {
	      'date': options,
	      'function': options,
	      'regex': options,
	      'undefined': options,
	      'error': options
	    }
	  }

	  var decycled = cycle.decycle(value, options, replacer);
	  if (arguments.length === 1) {
	    return JSON.stringify(decycled);
	  } else {
	    return JSON.stringify(decycled, replacer, space);
	  }

	}

	exports.parse = function parse(text, reviver) {
	  var needsRetrocycle = /"\$jsan"/.test(text);
	  var parsed;
	  if (arguments.length === 1) {
	    parsed = JSON.parse(text);
	  } else {
	    parsed = JSON.parse(text, reviver);
	  }
	  if (needsRetrocycle) {
	    parsed = cycle.retrocycle(parsed);
	  }
	  return parsed;
	}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var pathGetter = __webpack_require__(27);

	exports.getRegexFlags = function getRegexFlags(regex) {
	  var flags = '';
	  if (regex.ignoreCase) flags += 'i';
	  if (regex.global) flags += 'g';
	  if (regex.multiline) flags += 'm';
	  return flags;
	};

	exports.stringifyFunction = function stringifyFunction(fn, customToString) {
	  if (typeof customToString === 'function') {
	    return customToString(fn);
	  }
	  var str = fn.toString();
	  var match = str.match(/^[^{]*{|^[^=]*=>/);
	  var start = match ? match[0] : '<function> ';
	  var end = str[str.length - 1] === '}' ? '}' : '';
	  return start.replace(/\r\n|\n/g, ' ').replace(/\s+/g, ' ') + ' /* ... */ ' + end;
	};

	exports.restore = function restore(obj, root) {
	  var type = obj[0];
	  var rest = obj.slice(1);
	  switch(type) {
	    case '$':
	      return pathGetter(root, obj);
	    case 'r':
	      var comma = rest.indexOf(',');
	      var flags = rest.slice(0, comma);
	      var source = rest.slice(comma + 1);
	      return RegExp(source, flags);
	    case 'd':
	      return new Date(+rest);
	    case 'f':
	      var fn = function() { throw new Error("can't run jsan parsed function") };
	      fn.toString = function() { return rest; };
	      return fn;
	    case 'u':
	      return undefined;
	    case 'e':
	      var error = new Error(rest);
	      error.stack = 'Stack is unavailable for jsan parsed errors';
	      return error;
	    default:
	      console.warn('unknown type', obj);
	      return obj;
	  }
	}


/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Constants.
	 */

	var errorMessage;

	errorMessage = 'An argument without append, prepend, ' +
	    'or detach methods was given to `List';

	/**
	 * Creates a new List: A linked list is a bit like an Array, but
	 * knows nothing about how many items are in it, and knows only about its
	 * first (`head`) and last (`tail`) items. Each item (e.g. `head`, `tail`,
	 * &c.) knows which item comes before or after it (its more like the
	 * implementation of the DOM in JavaScript).
	 * @global
	 * @private
	 * @constructor
	 * @class Represents an instance of List.
	 */

	function List(/*items...*/) {
	    if (arguments.length) {
	        return List.from(arguments);
	    }
	}

	var ListPrototype;

	ListPrototype = List.prototype;

	/**
	 * Creates a new list from the arguments (each a list item) passed in.
	 * @name List.of
	 * @param {...ListItem} [items] - Zero or more items to attach.
	 * @returns {list} - A new instance of List.
	 */

	List.of = function (/*items...*/) {
	    return List.from.call(this, arguments);
	};

	/**
	 * Creates a new list from the given array-like object (each a list item)
	 * passed in.
	 * @name List.from
	 * @param {ListItem[]} [items] - The items to append.
	 * @returns {list} - A new instance of List.
	 */
	List.from = function (items) {
	    var list = new this(), length, iterator, item;

	    if (items && (length = items.length)) {
	        iterator = -1;

	        while (++iterator < length) {
	            item = items[iterator];

	            if (item !== null && item !== undefined) {
	                list.append(item);
	            }
	        }
	    }

	    return list;
	};

	/**
	 * List#head
	 * Default to `null`.
	 */
	ListPrototype.head = null;

	/**
	 * List#tail
	 * Default to `null`.
	 */
	ListPrototype.tail = null;

	/**
	 * Returns the list's items as an array. This does *not* detach the items.
	 * @name List#toArray
	 * @returns {ListItem[]} - An array of (still attached) ListItems.
	 */
	ListPrototype.toArray = function () {
	    var item = this.head,
	        result = [];

	    while (item) {
	        result.push(item);
	        item = item.next;
	    }

	    return result;
	};

	/**
	 * Prepends the given item to the list: Item will be the new first item
	 * (`head`).
	 * @name List#prepend
	 * @param {ListItem} item - The item to prepend.
	 * @returns {ListItem} - An instance of ListItem (the given item).
	 */
	ListPrototype.prepend = function (item) {
	    if (!item) {
	        return false;
	    }

	    if (!item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + '#prepend`.');
	    }

	    var self, head;

	    // Cache self.
	    self = this;

	    // If self has a first item, defer prepend to the first items prepend
	    // method, and return the result.
	    head = self.head;

	    if (head) {
	        return head.prepend(item);
	    }

	    // ...otherwise, there is no `head` (or `tail`) item yet.

	    // Detach the prependee.
	    item.detach();

	    // Set the prependees parent list to reference self.
	    item.list = self;

	    // Set self's first item to the prependee, and return the item.
	    self.head = item;

	    return item;
	};

	/**
	 * Appends the given item to the list: Item will be the new last item (`tail`)
	 * if the list had a first item, and its first item (`head`) otherwise.
	 * @name List#append
	 * @param {ListItem} item - The item to append.
	 * @returns {ListItem} - An instance of ListItem (the given item).
	 */

	ListPrototype.append = function (item) {
	    if (!item) {
	        return false;
	    }

	    if (!item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + '#append`.');
	    }

	    var self, head, tail;

	    // Cache self.
	    self = this;

	    // If self has a last item, defer appending to the last items append
	    // method, and return the result.
	    tail = self.tail;

	    if (tail) {
	        return tail.append(item);
	    }

	    // If self has a first item, defer appending to the first items append
	    // method, and return the result.
	    head = self.head;

	    if (head) {
	        return head.append(item);
	    }

	    // ...otherwise, there is no `tail` or `head` item yet.

	    // Detach the appendee.
	    item.detach();

	    // Set the appendees parent list to reference self.
	    item.list = self;

	    // Set self's first item to the appendee, and return the item.
	    self.head = item;

	    return item;
	};

	/**
	 * Creates a new ListItem: A linked list item is a bit like DOM node:
	 * It knows only about its "parent" (`list`), the item before it (`prev`),
	 * and the item after it (`next`).
	 * @global
	 * @private
	 * @constructor
	 * @class Represents an instance of ListItem.
	 */

	function ListItem() {}

	List.Item = ListItem;

	var ListItemPrototype = ListItem.prototype;

	ListItemPrototype.next = null;

	ListItemPrototype.prev = null;

	ListItemPrototype.list = null;

	/**
	 * Detaches the item operated on from its parent list.
	 * @name ListItem#detach
	 * @returns {ListItem} - The item operated on.
	 */
	ListItemPrototype.detach = function () {
	    // Cache self, the parent list, and the previous and next items.
	    var self = this,
	        list = self.list,
	        prev = self.prev,
	        next = self.next;

	    // If the item is already detached, return self.
	    if (!list) {
	        return self;
	    }

	    // If self is the last item in the parent list, link the lists last item
	    // to the previous item.
	    if (list.tail === self) {
	        list.tail = prev;
	    }

	    // If self is the first item in the parent list, link the lists first item
	    // to the next item.
	    if (list.head === self) {
	        list.head = next;
	    }

	    // If both the last and first items in the parent list are the same,
	    // remove the link to the last item.
	    if (list.tail === list.head) {
	        list.tail = null;
	    }

	    // If a previous item exists, link its next item to selfs next item.
	    if (prev) {
	        prev.next = next;
	    }

	    // If a next item exists, link its previous item to selfs previous item.
	    if (next) {
	        next.prev = prev;
	    }

	    // Remove links from self to both the next and previous items, and to the
	    // parent list.
	    self.prev = self.next = self.list = null;

	    // Return self.
	    return self;
	};

	/**
	 * Prepends the given item *before* the item operated on.
	 * @name ListItem#prepend
	 * @param {ListItem} item - The item to prepend.
	 * @returns {ListItem} - The item operated on, or false when that item is not
	 * attached.
	 */
	ListItemPrototype.prepend = function (item) {
	    if (!item || !item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + 'Item#prepend`.');
	    }

	    // Cache self, the parent list, and the previous item.
	    var self = this,
	        list = self.list,
	        prev = self.prev;

	    // If self is detached, return false.
	    if (!list) {
	        return false;
	    }

	    // Detach the prependee.
	    item.detach();

	    // If self has a previous item...
	    if (prev) {
	        // ...link the prependees previous item, to selfs previous item.
	        item.prev = prev;

	        // ...link the previous items next item, to self.
	        prev.next = item;
	    }

	    // Set the prependees next item to self.
	    item.next = self;

	    // Set the prependees parent list to selfs parent list.
	    item.list = list;

	    // Set the previous item of self to the prependee.
	    self.prev = item;

	    // If self is the first item in the parent list, link the lists first item
	    // to the prependee.
	    if (self === list.head) {
	        list.head = item;
	    }

	    // If the the parent list has no last item, link the lists last item to
	    // self.
	    if (!list.tail) {
	        list.tail = self;
	    }

	    // Return the prependee.
	    return item;
	};

	/**
	 * Appends the given item *after* the item operated on.
	 * @name ListItem#append
	 * @param {ListItem} item - The item to append.
	 * @returns {ListItem} - The item operated on, or false when that item is not
	 * attached.
	 */
	ListItemPrototype.append = function (item) {
	    // If item is falsey, return false.
	    if (!item || !item.append || !item.prepend || !item.detach) {
	        throw new Error(errorMessage + 'Item#append`.');
	    }

	    // Cache self, the parent list, and the next item.
	    var self = this,
	        list = self.list,
	        next = self.next;

	    // If self is detached, return false.
	    if (!list) {
	        return false;
	    }

	    // Detach the appendee.
	    item.detach();

	    // If self has a next item...
	    if (next) {
	        // ...link the appendees next item, to selfs next item.
	        item.next = next;

	        // ...link the next items previous item, to the appendee.
	        next.prev = item;
	    }

	    // Set the appendees previous item to self.
	    item.prev = self;

	    // Set the appendees parent list to selfs parent list.
	    item.list = list;

	    // Set the next item of self to the appendee.
	    self.next = item;

	    // If the the parent list has no last item or if self is the parent lists
	    // last item, link the lists last item to the appendee.
	    if (self === list.tail || !list.tail) {
	        list.tail = item;
	    }

	    // Return the appendee.
	    return item;
	};

	/**
	 * Expose `List`.
	 */

	module.exports = List;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(67);


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2),
	    root = __webpack_require__(1);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(112),
	    hashDelete = __webpack_require__(113),
	    hashGet = __webpack_require__(114),
	    hashHas = __webpack_require__(115),
	    hashSet = __webpack_require__(116);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2),
	    root = __webpack_require__(1);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(1);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2),
	    root = __webpack_require__(1);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 74 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(99),
	    isArguments = __webpack_require__(20),
	    isArray = __webpack_require__(3),
	    isIndex = __webpack_require__(40);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  // Safari 9 makes `arguments.length` enumerable in strict mode.
	  var result = (isArray(value) || isArguments(value))
	    ? baseTimes(value.length, String)
	    : [];

	  var length = result.length,
	      skipIndexes = !!length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var defineProperty = Object.defineProperty;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(15),
	    arrayIncludes = __webpack_require__(30),
	    arrayIncludesWith = __webpack_require__(31),
	    arrayMap = __webpack_require__(76),
	    baseUnary = __webpack_require__(36),
	    cacheHas = __webpack_require__(17);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(103);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(82),
	    keys = __webpack_require__(24);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `getTag`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  return objectToString.call(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(81),
	    baseIsNaN = __webpack_require__(89),
	    strictIndexOf = __webpack_require__(146);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(29),
	    equalArrays = __webpack_require__(38),
	    equalByTag = __webpack_require__(105),
	    equalObjects = __webpack_require__(106),
	    getTag = __webpack_require__(109),
	    isArray = __webpack_require__(3),
	    isTypedArray = __webpack_require__(153);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(29),
	    baseIsEqual = __webpack_require__(34);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(47),
	    isMasked = __webpack_require__(119),
	    isObject = __webpack_require__(11),
	    toSource = __webpack_require__(44);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(22),
	    isObjectLike = __webpack_require__(4);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(94),
	    baseMatchesProperty = __webpack_require__(95),
	    identity = __webpack_require__(19),
	    isArray = __webpack_require__(3),
	    property = __webpack_require__(157);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(120),
	    nativeKeys = __webpack_require__(134);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(88),
	    getMatchData = __webpack_require__(107),
	    matchesStrictComparable = __webpack_require__(42);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(34),
	    get = __webpack_require__(150),
	    hasIn = __webpack_require__(151),
	    isKey = __webpack_require__(8),
	    isStrictComparable = __webpack_require__(41),
	    matchesStrictComparable = __webpack_require__(42),
	    toKey = __webpack_require__(10);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 96 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(33);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(148),
	    identity = __webpack_require__(19),
	    nativeDefineProperty = __webpack_require__(133);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !nativeDefineProperty ? identity : function(func, string) {
	  return nativeDefineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(16),
	    isSymbol = __webpack_require__(23);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(15),
	    arrayIncludes = __webpack_require__(30),
	    arrayIncludesWith = __webpack_require__(31),
	    cacheHas = __webpack_require__(17),
	    createSet = __webpack_require__(104),
	    setToArray = __webpack_require__(18);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;

	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(1);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 103 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(28),
	    noop = __webpack_require__(156),
	    setToArray = __webpack_require__(18);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Creates a set object of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
	  return new Set(values);
	};

	module.exports = createSet;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(16),
	    Uint8Array = __webpack_require__(72),
	    eq = __webpack_require__(45),
	    equalArrays = __webpack_require__(38),
	    mapToArray = __webpack_require__(131),
	    setToArray = __webpack_require__(18);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(24);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(41),
	    keys = __webpack_require__(24);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(43);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(69),
	    Map = __webpack_require__(13),
	    Promise = __webpack_require__(71),
	    Set = __webpack_require__(28),
	    WeakMap = __webpack_require__(73),
	    baseGetTag = __webpack_require__(84),
	    toSource = __webpack_require__(44);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(37),
	    isArguments = __webpack_require__(20),
	    isArray = __webpack_require__(3),
	    isIndex = __webpack_require__(40),
	    isKey = __webpack_require__(8),
	    isLength = __webpack_require__(22),
	    toKey = __webpack_require__(10);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(9);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(9);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(9);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(9);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(16),
	    isArguments = __webpack_require__(20),
	    isArray = __webpack_require__(3);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },
/* 118 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(102);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 120 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(6);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(6);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(6);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(6);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(70),
	    ListCache = __webpack_require__(5),
	    Map = __webpack_require__(13);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(7);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(7);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(7);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(7);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(155);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(2);

	/* Built-in method references that are verified to be native. */
	var nativeDefineProperty = getNative(Object, 'defineProperty');

	module.exports = nativeDefineProperty;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(43);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(39);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)(module)))

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(74);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(98),
	    shortOut = __webpack_require__(140);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 140 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 500,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(5);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(5),
	    Map = __webpack_require__(13),
	    MapCache = __webpack_require__(14);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 146 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(132),
	    toString = __webpack_require__(158);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  string = toString(string);

	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(80),
	    baseFlatten = __webpack_require__(32),
	    baseRest = __webpack_require__(35),
	    isArrayLikeObject = __webpack_require__(21);

	/**
	 * Creates an array of `array` values not included in the other given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * **Note:** Unlike `_.pullAll`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	    : [];
	});

	module.exports = difference;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(33);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(85),
	    hasPath = __webpack_require__(111);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(108),
	    isObjectLike = __webpack_require__(4);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(91),
	    baseUnary = __webpack_require__(36),
	    nodeUtil = __webpack_require__(135);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(79),
	    baseForOwn = __webpack_require__(83),
	    baseIteratee = __webpack_require__(92);

	/**
	 * Creates an object with the same keys as `object` and values generated
	 * by running each own enumerable string keyed property of `object` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @see _.mapKeys
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);

	  baseForOwn(object, function(value, key, object) {
	    baseAssignValue(result, key, iteratee(value, key, object));
	  });
	  return result;
	}

	module.exports = mapValues;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(14);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * This method returns `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.3.0
	 * @category Util
	 * @example
	 *
	 * _.times(2, _.noop);
	 * // => [undefined, undefined]
	 */
	function noop() {
	  // No operation performed.
	}

	module.exports = noop;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(96),
	    basePropertyDeep = __webpack_require__(97),
	    isKey = __webpack_require__(8),
	    toKey = __webpack_require__(10);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(100);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(32),
	    baseRest = __webpack_require__(35),
	    baseUniq = __webpack_require__(101),
	    isArrayLikeObject = __webpack_require__(21);

	/**
	 * Creates an array of unique values, in order, from all given arrays using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([2], [1, 2]);
	 * // => [2, 1]
	 */
	var union = baseRest(function(arrays) {
	  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
	});

	module.exports = union;


/***/ },
/* 160 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ },
/* 161 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.INIT_ACTION = exports.ActionCreators = exports.ActionTypes = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.liftAction = liftAction;
	exports.liftReducerWith = liftReducerWith;
	exports.unliftState = unliftState;
	exports.unliftStore = unliftStore;
	exports.default = instrument;

	var _difference = __webpack_require__(149);

	var _difference2 = _interopRequireDefault(_difference);

	var _union = __webpack_require__(159);

	var _union2 = _interopRequireDefault(_union);

	var _isPlainObject = __webpack_require__(152);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(174);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ActionTypes = exports.ActionTypes = {
	  PERFORM_ACTION: 'PERFORM_ACTION',
	  RESET: 'RESET',
	  ROLLBACK: 'ROLLBACK',
	  COMMIT: 'COMMIT',
	  SWEEP: 'SWEEP',
	  TOGGLE_ACTION: 'TOGGLE_ACTION',
	  SET_ACTIONS_ACTIVE: 'SET_ACTIONS_ACTIVE',
	  JUMP_TO_STATE: 'JUMP_TO_STATE',
	  IMPORT_STATE: 'IMPORT_STATE',
	  LOCK_CHANGES: 'LOCK_CHANGES',
	  PAUSE_RECORDING: 'PAUSE_RECORDING'
	};

	/**
	 * Action creators to change the History state.
	 */
	var ActionCreators = exports.ActionCreators = {
	  performAction: function performAction(action) {
	    if (!(0, _isPlainObject2.default)(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    return { type: ActionTypes.PERFORM_ACTION, action: action, timestamp: Date.now() };
	  },
	  reset: function reset() {
	    return { type: ActionTypes.RESET, timestamp: Date.now() };
	  },
	  rollback: function rollback() {
	    return { type: ActionTypes.ROLLBACK, timestamp: Date.now() };
	  },
	  commit: function commit() {
	    return { type: ActionTypes.COMMIT, timestamp: Date.now() };
	  },
	  sweep: function sweep() {
	    return { type: ActionTypes.SWEEP };
	  },
	  toggleAction: function toggleAction(id) {
	    return { type: ActionTypes.TOGGLE_ACTION, id: id };
	  },
	  setActionsActive: function setActionsActive(start, end) {
	    var active = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	    return { type: ActionTypes.SET_ACTIONS_ACTIVE, start: start, end: end, active: active };
	  },
	  jumpToState: function jumpToState(index) {
	    return { type: ActionTypes.JUMP_TO_STATE, index: index };
	  },
	  importState: function importState(nextLiftedState, noRecompute) {
	    return { type: ActionTypes.IMPORT_STATE, nextLiftedState: nextLiftedState, noRecompute: noRecompute };
	  },
	  lockChanges: function lockChanges(status) {
	    return { type: ActionTypes.LOCK_CHANGES, status: status };
	  },
	  pauseRecording: function pauseRecording(status) {
	    return { type: ActionTypes.PAUSE_RECORDING, status: status };
	  }
	};

	var INIT_ACTION = exports.INIT_ACTION = { type: '@@INIT' };

	/**
	 * Computes the next entry with exceptions catching.
	 */
	function computeWithTryCatch(reducer, action, state) {
	  var nextState = state;
	  var nextError = void 0;
	  try {
	    nextState = reducer(state, action);
	  } catch (err) {
	    nextError = err.toString();
	    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && (typeof window.chrome !== 'undefined' || typeof window.process !== 'undefined' && window.process.type === 'renderer')) {
	      // In Chrome, rethrowing provides better source map support
	      setTimeout(function () {
	        throw err;
	      });
	    } else {
	      console.error(err);
	    }
	  }

	  return {
	    state: nextState,
	    error: nextError
	  };
	}

	/**
	 * Computes the next entry in the log by applying an action.
	 */
	function computeNextEntry(reducer, action, state, shouldCatchErrors) {
	  if (!shouldCatchErrors) {
	    return { state: reducer(state, action) };
	  }
	  return computeWithTryCatch(reducer, action, state);
	}

	/**
	 * Runs the reducer on invalidated actions to get a fresh computation log.
	 */
	function recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, shouldCatchErrors) {
	  // Optimization: exit early and return the same reference
	  // if we know nothing could have changed.
	  if (!computedStates || minInvalidatedStateIndex === -1 || minInvalidatedStateIndex >= computedStates.length && computedStates.length === stagedActionIds.length) {
	    return computedStates;
	  }

	  var nextComputedStates = computedStates.slice(0, minInvalidatedStateIndex);
	  for (var i = minInvalidatedStateIndex; i < stagedActionIds.length; i++) {
	    var actionId = stagedActionIds[i];
	    var action = actionsById[actionId].action;

	    var previousEntry = nextComputedStates[i - 1];
	    var previousState = previousEntry ? previousEntry.state : committedState;

	    var shouldSkip = skippedActionIds.indexOf(actionId) > -1;
	    var entry = void 0;
	    if (shouldSkip) {
	      entry = previousEntry;
	    } else {
	      if (shouldCatchErrors && previousEntry && previousEntry.error) {
	        entry = {
	          state: previousState,
	          error: 'Interrupted by an error up the chain'
	        };
	      } else {
	        entry = computeNextEntry(reducer, action, previousState, shouldCatchErrors);
	      }
	    }
	    nextComputedStates.push(entry);
	  }

	  return nextComputedStates;
	}

	/**
	 * Lifts an app's action into an action on the lifted store.
	 */
	function liftAction(action) {
	  return ActionCreators.performAction(action);
	}

	/**
	 * Creates a history state reducer from an app's reducer.
	 */
	function liftReducerWith(reducer, initialCommittedState, monitorReducer, options) {
	  var initialLiftedState = {
	    monitorState: monitorReducer(undefined, {}),
	    nextActionId: 1,
	    actionsById: { 0: liftAction(INIT_ACTION) },
	    stagedActionIds: [0],
	    skippedActionIds: [],
	    committedState: initialCommittedState,
	    currentStateIndex: 0,
	    computedStates: [],
	    isLocked: options.shouldStartLocked === true,
	    isPaused: options.shouldRecordChanges === false
	  };

	  /**
	   * Manages how the history actions modify the history state.
	   */
	  return function (liftedState, liftedAction) {
	    var _ref = liftedState || initialLiftedState;

	    var monitorState = _ref.monitorState;
	    var actionsById = _ref.actionsById;
	    var nextActionId = _ref.nextActionId;
	    var stagedActionIds = _ref.stagedActionIds;
	    var skippedActionIds = _ref.skippedActionIds;
	    var committedState = _ref.committedState;
	    var currentStateIndex = _ref.currentStateIndex;
	    var computedStates = _ref.computedStates;
	    var isLocked = _ref.isLocked;
	    var isPaused = _ref.isPaused;


	    if (!liftedState) {
	      // Prevent mutating initialLiftedState
	      actionsById = _extends({}, actionsById);
	    }

	    function commitExcessActions(n) {
	      // Auto-commits n-number of excess actions.
	      var excess = n;
	      var idsToDelete = stagedActionIds.slice(1, excess + 1);

	      for (var i = 0; i < idsToDelete.length; i++) {
	        if (computedStates[i + 1].error) {
	          // Stop if error is found. Commit actions up to error.
	          excess = i;
	          idsToDelete = stagedActionIds.slice(1, excess + 1);
	          break;
	        } else {
	          delete actionsById[idsToDelete[i]];
	        }
	      }

	      skippedActionIds = skippedActionIds.filter(function (id) {
	        return idsToDelete.indexOf(id) === -1;
	      });
	      stagedActionIds = [0].concat(stagedActionIds.slice(excess + 1));
	      committedState = computedStates[excess].state;
	      computedStates = computedStates.slice(excess);
	      currentStateIndex = currentStateIndex > excess ? currentStateIndex - excess : 0;
	    }

	    function computePausedAction(shouldInit) {
	      var _extends2;

	      var computedState = void 0;
	      if (shouldInit) {
	        computedState = computedStates[currentStateIndex];
	        monitorState = monitorReducer(monitorState, liftedAction);
	      } else {
	        computedState = computeNextEntry(reducer, liftedAction.action, computedStates[currentStateIndex].state, false);
	      }
	      if (!options.pauseActionType || nextActionId === 1) {
	        return {
	          monitorState: monitorState,
	          actionsById: { 0: liftAction(INIT_ACTION) },
	          nextActionId: 1,
	          stagedActionIds: [0],
	          skippedActionIds: [],
	          committedState: computedState.state,
	          currentStateIndex: 0,
	          computedStates: [computedState],
	          isLocked: isLocked,
	          isPaused: true
	        };
	      }
	      if (shouldInit) {
	        stagedActionIds = [].concat(stagedActionIds, [nextActionId]);
	        nextActionId++;
	        currentStateIndex++;
	      }
	      return {
	        monitorState: monitorState,
	        actionsById: _extends({}, actionsById, (_extends2 = {}, _extends2[nextActionId - 1] = liftAction({ type: options.pauseActionType }), _extends2)),
	        nextActionId: nextActionId,
	        stagedActionIds: stagedActionIds,
	        skippedActionIds: skippedActionIds,
	        committedState: committedState,
	        currentStateIndex: currentStateIndex,
	        computedStates: [].concat(computedStates.slice(0, currentStateIndex), [computedState]),
	        isLocked: isLocked,
	        isPaused: true
	      };
	    }

	    // By default, agressively recompute every state whatever happens.
	    // This has O(n) performance, so we'll override this to a sensible
	    // value whenever we feel like we don't have to recompute the states.
	    var minInvalidatedStateIndex = 0;

	    switch (liftedAction.type) {
	      case ActionTypes.PERFORM_ACTION:
	        {
	          if (isLocked) return liftedState || initialLiftedState;
	          if (isPaused) return computePausedAction();

	          // Auto-commit as new actions come in.
	          if (options.maxAge && stagedActionIds.length === options.maxAge) {
	            commitExcessActions(1);
	          }

	          if (currentStateIndex === stagedActionIds.length - 1) {
	            currentStateIndex++;
	          }
	          var actionId = nextActionId++;
	          // Mutation! This is the hottest path, and we optimize on purpose.
	          // It is safe because we set a new key in a cache dictionary.
	          actionsById[actionId] = liftedAction;
	          stagedActionIds = [].concat(stagedActionIds, [actionId]);
	          // Optimization: we know that only the new action needs computing.
	          minInvalidatedStateIndex = stagedActionIds.length - 1;
	          break;
	        }
	      case ActionTypes.RESET:
	        {
	          // Get back to the state the store was created with.
	          actionsById = { 0: liftAction(INIT_ACTION) };
	          nextActionId = 1;
	          stagedActionIds = [0];
	          skippedActionIds = [];
	          committedState = initialCommittedState;
	          currentStateIndex = 0;
	          computedStates = [];
	          break;
	        }
	      case ActionTypes.COMMIT:
	        {
	          // Consider the last committed state the new starting point.
	          // Squash any staged actions into a single committed state.
	          actionsById = { 0: liftAction(INIT_ACTION) };
	          nextActionId = 1;
	          stagedActionIds = [0];
	          skippedActionIds = [];
	          committedState = computedStates[currentStateIndex].state;
	          currentStateIndex = 0;
	          computedStates = [];
	          break;
	        }
	      case ActionTypes.ROLLBACK:
	        {
	          // Forget about any staged actions.
	          // Start again from the last committed state.
	          actionsById = { 0: liftAction(INIT_ACTION) };
	          nextActionId = 1;
	          stagedActionIds = [0];
	          skippedActionIds = [];
	          currentStateIndex = 0;
	          computedStates = [];
	          break;
	        }
	      case ActionTypes.TOGGLE_ACTION:
	        {
	          var _ret = function () {
	            // Toggle whether an action with given ID is skipped.
	            // Being skipped means it is a no-op during the computation.
	            var actionId = liftedAction.id;

	            var index = skippedActionIds.indexOf(actionId);
	            if (index === -1) {
	              skippedActionIds = [actionId].concat(skippedActionIds);
	            } else {
	              skippedActionIds = skippedActionIds.filter(function (id) {
	                return id !== actionId;
	              });
	            }
	            // Optimization: we know history before this action hasn't changed
	            minInvalidatedStateIndex = stagedActionIds.indexOf(actionId);
	            return 'break';
	          }();

	          if (_ret === 'break') break;
	        }
	      case ActionTypes.SET_ACTIONS_ACTIVE:
	        {
	          // Toggle whether an action with given ID is skipped.
	          // Being skipped means it is a no-op during the computation.
	          var start = liftedAction.start;
	          var end = liftedAction.end;
	          var active = liftedAction.active;

	          var actionIds = [];
	          for (var i = start; i < end; i++) {
	            actionIds.push(i);
	          }if (active) {
	            skippedActionIds = (0, _difference2.default)(skippedActionIds, actionIds);
	          } else {
	            skippedActionIds = (0, _union2.default)(skippedActionIds, actionIds);
	          }

	          // Optimization: we know history before this action hasn't changed
	          minInvalidatedStateIndex = stagedActionIds.indexOf(start);
	          break;
	        }
	      case ActionTypes.JUMP_TO_STATE:
	        {
	          // Without recomputing anything, move the pointer that tell us
	          // which state is considered the current one. Useful for sliders.
	          currentStateIndex = liftedAction.index;
	          // Optimization: we know the history has not changed.
	          minInvalidatedStateIndex = Infinity;
	          break;
	        }
	      case ActionTypes.SWEEP:
	        {
	          // Forget any actions that are currently being skipped.
	          stagedActionIds = (0, _difference2.default)(stagedActionIds, skippedActionIds);
	          skippedActionIds = [];
	          currentStateIndex = Math.min(currentStateIndex, stagedActionIds.length - 1);
	          break;
	        }
	      case ActionTypes.IMPORT_STATE:
	        {
	          if (Array.isArray(liftedAction.nextLiftedState)) {
	            // recompute array of actions
	            actionsById = { 0: liftAction(INIT_ACTION) };
	            nextActionId = 1;
	            stagedActionIds = [0];
	            skippedActionIds = [];
	            currentStateIndex = liftedAction.nextLiftedState.length;
	            computedStates = [];
	            committedState = liftedAction.preloadedState;
	            minInvalidatedStateIndex = 0;
	            // iterate through actions
	            liftedAction.nextLiftedState.forEach(function (action) {
	              actionsById[nextActionId] = liftAction(action);
	              stagedActionIds.push(nextActionId);
	              nextActionId++;
	            });
	          } else {
	            var _liftedAction$nextLif = liftedAction.nextLiftedState;
	            // Completely replace everything.

	            monitorState = _liftedAction$nextLif.monitorState;
	            actionsById = _liftedAction$nextLif.actionsById;
	            nextActionId = _liftedAction$nextLif.nextActionId;
	            stagedActionIds = _liftedAction$nextLif.stagedActionIds;
	            skippedActionIds = _liftedAction$nextLif.skippedActionIds;
	            committedState = _liftedAction$nextLif.committedState;
	            currentStateIndex = _liftedAction$nextLif.currentStateIndex;
	            computedStates = _liftedAction$nextLif.computedStates;


	            if (liftedAction.noRecompute) {
	              minInvalidatedStateIndex = Infinity;
	            }
	          }

	          break;
	        }
	      case ActionTypes.LOCK_CHANGES:
	        {
	          isLocked = liftedAction.status;
	          minInvalidatedStateIndex = Infinity;
	          break;
	        }
	      case ActionTypes.PAUSE_RECORDING:
	        {
	          isPaused = liftedAction.status;
	          if (isPaused) return computePausedAction(true);
	          minInvalidatedStateIndex = Infinity;
	          break;
	        }
	      case '@@redux/INIT':
	        {
	          if (options.shouldHotReload === false && liftedState) {
	            return liftedState;
	          }

	          // Recompute states on hot reload and init.
	          minInvalidatedStateIndex = 0;

	          if (options.maxAge && stagedActionIds.length > options.maxAge) {
	            // States must be recomputed before committing excess.
	            computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, options.shouldCatchErrors);

	            commitExcessActions(stagedActionIds.length - options.maxAge);

	            // Avoid double computation.
	            minInvalidatedStateIndex = Infinity;
	          }

	          break;
	        }
	      default:
	        {
	          // If the action is not recognized, it's a monitor action.
	          // Optimization: a monitor action can't change history.
	          minInvalidatedStateIndex = Infinity;
	          break;
	        }
	    }

	    computedStates = recomputeStates(computedStates, minInvalidatedStateIndex, reducer, committedState, actionsById, stagedActionIds, skippedActionIds, options.shouldCatchErrors);
	    monitorState = monitorReducer(monitorState, liftedAction);
	    return {
	      monitorState: monitorState,
	      actionsById: actionsById,
	      nextActionId: nextActionId,
	      stagedActionIds: stagedActionIds,
	      skippedActionIds: skippedActionIds,
	      committedState: committedState,
	      currentStateIndex: currentStateIndex,
	      computedStates: computedStates,
	      isLocked: isLocked,
	      isPaused: isPaused
	    };
	  };
	}

	/**
	 * Provides an app's view into the state of the lifted store.
	 */
	function unliftState(liftedState) {
	  var computedStates = liftedState.computedStates;
	  var currentStateIndex = liftedState.currentStateIndex;
	  var state = computedStates[currentStateIndex].state;

	  return state;
	}

	/**
	 * Provides an app's view into the lifted store.
	 */
	function unliftStore(liftedStore, liftReducer) {
	  var _extends3;

	  var lastDefinedState = void 0;

	  function getState() {
	    var state = unliftState(liftedStore.getState());
	    if (state !== undefined) {
	      lastDefinedState = state;
	    }
	    return lastDefinedState;
	  }

	  return _extends({}, liftedStore, (_extends3 = {

	    liftedStore: liftedStore,

	    dispatch: function dispatch(action) {
	      liftedStore.dispatch(liftAction(action));
	      return action;
	    },


	    getState: getState,

	    replaceReducer: function replaceReducer(nextReducer) {
	      liftedStore.replaceReducer(liftReducer(nextReducer));
	    }
	  }, _extends3[_symbolObservable2.default] = function () {
	    return _extends({}, liftedStore[_symbolObservable2.default](), {
	      subscribe: function subscribe(observer) {
	        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = liftedStore.subscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    });
	  }, _extends3));
	}

	/**
	 * Redux instrumentation store enhancer.
	 */
	function instrument() {
	  var monitorReducer = arguments.length <= 0 || arguments[0] === undefined ? function () {
	    return null;
	  } : arguments[0];
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  /* eslint-disable no-eq-null */
	  if (options.maxAge != null && options.maxAge < 2) {
	    /* eslint-enable */
	    throw new Error('DevTools.instrument({ maxAge }) option, if specified, ' + 'may not be less than 2.');
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {

	      function liftReducer(r) {
	        if (typeof r !== 'function') {
	          if (r && typeof r.default === 'function') {
	            throw new Error('Expected the reducer to be a function. ' + 'Instead got an object with a "default" field. ' + 'Did you pass a module instead of the default export? ' + 'Try passing require(...).default instead.');
	          }
	          throw new Error('Expected the reducer to be a function.');
	        }
	        return liftReducerWith(r, initialState, monitorReducer, options);
	      }

	      var liftedStore = createStore(liftReducer(reducer), enhancer);
	      if (liftedStore.liftedStore) {
	        throw new Error('DevTools instrumentation should not be applied more than once. ' + 'Check your store configuration.');
	      }

	      return unliftStore(liftedStore, liftReducer);
	    };
	  };
	}

/***/ },
/* 163 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = catchErrors;
	var ERROR = '@@remotedev/ERROR';

	function catchErrors(sendError) {
	  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && _typeof(window.onerror) === 'object') {
	    window.onerror = function (message, url, lineNo, columnNo, error) {
	      var errorAction = { type: ERROR, message: message, url: url, lineNo: lineNo, columnNo: columnNo };
	      if (error && error.stack) errorAction.stack = error.stack;
	      sendError(errorAction);
	      return false;
	    };
	  } else if (typeof global !== 'undefined' && global.ErrorUtils) {
	    global.ErrorUtils.setGlobalHandler(function (error, isFatal) {
	      sendError({ type: ERROR, error: error, isFatal: isFatal });
	    });
	  }

	  if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' && typeof console.error === 'function' && !console.beforeRemotedev) {
	    console.beforeRemotedev = console.error.bind(console);
	    console.error = function () {
	      var errorAction = { type: ERROR };
	      var error = arguments[0];
	      errorAction.message = error.message ? error.message : error;
	      if (error.sourceURL) {
	        errorAction = _extends({}, errorAction, { sourceURL: error.sourceURL, line: error.line, column: error.column
	        });
	      }
	      if (error.stack) errorAction.stack = error.stack;
	      sendError(errorAction);
	      console.beforeRemotedev.apply(null, arguments);
	    };
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.arrToRegex = arrToRegex;
	exports.isFiltered = isFiltered;
	exports.filterStagedActions = filterStagedActions;
	exports.filterState = filterState;

	var _mapValues = __webpack_require__(154);

	var _mapValues2 = _interopRequireDefault(_mapValues);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function arrToRegex(v) {
	  return typeof v === 'string' ? v : v.join('|');
	}

	function filterActions(actionsById, actionsFilter) {
	  if (!actionsFilter) return actionsById;
	  return (0, _mapValues2.default)(actionsById, function (action, id) {
	    return _extends({}, action, { action: actionsFilter(action.action, id) });
	  });
	}

	function filterStates(computedStates, statesFilter) {
	  if (!statesFilter) return computedStates;
	  return computedStates.map(function (state, idx) {
	    return _extends({}, state, { state: statesFilter(state.state, idx) });
	  });
	}

	function isFiltered(action, filters) {
	  if (!filters || !action) return false;

	  var whitelist = filters.whitelist;
	  var blacklist = filters.blacklist;

	  var _ref = action.action || action;

	  var type = _ref.type;

	  return whitelist && !type.match(whitelist) || blacklist && type.match(blacklist);
	}

	function filterStagedActions(state, filters) {
	  if (!filters) return state;

	  var filteredStagedActionIds = [];
	  var filteredComputedStates = [];

	  state.stagedActionIds.forEach(function (id, idx) {
	    if (!isFiltered(state.actionsById[id], filters)) {
	      filteredStagedActionIds.push(id);
	      filteredComputedStates.push(state.computedStates[idx]);
	    }
	  });

	  return _extends({}, state, {
	    stagedActionIds: filteredStagedActionIds,
	    computedStates: filteredComputedStates
	  });
	}

	function filterState(state, type, localFilter, statesFilter, actionsFilter, nextActionId) {
	  if (type === 'ACTION') return !statesFilter ? state : statesFilter(state, nextActionId - 1);else if (type !== 'STATE') return state;

	  if (localFilter) {
	    var _ret = function () {
	      var filteredStagedActionIds = [];
	      var filteredComputedStates = [];
	      var filteredActionsById = actionsFilter && {};
	      var actionsById = state.actionsById;
	      var computedStates = state.computedStates;


	      state.stagedActionIds.forEach(function (id, idx) {
	        if (!isFiltered(actionsById[id], localFilter)) {
	          filteredStagedActionIds.push(id);
	          filteredComputedStates.push(statesFilter ? _extends({}, computedStates[idx], { state: statesFilter(computedStates[idx].state, idx) }) : computedStates[idx]);
	          if (actionsFilter) {
	            filteredActionsById[id] = _extends({}, actionsById[id], { action: actionsFilter(actionsById[id].action, id)
	            });
	          }
	        }
	      });

	      return {
	        v: _extends({}, state, {
	          actionsById: filteredActionsById || actionsById,
	          stagedActionIds: filteredStagedActionIds,
	          computedStates: filteredComputedStates
	        })
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }

	  if (!statesFilter && !actionsFilter) return state;
	  return _extends({}, state, {
	    actionsById: filterActions(state.actionsById, actionsFilter),
	    computedStates: filterStates(state.computedStates, statesFilter)
	  });
	}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.generateId = generateId;
	exports.getMethods = getMethods;
	exports.getActionsArray = getActionsArray;
	exports.evalAction = evalAction;
	exports.evalMethod = evalMethod;

	var _getParams = __webpack_require__(60);

	var _getParams2 = _interopRequireDefault(_getParams);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateId() {
	  return Math.random().toString(36).substr(2);
	}

	function flatTree(obj) {
	  var namespace = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  var functions = [];
	  Object.keys(obj).forEach(function (key) {
	    var prop = obj[key];
	    if (typeof prop === 'function') {
	      functions.push({
	        name: namespace + (key || prop.name || 'anonymous'),
	        func: prop,
	        args: (0, _getParams2.default)(prop)
	      });
	    } else if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
	      functions = functions.concat(flatTree(prop, namespace + key + '.'));
	    }
	  });
	  return functions;
	}

	function getMethods(obj) {
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return undefined;
	  var functions = void 0;
	  var m = void 0;
	  if (obj.__proto__) m = obj.__proto__.__proto__;
	  if (!m) m = obj;

	  Object.getOwnPropertyNames(m).forEach(function (key) {
	    var prop = m[key];
	    if (typeof prop === 'function' && key !== 'constructor') {
	      if (!functions) functions = [];
	      functions.push({
	        name: key || prop.name || 'anonymous',
	        args: (0, _getParams2.default)(prop)
	      });
	    }
	  });
	  return functions;
	}

	function getActionsArray(actionCreators) {
	  if (Array.isArray(actionCreators)) return actionCreators;
	  return flatTree(actionCreators);
	}

	/* eslint-disable no-new-func */
	var interpretArg = function interpretArg(arg) {
	  return new Function('return ' + arg)();
	};

	function evalArgs(inArgs, restArgs) {
	  var args = inArgs.map(interpretArg);
	  if (!restArgs) return args;
	  var rest = interpretArg(restArgs);
	  if (Array.isArray(rest)) return args.concat.apply(args, rest);
	  throw new Error('rest must be an array');
	}

	function evalAction(action, actionCreators) {
	  if (typeof action === 'string') {
	    return new Function('return ' + action)();
	  }

	  var actionCreator = actionCreators[action.selected].func;
	  var args = evalArgs(action.args, action.rest);
	  return actionCreator.apply(undefined, args);
	}

	function evalMethod(action, obj) {
	  if (typeof action === 'string') {
	    return new Function('return ' + action).call(obj);
	  }

	  var args = evalArgs(action.args, action.rest);
	  return new Function('args', 'return this.' + action.name + '(args)').apply(obj, args);
	}
	/* eslint-enable */

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var SCEmitter = __webpack_require__(12).SCEmitter;

	var SCChannel = function (name, client, options) {
	  var self = this;

	  SCEmitter.call(this);

	  this.PENDING = 'pending';
	  this.SUBSCRIBED = 'subscribed';
	  this.UNSUBSCRIBED = 'unsubscribed';

	  this.name = name;
	  this.state = this.UNSUBSCRIBED;
	  this.client = client;

	  this.options = options || {};
	  this.setOptions(this.options);
	};

	SCChannel.prototype = Object.create(SCEmitter.prototype);

	SCChannel.prototype.setOptions = function (options) {
	  if (!options) {
	    options = {};
	  }
	  this.waitForAuth = options.waitForAuth || false;
	  if (options.data !== undefined) {
	    this.data = options.data;
	  }
	};

	SCChannel.prototype.getState = function () {
	  return this.state;
	};

	SCChannel.prototype.subscribe = function (options) {
	  this.client.subscribe(this.name, options);
	};

	SCChannel.prototype.unsubscribe = function () {
	  this.client.unsubscribe(this.name);
	};

	SCChannel.prototype.isSubscribed = function (includePending) {
	  return this.client.isSubscribed(this.name, includePending);
	};

	SCChannel.prototype.publish = function (data, callback) {
	  this.client.publish(this.name, data, callback);
	};

	SCChannel.prototype.watch = function (handler) {
	  this.client.watch(this.name, handler);
	};

	SCChannel.prototype.unwatch = function (handler) {
	  this.client.unwatch(this.name, handler);
	};

	SCChannel.prototype.watchers = function () {
	  return this.client.watchers(this.name);
	};

	SCChannel.prototype.destroy = function () {
	  this.client.destroyChannel(this.name);
	};

	module.exports.SCChannel = SCChannel;


/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports.create = (function () {
	  function F() {};

	  return function (o) {
	    if (arguments.length != 1) {
	      throw new Error('Object.create implementation only accepts one parameter.');
	    }
	    F.prototype = o;
	    return new F();
	  }
	})();

/***/ },
/* 168 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	var arrayBufferToBase64 = function (arraybuffer) {
	  var bytes = new Uint8Array(arraybuffer);
	  var len = bytes.length;
	  var base64 = '';

	  for (var i = 0; i < len; i += 3) {
	    base64 += base64Chars[bytes[i] >> 2];
	    base64 += base64Chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	    base64 += base64Chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	    base64 += base64Chars[bytes[i + 2] & 63];
	  }

	  if ((len % 3) === 2) {
	    base64 = base64.substring(0, base64.length - 1) + '=';
	  } else if (len % 3 === 1) {
	    base64 = base64.substring(0, base64.length - 2) + '==';
	  }

	  return base64;
	};

	var binaryToBase64Replacer = function (key, value) {
	  if (global.ArrayBuffer && value instanceof global.ArrayBuffer) {
	    return {
	      base64: true,
	      data: arrayBufferToBase64(value)
	    };
	  } else if (global.Buffer) {
	    if (value instanceof global.Buffer){
	      return {
	        base64: true,
	        data: value.toString('base64')
	      };
	    }
	    // Some versions of Node.js convert Buffers to Objects before they are passed to
	    // the replacer function - Because of this, we need to rehydrate Buffers
	    // before we can convert them to base64 strings.
	    if (value && value.type == 'Buffer' && value.data instanceof Array) {
	      var rehydratedBuffer;
	      if (global.Buffer.from) {
	        rehydratedBuffer = global.Buffer.from(value.data);
	      } else {
	        rehydratedBuffer = new global.Buffer(value.data);
	      }
	      return {
	        base64: true,
	        data: rehydratedBuffer.toString('base64')
	      };
	    }
	  }
	  return value;
	};

	// Decode the data which was transmitted over the wire to a JavaScript Object in a format which SC understands.
	// See encode function below for more details.
	module.exports.decode = function (input) {
	  if (input == null) {
	   return null;
	  }
	  var message = input.toString();

	  try {
	    return JSON.parse(message);
	  } catch (err) {}
	  return message;
	};


	// Encode a raw JavaScript object (which is in the SC protocol format) into a format for
	// transfering it over the wire. In this case, we just convert it into a simple JSON string.
	// If you want to create your own custom codec, you can encode the object into any format
	// (e.g. binary ArrayBuffer or string with any kind of compression) so long as your decode
	// function is able to rehydrate that object back into its original JavaScript Object format
	// (which adheres to the SC protocol).
	// See https://github.com/SocketCluster/socketcluster/blob/master/socketcluster-protocol.md
	// for details about the SC protocol.
	module.exports.encode = function (object) {
	  return JSON.stringify(object, binaryToBase64Replacer);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var SCSocket = __webpack_require__(50);
	var SCSocketCreator = __webpack_require__(171);

	module.exports.SCSocketCreator = SCSocketCreator;
	module.exports.SCSocket = SCSocket;

	module.exports.SCEmitter = __webpack_require__(12).SCEmitter;

	module.exports.connect = function (options) {
	  return SCSocketCreator.connect(options);
	};

	module.exports.destroy = function (options) {
	  return SCSocketCreator.destroy(options);
	};

	module.exports.version = '5.0.13';


/***/ },
/* 170 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var AuthEngine = function () {
	  this._internalStorage = {};
	};

	AuthEngine.prototype._isLocalStorageEnabled = function () {
	  var err;
	  try {
	    // Some browsers will throw an error here if localStorage is disabled.
	    global.localStorage;
	    
	    // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
	    // throw QuotaExceededError. We're going to detect this and avoid hard to debug edge cases.
	    global.localStorage.setItem('__scLocalStorageTest', 1);
	    global.localStorage.removeItem('__scLocalStorageTest');
	  } catch (e) {
	    err = e;
	  }
	  return !err;
	};

	AuthEngine.prototype.saveToken = function (name, token, options, callback) {
	  if (this._isLocalStorageEnabled() && global.localStorage) {
	    global.localStorage.setItem(name, token);
	  } else {
	    this._internalStorage[name] = token;
	  }
	  callback && callback(null, token);
	};

	AuthEngine.prototype.removeToken = function (name, callback) {
	  var token;

	  this.loadToken(name, function (err, authToken) {
	    token = authToken;
	  });

	  if (this._isLocalStorageEnabled() && global.localStorage) {
	    global.localStorage.removeItem(name);
	  }
	  delete this._internalStorage[name];

	  callback && callback(null, token);
	};

	AuthEngine.prototype.loadToken = function (name, callback) {
	  var token;

	  if (this._isLocalStorageEnabled() && global.localStorage) {
	    token = global.localStorage.getItem(name);
	  } else {
	    token = this._internalStorage[name] || null;
	  }
	  callback(null, token);
	};

	module.exports.AuthEngine = AuthEngine;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var SCSocket = __webpack_require__(50);

	var _connections = {};

	function getMultiplexId(options) {
	  var protocolPrefix = options.secure ? 'https://' : 'http://';
	  var queryString = '';
	  if (options.query) {
	    if (typeof options.query == 'string') {
	      queryString = options.query;
	    } else {
	      var queryArray = [];
	      var queryMap = options.query;
	      for (var key in queryMap) {
	        if (queryMap.hasOwnProperty(key)) {
	          queryArray.push(key + '=' + queryMap[key]);
	        }
	      }
	      if (queryArray.length) {
	        queryString = '?' + queryArray.join('&');
	      }
	    }
	  }
	  return protocolPrefix + options.hostname + ':' + options.port + options.path + queryString;
	}

	function connect(options) {
	  var self = this;

	  options = options || {};

	  var opts = {
	    port: 8888,
	    hostname: 'localhost',
	    path: '/socketcluster/',
	    secure: options.secure,
	    autoReconnect: true,
	    autoProcessSubscriptions: true,
	    connectTimeout: 20000,
	    ackTimeout: 10000,
	    timestampRequests: false,
	    timestampParam: 't',
	    authEngine: null,
	    authTokenName: 'socketCluster.authToken',
	    binaryType: 'arraybuffer',
	    multiplex: true
	  };
	  for (var i in options) {
	    if (options.hasOwnProperty(i)) {
	      opts[i] = options[i];
	    }
	  }
	  var multiplexId = getMultiplexId(opts);
	  if (opts.multiplex === false) {
	    return new SCSocket(opts);
	  }
	  if (_connections[multiplexId]) {
	    _connections[multiplexId].connect();
	  } else {
	    _connections[multiplexId] = new SCSocket(opts);
	  }
	  return _connections[multiplexId];
	}

	function destroy(options) {
	  var self = this;

	  options = options || {};

	  var opts = {
	    port: 8888,
	    hostname: 'localhost',
	    path: '/socketcluster/',
	    secure: options.secure
	  };
	  for (var i in options) {
	    if (options.hasOwnProperty(i)) {
	      opts[i] = options[i];
	    }
	  }
	  var multiplexId = getMultiplexId(opts);
	  delete _connections[multiplexId];
	}

	module.exports = {
	  connect: connect,
	  destroy: destroy
	};


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var SCEmitter = __webpack_require__(12).SCEmitter;
	var Response = __webpack_require__(49).Response;
	var querystring = __webpack_require__(48);
	var WebSocket = __webpack_require__(173);

	var scErrors = __webpack_require__(25);
	var TimeoutError = scErrors.TimeoutError;


	var SCTransport = function (authEngine, codecEngine, options) {
	  this.state = this.CLOSED;
	  this.auth = authEngine;
	  this.codec = codecEngine;
	  this.options = options;
	  this.connectTimeout = options.connectTimeout;
	  this.pingTimeout = options.ackTimeout;
	  this.callIdGenerator = options.callIdGenerator;

	  this._pingTimeoutTicker = null;
	  this._callbackMap = {};

	  this.open();
	};

	SCTransport.prototype = Object.create(SCEmitter.prototype);

	SCTransport.CONNECTING = SCTransport.prototype.CONNECTING = 'connecting';
	SCTransport.OPEN = SCTransport.prototype.OPEN = 'open';
	SCTransport.CLOSED = SCTransport.prototype.CLOSED = 'closed';

	SCTransport.prototype.uri = function () {
	  var query = this.options.query || {};
	  var schema = this.options.secure ? 'wss' : 'ws';
	  var port = '';

	  if (this.options.port && (('wss' == schema && this.options.port != 443)
	    || ('ws' == schema && this.options.port != 80))) {
	    port = ':' + this.options.port;
	  }

	  if (this.options.timestampRequests) {
	    query[this.options.timestampParam] = (new Date()).getTime();
	  }

	  query = querystring.encode(query);

	  if (query.length) {
	    query = '?' + query;
	  }

	  return schema + '://' + this.options.hostname + port + this.options.path + query;
	};

	SCTransport.prototype.open = function () {
	  var self = this;

	  this.state = this.CONNECTING;
	  var uri = this.uri();

	  var wsSocket = new WebSocket(uri, null, this.options);
	  wsSocket.binaryType = this.options.binaryType;
	  this.socket = wsSocket;

	  wsSocket.onopen = function () {
	    self._onOpen();
	  };

	  wsSocket.onclose = function (event) {
	    self._onClose(event.code, event.reason);
	  };

	  wsSocket.onmessage = function (message, flags) {
	    self._onMessage(message.data);
	  };

	  wsSocket.onerror = function (error) {
	    // The onclose event will be called automatically after the onerror event
	    // if the socket is connected - Otherwise, if it's in the middle of
	    // connecting, we want to close it manually with a 1006 - This is necessary
	    // to prevent inconsistent behavior when running the client in Node.js
	    // vs in a browser.

	    if (self.state === self.CONNECTING) {
	      self._onClose(1006);
	    }
	  };

	  this._connectTimeoutRef = setTimeout(function () {
	    self._onClose(4007);
	    self.socket.close(4007);
	  }, this.connectTimeout);
	};

	SCTransport.prototype._onOpen = function () {
	  var self = this;

	  clearTimeout(this._connectTimeoutRef);
	  this._resetPingTimeout();

	  this._handshake(function (err, status) {
	    if (err) {
	      self._onError(err);
	      self._onClose(4003);
	      self.socket.close(4003);
	    } else {
	      self.state = self.OPEN;
	      SCEmitter.prototype.emit.call(self, 'open', status);
	      self._resetPingTimeout();
	    }
	  });
	};

	SCTransport.prototype._handshake = function (callback) {
	  var self = this;
	  this.auth.loadToken(this.options.authTokenName, function (err, token) {
	    if (err) {
	      callback(err);
	    } else {
	      // Don't wait for this.state to be 'open'.
	      // The underlying WebSocket (this.socket) is already open.
	      var options = {
	        force: true
	      };
	      self.emit('#handshake', {
	        authToken: token
	      }, options, function (err, status) {
	        if (status) {
	          // Add the token which was used as part of authentication attempt
	          // to the status object.
	          status.authToken = token;
	          if (status.authError) {
	            status.authError = scErrors.hydrateError(status.authError);
	          }
	        }
	        callback(err, status);
	      });
	    }
	  });
	};

	SCTransport.prototype._onClose = function (code, data) {
	  delete this.socket.onopen;
	  delete this.socket.onclose;
	  delete this.socket.onmessage;
	  delete this.socket.onerror;

	  clearTimeout(this._connectTimeoutRef);

	  if (this.state == this.OPEN) {
	    this.state = this.CLOSED;
	    SCEmitter.prototype.emit.call(this, 'close', code, data);

	  } else if (this.state == this.CONNECTING) {
	    this.state = this.CLOSED;
	    SCEmitter.prototype.emit.call(this, 'openAbort', code, data);
	  }
	};

	SCTransport.prototype._onMessage = function (message) {
	  SCEmitter.prototype.emit.call(this, 'event', 'message', message);

	  // If ping
	  if (message == '#1') {
	    this._resetPingTimeout();
	    if (this.socket.readyState == this.socket.OPEN) {
	      this.socket.send('#2');
	    }
	  } else {
	    var obj = this.decode(message);
	    var event = obj.event;

	    if (event) {
	      var response = new Response(this, obj.cid);
	      SCEmitter.prototype.emit.call(this, 'event', event, obj.data, response);
	    } else if (obj.rid != null) {

	      var eventObject = this._callbackMap[obj.rid];
	      if (eventObject) {
	        clearTimeout(eventObject.timeout);
	        delete this._callbackMap[obj.rid];

	        if (eventObject.callback) {
	          var rehydratedError = scErrors.hydrateError(obj.error);
	          eventObject.callback(rehydratedError, obj.data);
	        }
	      }
	    } else {
	      SCEmitter.prototype.emit.call(this, 'event', 'raw', obj);
	    }
	  }
	};

	SCTransport.prototype._onError = function (err) {
	  SCEmitter.prototype.emit.call(this, 'error', err);
	};

	SCTransport.prototype._resetPingTimeout = function () {
	  var self = this;

	  var now = (new Date()).getTime();
	  clearTimeout(this._pingTimeoutTicker);

	  this._pingTimeoutTicker = setTimeout(function () {
	    self._onClose(4000);
	    self.socket.close(4000);
	  }, this.pingTimeout);
	};

	SCTransport.prototype.getBytesReceived = function () {
	  return this.socket.bytesReceived;
	};

	SCTransport.prototype.close = function (code, data) {
	  code = code || 1000;

	  if (this.state == this.OPEN) {
	    var packet = {
	      code: code,
	      data: data
	    };
	    this.emit('#disconnect', packet);

	    this._onClose(code, data);
	    this.socket.close(code);

	  } else if (this.state == this.CONNECTING) {
	    this._onClose(code, data);
	    this.socket.close(code);
	  }
	};

	SCTransport.prototype.emitRaw = function (eventObject) {
	  eventObject.cid = this.callIdGenerator();

	  if (eventObject.callback) {
	    this._callbackMap[eventObject.cid] = eventObject;
	  }

	  var simpleEventObject = {
	    event: eventObject.event,
	    data: eventObject.data,
	    cid: eventObject.cid
	  };

	  this.sendObject(simpleEventObject);
	  return eventObject.cid;
	};


	SCTransport.prototype._handleEventAckTimeout = function (eventObject) {
	  var errorMessage = "Event response for '" + eventObject.event + "' timed out";
	  var error = new TimeoutError(errorMessage);

	  if (eventObject.cid) {
	    delete this._callbackMap[eventObject.cid];
	  }
	  var callback = eventObject.callback;
	  delete eventObject.callback;
	  callback.call(eventObject, error, eventObject);
	};

	// The last two optional arguments (a and b) can be options and/or callback
	SCTransport.prototype.emit = function (event, data, a, b) {
	  var self = this;

	  var callback, options;

	  if (b) {
	    options = a;
	    callback = b;
	  } else {
	    if (a instanceof Function) {
	      options = {};
	      callback = a;
	    } else {
	      options = a;
	    }
	  }

	  var eventObject = {
	    event: event,
	    data: data,
	    callback: callback
	  };

	  if (callback && !options.noTimeout) {
	    eventObject.timeout = setTimeout(function () {
	      self._handleEventAckTimeout(eventObject);
	    }, this.options.ackTimeout);
	  }

	  var cid = null;
	  if (this.state == this.OPEN || options.force) {
	    cid = this.emitRaw(eventObject);
	  }
	  return cid;
	};

	SCTransport.prototype.cancelPendingResponse = function (cid) {
	  delete this._callbackMap[cid];
	};

	SCTransport.prototype.decode = function (message) {
	  return this.codec.decode(message);
	};

	SCTransport.prototype.encode = function (object) {
	  return this.codec.encode(object);
	};

	SCTransport.prototype.send = function (data) {
	  if (this.socket.readyState != this.socket.OPEN) {
	    this._onClose(1005);
	  } else {
	    this.socket.send(data);
	  }
	};

	SCTransport.prototype.sendObject = function (object) {
	  var str, formatError;
	  try {
	    str = this.encode(object);
	  } catch (err) {
	    formatError = err;
	    this._onError(formatError);
	  }
	  if (!formatError) {
	    this.send(str);
	  }
	};

	module.exports.SCTransport = SCTransport;


/***/ },
/* 173 */
/***/ function(module, exports) {

	/**
	 * WebSocket constructor.
	 *
	 * The third `opts` options object gets ignored in web browsers, since it's
	 * non-standard, and throws a TypeError if passed to the constructor.
	 * See: https://github.com/einaros/ws/issues/227
	 *
	 * @param {String} uri
	 * @param {Array} protocols (optional)
	 * @param {Object} opts (optional)
	 * @api public
	 */

	function ws(uri, protocols, opts) {
		wx.onSocketOpen(this.handleSocketOpen.bind(this))
		wx.onSocketClose(this.handleSocketClose.bind(this))
		wx.onSocketMessage(this.handleMessage.bind(this))
		wx.onSocketError(this.handleSocketError.bind(this))
		wx.connectSocket({url: uri})
		return this;
	}

		ws.prototype = {
			handleSocketOpenLater: function(res) {
				var that = this;
				if(this.handleSocketOpenLaterHandler){
					clearTimeout(this.handleSocketOpenLaterHandler)
				}

				this.handleSocketOpenLaterHandler = setTimeout(function(){
					that.handleSocketOpen(res);
				}, 1000)
			},
			handleSocketOpen: function(res) {
				if(this.onopen){
					this.onopen(res)
				} else {
					this.handleSocketOpenLater(res)
				}
			},
			handleMessage: function(res) {
				if(this.onmessage){
					this.onmessage(res)
				} else {
					this.handleMessageLater(res)
				}
			},
			handleMessageLater: function(res) {
				var that = this;
				if(this.handleMessageLaterHandler){
					clearTimeout(this.handleMessageLaterHandler)
				}

				this.handleMessageLaterHandler = setTimeout(function(){
					that.handleMessage(res);
				}, 1000)
			},
			handleSocketError: function(res) {
				if(this.onerror){
					this.onerror(res)
				} else {
					this.handleSocketErrorLater(res)
				}
			},
			handleSocketErrorLater: function(res) {
				var that = this;
				if(this.handleSocketErrorLaterHandler){
					clearTimeout(this.handleSocketErrorLaterHandler)
				}

				this.handleSocketErrorLaterHandler = setTimeout(function(){
					that.handleSocketError(res);
				}, 1000)
			},
			handleSocketClose: function(res) {
				if(this.onclose){
					this.onclose(res)
				} else {
					this.handleSocketCloseLater(res)
				}
			},
			handleSocketCloseLater: function(res) {
				var that = this;
				if(this.handleSocketCloseLaterHandler){
					clearTimeout(this.handleSocketCloseLaterHandler)
				}

				this.handleSocketCloseLaterHandler = setTimeout(function(){
					that.handleSocketClose(res);
				})
			},
			send: function(data){
				wx.sendSocketMessage({data: data, fail: function(res){
					console.log("wx web socket send failed: " + res)
				}})
			},
			close: wx.closeSocket
		};

		module.exports = ws;
/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(175)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 175 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ }
/******/ ])
});
;