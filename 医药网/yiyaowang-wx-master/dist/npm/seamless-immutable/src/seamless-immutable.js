"use strict";var exports=module.exports={};var global=window=require('../../labrador/global.js');
var _create = require('../../babel-runtime/core-js/object/create.js');

var _create2 = _interopRequireDefault(_create);

var _stringify = require('../../babel-runtime/core-js/json/stringify.js');

var _stringify2 = _interopRequireDefault(_stringify);

var _freeze = require('../../babel-runtime/core-js/object/freeze.js');

var _freeze2 = _interopRequireDefault(_freeze);

var _getOwnPropertyDescriptor = require('../../babel-runtime/core-js/object/get-own-property-descriptor.js');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _typeof2 = require('../../babel-runtime/helpers/typeof.js');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty = require('../../babel-runtime/core-js/object/define-property.js');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _for = require('../../babel-runtime/core-js/symbol/for.js');

var _for2 = _interopRequireDefault(_for);

var _symbol = require('../../babel-runtime/core-js/symbol.js');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  "use strict";

  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L21

  var REACT_ELEMENT_TYPE = typeof _symbol2.default === 'function' && _for2.default && (0, _for2.default)('react.element');
  var REACT_ELEMENT_TYPE_FALLBACK = 0xeac7;

  function addPropertyTo(target, methodName, value) {
    (0, _defineProperty2.default)(target, methodName, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });
  }

  function banProperty(target, methodName) {
    addPropertyTo(target, methodName, function () {
      throw new ImmutableError("The " + methodName + " method cannot be invoked on an Immutable data structure.");
    });
  }

  var immutabilityTag = "__immutable_invariants_hold";

  function addImmutabilityTag(target) {
    addPropertyTo(target, immutabilityTag, true);
  }

  function isImmutable(target) {
    if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) === "object") {
      return target === null || Boolean((0, _getOwnPropertyDescriptor2.default)(target, immutabilityTag));
    } else {
      // In JavaScript, only objects are even potentially mutable.
      // strings, numbers, null, and undefined are all naturally immutable.
      return true;
    }
  }

  function isEqual(a, b) {
    // Avoid false positives due to (NaN !== NaN) evaluating to true
    return a === b || a !== a && b !== b;
  }

  function isMergableObject(target) {
    return target !== null && (typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) === "object" && !Array.isArray(target) && !(target instanceof Date);
  }

  var mutatingObjectMethods = ["setPrototypeOf"];

  var nonMutatingObjectMethods = ["keys"];

  var mutatingArrayMethods = mutatingObjectMethods.concat(["push", "pop", "sort", "splice", "shift", "unshift", "reverse"]);

  var nonMutatingArrayMethods = nonMutatingObjectMethods.concat(["map", "filter", "slice", "concat", "reduce", "reduceRight"]);

  var mutatingDateMethods = mutatingObjectMethods.concat(["setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear"]);

  function ImmutableError(message) {
    var err = new Error(message);
    // TODO: Consider `Object.setPrototypeOf(err, ImmutableError);`
    err.__proto__ = ImmutableError;

    return err;
  }
  ImmutableError.prototype = Error.prototype;

  function makeImmutable(obj, bannedMethods) {
    // Tag it so we can quickly tell it's immutable later.
    addImmutabilityTag(obj);

    if ("development" !== "production") {
      // Make all mutating methods throw exceptions.
      for (var index in bannedMethods) {
        if (bannedMethods.hasOwnProperty(index)) {
          banProperty(obj, bannedMethods[index]);
        }
      }

      // Freeze it and return it.
      (0, _freeze2.default)(obj);
    }

    return obj;
  }

  function makeMethodReturnImmutable(obj, methodName) {
    var currentMethod = obj[methodName];

    addPropertyTo(obj, methodName, function () {
      return Immutable(currentMethod.apply(obj, arguments));
    });
  }

  function arraySet(idx, value, config) {
    var deep = config && config.deep;

    if (idx in this) {
      if (deep && this[idx] !== value && isMergableObject(value) && isMergableObject(this[idx])) {
        value = this[idx].merge(value, { deep: true, mode: 'replace' });
      }
      if (isEqual(this[idx], value)) {
        return this;
      }
    }

    var mutable = asMutableArray.call(this);
    mutable[idx] = Immutable(value);
    return makeImmutableArray(mutable);
  }

  var immutableEmptyArray = Immutable([]);

  function arraySetIn(pth, value, config) {
    var head = pth[0];

    if (pth.length === 1) {
      return arraySet.call(this, head, value, config);
    } else {
      var tail = pth.slice(1);
      var thisHead = this[head];
      var newValue;

      if ((typeof thisHead === 'undefined' ? 'undefined' : (0, _typeof3.default)(thisHead)) === "object" && thisHead !== null && typeof thisHead.setIn === "function") {
        // Might (validly) be object or array
        newValue = thisHead.setIn(tail, value);
      } else {
        var nextHead = tail[0];
        // If the next path part is a number, then we are setting into an array, else an object.
        if (nextHead !== '' && isFinite(nextHead)) {
          newValue = arraySetIn.call(immutableEmptyArray, tail, value);
        } else {
          newValue = objectSetIn.call(immutableEmptyObject, tail, value);
        }
      }

      if (head in this && thisHead === newValue) {
        return this;
      }

      var mutable = asMutableArray.call(this);
      mutable[head] = newValue;
      return makeImmutableArray(mutable);
    }
  }

  function makeImmutableArray(array) {
    // Don't change their implementations, but wrap these functions to make sure
    // they always return an immutable value.
    for (var index in nonMutatingArrayMethods) {
      if (nonMutatingArrayMethods.hasOwnProperty(index)) {
        var methodName = nonMutatingArrayMethods[index];
        makeMethodReturnImmutable(array, methodName);
      }
    }

    addPropertyTo(array, "flatMap", flatMap);
    addPropertyTo(array, "asObject", asObject);
    addPropertyTo(array, "asMutable", asMutableArray);
    addPropertyTo(array, "set", arraySet);
    addPropertyTo(array, "setIn", arraySetIn);
    addPropertyTo(array, "update", update);
    addPropertyTo(array, "updateIn", updateIn);

    for (var i = 0, length = array.length; i < length; i++) {
      array[i] = Immutable(array[i]);
    }

    return makeImmutable(array, mutatingArrayMethods);
  }

  function makeImmutableDate(date) {
    addPropertyTo(date, "asMutable", asMutableDate);

    return makeImmutable(date, mutatingDateMethods);
  }

  function asMutableDate() {
    return new Date(this.getTime());
  }

  /**
   * Effectively performs a map() over the elements in the array, using the
   * provided iterator, except that whenever the iterator returns an array, that
   * array's elements are added to the final result instead of the array itself.
   *
   * @param {function} iterator - The iterator function that will be invoked on each element in the array. It will receive three arguments: the current value, the current index, and the current object.
   */
  function flatMap(iterator) {
    // Calling .flatMap() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    var result = [],
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var iteratorResult = iterator(this[index], index, this);

      if (Array.isArray(iteratorResult)) {
        // Concatenate Array results into the return value we're building up.
        result.push.apply(result, iteratorResult);
      } else {
        // Handle non-Array results the same way map() does.
        result.push(iteratorResult);
      }
    }

    return makeImmutableArray(result);
  }

  /**
   * Returns an Immutable copy of the object without the given keys included.
   *
   * @param {array} keysToRemove - A list of strings representing the keys to exclude in the return value. Instead of providing a single array, this method can also be called by passing multiple strings as separate arguments.
   */
  function without(remove) {
    // Calling .without() with no arguments is a no-op. Don't bother cloning.
    if (typeof remove === "undefined" && arguments.length === 0) {
      return this;
    }

    if (typeof remove !== "function") {
      // If we weren't given an array, use the arguments list.
      var keysToRemoveArray = Array.isArray(remove) ? remove.slice() : Array.prototype.slice.call(arguments);

      // Convert numeric keys to strings since that's how they'll
      // come from the enumeration of the object.
      keysToRemoveArray.forEach(function (el, idx, arr) {
        if (typeof el === "number") {
          arr[idx] = el.toString();
        }
      });

      remove = function remove(val, key) {
        return keysToRemoveArray.indexOf(key) !== -1;
      };
    }

    var result = this.instantiateEmptyObject();

    for (var key in this) {
      if (this.hasOwnProperty(key) && remove(this[key], key) === false) {
        result[key] = this[key];
      }
    }

    return makeImmutableObject(result, { instantiateEmptyObject: this.instantiateEmptyObject });
  }

  function asMutableArray(opts) {
    var result = [],
        i,
        length;

    if (opts && opts.deep) {
      for (i = 0, length = this.length; i < length; i++) {
        result.push(asDeepMutable(this[i]));
      }
    } else {
      for (i = 0, length = this.length; i < length; i++) {
        result.push(this[i]);
      }
    }

    return result;
  }

  /**
   * Effectively performs a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) over the elements in the array, expecting that the iterator function
   * will return an array of two elements - the first representing a key, the other
   * a value. Then returns an Immutable Object constructed of those keys and values.
   *
   * @param {function} iterator - A function which should return an array of two elements - the first representing the desired key, the other the desired value.
   */
  function asObject(iterator) {
    // If no iterator was provided, assume the identity function
    // (suggesting this array is already a list of key/value pairs.)
    if (typeof iterator !== "function") {
      iterator = function iterator(value) {
        return value;
      };
    }

    var result = {},
        length = this.length,
        index;

    for (index = 0; index < length; index++) {
      var pair = iterator(this[index], index, this),
          key = pair[0],
          value = pair[1];

      result[key] = value;
    }

    return makeImmutableObject(result);
  }

  function asDeepMutable(obj) {
    if (!obj || (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' || !(0, _getOwnPropertyDescriptor2.default)(obj, immutabilityTag) || obj instanceof Date) {
      return obj;
    }
    return obj.asMutable({ deep: true });
  }

  function quickCopy(src, dest) {
    for (var key in src) {
      if ((0, _getOwnPropertyDescriptor2.default)(src, key)) {
        dest[key] = src[key];
      }
    }

    return dest;
  }

  /**
   * Returns an Immutable Object containing the properties and values of both
   * this object and the provided object, prioritizing the provided object's
   * values whenever the same key is present in both objects.
   *
   * @param {object} other - The other object to merge. Multiple objects can be passed as an array. In such a case, the later an object appears in that list, the higher its priority.
   * @param {object} config - Optional config object that contains settings. Supported settings are: {deep: true} for deep merge and {merger: mergerFunc} where mergerFunc is a function
   *                          that takes a property from both objects. If anything is returned it overrides the normal merge behaviour.
   */
  function merge(other, config) {
    // Calling .merge() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (other === null || (typeof other === 'undefined' ? 'undefined' : (0, _typeof3.default)(other)) !== "object") {
      throw new TypeError("Immutable#merge can only be invoked with objects or arrays, not " + (0, _stringify2.default)(other));
    }

    var receivedArray = Array.isArray(other),
        deep = config && config.deep,
        mode = config && config.mode || 'merge',
        merger = config && config.merger,
        result;

    // Use the given key to extract a value from the given object, then place
    // that value in the result object under the same key. If that resulted
    // in a change from this object's value at that key, set anyChanges = true.
    function addToResult(currentObj, otherObj, key) {
      var immutableValue = Immutable(otherObj[key]);
      var mergerResult = merger && merger(currentObj[key], immutableValue, config);
      var currentValue = currentObj[key];

      if (result !== undefined || mergerResult !== undefined || !currentObj.hasOwnProperty(key) || !isEqual(immutableValue, currentValue)) {

        var newValue;

        if (mergerResult) {
          newValue = mergerResult;
        } else if (deep && isMergableObject(currentValue) && isMergableObject(immutableValue)) {
          newValue = currentValue.merge(immutableValue, config);
        } else {
          newValue = immutableValue;
        }

        if (!isEqual(currentValue, newValue) || !currentObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, currentObj.instantiateEmptyObject());
          }

          result[key] = newValue;
        }
      }
    }

    function clearDroppedKeys(currentObj, otherObj) {
      for (var key in currentObj) {
        if (!otherObj.hasOwnProperty(key)) {
          if (result === undefined) {
            // Make a shallow clone of the current object.
            result = quickCopy(currentObj, currentObj.instantiateEmptyObject());
          }
          delete result[key];
        }
      }
    }

    var key;

    // Achieve prioritization by overriding previous values that get in the way.
    if (!receivedArray) {
      // The most common use case: just merge one object into the existing one.
      for (key in other) {
        if ((0, _getOwnPropertyDescriptor2.default)(other, key)) {
          addToResult(this, other, key);
        }
      }
      if (mode === 'replace') {
        clearDroppedKeys(this, other);
      }
    } else {
      // We also accept an Array
      for (var index = 0, length = other.length; index < length; index++) {
        var otherFromArray = other[index];

        for (key in otherFromArray) {
          if (otherFromArray.hasOwnProperty(key)) {
            addToResult(result !== undefined ? result : this, otherFromArray, key);
          }
        }
      }
    }

    if (result === undefined) {
      return this;
    } else {
      return makeImmutableObject(result, { instantiateEmptyObject: this.instantiateEmptyObject });
    }
  }

  function objectReplace(value, config) {
    var deep = config && config.deep;

    // Calling .replace() with no arguments is a no-op. Don't bother cloning.
    if (arguments.length === 0) {
      return this;
    }

    if (value === null || (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) !== "object") {
      throw new TypeError("Immutable#replace can only be invoked with objects or arrays, not " + (0, _stringify2.default)(value));
    }

    return this.merge(value, { deep: deep, mode: 'replace' });
  }

  var immutableEmptyObject = Immutable({});

  function objectSetIn(path, value, config) {
    var head = path[0];
    if (path.length === 1) {
      return objectSet.call(this, head, value, config);
    }

    var tail = path.slice(1);
    var newValue;
    var thisHead = this[head];

    if (this.hasOwnProperty(head) && (typeof thisHead === 'undefined' ? 'undefined' : (0, _typeof3.default)(thisHead)) === "object" && thisHead !== null && typeof thisHead.setIn === "function") {
      // Might (validly) be object or array
      newValue = thisHead.setIn(tail, value);
    } else {
      newValue = objectSetIn.call(immutableEmptyObject, tail, value);
    }

    if (this.hasOwnProperty(head) && thisHead === newValue) {
      return this;
    }

    var mutable = quickCopy(this, this.instantiateEmptyObject());
    mutable[head] = newValue;
    return makeImmutableObject(mutable, this);
  }

  function objectSet(property, value, config) {
    var deep = config && config.deep;

    if (this.hasOwnProperty(property)) {
      if (deep && this[property] !== value && isMergableObject(value) && isMergableObject(this[property])) {
        value = this[property].merge(value, { deep: true, mode: 'replace' });
      }
      if (isEqual(this[property], value)) {
        return this;
      }
    }

    var mutable = quickCopy(this, this.instantiateEmptyObject());
    mutable[property] = Immutable(value);
    return makeImmutableObject(mutable, this);
  }

  function update(property, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = this[property];
    return this.set(property, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function getInPath(obj, path) {
    /*jshint eqnull:true */
    for (var i = 0, l = path.length; obj != null && i < l; i++) {
      obj = obj[path[i]];
    }

    return i && i == l ? obj : undefined;
  }

  function updateIn(path, updater) {
    var restArgs = Array.prototype.slice.call(arguments, 2);
    var initialVal = getInPath(this, path);

    return this.setIn(path, updater.apply(initialVal, [initialVal].concat(restArgs)));
  }

  function asMutableObject(opts) {
    var result = this.instantiateEmptyObject(),
        key;

    if (opts && opts.deep) {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = asDeepMutable(this[key]);
        }
      }
    } else {
      for (key in this) {
        if (this.hasOwnProperty(key)) {
          result[key] = this[key];
        }
      }
    }

    return result;
  }

  // Creates plain object to be used for cloning
  function instantiatePlainObject() {
    return {};
  }

  // Finalizes an object with immutable methods, freezes it, and returns it.
  function makeImmutableObject(obj, options) {
    var instantiateEmptyObject = options && options.instantiateEmptyObject ? options.instantiateEmptyObject : instantiatePlainObject;

    addPropertyTo(obj, "merge", merge);
    addPropertyTo(obj, "replace", objectReplace);
    addPropertyTo(obj, "without", without);
    addPropertyTo(obj, "asMutable", asMutableObject);
    addPropertyTo(obj, "instantiateEmptyObject", instantiateEmptyObject);
    addPropertyTo(obj, "set", objectSet);
    addPropertyTo(obj, "setIn", objectSetIn);
    addPropertyTo(obj, "update", update);
    addPropertyTo(obj, "updateIn", updateIn);

    return makeImmutable(obj, mutatingObjectMethods);
  }

  // Returns true if object is a valid react element
  // https://github.com/facebook/react/blob/v15.0.1/src/isomorphic/classic/element/ReactElement.js#L326
  function isReactElement(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' && obj !== null && (obj.$$typeof === REACT_ELEMENT_TYPE_FALLBACK || obj.$$typeof === REACT_ELEMENT_TYPE);
  }

  function Immutable(obj, options, stackRemaining) {
    if (isImmutable(obj) || isReactElement(obj)) {
      return obj;
    } else if (Array.isArray(obj)) {
      return makeImmutableArray(obj.slice());
    } else if (obj instanceof Date) {
      return makeImmutableDate(new Date(obj.getTime()));
    } else {
      // Don't freeze the object we were given; make a clone and use that.
      var prototype = options && options.prototype;
      var instantiateEmptyObject = !prototype || prototype === Object.prototype ? instantiatePlainObject : function () {
        return (0, _create2.default)(prototype);
      };
      var clone = instantiateEmptyObject();

      if ("development" !== "production") {
        /*jshint eqnull:true */
        if (stackRemaining == null) {
          stackRemaining = 64;
        }
        if (stackRemaining <= 0) {
          throw new ImmutableError("Attempt to construct Immutable from a deeply nested object was detected." + " Have you tried to wrap an object with circular references (e.g. React element)?" + " See https://github.com/rtfeldman/seamless-immutable/wiki/Deeply-nested-object-was-detected for details.");
        }
        stackRemaining -= 1;
      }

      for (var key in obj) {
        if ((0, _getOwnPropertyDescriptor2.default)(obj, key)) {
          clone[key] = Immutable(obj[key], undefined, stackRemaining);
        }
      }

      return makeImmutableObject(clone, { instantiateEmptyObject: instantiateEmptyObject });
    }
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  function toStatic(fn) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      return fn.apply(self, args);
    }

    return staticWrapper;
  }

  // Wrapper to allow the use of object methods as static methods of Immutable.
  // with the additional condition of choosing which function to call depending
  // if argument is an array or an object.
  function toStaticObjectOrArray(fnObject, fnArray) {
    function staticWrapper() {
      var args = [].slice.call(arguments);
      var self = args.shift();
      if (Array.isArray(self)) {
        return fnArray.apply(self, args);
      } else {
        return fnObject.apply(self, args);
      }
    }

    return staticWrapper;
  }

  // Export the library
  Immutable.from = Immutable;
  Immutable.isImmutable = isImmutable;
  Immutable.ImmutableError = ImmutableError;
  Immutable.merge = toStatic(merge);
  Immutable.replace = toStatic(objectReplace);
  Immutable.without = toStatic(without);
  Immutable.asMutable = toStaticObjectOrArray(asMutableObject, asMutableArray);
  Immutable.set = toStaticObjectOrArray(objectSet, arraySet);
  Immutable.setIn = toStaticObjectOrArray(objectSetIn, arraySetIn);
  Immutable.update = toStatic(update);
  Immutable.updateIn = toStatic(updateIn);
  Immutable.flatMap = toStatic(flatMap);
  Immutable.asObject = toStatic(asObject);

  (0, _freeze2.default)(Immutable);

  /* istanbul ignore if */
  if ((typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === "object") {
    module.exports = Immutable;
  } else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === "object") {
    exports.Immutable = Immutable;
  } else if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === "object") {
    window.Immutable = Immutable;
  } else if ((typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) === "object") {
    global.Immutable = Immutable;
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYW1sZXNzLWltbXV0YWJsZS5qcyJdLCJuYW1lcyI6WyJSRUFDVF9FTEVNRU5UX1RZUEUiLCJSRUFDVF9FTEVNRU5UX1RZUEVfRkFMTEJBQ0siLCJhZGRQcm9wZXJ0eVRvIiwidGFyZ2V0IiwibWV0aG9kTmFtZSIsInZhbHVlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYmFuUHJvcGVydHkiLCJJbW11dGFibGVFcnJvciIsImltbXV0YWJpbGl0eVRhZyIsImFkZEltbXV0YWJpbGl0eVRhZyIsImlzSW1tdXRhYmxlIiwiQm9vbGVhbiIsImlzRXF1YWwiLCJhIiwiYiIsImlzTWVyZ2FibGVPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJEYXRlIiwibXV0YXRpbmdPYmplY3RNZXRob2RzIiwibm9uTXV0YXRpbmdPYmplY3RNZXRob2RzIiwibXV0YXRpbmdBcnJheU1ldGhvZHMiLCJjb25jYXQiLCJub25NdXRhdGluZ0FycmF5TWV0aG9kcyIsIm11dGF0aW5nRGF0ZU1ldGhvZHMiLCJtZXNzYWdlIiwiZXJyIiwiRXJyb3IiLCJfX3Byb3RvX18iLCJwcm90b3R5cGUiLCJtYWtlSW1tdXRhYmxlIiwib2JqIiwiYmFubmVkTWV0aG9kcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImluZGV4IiwiaGFzT3duUHJvcGVydHkiLCJtYWtlTWV0aG9kUmV0dXJuSW1tdXRhYmxlIiwiY3VycmVudE1ldGhvZCIsIkltbXV0YWJsZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiYXJyYXlTZXQiLCJpZHgiLCJjb25maWciLCJkZWVwIiwibWVyZ2UiLCJtb2RlIiwibXV0YWJsZSIsImFzTXV0YWJsZUFycmF5IiwiY2FsbCIsIm1ha2VJbW11dGFibGVBcnJheSIsImltbXV0YWJsZUVtcHR5QXJyYXkiLCJhcnJheVNldEluIiwicHRoIiwiaGVhZCIsImxlbmd0aCIsInRhaWwiLCJzbGljZSIsInRoaXNIZWFkIiwibmV3VmFsdWUiLCJzZXRJbiIsIm5leHRIZWFkIiwiaXNGaW5pdGUiLCJvYmplY3RTZXRJbiIsImltbXV0YWJsZUVtcHR5T2JqZWN0IiwiYXJyYXkiLCJmbGF0TWFwIiwiYXNPYmplY3QiLCJ1cGRhdGUiLCJ1cGRhdGVJbiIsImkiLCJtYWtlSW1tdXRhYmxlRGF0ZSIsImRhdGUiLCJhc011dGFibGVEYXRlIiwiZ2V0VGltZSIsIml0ZXJhdG9yIiwicmVzdWx0IiwiaXRlcmF0b3JSZXN1bHQiLCJwdXNoIiwid2l0aG91dCIsInJlbW92ZSIsImtleXNUb1JlbW92ZUFycmF5IiwiZm9yRWFjaCIsImVsIiwiYXJyIiwidG9TdHJpbmciLCJ2YWwiLCJrZXkiLCJpbmRleE9mIiwiaW5zdGFudGlhdGVFbXB0eU9iamVjdCIsIm1ha2VJbW11dGFibGVPYmplY3QiLCJvcHRzIiwiYXNEZWVwTXV0YWJsZSIsInBhaXIiLCJhc011dGFibGUiLCJxdWlja0NvcHkiLCJzcmMiLCJkZXN0Iiwib3RoZXIiLCJUeXBlRXJyb3IiLCJyZWNlaXZlZEFycmF5IiwibWVyZ2VyIiwiYWRkVG9SZXN1bHQiLCJjdXJyZW50T2JqIiwib3RoZXJPYmoiLCJpbW11dGFibGVWYWx1ZSIsIm1lcmdlclJlc3VsdCIsImN1cnJlbnRWYWx1ZSIsInVuZGVmaW5lZCIsImNsZWFyRHJvcHBlZEtleXMiLCJvdGhlckZyb21BcnJheSIsIm9iamVjdFJlcGxhY2UiLCJwYXRoIiwib2JqZWN0U2V0IiwicHJvcGVydHkiLCJ1cGRhdGVyIiwicmVzdEFyZ3MiLCJpbml0aWFsVmFsIiwic2V0IiwiZ2V0SW5QYXRoIiwibCIsImFzTXV0YWJsZU9iamVjdCIsImluc3RhbnRpYXRlUGxhaW5PYmplY3QiLCJvcHRpb25zIiwiaXNSZWFjdEVsZW1lbnQiLCIkJHR5cGVvZiIsInN0YWNrUmVtYWluaW5nIiwiT2JqZWN0IiwiY2xvbmUiLCJ0b1N0YXRpYyIsImZuIiwic3RhdGljV3JhcHBlciIsImFyZ3MiLCJzZWxmIiwic2hpZnQiLCJ0b1N0YXRpY09iamVjdE9yQXJyYXkiLCJmbk9iamVjdCIs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QjtBQUNBSCxZQUFVc0IsS0FBVixHQUEyQjJFLHNCQUFzQnhFLFdBQXRCLEVBQW1DWCxVQUFuQyxDQUEzQjtBQUNBZCxZQUFVOEIsTUFBVixHQUEyQjZELFNBQVM3RCxNQUFULENBQTNCO0FBQ0E5QixZQUFVK0IsUUFBVixHQUEyQjRELFNBQVM1RCxRQUFULENBQTNCO0FBQ0EvQixZQUFVNEIsT0FBVixHQUEyQitELFNBQVMvRCxPQUFULENBQTNCO0FBQ0E1QixZQUFVNkIsUUFBVixHQUEyQjhELFNBQVM5RCxRQUFULENBQTNCOztBQUVBLHdCQUFjN0IsU0FBZDs7QUFFQTtBQUNBLE1BQUksUUFBT3NHLE1BQVAsdURBQU9BLE1BQVAsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUJBLFdBQU9DLE9BQVAsR0FBaUJ2RyxTQUFqQjtBQUNELEdBRkQsTUFFTyxJQUFJLFFBQU91RyxPQUFQLHVEQUFPQSxPQUFQLE9BQW1CLFFBQXZCLEVBQWlDO0FBQ3RDQSxZQUFRdkcsU0FBUixHQUFvQkEsU0FBcEI7QUFDRCxHQUZNLE1BRUEsSUFBSSxRQUFPd0csTUFBUCx1REFBT0EsTUFBUCxPQUFrQixRQUF0QixFQUFnQztBQUNyQ0EsV0FBT3hHLFNBQVAsR0FBbUJBLFNBQW5CO0FBQ0QsR0FGTSxNQUVBLElBQUksUUFBT3lHLE1BQVAsdURBQU9BLE1BQVAsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDckNBLFdBQU96RyxTQUFQLEdBQW1CQSxTQUFuQjtBQUNEO0FBQ0YsQ0ExcEJEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL3YxNS4wLjEvc3JjL2lzb21vcnBoaWMvY2xhc3NpYy9lbGVtZW50L1JlYWN0RWxlbWVudC5qcyNMMjFcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvciAmJiBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50Jyk7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEVfRkFMTEJBQ0sgPSAweGVhYzc7XG5cbiAgZnVuY3Rpb24gYWRkUHJvcGVydHlUbyh0YXJnZXQsIG1ldGhvZE5hbWUsIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbWV0aG9kTmFtZSwge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBiYW5Qcm9wZXJ0eSh0YXJnZXQsIG1ldGhvZE5hbWUpIHtcbiAgICBhZGRQcm9wZXJ0eVRvKHRhcmdldCwgbWV0aG9kTmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgSW1tdXRhYmxlRXJyb3IoXCJUaGUgXCIgKyBtZXRob2ROYW1lICtcbiAgICAgICAgXCIgbWV0aG9kIGNhbm5vdCBiZSBpbnZva2VkIG9uIGFuIEltbXV0YWJsZSBkYXRhIHN0cnVjdHVyZS5cIik7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgaW1tdXRhYmlsaXR5VGFnID0gXCJfX2ltbXV0YWJsZV9pbnZhcmlhbnRzX2hvbGRcIjtcblxuICBmdW5jdGlvbiBhZGRJbW11dGFiaWxpdHlUYWcodGFyZ2V0KSB7XG4gICAgYWRkUHJvcGVydHlUbyh0YXJnZXQsIGltbXV0YWJpbGl0eVRhZywgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0ltbXV0YWJsZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHRhcmdldCA9PT0gbnVsbCB8fCBCb29sZWFuKFxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgaW1tdXRhYmlsaXR5VGFnKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSW4gSmF2YVNjcmlwdCwgb25seSBvYmplY3RzIGFyZSBldmVuIHBvdGVudGlhbGx5IG11dGFibGUuXG4gICAgICAvLyBzdHJpbmdzLCBudW1iZXJzLCBudWxsLCBhbmQgdW5kZWZpbmVkIGFyZSBhbGwgbmF0dXJhbGx5IGltbXV0YWJsZS5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRXF1YWwoYSwgYikge1xuICAgIC8vIEF2b2lkIGZhbHNlIHBvc2l0aXZlcyBkdWUgdG8gKE5hTiAhPT0gTmFOKSBldmFsdWF0aW5nIHRvIHRydWVcbiAgICByZXR1cm4gKGEgPT09IGIgfHwgKGEgIT09IGEgJiYgYiAhPT0gYikpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNZXJnYWJsZU9iamVjdCh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgIShBcnJheS5pc0FycmF5KHRhcmdldCkpICYmICEodGFyZ2V0IGluc3RhbmNlb2YgRGF0ZSk7XG4gIH1cblxuICB2YXIgbXV0YXRpbmdPYmplY3RNZXRob2RzID0gW1xuICAgIFwic2V0UHJvdG90eXBlT2ZcIlxuICBdO1xuXG4gIHZhciBub25NdXRhdGluZ09iamVjdE1ldGhvZHMgPSBbXG4gICAgXCJrZXlzXCJcbiAgXTtcblxuICB2YXIgbXV0YXRpbmdBcnJheU1ldGhvZHMgPSBtdXRhdGluZ09iamVjdE1ldGhvZHMuY29uY2F0KFtcbiAgICBcInB1c2hcIiwgXCJwb3BcIiwgXCJzb3J0XCIsIFwic3BsaWNlXCIsIFwic2hpZnRcIiwgXCJ1bnNoaWZ0XCIsIFwicmV2ZXJzZVwiXG4gIF0pO1xuXG4gIHZhciBub25NdXRhdGluZ0FycmF5TWV0aG9kcyA9IG5vbk11dGF0aW5nT2JqZWN0TWV0aG9kcy5jb25jYXQoW1xuICAgIFwibWFwXCIsIFwiZmlsdGVyXCIsIFwic2xpY2VcIiwgXCJjb25jYXRcIiwgXCJyZWR1Y2VcIiwgXCJyZWR1Y2VSaWdodFwiXG4gIF0pO1xuXG4gIHZhciBtdXRhdGluZ0RhdGVNZXRob2RzID0gbXV0YXRpbmdPYmplY3RNZXRob2RzLmNvbmNhdChbXG4gICAgXCJzZXREYXRlXCIsIFwic2V0RnVsbFllYXJcIiwgXCJzZXRIb3Vyc1wiLCBcInNldE1pbGxpc2Vjb25kc1wiLCBcInNldE1pbnV0ZXNcIiwgXCJzZXRNb250aFwiLCBcInNldFNlY29uZHNcIixcbiAgICBcInNldFRpbWVcIiwgXCJzZXRVVENEYXRlXCIsIFwic2V0VVRDRnVsbFllYXJcIiwgXCJzZXRVVENIb3Vyc1wiLCBcInNldFVUQ01pbGxpc2Vjb25kc1wiLCBcInNldFVUQ01pbnV0ZXNcIixcbiAgICBcInNldFVUQ01vbnRoXCIsIFwic2V0VVRDU2Vjb25kc1wiLCBcInNldFllYXJcIlxuICBdKTtcblxuICBmdW5jdGlvbiBJbW11dGFibGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdmFyIGVyciAgICAgICA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvLyBUT0RPOiBDb25zaWRlciBgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVyciwgSW1tdXRhYmxlRXJyb3IpO2BcbiAgICBlcnIuX19wcm90b19fID0gSW1tdXRhYmxlRXJyb3I7XG5cbiAgICByZXR1cm4gZXJyO1xuICB9XG4gIEltbXV0YWJsZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBtYWtlSW1tdXRhYmxlKG9iaiwgYmFubmVkTWV0aG9kcykge1xuICAgIC8vIFRhZyBpdCBzbyB3ZSBjYW4gcXVpY2tseSB0ZWxsIGl0J3MgaW1tdXRhYmxlIGxhdGVyLlxuICAgIGFkZEltbXV0YWJpbGl0eVRhZyhvYmopO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgLy8gTWFrZSBhbGwgbXV0YXRpbmcgbWV0aG9kcyB0aHJvdyBleGNlcHRpb25zLlxuICAgICAgZm9yICh2YXIgaW5kZXggaW4gYmFubmVkTWV0aG9kcykge1xuICAgICAgICBpZiAoYmFubmVkTWV0aG9kcy5oYXNPd25Qcm9wZXJ0eShpbmRleCkpIHtcbiAgICAgICAgICBiYW5Qcm9wZXJ0eShvYmosIGJhbm5lZE1ldGhvZHNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBGcmVlemUgaXQgYW5kIHJldHVybiBpdC5cbiAgICAgIE9iamVjdC5mcmVlemUob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZU1ldGhvZFJldHVybkltbXV0YWJsZShvYmosIG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgY3VycmVudE1ldGhvZCA9IG9ialttZXRob2ROYW1lXTtcblxuICAgIGFkZFByb3BlcnR5VG8ob2JqLCBtZXRob2ROYW1lLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBJbW11dGFibGUoY3VycmVudE1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cykpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJyYXlTZXQoaWR4LCB2YWx1ZSwgY29uZmlnKSB7XG4gICAgdmFyIGRlZXAgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLmRlZXA7XG5cbiAgICBpZiAoaWR4IGluIHRoaXMpIHtcbiAgICAgIGlmIChkZWVwICYmIHRoaXNbaWR4XSAhPT0gdmFsdWUgJiYgaXNNZXJnYWJsZU9iamVjdCh2YWx1ZSkgJiYgaXNNZXJnYWJsZU9iamVjdCh0aGlzW2lkeF0pKSB7XG4gICAgICAgIHZhbHVlID0gdGhpc1tpZHhdLm1lcmdlKHZhbHVlLCB7ZGVlcDogdHJ1ZSwgbW9kZTogJ3JlcGxhY2UnfSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNFcXVhbCh0aGlzW2lkeF0sIHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbXV0YWJsZSA9IGFzTXV0YWJsZUFycmF5LmNhbGwodGhpcyk7XG4gICAgbXV0YWJsZVtpZHhdID0gSW1tdXRhYmxlKHZhbHVlKTtcbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG11dGFibGUpO1xuICB9XG5cbiAgdmFyIGltbXV0YWJsZUVtcHR5QXJyYXkgPSBJbW11dGFibGUoW10pO1xuXG4gIGZ1bmN0aW9uIGFycmF5U2V0SW4ocHRoLCB2YWx1ZSwgY29uZmlnKSB7XG4gICAgdmFyIGhlYWQgPSBwdGhbMF07XG5cbiAgICBpZiAocHRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGFycmF5U2V0LmNhbGwodGhpcywgaGVhZCwgdmFsdWUsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0YWlsID0gcHRoLnNsaWNlKDEpO1xuICAgICAgdmFyIHRoaXNIZWFkID0gdGhpc1toZWFkXTtcbiAgICAgIHZhciBuZXdWYWx1ZTtcblxuICAgICAgaWYgKHR5cGVvZih0aGlzSGVhZCkgPT09IFwib2JqZWN0XCIgJiYgdGhpc0hlYWQgIT09IG51bGwgJiYgdHlwZW9mKHRoaXNIZWFkLnNldEluKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIC8vIE1pZ2h0ICh2YWxpZGx5KSBiZSBvYmplY3Qgb3IgYXJyYXlcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzSGVhZC5zZXRJbih0YWlsLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV4dEhlYWQgPSB0YWlsWzBdO1xuICAgICAgICAvLyBJZiB0aGUgbmV4dCBwYXRoIHBhcnQgaXMgYSBudW1iZXIsIHRoZW4gd2UgYXJlIHNldHRpbmcgaW50byBhbiBhcnJheSwgZWxzZSBhbiBvYmplY3QuXG4gICAgICAgIGlmIChuZXh0SGVhZCAhPT0gJycgJiYgaXNGaW5pdGUobmV4dEhlYWQpKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBhcnJheVNldEluLmNhbGwoaW1tdXRhYmxlRW1wdHlBcnJheSwgdGFpbCwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1ZhbHVlID0gb2JqZWN0U2V0SW4uY2FsbChpbW11dGFibGVFbXB0eU9iamVjdCwgdGFpbCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWFkIGluIHRoaXMgJiYgdGhpc0hlYWQgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB2YXIgbXV0YWJsZSA9IGFzTXV0YWJsZUFycmF5LmNhbGwodGhpcyk7XG4gICAgICBtdXRhYmxlW2hlYWRdID0gbmV3VmFsdWU7XG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG11dGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VJbW11dGFibGVBcnJheShhcnJheSkge1xuICAgIC8vIERvbid0IGNoYW5nZSB0aGVpciBpbXBsZW1lbnRhdGlvbnMsIGJ1dCB3cmFwIHRoZXNlIGZ1bmN0aW9ucyB0byBtYWtlIHN1cmVcbiAgICAvLyB0aGV5IGFsd2F5cyByZXR1cm4gYW4gaW1tdXRhYmxlIHZhbHVlLlxuICAgIGZvciAodmFyIGluZGV4IGluIG5vbk11dGF0aW5nQXJyYXlNZXRob2RzKSB7XG4gICAgICBpZiAobm9uTXV0YXRpbmdBcnJheU1ldGhvZHMuaGFzT3duUHJvcGVydHkoaW5kZXgpKSB7XG4gICAgICAgIHZhciBtZXRob2ROYW1lID0gbm9uTXV0YXRpbmdBcnJheU1ldGhvZHNbaW5kZXhdO1xuICAgICAgICBtYWtlTWV0aG9kUmV0dXJuSW1tdXRhYmxlKGFycmF5LCBtZXRob2ROYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcImZsYXRNYXBcIiwgIGZsYXRNYXApO1xuICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwiYXNPYmplY3RcIiwgYXNPYmplY3QpO1xuICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwiYXNNdXRhYmxlXCIsIGFzTXV0YWJsZUFycmF5KTtcbiAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcInNldFwiLCBhcnJheVNldCk7XG4gICAgYWRkUHJvcGVydHlUbyhhcnJheSwgXCJzZXRJblwiLCBhcnJheVNldEluKTtcbiAgICBhZGRQcm9wZXJ0eVRvKGFycmF5LCBcInVwZGF0ZVwiLCB1cGRhdGUpO1xuICAgIGFkZFByb3BlcnR5VG8oYXJyYXksIFwidXBkYXRlSW5cIiwgdXBkYXRlSW4pO1xuXG4gICAgZm9yKHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycmF5W2ldID0gSW1tdXRhYmxlKGFycmF5W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZShhcnJheSwgbXV0YXRpbmdBcnJheU1ldGhvZHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZURhdGUoZGF0ZSkge1xuICAgIGFkZFByb3BlcnR5VG8oZGF0ZSwgXCJhc011dGFibGVcIiwgYXNNdXRhYmxlRGF0ZSk7XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZShkYXRlLCBtdXRhdGluZ0RhdGVNZXRob2RzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzTXV0YWJsZURhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFZmZlY3RpdmVseSBwZXJmb3JtcyBhIG1hcCgpIG92ZXIgdGhlIGVsZW1lbnRzIGluIHRoZSBhcnJheSwgdXNpbmcgdGhlXG4gICAqIHByb3ZpZGVkIGl0ZXJhdG9yLCBleGNlcHQgdGhhdCB3aGVuZXZlciB0aGUgaXRlcmF0b3IgcmV0dXJucyBhbiBhcnJheSwgdGhhdFxuICAgKiBhcnJheSdzIGVsZW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgZmluYWwgcmVzdWx0IGluc3RlYWQgb2YgdGhlIGFycmF5IGl0c2VsZi5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaXRlcmF0b3IgLSBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGludm9rZWQgb24gZWFjaCBlbGVtZW50IGluIHRoZSBhcnJheS4gSXQgd2lsbCByZWNlaXZlIHRocmVlIGFyZ3VtZW50czogdGhlIGN1cnJlbnQgdmFsdWUsIHRoZSBjdXJyZW50IGluZGV4LCBhbmQgdGhlIGN1cnJlbnQgb2JqZWN0LlxuICAgKi9cbiAgZnVuY3Rpb24gZmxhdE1hcChpdGVyYXRvcikge1xuICAgIC8vIENhbGxpbmcgLmZsYXRNYXAoKSB3aXRoIG5vIGFyZ3VtZW50cyBpcyBhIG5vLW9wLiBEb24ndCBib3RoZXIgY2xvbmluZy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgICBsZW5ndGggPSB0aGlzLmxlbmd0aCxcbiAgICAgICAgaW5kZXg7XG5cbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBpdGVyYXRvclJlc3VsdCA9IGl0ZXJhdG9yKHRoaXNbaW5kZXhdLCBpbmRleCwgdGhpcyk7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZXJhdG9yUmVzdWx0KSkge1xuICAgICAgICAvLyBDb25jYXRlbmF0ZSBBcnJheSByZXN1bHRzIGludG8gdGhlIHJldHVybiB2YWx1ZSB3ZSdyZSBidWlsZGluZyB1cC5cbiAgICAgICAgcmVzdWx0LnB1c2guYXBwbHkocmVzdWx0LCBpdGVyYXRvclJlc3VsdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIYW5kbGUgbm9uLUFycmF5IHJlc3VsdHMgdGhlIHNhbWUgd2F5IG1hcCgpIGRvZXMuXG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZXJhdG9yUmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KHJlc3VsdCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJbW11dGFibGUgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGdpdmVuIGtleXMgaW5jbHVkZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGtleXNUb1JlbW92ZSAtIEEgbGlzdCBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyB0aGUga2V5cyB0byBleGNsdWRlIGluIHRoZSByZXR1cm4gdmFsdWUuIEluc3RlYWQgb2YgcHJvdmlkaW5nIGEgc2luZ2xlIGFycmF5LCB0aGlzIG1ldGhvZCBjYW4gYWxzbyBiZSBjYWxsZWQgYnkgcGFzc2luZyBtdWx0aXBsZSBzdHJpbmdzIGFzIHNlcGFyYXRlIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHdpdGhvdXQocmVtb3ZlKSB7XG4gICAgLy8gQ2FsbGluZyAud2l0aG91dCgpIHdpdGggbm8gYXJndW1lbnRzIGlzIGEgbm8tb3AuIERvbid0IGJvdGhlciBjbG9uaW5nLlxuICAgIGlmICh0eXBlb2YgcmVtb3ZlID09PSBcInVuZGVmaW5lZFwiICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVtb3ZlICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIElmIHdlIHdlcmVuJ3QgZ2l2ZW4gYW4gYXJyYXksIHVzZSB0aGUgYXJndW1lbnRzIGxpc3QuXG4gICAgICB2YXIga2V5c1RvUmVtb3ZlQXJyYXkgPSAoQXJyYXkuaXNBcnJheShyZW1vdmUpKSA/XG4gICAgICAgICByZW1vdmUuc2xpY2UoKSA6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgIC8vIENvbnZlcnQgbnVtZXJpYyBrZXlzIHRvIHN0cmluZ3Mgc2luY2UgdGhhdCdzIGhvdyB0aGV5J2xsXG4gICAgICAvLyBjb21lIGZyb20gdGhlIGVudW1lcmF0aW9uIG9mIHRoZSBvYmplY3QuXG4gICAgICBrZXlzVG9SZW1vdmVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVsLCBpZHgsIGFycikge1xuICAgICAgICBpZih0eXBlb2YoZWwpID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgYXJyW2lkeF0gPSBlbC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVtb3ZlID0gZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleXNUb1JlbW92ZUFycmF5LmluZGV4T2Yoa2V5KSAhPT0gLTE7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB0aGlzLmluc3RhbnRpYXRlRW1wdHlPYmplY3QoKTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHJlbW92ZSh0aGlzW2tleV0sIGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCxcbiAgICAgIHtpbnN0YW50aWF0ZUVtcHR5T2JqZWN0OiB0aGlzLmluc3RhbnRpYXRlRW1wdHlPYmplY3R9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzTXV0YWJsZUFycmF5KG9wdHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gW10sIGksIGxlbmd0aDtcblxuICAgIGlmKG9wdHMgJiYgb3B0cy5kZWVwKSB7XG4gICAgICBmb3IoaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXNEZWVwTXV0YWJsZSh0aGlzW2ldKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEVmZmVjdGl2ZWx5IHBlcmZvcm1zIGEgW21hcF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKSBvdmVyIHRoZSBlbGVtZW50cyBpbiB0aGUgYXJyYXksIGV4cGVjdGluZyB0aGF0IHRoZSBpdGVyYXRvciBmdW5jdGlvblxuICAgKiB3aWxsIHJldHVybiBhbiBhcnJheSBvZiB0d28gZWxlbWVudHMgLSB0aGUgZmlyc3QgcmVwcmVzZW50aW5nIGEga2V5LCB0aGUgb3RoZXJcbiAgICogYSB2YWx1ZS4gVGhlbiByZXR1cm5zIGFuIEltbXV0YWJsZSBPYmplY3QgY29uc3RydWN0ZWQgb2YgdGhvc2Uga2V5cyBhbmQgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBpdGVyYXRvciAtIEEgZnVuY3Rpb24gd2hpY2ggc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiB0d28gZWxlbWVudHMgLSB0aGUgZmlyc3QgcmVwcmVzZW50aW5nIHRoZSBkZXNpcmVkIGtleSwgdGhlIG90aGVyIHRoZSBkZXNpcmVkIHZhbHVlLlxuICAgKi9cbiAgZnVuY3Rpb24gYXNPYmplY3QoaXRlcmF0b3IpIHtcbiAgICAvLyBJZiBubyBpdGVyYXRvciB3YXMgcHJvdmlkZWQsIGFzc3VtZSB0aGUgaWRlbnRpdHkgZnVuY3Rpb25cbiAgICAvLyAoc3VnZ2VzdGluZyB0aGlzIGFycmF5IGlzIGFscmVhZHkgYSBsaXN0IG9mIGtleS92YWx1ZSBwYWlycy4pXG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpdGVyYXRvciA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0ID0ge30sXG4gICAgICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoLFxuICAgICAgICBpbmRleDtcblxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIHBhaXIgID0gaXRlcmF0b3IodGhpc1tpbmRleF0sIGluZGV4LCB0aGlzKSxcbiAgICAgICAgICBrZXkgICA9IHBhaXJbMF0sXG4gICAgICAgICAgdmFsdWUgPSBwYWlyWzFdO1xuXG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhc0RlZXBNdXRhYmxlKG9iaikge1xuICAgIGlmIChcbiAgICAgICghb2JqKSB8fFxuICAgICAgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB8fFxuICAgICAgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgaW1tdXRhYmlsaXR5VGFnKSkgfHxcbiAgICAgIChvYmogaW5zdGFuY2VvZiBEYXRlKVxuICAgICkgeyByZXR1cm4gb2JqOyB9XG4gICAgcmV0dXJuIG9iai5hc011dGFibGUoe2RlZXA6IHRydWV9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1aWNrQ29weShzcmMsIGRlc3QpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzcmMsIGtleSkpIHtcbiAgICAgICAgZGVzdFtrZXldID0gc3JjW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc3Q7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBJbW11dGFibGUgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb3BlcnRpZXMgYW5kIHZhbHVlcyBvZiBib3RoXG4gICAqIHRoaXMgb2JqZWN0IGFuZCB0aGUgcHJvdmlkZWQgb2JqZWN0LCBwcmlvcml0aXppbmcgdGhlIHByb3ZpZGVkIG9iamVjdCdzXG4gICAqIHZhbHVlcyB3aGVuZXZlciB0aGUgc2FtZSBrZXkgaXMgcHJlc2VudCBpbiBib3RoIG9iamVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvdGhlciAtIFRoZSBvdGhlciBvYmplY3QgdG8gbWVyZ2UuIE11bHRpcGxlIG9iamVjdHMgY2FuIGJlIHBhc3NlZCBhcyBhbiBhcnJheS4gSW4gc3VjaCBhIGNhc2UsIHRoZSBsYXRlciBhbiBvYmplY3QgYXBwZWFycyBpbiB0aGF0IGxpc3QsIHRoZSBoaWdoZXIgaXRzIHByaW9yaXR5LlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0gT3B0aW9uYWwgY29uZmlnIG9iamVjdCB0aGF0IGNvbnRhaW5zIHNldHRpbmdzLiBTdXBwb3J0ZWQgc2V0dGluZ3MgYXJlOiB7ZGVlcDogdHJ1ZX0gZm9yIGRlZXAgbWVyZ2UgYW5kIHttZXJnZXI6IG1lcmdlckZ1bmN9IHdoZXJlIG1lcmdlckZ1bmMgaXMgYSBmdW5jdGlvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdCB0YWtlcyBhIHByb3BlcnR5IGZyb20gYm90aCBvYmplY3RzLiBJZiBhbnl0aGluZyBpcyByZXR1cm5lZCBpdCBvdmVycmlkZXMgdGhlIG5vcm1hbCBtZXJnZSBiZWhhdmlvdXIuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZShvdGhlciwgY29uZmlnKSB7XG4gICAgLy8gQ2FsbGluZyAubWVyZ2UoKSB3aXRoIG5vIGFyZ3VtZW50cyBpcyBhIG5vLW9wLiBEb24ndCBib3RoZXIgY2xvbmluZy5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKG90aGVyID09PSBudWxsIHx8ICh0eXBlb2Ygb3RoZXIgIT09IFwib2JqZWN0XCIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1tdXRhYmxlI21lcmdlIGNhbiBvbmx5IGJlIGludm9rZWQgd2l0aCBvYmplY3RzIG9yIGFycmF5cywgbm90IFwiICsgSlNPTi5zdHJpbmdpZnkob3RoZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgcmVjZWl2ZWRBcnJheSA9IChBcnJheS5pc0FycmF5KG90aGVyKSksXG4gICAgICAgIGRlZXAgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLmRlZXAsXG4gICAgICAgIG1vZGUgICAgICAgICAgPSBjb25maWcgJiYgY29uZmlnLm1vZGUgfHwgJ21lcmdlJyxcbiAgICAgICAgbWVyZ2VyICAgICAgICA9IGNvbmZpZyAmJiBjb25maWcubWVyZ2VyLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICAvLyBVc2UgdGhlIGdpdmVuIGtleSB0byBleHRyYWN0IGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb2JqZWN0LCB0aGVuIHBsYWNlXG4gICAgLy8gdGhhdCB2YWx1ZSBpbiB0aGUgcmVzdWx0IG9iamVjdCB1bmRlciB0aGUgc2FtZSBrZXkuIElmIHRoYXQgcmVzdWx0ZWRcbiAgICAvLyBpbiBhIGNoYW5nZSBmcm9tIHRoaXMgb2JqZWN0J3MgdmFsdWUgYXQgdGhhdCBrZXksIHNldCBhbnlDaGFuZ2VzID0gdHJ1ZS5cbiAgICBmdW5jdGlvbiBhZGRUb1Jlc3VsdChjdXJyZW50T2JqLCBvdGhlck9iaiwga2V5KSB7XG4gICAgICB2YXIgaW1tdXRhYmxlVmFsdWUgPSBJbW11dGFibGUob3RoZXJPYmpba2V5XSk7XG4gICAgICB2YXIgbWVyZ2VyUmVzdWx0ID0gbWVyZ2VyICYmIG1lcmdlcihjdXJyZW50T2JqW2tleV0sIGltbXV0YWJsZVZhbHVlLCBjb25maWcpO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRPYmpba2V5XTtcblxuICAgICAgaWYgKChyZXN1bHQgIT09IHVuZGVmaW5lZCkgfHxcbiAgICAgICAgKG1lcmdlclJlc3VsdCAhPT0gdW5kZWZpbmVkKSB8fFxuICAgICAgICAoIWN1cnJlbnRPYmouaGFzT3duUHJvcGVydHkoa2V5KSkgfHxcbiAgICAgICAgIWlzRXF1YWwoaW1tdXRhYmxlVmFsdWUsIGN1cnJlbnRWYWx1ZSkpIHtcblxuICAgICAgICB2YXIgbmV3VmFsdWU7XG5cbiAgICAgICAgaWYgKG1lcmdlclJlc3VsdCkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gbWVyZ2VyUmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKGRlZXAgJiYgaXNNZXJnYWJsZU9iamVjdChjdXJyZW50VmFsdWUpICYmIGlzTWVyZ2FibGVPYmplY3QoaW1tdXRhYmxlVmFsdWUpKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBjdXJyZW50VmFsdWUubWVyZ2UoaW1tdXRhYmxlVmFsdWUsIGNvbmZpZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBpbW11dGFibGVWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNFcXVhbChjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKSB8fCAhY3VycmVudE9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBNYWtlIGEgc2hhbGxvdyBjbG9uZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG4gICAgICAgICAgICByZXN1bHQgPSBxdWlja0NvcHkoY3VycmVudE9iaiwgY3VycmVudE9iai5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc3VsdFtrZXldID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckRyb3BwZWRLZXlzKGN1cnJlbnRPYmosIG90aGVyT2JqKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gY3VycmVudE9iaikge1xuICAgICAgICBpZiAoIW90aGVyT2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cbiAgICAgICAgICAgIHJlc3VsdCA9IHF1aWNrQ29weShjdXJyZW50T2JqLCBjdXJyZW50T2JqLmluc3RhbnRpYXRlRW1wdHlPYmplY3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByZXN1bHRba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXk7XG5cbiAgICAvLyBBY2hpZXZlIHByaW9yaXRpemF0aW9uIGJ5IG92ZXJyaWRpbmcgcHJldmlvdXMgdmFsdWVzIHRoYXQgZ2V0IGluIHRoZSB3YXkuXG4gICAgaWYgKCFyZWNlaXZlZEFycmF5KSB7XG4gICAgICAvLyBUaGUgbW9zdCBjb21tb24gdXNlIGNhc2U6IGp1c3QgbWVyZ2Ugb25lIG9iamVjdCBpbnRvIHRoZSBleGlzdGluZyBvbmUuXG4gICAgICBmb3IgKGtleSBpbiBvdGhlcikge1xuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvdGhlciwga2V5KSkge1xuICAgICAgICAgIGFkZFRvUmVzdWx0KHRoaXMsIG90aGVyLCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobW9kZSA9PT0gJ3JlcGxhY2UnKSB7XG4gICAgICAgIGNsZWFyRHJvcHBlZEtleXModGhpcywgb3RoZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXZSBhbHNvIGFjY2VwdCBhbiBBcnJheVxuICAgICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBvdGhlci5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBvdGhlckZyb21BcnJheSA9IG90aGVyW2luZGV4XTtcblxuICAgICAgICBmb3IgKGtleSBpbiBvdGhlckZyb21BcnJheSkge1xuICAgICAgICAgIGlmIChvdGhlckZyb21BcnJheS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBhZGRUb1Jlc3VsdChyZXN1bHQgIT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRoaXMsIG90aGVyRnJvbUFycmF5LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlT2JqZWN0KHJlc3VsdCxcbiAgICAgICAge2luc3RhbnRpYXRlRW1wdHlPYmplY3Q6IHRoaXMuaW5zdGFudGlhdGVFbXB0eU9iamVjdH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9iamVjdFJlcGxhY2UodmFsdWUsIGNvbmZpZykge1xuICAgIHZhciBkZWVwICAgICAgICAgID0gY29uZmlnICYmIGNvbmZpZy5kZWVwO1xuXG4gICAgLy8gQ2FsbGluZyAucmVwbGFjZSgpIHdpdGggbm8gYXJndW1lbnRzIGlzIGEgbm8tb3AuIERvbid0IGJvdGhlciBjbG9uaW5nLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1tdXRhYmxlI3JlcGxhY2UgY2FuIG9ubHkgYmUgaW52b2tlZCB3aXRoIG9iamVjdHMgb3IgYXJyYXlzLCBub3QgXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lcmdlKHZhbHVlLCB7ZGVlcDogZGVlcCwgbW9kZTogJ3JlcGxhY2UnfSk7XG4gIH1cblxuICB2YXIgaW1tdXRhYmxlRW1wdHlPYmplY3QgPSBJbW11dGFibGUoe30pO1xuXG4gIGZ1bmN0aW9uIG9iamVjdFNldEluKHBhdGgsIHZhbHVlLCBjb25maWcpIHtcbiAgICB2YXIgaGVhZCA9IHBhdGhbMF07XG4gICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gb2JqZWN0U2V0LmNhbGwodGhpcywgaGVhZCwgdmFsdWUsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgdmFyIHRhaWwgPSBwYXRoLnNsaWNlKDEpO1xuICAgIHZhciBuZXdWYWx1ZTtcbiAgICB2YXIgdGhpc0hlYWQgPSB0aGlzW2hlYWRdO1xuXG4gICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoaGVhZCkgJiYgdHlwZW9mKHRoaXNIZWFkKSA9PT0gXCJvYmplY3RcIiAmJiB0aGlzSGVhZCAhPT0gbnVsbCAmJiB0eXBlb2YodGhpc0hlYWQuc2V0SW4pID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIE1pZ2h0ICh2YWxpZGx5KSBiZSBvYmplY3Qgb3IgYXJyYXlcbiAgICAgIG5ld1ZhbHVlID0gdGhpc0hlYWQuc2V0SW4odGFpbCwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdWYWx1ZSA9IG9iamVjdFNldEluLmNhbGwoaW1tdXRhYmxlRW1wdHlPYmplY3QsIHRhaWwsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShoZWFkKSAmJiB0aGlzSGVhZCA9PT0gbmV3VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBtdXRhYmxlID0gcXVpY2tDb3B5KHRoaXMsIHRoaXMuaW5zdGFudGlhdGVFbXB0eU9iamVjdCgpKTtcbiAgICBtdXRhYmxlW2hlYWRdID0gbmV3VmFsdWU7XG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGVPYmplY3QobXV0YWJsZSwgdGhpcyk7XG4gIH1cblxuICBmdW5jdGlvbiBvYmplY3RTZXQocHJvcGVydHksIHZhbHVlLCBjb25maWcpIHtcbiAgICB2YXIgZGVlcCAgICAgICAgICA9IGNvbmZpZyAmJiBjb25maWcuZGVlcDtcblxuICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgaWYgKGRlZXAgJiYgdGhpc1twcm9wZXJ0eV0gIT09IHZhbHVlICYmIGlzTWVyZ2FibGVPYmplY3QodmFsdWUpICYmIGlzTWVyZ2FibGVPYmplY3QodGhpc1twcm9wZXJ0eV0pKSB7XG4gICAgICAgIHZhbHVlID0gdGhpc1twcm9wZXJ0eV0ubWVyZ2UodmFsdWUsIHtkZWVwOiB0cnVlLCBtb2RlOiAncmVwbGFjZSd9KTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0VxdWFsKHRoaXNbcHJvcGVydHldLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG11dGFibGUgPSBxdWlja0NvcHkodGhpcywgdGhpcy5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCkpO1xuICAgIG11dGFibGVbcHJvcGVydHldID0gSW1tdXRhYmxlKHZhbHVlKTtcbiAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChtdXRhYmxlLCB0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShwcm9wZXJ0eSwgdXBkYXRlcikge1xuICAgIHZhciByZXN0QXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGluaXRpYWxWYWwgPSB0aGlzW3Byb3BlcnR5XTtcbiAgICByZXR1cm4gdGhpcy5zZXQocHJvcGVydHksIHVwZGF0ZXIuYXBwbHkoaW5pdGlhbFZhbCwgW2luaXRpYWxWYWxdLmNvbmNhdChyZXN0QXJncykpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluUGF0aChvYmosIHBhdGgpIHtcbiAgICAvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGF0aC5sZW5ndGg7IG9iaiAhPSBudWxsICYmIGkgPCBsOyBpKyspIHtcbiAgICAgIG9iaiA9IG9ialtwYXRoW2ldXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGkgJiYgaSA9PSBsKSA/IG9iaiA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUluKHBhdGgsIHVwZGF0ZXIpIHtcbiAgICB2YXIgcmVzdEFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBpbml0aWFsVmFsID0gZ2V0SW5QYXRoKHRoaXMsIHBhdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuc2V0SW4ocGF0aCwgdXBkYXRlci5hcHBseShpbml0aWFsVmFsLCBbaW5pdGlhbFZhbF0uY29uY2F0KHJlc3RBcmdzKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNNdXRhYmxlT2JqZWN0KG9wdHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCksIGtleTtcblxuICAgIGlmKG9wdHMgJiYgb3B0cy5kZWVwKSB7XG4gICAgICBmb3IgKGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGFzRGVlcE11dGFibGUodGhpc1trZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGtleSBpbiB0aGlzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBDcmVhdGVzIHBsYWluIG9iamVjdCB0byBiZSB1c2VkIGZvciBjbG9uaW5nXG4gIGZ1bmN0aW9uIGluc3RhbnRpYXRlUGxhaW5PYmplY3QoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLy8gRmluYWxpemVzIGFuIG9iamVjdCB3aXRoIGltbXV0YWJsZSBtZXRob2RzLCBmcmVlemVzIGl0LCBhbmQgcmV0dXJucyBpdC5cbiAgZnVuY3Rpb24gbWFrZUltbXV0YWJsZU9iamVjdChvYmosIG9wdGlvbnMpIHtcbiAgICB2YXIgaW5zdGFudGlhdGVFbXB0eU9iamVjdCA9XG4gICAgICAob3B0aW9ucyAmJiBvcHRpb25zLmluc3RhbnRpYXRlRW1wdHlPYmplY3QpID9cbiAgICAgICAgb3B0aW9ucy5pbnN0YW50aWF0ZUVtcHR5T2JqZWN0IDogaW5zdGFudGlhdGVQbGFpbk9iamVjdDtcblxuICAgIGFkZFByb3BlcnR5VG8ob2JqLCBcIm1lcmdlXCIsIG1lcmdlKTtcbiAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJyZXBsYWNlXCIsIG9iamVjdFJlcGxhY2UpO1xuICAgIGFkZFByb3BlcnR5VG8ob2JqLCBcIndpdGhvdXRcIiwgd2l0aG91dCk7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwiYXNNdXRhYmxlXCIsIGFzTXV0YWJsZU9iamVjdCk7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwiaW5zdGFudGlhdGVFbXB0eU9iamVjdFwiLCBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KTtcbiAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJzZXRcIiwgb2JqZWN0U2V0KTtcbiAgICBhZGRQcm9wZXJ0eVRvKG9iaiwgXCJzZXRJblwiLCBvYmplY3RTZXRJbik7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwidXBkYXRlXCIsIHVwZGF0ZSk7XG4gICAgYWRkUHJvcGVydHlUbyhvYmosIFwidXBkYXRlSW5cIiwgdXBkYXRlSW4pO1xuXG4gICAgcmV0dXJuIG1ha2VJbW11dGFibGUob2JqLCBtdXRhdGluZ09iamVjdE1ldGhvZHMpO1xuICB9XG5cbiAgLy8gUmV0dXJucyB0cnVlIGlmIG9iamVjdCBpcyBhIHZhbGlkIHJlYWN0IGVsZW1lbnRcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvdjE1LjAuMS9zcmMvaXNvbW9ycGhpYy9jbGFzc2ljL2VsZW1lbnQvUmVhY3RFbGVtZW50LmpzI0wzMjZcbiAgZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgIG9iaiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAob2JqLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVfRkFMTEJBQ0sgfHwgb2JqLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpO1xuICB9XG5cbiAgZnVuY3Rpb24gSW1tdXRhYmxlKG9iaiwgb3B0aW9ucywgc3RhY2tSZW1haW5pbmcpIHtcbiAgICBpZiAoaXNJbW11dGFibGUob2JqKSB8fCBpc1JlYWN0RWxlbWVudChvYmopKSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZUFycmF5KG9iai5zbGljZSgpKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBtYWtlSW1tdXRhYmxlRGF0ZShuZXcgRGF0ZShvYmouZ2V0VGltZSgpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERvbid0IGZyZWV6ZSB0aGUgb2JqZWN0IHdlIHdlcmUgZ2l2ZW47IG1ha2UgYSBjbG9uZSBhbmQgdXNlIHRoYXQuXG4gICAgICB2YXIgcHJvdG90eXBlID0gb3B0aW9ucyAmJiBvcHRpb25zLnByb3RvdHlwZTtcbiAgICAgIHZhciBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0ID1cbiAgICAgICAgKCFwcm90b3R5cGUgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlKSA/XG4gICAgICAgICAgaW5zdGFudGlhdGVQbGFpbk9iamVjdCA6IChmdW5jdGlvbigpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTsgfSk7XG4gICAgICB2YXIgY2xvbmUgPSBpbnN0YW50aWF0ZUVtcHR5T2JqZWN0KCk7XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgLypqc2hpbnQgZXFudWxsOnRydWUgKi9cbiAgICAgICAgaWYgKHN0YWNrUmVtYWluaW5nID09IG51bGwpIHtcbiAgICAgICAgICBzdGFja1JlbWFpbmluZyA9IDY0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFja1JlbWFpbmluZyA8PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEltbXV0YWJsZUVycm9yKFwiQXR0ZW1wdCB0byBjb25zdHJ1Y3QgSW1tdXRhYmxlIGZyb20gYSBkZWVwbHkgbmVzdGVkIG9iamVjdCB3YXMgZGV0ZWN0ZWQuXCIgK1xuICAgICAgICAgICAgXCIgSGF2ZSB5b3UgdHJpZWQgdG8gd3JhcCBhbiBvYmplY3Qgd2l0aCBjaXJjdWxhciByZWZlcmVuY2VzIChlLmcuIFJlYWN0IGVsZW1lbnQpP1wiICtcbiAgICAgICAgICAgIFwiIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcnRmZWxkbWFuL3NlYW1sZXNzLWltbXV0YWJsZS93aWtpL0RlZXBseS1uZXN0ZWQtb2JqZWN0LXdhcy1kZXRlY3RlZCBmb3IgZGV0YWlscy5cIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2tSZW1haW5pbmcgLT0gMTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpIHtcbiAgICAgICAgICBjbG9uZVtrZXldID0gSW1tdXRhYmxlKG9ialtrZXldLCB1bmRlZmluZWQsIHN0YWNrUmVtYWluaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFrZUltbXV0YWJsZU9iamVjdChjbG9uZSxcbiAgICAgICAge2luc3RhbnRpYXRlRW1wdHlPYmplY3Q6IGluc3RhbnRpYXRlRW1wdHlPYmplY3R9KTtcbiAgICB9XG4gIH1cblxuICAvLyBXcmFwcGVyIHRvIGFsbG93IHRoZSB1c2Ugb2Ygb2JqZWN0IG1ldGhvZHMgYXMgc3RhdGljIG1ldGhvZHMgb2YgSW1tdXRhYmxlLlxuICBmdW5jdGlvbiB0b1N0YXRpYyhmbikge1xuICAgIGZ1bmN0aW9uIHN0YXRpY1dyYXBwZXIoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIHZhciBzZWxmID0gYXJncy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0aWNXcmFwcGVyO1xuICB9XG5cbiAgLy8gV3JhcHBlciB0byBhbGxvdyB0aGUgdXNlIG9mIG9iamVjdCBtZXRob2RzIGFzIHN0YXRpYyBtZXRob2RzIG9mIEltbXV0YWJsZS5cbiAgLy8gd2l0aCB0aGUgYWRkaXRpb25hbCBjb25kaXRpb24gb2YgY2hvb3Npbmcgd2hpY2ggZnVuY3Rpb24gdG8gY2FsbCBkZXBlbmRpbmdcbiAgLy8gaWYgYXJndW1lbnQgaXMgYW4gYXJyYXkgb3IgYW4gb2JqZWN0LlxuICBmdW5jdGlvbiB0b1N0YXRpY09iamVjdE9yQXJyYXkoZm5PYmplY3QsIGZuQXJyYXkpIHtcbiAgICBmdW5jdGlvbiBzdGF0aWNXcmFwcGVyKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgc2VsZiA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGYpKSB7XG4gICAgICAgICAgcmV0dXJuIGZuQXJyYXkuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmbk9iamVjdC5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGljV3JhcHBlcjtcbiAgfVxuXG4gIC8vIEV4cG9ydCB0aGUgbGlicmFyeVxuICBJbW11dGFibGUuZnJvbSAgICAgICAgICAgPSBJbW11dGFibGU7XG4gIEltbXV0YWJsZS5pc0ltbXV0YWJsZSAgICA9IGlzSW1tdXRhYmxlO1xuICBJbW11dGFibGUuSW1tdXRhYmxlRXJyb3IgPSBJbW11dGFibGVFcnJvcjtcbiAgSW1tdXRhYmxlLm1lcmdlICAgICAgICAgID0gdG9TdGF0aWMobWVyZ2UpO1xuICBJbW11dGFibGUucmVwbGFjZSAgICAgICAgPSB0b1N0YXRpYyhvYmplY3RSZXBsYWNlKTtcbiAgSW1tdXRhYmxlLndpdGhvdXQgICAgICAgID0gdG9TdGF0aWMod2l0aG91dCk7XG4gIEltbXV0YWJsZS5hc011dGFibGUgICAgICA9IHRvU3RhdGljT2JqZWN0T3JBcnJheShhc011dGFibGVPYmplY3QsIGFzTXV0YWJsZUFycmF5KTtcbiAgSW1tdXRhYmxlLnNldCAgICAgICAgICAgID0gdG9TdGF0aWNPYmplY3RPckFycmF5KG9iamVjdFNldCwgYXJyYXlTZXQpO1xuICBJbW11dGFibGUuc2V0SW4gICAgICAgICAgPSB0b1N0YXRpY09iamVjdE9yQXJyYXkob2JqZWN0U2V0SW4sIGFycmF5U2V0SW4pO1xuICBJbW11dGFibGUudXBkYXRlICAgICAgICAgPSB0b1N0YXRpYyh1cGRhdGUpO1xuICBJbW11dGFibGUudXBkYXRlSW4gICAgICAgPSB0b1N0YXRpYyh1cGRhdGVJbik7XG4gIEltbXV0YWJsZS5mbGF0TWFwICAgICAgICA9IHRvU3RhdGljKGZsYXRNYXApO1xuICBJbW11dGFibGUuYXNPYmplY3QgICAgICAgPSB0b1N0YXRpYyhhc09iamVjdCk7XG5cbiAgT2JqZWN0LmZyZWV6ZShJbW11dGFibGUpO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSW1tdXRhYmxlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZXhwb3J0cy5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikge1xuICAgIHdpbmRvdy5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbC5JbW11dGFibGUgPSBJbW11dGFibGU7XG4gIH1cbn0pKCk7XG4iXX0=