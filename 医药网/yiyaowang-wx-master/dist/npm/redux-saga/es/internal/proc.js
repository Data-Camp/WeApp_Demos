"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TASK_CANCEL = exports.CHANNEL_END = exports.NOT_ITERATOR_ERROR = undefined;

var _keys = require('../../../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _from = require('../../../babel-runtime/core-js/array/from.js');

var _from2 = _interopRequireDefault(_from);

var _defineProperty2 = require('../../../babel-runtime/core-js/object/define-property.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = proc;

var _utils = require('./utils.js');

var _scheduler = require('./scheduler.js');

var _io = require('./io.js');

var _channel = require('./channel.js');

var _buffers = require('./buffers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];desc.configurable = desc.enumerable = true;if ("value" in desc) desc.writable = true;(0, _defineProperty3.default)(obj, key, desc);
  }return obj;
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var isDev = "development" === 'development';

var NOT_ITERATOR_ERROR = exports.NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';

var CHANNEL_END = exports.CHANNEL_END = {
  toString: function toString() {
    return '@@redux-saga/CHANNEL_END';
  }
};
var TASK_CANCEL = exports.TASK_CANCEL = {
  toString: function toString() {
    return '@@redux-saga/TASK_CANCEL';
  }
};

var matchers = {
  wildcard: function wildcard() {
    return _utils.kTrue;
  },
  default: function _default(pattern) {
    return function (input) {
      return input.type === pattern;
    };
  },
  array: function array(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return p === input.type;
      });
    };
  },
  predicate: function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  }
};

function matcher(pattern) {
  return (pattern === '*' ? matchers.wildcard : _utils.is.array(pattern) ? matchers.array : _utils.is.func(pattern) ? matchers.predicate : matchers.default)(pattern);
}

/**
  Used to track a parent task and its forks
  In the new fork model, forked tasks are attached by default to their parent
  We model this using the concept of Parent task && main Task
  main task is the main flow of the current Generator, the parent tasks is the
  aggregation of the main tasks + all its forked tasks.
  Thus the whole model represents an execution tree with multiple branches (vs the
  linear execution tree in sequential (non parallel) programming)

  A parent tasks has the following semantics
  - It completes iff all its forks either complete or all cancelled
  - If it's cancelled, all forks are cancelled as well
  - It aborts if any uncaught error bubbles up from forks
  - If it completes, the return value is the one returned by the main task
**/
function forkQueue(name, mainTask, cb) {
  var tasks = [],
      result = void 0,
      completed = false;
  addTask(mainTask);

  function abort(err) {
    cancelAll();
    cb(err, true);
  }

  function addTask(task) {
    tasks.push(task);
    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      (0, _utils.remove)(tasks, task);
      task.cont = _utils.noop;
      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
          result = res;
        }
        if (!tasks.length) {
          completed = true;
          cb(result);
        }
      }
    };
    // task.cont.cancel = task.cancel
  }

  function cancelAll() {
    if (completed) {
      return;
    }
    completed = true;
    tasks.forEach(function (t) {
      t.cont = _utils.noop;
      t.cancel();
    });
    tasks = [];
  }

  return {
    addTask: addTask,
    cancelAll: cancelAll,
    abort: abort,
    getTasks: function getTasks() {
      return tasks;
    },
    taskNames: function taskNames() {
      return tasks.map(function (t) {
        return t.name;
      });
    }
  };
}

function createTaskIterator(_ref) {
  var context = _ref.context,
      fn = _ref.fn,
      args = _ref.args;

  if (_utils.is.iterator(fn)) {
    return fn;
  }

  // catch synchronous failures; see #152 and #441
  var result = void 0,
      error = void 0;
  try {
    result = fn.apply(context, args);
  } catch (err) {
    error = err;
  }

  // i.e. a generator function returns an iterator
  if (_utils.is.iterator(result)) {
    return result;
  }

  // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441
  return error ? (0, _utils.makeIterator)(function () {
    throw error;
  }) : (0, _utils.makeIterator)(function () {
    var pc = void 0;
    var eff = { done: false, value: result };
    var ret = function ret(value) {
      return { done: true, value: value };
    };
    return function (arg) {
      if (!pc) {
        pc = true;
        return eff;
      } else {
        return ret(arg);
      }
    };
  }());
}

function wrapHelper(helper) {
  return {
    fn: helper
  };
}

function proc(iterator) {
  var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return _utils.noop;
  };
  var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _utils.noop;
  var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _utils.noop;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var parentEffectId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'anonymous';
  var cont = arguments[7];

  (0, _utils.check)(iterator, _utils.is.iterator, NOT_ITERATOR_ERROR);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError;

  var log = logger || _utils.log;
  var stdChannel = (0, _channel.stdChannel)(subscribe);
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/
  next.cancel = _utils.noop;

  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/
  var task = newTask(parentEffectId, name, iterator, cont);
  var mainTask = { name: name, cancel: cancelMain, isRunning: true };
  var taskQueue = forkQueue(name, mainTask, end);

  /**
    cancellation of the main task. We'll simply resume the Generator with a Cancel
  **/
  function cancelMain() {
    if (mainTask.isRunning && !mainTask.isCancelled) {
      mainTask.isCancelled = true;
      next(TASK_CANCEL);
    }
  }

  /**
    This may be called by a parent generator to trigger/propagate cancellation
    cancel all pending tasks (including the main task), then end the current task.
      Cancellation propagates down to the whole execution tree holded by this Parent task
    It's also propagated to all joiners of this task and their execution tree/joiners
      Cancellation is noop for terminated/Cancelled tasks tasks
  **/
  function cancel() {
    /**
      We need to check both Running and Cancelled status
      Tasks can be Cancelled but still Running
    **/
    if (iterator._isRunning && !iterator._isCancelled) {
      iterator._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/
      end(TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/
  cont && (cont.cancel = cancel);

  // tracks the running status
  iterator._isRunning = true;

  // kicks up the generator
  next();

  // then return the task descriptor to the caller
  return task;

  /**
    This is the generator driver
    It's a recursive async/continuation function which calls itself
    until the generator terminates or throws
  **/
  function next(arg, isErr) {
    // Preventive measure. If we end up here, then there is really something wrong
    if (!mainTask.isRunning) {
      throw new Error('Trying to resume an already finished generator');
    }

    try {
      var result = void 0;
      if (isErr) {
        result = iterator.throw(arg);
      } else if (arg === TASK_CANCEL) {
        /**
          getting TASK_CANCEL autoamtically cancels the main task
          We can get this value here
            - By cancelling the parent task manually
          - By joining a Cancelled task
        **/
        mainTask.isCancelled = true;
        /**
          Cancels the current effect; this will propagate the cancellation down to any called tasks
        **/
        next.cancel();
        /**
          If this Generator has a `return` method then invokes it
          Thill will jump to the finally block
        **/
        result = _utils.is.func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
      } else if (arg === CHANNEL_END) {
        // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = _utils.is.func(iterator.return) ? iterator.return() : { done: true };
      } else {
        result = iterator.next(arg);
      }

      if (!result.done) {
        runEffect(result.value, parentEffectId, '', next);
      } else {
        /**
          This Generator has ended, terminate the main task and notify the fork queue
        **/
        mainTask.isMainRunning = false;
        mainTask.cont && mainTask.cont(result.value);
      }
    } catch (error) {
      if (mainTask.isCancelled) {
        log('error', 'uncaught at ' + name, error.message);
      }
      mainTask.isMainRunning = false;
      mainTask.cont(error, true);
    }
  }

  function end(result, isErr) {
    iterator._isRunning = false;
    stdChannel.close();
    if (!isErr) {
      if (result === TASK_CANCEL && isDev) {
        log('info', name + ' has been cancelled', '');
      }
      iterator._result = result;
      iterator._deferredEnd && iterator._deferredEnd.resolve(result);
    } else {
      if (result instanceof Error) {
        result.sagaStack = 'at ' + name + ' \n ' + (result.sagaStack || result.stack);
      }
      if (!task.cont) {
        log('error', 'uncaught', result.sagaStack || result.stack);
        if (result instanceof Error && onError) {
          onError(result);
        }
      }
      iterator._error = result;
      iterator._isAborted = true;
      iterator._deferredEnd && iterator._deferredEnd.reject(result);
    }
    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
  }

  function runEffect(effect, parentEffectId) {
    var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var cb = arguments[3];

    var effectId = (0, _utils.uid)();
    sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });

    /**
      completion callback and cancel callback are mutually exclusive
      We can't cancel an already completed effect
      And We can't complete an already cancelled effectId
    **/
    var effectSettled = void 0;

    // Completion callback passed to the appropriate effect runner
    function currCb(res, isErr) {
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      cb.cancel = _utils.noop; // defensive measure
      if (sagaMonitor) {
        isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
      }

      cb(res, isErr);
    }
    // tracks down the current cancel
    currCb.cancel = _utils.noop;

    // setup cancellation logic on the parent cb
    cb.cancel = function () {
      // prevents cancelling an already completed effect
      if (effectSettled) {
        return;
      }

      effectSettled = true;
      /**
        propagates cancel downward
        catch uncaught cancellations errors; since we can no longer call the completion
        callback, log errors raised during cancellations into the console
      **/
      try {
        currCb.cancel();
      } catch (err) {
        log('error', 'uncaught at ' + name, err.message);
      }
      currCb.cancel = _utils.noop; // defensive measure

      sagaMonitor && sagaMonitor.effectCancelled(effectId);
    };

    /**
      each effect runner must attach its own logic of cancellation to the provided callback
      it allows this generator to propagate cancellation downward.
        ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
      And the setup must occur before calling the callback
        This is a sort of inversion of control: called async functions are responsible
      of completing the flow by calling the provided continuation; while caller functions
      are responsible for aborting the current flow by calling the attached cancel function
        Library users can attach their own cancellation logic to promises by defining a
      promise[CANCEL] method in their returned promises
      ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
    **/
    var data = void 0;
    return (
      // Non declarative effect
      _utils.is.promise(effect) ? resolvePromise(effect, currCb) : _utils.is.helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : _utils.is.iterator(effect) ? resolveIterator(effect, effectId, name, currCb)

      // declarative effects
      : _utils.is.array(effect) ? runParallelEffect(effect, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.take(effect)) ? runTakeEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.put(effect)) ? runPutEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.race(effect)) ? runRaceEffect(data, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.call(effect)) ? runCallEffect(data, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.cps(effect)) ? runCPSEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.fork(effect)) ? runForkEffect(data, effectId, currCb) : _utils.is.notUndef(data = _io.asEffect.join(effect)) ? runJoinEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.cancel(effect)) ? runCancelEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.select(effect)) ? runSelectEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.flush(effect)) ? runFlushEffect(data, currCb) : _utils.is.notUndef(data = _io.asEffect.cancelled(effect)) ? runCancelledEffect(data, currCb) : /* anything else returned as is        */currCb(effect)
    );
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[_utils.CANCEL];
    if (typeof cancelPromise === 'function') {
      cb.cancel = cancelPromise;
    }
    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, name, cb) {
    proc(iterator, subscribe, dispatch, getState, options, effectId, name, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var channel = _ref2.channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;

    channel = channel || stdChannel;
    var takeCb = function takeCb(inp) {
      return inp instanceof Error ? cb(inp, true) : (0, _channel.isEnd)(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
    };
    try {
      channel.take(takeCb, matcher(pattern));
    } catch (err) {
      return cb(err, true);
    }
    cb.cancel = takeCb.cancel;
  }

  function runPutEffect(_ref3, cb) {
    var channel = _ref3.channel,
        action = _ref3.action,
        sync = _ref3.sync;

    /**
      Schedule the put in case another saga is holding a lock.
      The put will be executed atomically. ie nested puts will execute after
      this put has terminated.
    **/
    (0, _scheduler.asap)(function () {
      var result = void 0;
      try {
        result = (channel ? channel.put : dispatch)(action);
      } catch (error) {
        // If we have a channel or `put.sync` was used then bubble up the error.
        if (channel || sync) return cb(error, true);
        log('error', 'uncaught at ' + name, error.stack || error.message || error);
      }

      if (sync && _utils.is.promise(result)) {
        resolvePromise(result, cb);
      } else {
        return cb(result);
      }
    });
    // Put effects are non cancellables
  }

  function runCallEffect(_ref4, effectId, cb) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;

    var result = void 0;
    // catch synchronous failures; see #152
    try {
      result = fn.apply(context, args);
    } catch (error) {
      return cb(error, true);
    }
    return _utils.is.promise(result) ? resolvePromise(result, cb) : _utils.is.iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
  }

  function runCPSEffect(_ref5, cb) {
    var context = _ref5.context,
        fn = _ref5.fn,
        args = _ref5.args;

    // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb

    // catch synchronous failures; see #152
    try {
      (function () {
        var cpsCb = function cpsCb(err, res) {
          return _utils.is.undef(err) ? cb(res) : cb(err, true);
        };
        fn.apply(context, args.concat(cpsCb));
        if (cpsCb.cancel) {
          cb.cancel = function () {
            return cpsCb.cancel();
          };
        }
      })();
    } catch (error) {
      return cb(error, true);
    }
  }

  function runForkEffect(_ref6, effectId, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args,
        detached = _ref6.detached;

    var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });

    try {
      (0, _scheduler.suspend)();
      var _task = proc(taskIterator, subscribe, dispatch, getState, options, effectId, fn.name, detached ? null : _utils.noop);

      if (detached) {
        cb(_task);
      } else {
        if (taskIterator._isRunning) {
          taskQueue.addTask(_task);
          cb(_task);
        } else if (taskIterator._error) {
          taskQueue.abort(taskIterator._error);
        } else {
          cb(_task);
        }
      }
    } finally {
      (0, _scheduler.flush)();
    }
    // Fork effects are non cancellables
  }

  function runJoinEffect(t, cb) {
    if (t.isRunning()) {
      (function () {
        var joiner = { task: task, cb: cb };
        cb.cancel = function () {
          return (0, _utils.remove)(t.joiners, joiner);
        };
        t.joiners.push(joiner);
      })();
    } else {
      t.isAborted() ? cb(t.error(), true) : cb(t.result());
    }
  }

  function runCancelEffect(task, cb) {
    if (task.isRunning()) {
      task.cancel();
    }
    cb();
    // cancel effects are non cancellables
  }

  function runParallelEffect(effects, effectId, cb) {
    if (!effects.length) {
      return cb([]);
    }

    var completedCount = 0;
    var completed = void 0;
    var results = Array(effects.length);

    function checkEffectEnd() {
      if (completedCount === results.length) {
        completed = true;
        cb(results);
      }
    }

    var childCbs = effects.map(function (eff, idx) {
      var chCbAtIdx = function chCbAtIdx(res, isErr) {
        if (completed) {
          return;
        }
        if (isErr || (0, _channel.isEnd)(res) || res === CHANNEL_END || res === TASK_CANCEL) {
          cb.cancel();
          cb(res, isErr);
        } else {
          results[idx] = res;
          completedCount++;
          checkEffectEnd();
        }
      };
      chCbAtIdx.cancel = _utils.noop;
      return chCbAtIdx;
    });

    cb.cancel = function () {
      if (!completed) {
        completed = true;
        childCbs.forEach(function (chCb) {
          return chCb.cancel();
        });
      }
    };

    effects.forEach(function (eff, idx) {
      return runEffect(eff, effectId, idx, childCbs[idx]);
    });
  }

  function runRaceEffect(effects, effectId, cb) {
    var completed = void 0;
    var keys = (0, _keys2.default)(effects);
    var childCbs = {};

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, true);
        } else if (!(0, _channel.isEnd)(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
          cb.cancel();
          completed = true;
          cb(_defineProperty({}, key, res));
        }
      };
      chCbAtKey.cancel = _utils.noop;
      childCbs[key] = chCbAtKey;
    });

    cb.cancel = function () {
      // prevents unnecessary cancellation
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCbs[key].cancel();
        });
      }
    };
    keys.forEach(function (key) {
      if (completed) {
        return;
      }
      runEffect(effects[key], effectId, key, childCbs[key]);
    });
  }

  function runSelectEffect(_ref7, cb) {
    var selector = _ref7.selector,
        args = _ref7.args;

    try {
      var state = selector.apply(undefined, [getState()].concat(_toConsumableArray(args)));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(_ref8, cb) {
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;

    var match = matcher(pattern);
    match.pattern = pattern;
    cb((0, _channel.eventChannel)(subscribe, buffer || _buffers.buffers.fixed(), match));
  }

  function runCancelledEffect(data, cb) {
    cb(!!mainTask.isCancelled);
  }

  function runFlushEffect(channel, cb) {
    channel.flush(cb);
  }

  function newTask(id, name, iterator, cont) {
    var _done, _ref9, _mutatorMap;

    iterator._deferredEnd = null;
    return _ref9 = {}, _defineProperty(_ref9, _utils.TASK, true), _defineProperty(_ref9, 'id', id), _defineProperty(_ref9, 'name', name), _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
      if (iterator._deferredEnd) {
        return iterator._deferredEnd.promise;
      } else {
        var def = (0, _utils.deferred)();
        iterator._deferredEnd = def;
        if (!iterator._isRunning) {
          iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
        }
        return def.promise;
      }
    }, _defineProperty(_ref9, 'cont', cont), _defineProperty(_ref9, 'joiners', []), _defineProperty(_ref9, 'cancel', cancel), _defineProperty(_ref9, 'isRunning', function isRunning() {
      return iterator._isRunning;
    }), _defineProperty(_ref9, 'isCancelled', function isCancelled() {
      return iterator._isCancelled;
    }), _defineProperty(_ref9, 'isAborted', function isAborted() {
      return iterator._isAborted;
    }), _defineProperty(_ref9, 'result', function result() {
      return iterator._result;
    }), _defineProperty(_ref9, 'error', function error() {
      return iterator._error;
    }), _defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2MuanMiXSwibmFtZXMiOlsicHJvYyIsIl9kZWZpbmVFbnVtZXJhYmxlUHJvcGVydGllcyIsIm9iaiIsImRlc2NzIiwia2V5IiwiZGVzYyIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJhcnIyIiwibGVuZ3RoIiwiX2RlZmluZVByb3BlcnR5IiwidmFsdWUiLCJpc0RldiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIk5PVF9JVEVSQVRPUl9FUlJPUiIsIkNIQU5ORUxfRU5EIiwidG9TdHJpbmciLCJUQVNLX0NBTkNFTCIsIm1hdGNoZXJzIiwid2lsZGNhcmQiLCJkZWZhdWx0IiwiX2RlZmF1bHQiLCJwYXR0ZXJuIiwiaW5wdXQiLCJ0eXBlIiwiYXJyYXkiLCJwYXR0ZXJucyIsInNvbWUiLCJwIiwicHJlZGljYXRlIiwiX3ByZWRpY2F0ZSIsIm1hdGNoZXIiLCJmdW5jIiwiZm9ya1F1ZXVlIiwibmFtZSIsIm1haW5UYXNrIiwiY2IiLCJ0YXNrcyIsInJlc3VsdCIsImNvbXBsZXRlZCIsImFkZFRhc2siLCJhYm9ydCIsImVyciIsImNhbmNlbEFsbCIsInRhc2siLCJwdXNoIiwiY29udCIsInJlcyIsImlzRXJyIiwiZm9yRWFjaCIsInQiLCJjYW5jZWwiLCJnZXRUYXNrcyIsInRhc2tOYW1lcyIsIm1hcCIsImNyZWF0ZVRhc2tJdGVyYXRvciIsIl9yZWYiLCJjb250ZXh0IiwiZm4iLCJhcmdzIiwiaXRlcmF0b3IiLCJlcnJvciIsImFwcGx5IiwicGMiLCJlZmYiLCJkb25lIiwicmV0IiwiYXJnIiwid3JhcEhlbHBlciIsImhlbHBlciIsInN1YnNjcmliZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJvcHRpb25zIiwicGFyZW50RWZmZWN0SWQiLCJzYWdhTW9uaXRvciIsImxvZ2dlciIsIm9uRXJyb3IiLCJsb2ciLCJzdGRDaGFubmVsIiwibmV4dCIsIm5ld1Rhc2siLCJjYW5jZWxNYWluIiwiaXNSdW5uaW5nIiwidGFza1F1ZXVlIiwiZW5kIiwiaXNDYW5jZWxsZWQiLCJfaXNSdW5uaW5nIiwiX2lzQ2FuY2VsbGVkIiwiRXJyb3IiLCJ0aHJvdyIsInJldHVybiIsInJ1bkVmZmVjdCIsImlzTWFpblJ1bm5pbmciLCJtZXNzYWdlIiwiY2xvc2UiLCJfcmVzdWx0IiwiX2RlZmVycmVkRW5kIiwicmVzb2x2ZSIsInNhZ2FTdGFjayIsInN0YWNrIiwiX2Vycm9yIiwiX2lzQWJvcnRlZCIsInJlamVjdCIsImpvaW5lcnMiLCJqIiwiZWZmZWN0IiwibGFiZWwiLCJlZmZlY3RJZCIsImVmZmVjdFRyaWdnZXJlZCIsImVmZmVjdFNldHRsZWQiLCJjdXJyQ2IiLCJlZmZlY3RSZWplY3RlZCIsImVmZmVjdFJlc29sdmVkIiwiZWZmZWN0Q2FuY2VsbGVkIiwiZGF0YSIsInByb21pc2UiLCJyZXNvbHZlUHJvbWlzZSIsInJ1bkZvcmtFZmZlY3QiLCJyZXNvbHZlSXRlcmF0b3IiLCJydW5QYXJhbGxlbEVmZmVjdCIsIm5vdFVuZGVmIiwidGFrZSIsInJ1blRha2VFZmZlY3QiLCJwdXQiLCJydW5QdXRFZmZlY3QiLCJyYWNlIiwicnVuUmFjZUVmZmVjdCIsImNhbGwiLCJydW5DYWxsRWZmZWN0IiwiY3BzIiwicnVuQ1BTRWZmZWN0IiwiZm9yayIsImpvaW4iLCJydW5Kb2luRWZmZWN0IiwicnVuQ2FuY2VsRWZmZWN0Iiwic2VsZWN0IiwicnVuU2VsZWN0RWZmZWN0IiwiYWN0aW9uQ2hhbm5lbCIsInJ1bkNoYW5uZWxFZmZlY3QiLCJmbHVzaCIsInJ1bkZsdXNoRWZmZWN0IiwiY2FuY2VsbGVkIiwicnVuQ2FuY2VsbGVkRWZmZWN0IiwiY2FuY2VsUHJvbWlzZSIsInRoZW4iLCJfcmVmMiIsImNoYW5uZWwiLCJtYXliZSIsInRha2VDYiIsImlucCIsIl9yZWYzIiwiYWN0aW9uIiwic3luYyIsIl9yZWY0IiwiX3JlZjUiLCJjcHNDYiIsInVuZGVmIiwiY29uY2F0IiwiX3JlZjYiLCJkZXRhY2hlZCIsInRhc2tJdGVyYXRvciIsIl90YXNrIiwiam9pbmVyIiwiaXNBYm9ydGVkIiwiZWZmZWN0cyIsImNvbXBsZXRlZENvdW50IiwicmVzdWx0cyIsImNoZWNrRWZmZWN0RW5kIiwiY2hpbGRDYnMiLCJpZHgiLCJjaENiQXRJZHgiLCJjaENiIiwia2V5cyIsImNoQ2JBdEtleSIsIl9yZWY3Iiwic2VsZWN0b3IiLCJzdGF0ZSIsIl9yZWY4IiwiYnVmZmVyIiwibWF0Y2giLCJmaXhlZCIsImlkIiwiX2RvbmUiLCJfcmVmOSIsIl9tdXRhdG9yTWFwIiwiZ2V0IiwiZGVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQXFMd0JBLEk7O0FBL0t4Qjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQVZBLFNBQVNDLDJCQUFULENBQXFDQyxHQUFyQyxFQUEwQ0MsS0FBMUMsRUFBaUQ7QUFBRSxPQUFLLElBQUlDLEdBQVQsSUFBZ0JELEtBQWhCLEVBQXVCO0FBQUUsUUFBSUUsT0FBT0YsTUFBTUMsR0FBTixDQUFYLENBQXVCQyxLQUFLQyxZQUFMLEdBQW9CRCxLQUFLRSxVQUFMLEdBQWtCLElBQXRDLENBQTRDLElBQUksV0FBV0YsSUFBZixFQUFxQkEsS0FBS0csUUFBTCxHQUFnQixJQUFoQixDQUFzQiw4QkFBc0JOLEdBQXRCLEVBQTJCRSxHQUEzQixFQUFnQ0MsSUFBaEM7QUFBd0MsR0FBQyxPQUFPSCxHQUFQO0FBQWE7O0FBRWhQLFNBQVNPLGtCQUFULENBQTRCQyxHQUE1QixFQUFpQztBQUFFLE1BQUlDLE1BQU1DLE9BQU4sQ0FBY0YsR0FBZCxDQUFKLEVBQXdCO0FBQUUsU0FBSyxJQUFJRyxJQUFJLENBQVIsRUFBV0MsT0FBT0gsTUFBTUQsSUFBSUssTUFBVixDQUF2QixFQUEwQ0YsSUFBSUgsSUFBSUssTUFBbEQsRUFBMERGLEdBQTFELEVBQStEO0FBQUVDLFdBQUtELENBQUwsSUFBVUgsSUFBSUcsQ0FB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QUFPc0IsU0FBU3NDLE9BQWhCO0FBQ0QsS0FGRyxDQWpCRyxFQW1CSDFGLGdCQUFnQmtMLEtBQWhCLEVBQXVCLE9BQXZCLEVBQWdDLFNBQVM3SCxLQUFULEdBQWlCO0FBQ25ELGFBQU9ELFNBQVMyQyxNQUFoQjtBQUNELEtBRkcsQ0FuQkcsRUFxQkg5Ryw0QkFBNEJpTSxLQUE1QixFQUFtQ0MsV0FBbkMsQ0FyQkcsRUFxQjhDRCxLQXJCckQ7QUFzQkQ7QUFDRiIsImZpbGUiOiJ1bmtub3duIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2RlZmluZUVudW1lcmFibGVQcm9wZXJ0aWVzKG9iaiwgZGVzY3MpIHsgZm9yICh2YXIga2V5IGluIGRlc2NzKSB7IHZhciBkZXNjID0gZGVzY3Nba2V5XTsgZGVzYy5jb25maWd1cmFibGUgPSBkZXNjLmVudW1lcmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIGRlc2Mud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIGRlc2MpOyB9IHJldHVybiBvYmo7IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbmltcG9ydCB7IG5vb3AsIGtUcnVlLCBpcywgbG9nIGFzIF9sb2csIGNoZWNrLCBkZWZlcnJlZCwgdWlkIGFzIG5leHRFZmZlY3RJZCwgcmVtb3ZlLCBUQVNLLCBDQU5DRUwsIG1ha2VJdGVyYXRvciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgYXNhcCwgc3VzcGVuZCwgZmx1c2ggfSBmcm9tICcuL3NjaGVkdWxlcic7XG5pbXBvcnQgeyBhc0VmZmVjdCB9IGZyb20gJy4vaW8nO1xuaW1wb3J0IHsgc3RkQ2hhbm5lbCBhcyBfc3RkQ2hhbm5lbCwgZXZlbnRDaGFubmVsLCBpc0VuZCB9IGZyb20gJy4vY2hhbm5lbCc7XG5pbXBvcnQgeyBidWZmZXJzIH0gZnJvbSAnLi9idWZmZXJzJztcblxudmFyIGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmV4cG9ydCB2YXIgTk9UX0lURVJBVE9SX0VSUk9SID0gJ3Byb2MgZmlyc3QgYXJndW1lbnQgKFNhZ2EgZnVuY3Rpb24gcmVzdWx0KSBtdXN0IGJlIGFuIGl0ZXJhdG9yJztcblxuZXhwb3J0IHZhciBDSEFOTkVMX0VORCA9IHtcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnQEByZWR1eC1zYWdhL0NIQU5ORUxfRU5EJztcbiAgfVxufTtcbmV4cG9ydCB2YXIgVEFTS19DQU5DRUwgPSB7XG4gIHRvU3RyaW5nOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ0BAcmVkdXgtc2FnYS9UQVNLX0NBTkNFTCc7XG4gIH1cbn07XG5cbnZhciBtYXRjaGVycyA9IHtcbiAgd2lsZGNhcmQ6IGZ1bmN0aW9uIHdpbGRjYXJkKCkge1xuICAgIHJldHVybiBrVHJ1ZTtcbiAgfSxcbiAgZGVmYXVsdDogZnVuY3Rpb24gX2RlZmF1bHQocGF0dGVybikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBpbnB1dC50eXBlID09PSBwYXR0ZXJuO1xuICAgIH07XG4gIH0sXG4gIGFycmF5OiBmdW5jdGlvbiBhcnJheShwYXR0ZXJucykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBwYXR0ZXJucy5zb21lKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiBwID09PSBpbnB1dC50eXBlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSxcbiAgcHJlZGljYXRlOiBmdW5jdGlvbiBwcmVkaWNhdGUoX3ByZWRpY2F0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIHJldHVybiBfcHJlZGljYXRlKGlucHV0KTtcbiAgICB9O1xuICB9XG59O1xuXG5mdW5jdGlvbiBtYXRjaGVyKHBhdHRlcm4pIHtcbiAgcmV0dXJuIChwYXR0ZXJuID09PSAnKicgPyBtYXRjaGVycy53aWxkY2FyZCA6IGlzLmFycmF5KHBhdHRlcm4pID8gbWF0Y2hlcnMuYXJyYXkgOiBpcy5mdW5jKHBhdHRlcm4pID8gbWF0Y2hlcnMucHJlZGljYXRlIDogbWF0Y2hlcnMuZGVmYXVsdCkocGF0dGVybik7XG59XG5cbi8qKlxyXG4gIFVzZWQgdG8gdHJhY2sgYSBwYXJlbnQgdGFzayBhbmQgaXRzIGZvcmtzXHJcbiAgSW4gdGhlIG5ldyBmb3JrIG1vZGVsLCBmb3JrZWQgdGFza3MgYXJlIGF0dGFjaGVkIGJ5IGRlZmF1bHQgdG8gdGhlaXIgcGFyZW50XHJcbiAgV2UgbW9kZWwgdGhpcyB1c2luZyB0aGUgY29uY2VwdCBvZiBQYXJlbnQgdGFzayAmJiBtYWluIFRhc2tcclxuICBtYWluIHRhc2sgaXMgdGhlIG1haW4gZmxvdyBvZiB0aGUgY3VycmVudCBHZW5lcmF0b3IsIHRoZSBwYXJlbnQgdGFza3MgaXMgdGhlXHJcbiAgYWdncmVnYXRpb24gb2YgdGhlIG1haW4gdGFza3MgKyBhbGwgaXRzIGZvcmtlZCB0YXNrcy5cclxuICBUaHVzIHRoZSB3aG9sZSBtb2RlbCByZXByZXNlbnRzIGFuIGV4ZWN1dGlvbiB0cmVlIHdpdGggbXVsdGlwbGUgYnJhbmNoZXMgKHZzIHRoZVxyXG4gIGxpbmVhciBleGVjdXRpb24gdHJlZSBpbiBzZXF1ZW50aWFsIChub24gcGFyYWxsZWwpIHByb2dyYW1taW5nKVxyXG5cclxuICBBIHBhcmVudCB0YXNrcyBoYXMgdGhlIGZvbGxvd2luZyBzZW1hbnRpY3NcclxuICAtIEl0IGNvbXBsZXRlcyBpZmYgYWxsIGl0cyBmb3JrcyBlaXRoZXIgY29tcGxldGUgb3IgYWxsIGNhbmNlbGxlZFxyXG4gIC0gSWYgaXQncyBjYW5jZWxsZWQsIGFsbCBmb3JrcyBhcmUgY2FuY2VsbGVkIGFzIHdlbGxcclxuICAtIEl0IGFib3J0cyBpZiBhbnkgdW5jYXVnaHQgZXJyb3IgYnViYmxlcyB1cCBmcm9tIGZvcmtzXHJcbiAgLSBJZiBpdCBjb21wbGV0ZXMsIHRoZSByZXR1cm4gdmFsdWUgaXMgdGhlIG9uZSByZXR1cm5lZCBieSB0aGUgbWFpbiB0YXNrXHJcbioqL1xuZnVuY3Rpb24gZm9ya1F1ZXVlKG5hbWUsIG1haW5UYXNrLCBjYikge1xuICB2YXIgdGFza3MgPSBbXSxcbiAgICAgIHJlc3VsdCA9IHZvaWQgMCxcbiAgICAgIGNvbXBsZXRlZCA9IGZhbHNlO1xuICBhZGRUYXNrKG1haW5UYXNrKTtcblxuICBmdW5jdGlvbiBhYm9ydChlcnIpIHtcbiAgICBjYW5jZWxBbGwoKTtcbiAgICBjYihlcnIsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzayh0YXNrKSB7XG4gICAgdGFza3MucHVzaCh0YXNrKTtcbiAgICB0YXNrLmNvbnQgPSBmdW5jdGlvbiAocmVzLCBpc0Vycikge1xuICAgICAgaWYgKGNvbXBsZXRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlbW92ZSh0YXNrcywgdGFzayk7XG4gICAgICB0YXNrLmNvbnQgPSBub29wO1xuICAgICAgaWYgKGlzRXJyKSB7XG4gICAgICAgIGFib3J0KHJlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGFzayA9PT0gbWFpblRhc2spIHtcbiAgICAgICAgICByZXN1bHQgPSByZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIHRhc2suY29udC5jYW5jZWwgPSB0YXNrLmNhbmNlbFxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsQWxsKCkge1xuICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICB0LmNvbnQgPSBub29wO1xuICAgICAgdC5jYW5jZWwoKTtcbiAgICB9KTtcbiAgICB0YXNrcyA9IFtdO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUYXNrOiBhZGRUYXNrLFxuICAgIGNhbmNlbEFsbDogY2FuY2VsQWxsLFxuICAgIGFib3J0OiBhYm9ydCxcbiAgICBnZXRUYXNrczogZnVuY3Rpb24gZ2V0VGFza3MoKSB7XG4gICAgICByZXR1cm4gdGFza3M7XG4gICAgfSxcbiAgICB0YXNrTmFtZXM6IGZ1bmN0aW9uIHRhc2tOYW1lcygpIHtcbiAgICAgIHJldHVybiB0YXNrcy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubmFtZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFza0l0ZXJhdG9yKF9yZWYpIHtcbiAgdmFyIGNvbnRleHQgPSBfcmVmLmNvbnRleHQsXG4gICAgICBmbiA9IF9yZWYuZm4sXG4gICAgICBhcmdzID0gX3JlZi5hcmdzO1xuXG4gIGlmIChpcy5pdGVyYXRvcihmbikpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvLyBjYXRjaCBzeW5jaHJvbm91cyBmYWlsdXJlczsgc2VlICMxNTIgYW5kICM0NDFcbiAgdmFyIHJlc3VsdCA9IHZvaWQgMCxcbiAgICAgIGVycm9yID0gdm9pZCAwO1xuICB0cnkge1xuICAgIHJlc3VsdCA9IGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnJvciA9IGVycjtcbiAgfVxuXG4gIC8vIGkuZS4gYSBnZW5lcmF0b3IgZnVuY3Rpb24gcmV0dXJucyBhbiBpdGVyYXRvclxuICBpZiAoaXMuaXRlcmF0b3IocmVzdWx0KSkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBkbyBub3QgYnViYmxlIHVwIHN5bmNocm9ub3VzIGZhaWx1cmVzIGZvciBkZXRhY2hlZCBmb3Jrc1xuICAvLyBpbnN0ZWFkIGNyZWF0ZSBhIGZhaWxlZCB0YXNrLiBTZWUgIzE1MiBhbmQgIzQ0MVxuICByZXR1cm4gZXJyb3IgPyBtYWtlSXRlcmF0b3IoZnVuY3Rpb24gKCkge1xuICAgIHRocm93IGVycm9yO1xuICB9KSA6IG1ha2VJdGVyYXRvcihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBjID0gdm9pZCAwO1xuICAgIHZhciBlZmYgPSB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogcmVzdWx0IH07XG4gICAgdmFyIHJldCA9IGZ1bmN0aW9uIHJldCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH07XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgaWYgKCFwYykge1xuICAgICAgICBwYyA9IHRydWU7XG4gICAgICAgIHJldHVybiBlZmY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0KGFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSgpKTtcbn1cblxuZnVuY3Rpb24gd3JhcEhlbHBlcihoZWxwZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBmbjogaGVscGVyXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb2MoaXRlcmF0b3IpIHtcbiAgdmFyIHN1YnNjcmliZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBub29wO1xuICB9O1xuICB2YXIgZGlzcGF0Y2ggPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IG5vb3A7XG4gIHZhciBnZXRTdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogbm9vcDtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IHt9O1xuICB2YXIgcGFyZW50RWZmZWN0SWQgPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IDA7XG4gIHZhciBuYW1lID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgYXJndW1lbnRzWzZdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNl0gOiAnYW5vbnltb3VzJztcbiAgdmFyIGNvbnQgPSBhcmd1bWVudHNbN107XG5cbiAgY2hlY2soaXRlcmF0b3IsIGlzLml0ZXJhdG9yLCBOT1RfSVRFUkFUT1JfRVJST1IpO1xuXG4gIHZhciBzYWdhTW9uaXRvciA9IG9wdGlvbnMuc2FnYU1vbml0b3IsXG4gICAgICBsb2dnZXIgPSBvcHRpb25zLmxvZ2dlcixcbiAgICAgIG9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3I7XG5cbiAgdmFyIGxvZyA9IGxvZ2dlciB8fCBfbG9nO1xuICB2YXIgc3RkQ2hhbm5lbCA9IF9zdGRDaGFubmVsKHN1YnNjcmliZSk7XG4gIC8qKlxyXG4gICAgVHJhY2tzIHRoZSBjdXJyZW50IGVmZmVjdCBjYW5jZWxsYXRpb25cclxuICAgIEVhY2ggdGltZSB0aGUgZ2VuZXJhdG9yIHByb2dyZXNzZXMuIGNhbGxpbmcgcnVuRWZmZWN0IHdpbGwgc2V0IGEgbmV3IHZhbHVlXHJcbiAgICBvbiBpdC4gSXQgYWxsb3dzIHByb3BhZ2F0aW5nIGNhbmNlbGxhdGlvbiB0byBjaGlsZCBlZmZlY3RzXHJcbiAgKiovXG4gIG5leHQuY2FuY2VsID0gbm9vcDtcblxuICAvKipcclxuICAgIENyZWF0ZXMgYSBuZXcgdGFzayBkZXNjcmlwdG9yIGZvciB0aGlzIGdlbmVyYXRvciwgV2UnbGwgYWxzbyBjcmVhdGUgYSBtYWluIHRhc2tcclxuICAgIHRvIHRyYWNrIHRoZSBtYWluIGZsb3cgKGJlc2lkZXMgb3RoZXIgZm9ya2VkIHRhc2tzKVxyXG4gICoqL1xuICB2YXIgdGFzayA9IG5ld1Rhc2socGFyZW50RWZmZWN0SWQsIG5hbWUsIGl0ZXJhdG9yLCBjb250KTtcbiAgdmFyIG1haW5UYXNrID0geyBuYW1lOiBuYW1lLCBjYW5jZWw6IGNhbmNlbE1haW4sIGlzUnVubmluZzogdHJ1ZSB9O1xuICB2YXIgdGFza1F1ZXVlID0gZm9ya1F1ZXVlKG5hbWUsIG1haW5UYXNrLCBlbmQpO1xuXG4gIC8qKlxyXG4gICAgY2FuY2VsbGF0aW9uIG9mIHRoZSBtYWluIHRhc2suIFdlJ2xsIHNpbXBseSByZXN1bWUgdGhlIEdlbmVyYXRvciB3aXRoIGEgQ2FuY2VsXHJcbiAgKiovXG4gIGZ1bmN0aW9uIGNhbmNlbE1haW4oKSB7XG4gICAgaWYgKG1haW5UYXNrLmlzUnVubmluZyAmJiAhbWFpblRhc2suaXNDYW5jZWxsZWQpIHtcbiAgICAgIG1haW5UYXNrLmlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIG5leHQoVEFTS19DQU5DRUwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxyXG4gICAgVGhpcyBtYXkgYmUgY2FsbGVkIGJ5IGEgcGFyZW50IGdlbmVyYXRvciB0byB0cmlnZ2VyL3Byb3BhZ2F0ZSBjYW5jZWxsYXRpb25cclxuICAgIGNhbmNlbCBhbGwgcGVuZGluZyB0YXNrcyAoaW5jbHVkaW5nIHRoZSBtYWluIHRhc2spLCB0aGVuIGVuZCB0aGUgY3VycmVudCB0YXNrLlxyXG4gICAgICBDYW5jZWxsYXRpb24gcHJvcGFnYXRlcyBkb3duIHRvIHRoZSB3aG9sZSBleGVjdXRpb24gdHJlZSBob2xkZWQgYnkgdGhpcyBQYXJlbnQgdGFza1xyXG4gICAgSXQncyBhbHNvIHByb3BhZ2F0ZWQgdG8gYWxsIGpvaW5lcnMgb2YgdGhpcyB0YXNrIGFuZCB0aGVpciBleGVjdXRpb24gdHJlZS9qb2luZXJzXHJcbiAgICAgIENhbmNlbGxhdGlvbiBpcyBub29wIGZvciB0ZXJtaW5hdGVkL0NhbmNlbGxlZCB0YXNrcyB0YXNrc1xyXG4gICoqL1xuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgLyoqXHJcbiAgICAgIFdlIG5lZWQgdG8gY2hlY2sgYm90aCBSdW5uaW5nIGFuZCBDYW5jZWxsZWQgc3RhdHVzXHJcbiAgICAgIFRhc2tzIGNhbiBiZSBDYW5jZWxsZWQgYnV0IHN0aWxsIFJ1bm5pbmdcclxuICAgICoqL1xuICAgIGlmIChpdGVyYXRvci5faXNSdW5uaW5nICYmICFpdGVyYXRvci5faXNDYW5jZWxsZWQpIHtcbiAgICAgIGl0ZXJhdG9yLl9pc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICB0YXNrUXVldWUuY2FuY2VsQWxsKCk7XG4gICAgICAvKipcclxuICAgICAgICBFbmRpbmcgd2l0aCBhIE5ldmVyIHJlc3VsdCB3aWxsIHByb3BhZ2F0ZSB0aGUgQ2FuY2VsbGF0aW9uIHRvIGFsbCBqb2luZXJzXHJcbiAgICAgICoqL1xuICAgICAgZW5kKFRBU0tfQ0FOQ0VMKTtcbiAgICB9XG4gIH1cbiAgLyoqXHJcbiAgICBhdHRhY2hlcyBjYW5jZWxsYXRpb24gbG9naWMgdG8gdGhpcyB0YXNrJ3MgY29udGludWF0aW9uXHJcbiAgICB0aGlzIHdpbGwgcGVybWl0IGNhbmNlbGxhdGlvbiB0byBwcm9wYWdhdGUgZG93biB0aGUgY2FsbCBjaGFpblxyXG4gICoqL1xuICBjb250ICYmIChjb250LmNhbmNlbCA9IGNhbmNlbCk7XG5cbiAgLy8gdHJhY2tzIHRoZSBydW5uaW5nIHN0YXR1c1xuICBpdGVyYXRvci5faXNSdW5uaW5nID0gdHJ1ZTtcblxuICAvLyBraWNrcyB1cCB0aGUgZ2VuZXJhdG9yXG4gIG5leHQoKTtcblxuICAvLyB0aGVuIHJldHVybiB0aGUgdGFzayBkZXNjcmlwdG9yIHRvIHRoZSBjYWxsZXJcbiAgcmV0dXJuIHRhc2s7XG5cbiAgLyoqXHJcbiAgICBUaGlzIGlzIHRoZSBnZW5lcmF0b3IgZHJpdmVyXHJcbiAgICBJdCdzIGEgcmVjdXJzaXZlIGFzeW5jL2NvbnRpbnVhdGlvbiBmdW5jdGlvbiB3aGljaCBjYWxscyBpdHNlbGZcclxuICAgIHVudGlsIHRoZSBnZW5lcmF0b3IgdGVybWluYXRlcyBvciB0aHJvd3NcclxuICAqKi9cbiAgZnVuY3Rpb24gbmV4dChhcmcsIGlzRXJyKSB7XG4gICAgLy8gUHJldmVudGl2ZSBtZWFzdXJlLiBJZiB3ZSBlbmQgdXAgaGVyZSwgdGhlbiB0aGVyZSBpcyByZWFsbHkgc29tZXRoaW5nIHdyb25nXG4gICAgaWYgKCFtYWluVGFzay5pc1J1bm5pbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJ5aW5nIHRvIHJlc3VtZSBhbiBhbHJlYWR5IGZpbmlzaGVkIGdlbmVyYXRvcicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuICAgICAgaWYgKGlzRXJyKSB7XG4gICAgICAgIHJlc3VsdCA9IGl0ZXJhdG9yLnRocm93KGFyZyk7XG4gICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gVEFTS19DQU5DRUwpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICBnZXR0aW5nIFRBU0tfQ0FOQ0VMIGF1dG9hbXRpY2FsbHkgY2FuY2VscyB0aGUgbWFpbiB0YXNrXHJcbiAgICAgICAgICBXZSBjYW4gZ2V0IHRoaXMgdmFsdWUgaGVyZVxyXG4gICAgICAgICAgICAtIEJ5IGNhbmNlbGxpbmcgdGhlIHBhcmVudCB0YXNrIG1hbnVhbGx5XHJcbiAgICAgICAgICAtIEJ5IGpvaW5pbmcgYSBDYW5jZWxsZWQgdGFza1xyXG4gICAgICAgICoqL1xuICAgICAgICBtYWluVGFzay5pc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgQ2FuY2VscyB0aGUgY3VycmVudCBlZmZlY3Q7IHRoaXMgd2lsbCBwcm9wYWdhdGUgdGhlIGNhbmNlbGxhdGlvbiBkb3duIHRvIGFueSBjYWxsZWQgdGFza3NcclxuICAgICAgICAqKi9cbiAgICAgICAgbmV4dC5jYW5jZWwoKTtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICBJZiB0aGlzIEdlbmVyYXRvciBoYXMgYSBgcmV0dXJuYCBtZXRob2QgdGhlbiBpbnZva2VzIGl0XHJcbiAgICAgICAgICBUaGlsbCB3aWxsIGp1bXAgdG8gdGhlIGZpbmFsbHkgYmxvY2tcclxuICAgICAgICAqKi9cbiAgICAgICAgcmVzdWx0ID0gaXMuZnVuYyhpdGVyYXRvci5yZXR1cm4pID8gaXRlcmF0b3IucmV0dXJuKFRBU0tfQ0FOQ0VMKSA6IHsgZG9uZTogdHJ1ZSwgdmFsdWU6IFRBU0tfQ0FOQ0VMIH07XG4gICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gQ0hBTk5FTF9FTkQpIHtcbiAgICAgICAgLy8gV2UgZ2V0IENIQU5ORUxfRU5EIGJ5IHRha2luZyBmcm9tIGEgY2hhbm5lbCB0aGF0IGVuZGVkIHVzaW5nIGB0YWtlYCAoYW5kIG5vdCBgdGFrZW1gIHVzZWQgdG8gdHJhcCBFbmQgb2YgY2hhbm5lbHMpXG4gICAgICAgIHJlc3VsdCA9IGlzLmZ1bmMoaXRlcmF0b3IucmV0dXJuKSA/IGl0ZXJhdG9yLnJldHVybigpIDogeyBkb25lOiB0cnVlIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBpdGVyYXRvci5uZXh0KGFyZyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVzdWx0LmRvbmUpIHtcbiAgICAgICAgcnVuRWZmZWN0KHJlc3VsdC52YWx1ZSwgcGFyZW50RWZmZWN0SWQsICcnLCBuZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgVGhpcyBHZW5lcmF0b3IgaGFzIGVuZGVkLCB0ZXJtaW5hdGUgdGhlIG1haW4gdGFzayBhbmQgbm90aWZ5IHRoZSBmb3JrIHF1ZXVlXHJcbiAgICAgICAgKiovXG4gICAgICAgIG1haW5UYXNrLmlzTWFpblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgbWFpblRhc2suY29udCAmJiBtYWluVGFzay5jb250KHJlc3VsdC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChtYWluVGFzay5pc0NhbmNlbGxlZCkge1xuICAgICAgICBsb2coJ2Vycm9yJywgJ3VuY2F1Z2h0IGF0ICcgKyBuYW1lLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG1haW5UYXNrLmlzTWFpblJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgIG1haW5UYXNrLmNvbnQoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZChyZXN1bHQsIGlzRXJyKSB7XG4gICAgaXRlcmF0b3IuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgIHN0ZENoYW5uZWwuY2xvc2UoKTtcbiAgICBpZiAoIWlzRXJyKSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBUQVNLX0NBTkNFTCAmJiBpc0Rldikge1xuICAgICAgICBsb2coJ2luZm8nLCBuYW1lICsgJyBoYXMgYmVlbiBjYW5jZWxsZWQnLCAnJyk7XG4gICAgICB9XG4gICAgICBpdGVyYXRvci5fcmVzdWx0ID0gcmVzdWx0O1xuICAgICAgaXRlcmF0b3IuX2RlZmVycmVkRW5kICYmIGl0ZXJhdG9yLl9kZWZlcnJlZEVuZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXN1bHQuc2FnYVN0YWNrID0gJ2F0ICcgKyBuYW1lICsgJyBcXG4gJyArIChyZXN1bHQuc2FnYVN0YWNrIHx8IHJlc3VsdC5zdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIXRhc2suY29udCkge1xuICAgICAgICBsb2coJ2Vycm9yJywgJ3VuY2F1Z2h0JywgcmVzdWx0LnNhZ2FTdGFjayB8fCByZXN1bHQuc3RhY2spO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRXJyb3IgJiYgb25FcnJvcikge1xuICAgICAgICAgIG9uRXJyb3IocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaXRlcmF0b3IuX2Vycm9yID0gcmVzdWx0O1xuICAgICAgaXRlcmF0b3IuX2lzQWJvcnRlZCA9IHRydWU7XG4gICAgICBpdGVyYXRvci5fZGVmZXJyZWRFbmQgJiYgaXRlcmF0b3IuX2RlZmVycmVkRW5kLnJlamVjdChyZXN1bHQpO1xuICAgIH1cbiAgICB0YXNrLmNvbnQgJiYgdGFzay5jb250KHJlc3VsdCwgaXNFcnIpO1xuICAgIHRhc2suam9pbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChqKSB7XG4gICAgICByZXR1cm4gai5jYihyZXN1bHQsIGlzRXJyKTtcbiAgICB9KTtcbiAgICB0YXNrLmpvaW5lcnMgPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuRWZmZWN0KGVmZmVjdCwgcGFyZW50RWZmZWN0SWQpIHtcbiAgICB2YXIgbGFiZWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6ICcnO1xuICAgIHZhciBjYiA9IGFyZ3VtZW50c1szXTtcblxuICAgIHZhciBlZmZlY3RJZCA9IG5leHRFZmZlY3RJZCgpO1xuICAgIHNhZ2FNb25pdG9yICYmIHNhZ2FNb25pdG9yLmVmZmVjdFRyaWdnZXJlZCh7IGVmZmVjdElkOiBlZmZlY3RJZCwgcGFyZW50RWZmZWN0SWQ6IHBhcmVudEVmZmVjdElkLCBsYWJlbDogbGFiZWwsIGVmZmVjdDogZWZmZWN0IH0pO1xuXG4gICAgLyoqXHJcbiAgICAgIGNvbXBsZXRpb24gY2FsbGJhY2sgYW5kIGNhbmNlbCBjYWxsYmFjayBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlXHJcbiAgICAgIFdlIGNhbid0IGNhbmNlbCBhbiBhbHJlYWR5IGNvbXBsZXRlZCBlZmZlY3RcclxuICAgICAgQW5kIFdlIGNhbid0IGNvbXBsZXRlIGFuIGFscmVhZHkgY2FuY2VsbGVkIGVmZmVjdElkXHJcbiAgICAqKi9cbiAgICB2YXIgZWZmZWN0U2V0dGxlZCA9IHZvaWQgMDtcblxuICAgIC8vIENvbXBsZXRpb24gY2FsbGJhY2sgcGFzc2VkIHRvIHRoZSBhcHByb3ByaWF0ZSBlZmZlY3QgcnVubmVyXG4gICAgZnVuY3Rpb24gY3VyckNiKHJlcywgaXNFcnIpIHtcbiAgICAgIGlmIChlZmZlY3RTZXR0bGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZWZmZWN0U2V0dGxlZCA9IHRydWU7XG4gICAgICBjYi5jYW5jZWwgPSBub29wOyAvLyBkZWZlbnNpdmUgbWVhc3VyZVxuICAgICAgaWYgKHNhZ2FNb25pdG9yKSB7XG4gICAgICAgIGlzRXJyID8gc2FnYU1vbml0b3IuZWZmZWN0UmVqZWN0ZWQoZWZmZWN0SWQsIHJlcykgOiBzYWdhTW9uaXRvci5lZmZlY3RSZXNvbHZlZChlZmZlY3RJZCwgcmVzKTtcbiAgICAgIH1cblxuICAgICAgY2IocmVzLCBpc0Vycik7XG4gICAgfVxuICAgIC8vIHRyYWNrcyBkb3duIHRoZSBjdXJyZW50IGNhbmNlbFxuICAgIGN1cnJDYi5jYW5jZWwgPSBub29wO1xuXG4gICAgLy8gc2V0dXAgY2FuY2VsbGF0aW9uIGxvZ2ljIG9uIHRoZSBwYXJlbnQgY2JcbiAgICBjYi5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBwcmV2ZW50cyBjYW5jZWxsaW5nIGFuIGFscmVhZHkgY29tcGxldGVkIGVmZmVjdFxuICAgICAgaWYgKGVmZmVjdFNldHRsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlZmZlY3RTZXR0bGVkID0gdHJ1ZTtcbiAgICAgIC8qKlxyXG4gICAgICAgIHByb3BhZ2F0ZXMgY2FuY2VsIGRvd253YXJkXHJcbiAgICAgICAgY2F0Y2ggdW5jYXVnaHQgY2FuY2VsbGF0aW9ucyBlcnJvcnM7IHNpbmNlIHdlIGNhbiBubyBsb25nZXIgY2FsbCB0aGUgY29tcGxldGlvblxyXG4gICAgICAgIGNhbGxiYWNrLCBsb2cgZXJyb3JzIHJhaXNlZCBkdXJpbmcgY2FuY2VsbGF0aW9ucyBpbnRvIHRoZSBjb25zb2xlXHJcbiAgICAgICoqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VyckNiLmNhbmNlbCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZygnZXJyb3InLCAndW5jYXVnaHQgYXQgJyArIG5hbWUsIGVyci5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGN1cnJDYi5jYW5jZWwgPSBub29wOyAvLyBkZWZlbnNpdmUgbWVhc3VyZVxuXG4gICAgICBzYWdhTW9uaXRvciAmJiBzYWdhTW9uaXRvci5lZmZlY3RDYW5jZWxsZWQoZWZmZWN0SWQpO1xuICAgIH07XG5cbiAgICAvKipcclxuICAgICAgZWFjaCBlZmZlY3QgcnVubmVyIG11c3QgYXR0YWNoIGl0cyBvd24gbG9naWMgb2YgY2FuY2VsbGF0aW9uIHRvIHRoZSBwcm92aWRlZCBjYWxsYmFja1xyXG4gICAgICBpdCBhbGxvd3MgdGhpcyBnZW5lcmF0b3IgdG8gcHJvcGFnYXRlIGNhbmNlbGxhdGlvbiBkb3dud2FyZC5cclxuICAgICAgICBBVFRFTlRJT04hIGVmZmVjdCBydW5uZXJzIG11c3Qgc2V0dXAgdGhlIGNhbmNlbCBsb2dpYyBieSBzZXR0aW5nIGNiLmNhbmNlbCA9IFtjYW5jZWxNZXRob2RdXHJcbiAgICAgIEFuZCB0aGUgc2V0dXAgbXVzdCBvY2N1ciBiZWZvcmUgY2FsbGluZyB0aGUgY2FsbGJhY2tcclxuICAgICAgICBUaGlzIGlzIGEgc29ydCBvZiBpbnZlcnNpb24gb2YgY29udHJvbDogY2FsbGVkIGFzeW5jIGZ1bmN0aW9ucyBhcmUgcmVzcG9uc2libGVcclxuICAgICAgb2YgY29tcGxldGluZyB0aGUgZmxvdyBieSBjYWxsaW5nIHRoZSBwcm92aWRlZCBjb250aW51YXRpb247IHdoaWxlIGNhbGxlciBmdW5jdGlvbnNcclxuICAgICAgYXJlIHJlc3BvbnNpYmxlIGZvciBhYm9ydGluZyB0aGUgY3VycmVudCBmbG93IGJ5IGNhbGxpbmcgdGhlIGF0dGFjaGVkIGNhbmNlbCBmdW5jdGlvblxyXG4gICAgICAgIExpYnJhcnkgdXNlcnMgY2FuIGF0dGFjaCB0aGVpciBvd24gY2FuY2VsbGF0aW9uIGxvZ2ljIHRvIHByb21pc2VzIGJ5IGRlZmluaW5nIGFcclxuICAgICAgcHJvbWlzZVtDQU5DRUxdIG1ldGhvZCBpbiB0aGVpciByZXR1cm5lZCBwcm9taXNlc1xyXG4gICAgICBBVFRFTlRJT04hIGNhbGxpbmcgY2FuY2VsIG11c3QgaGF2ZSBubyBlZmZlY3Qgb24gYW4gYWxyZWFkeSBjb21wbGV0ZWQgb3IgY2FuY2VsbGVkIGVmZmVjdFxyXG4gICAgKiovXG4gICAgdmFyIGRhdGEgPSB2b2lkIDA7XG4gICAgcmV0dXJuIChcbiAgICAgIC8vIE5vbiBkZWNsYXJhdGl2ZSBlZmZlY3RcbiAgICAgIGlzLnByb21pc2UoZWZmZWN0KSA/IHJlc29sdmVQcm9taXNlKGVmZmVjdCwgY3VyckNiKSA6IGlzLmhlbHBlcihlZmZlY3QpID8gcnVuRm9ya0VmZmVjdCh3cmFwSGVscGVyKGVmZmVjdCksIGVmZmVjdElkLCBjdXJyQ2IpIDogaXMuaXRlcmF0b3IoZWZmZWN0KSA/IHJlc29sdmVJdGVyYXRvcihlZmZlY3QsIGVmZmVjdElkLCBuYW1lLCBjdXJyQ2IpXG5cbiAgICAgIC8vIGRlY2xhcmF0aXZlIGVmZmVjdHNcbiAgICAgIDogaXMuYXJyYXkoZWZmZWN0KSA/IHJ1blBhcmFsbGVsRWZmZWN0KGVmZmVjdCwgZWZmZWN0SWQsIGN1cnJDYikgOiBpcy5ub3RVbmRlZihkYXRhID0gYXNFZmZlY3QudGFrZShlZmZlY3QpKSA/IHJ1blRha2VFZmZlY3QoZGF0YSwgY3VyckNiKSA6IGlzLm5vdFVuZGVmKGRhdGEgPSBhc0VmZmVjdC5wdXQoZWZmZWN0KSkgPyBydW5QdXRFZmZlY3QoZGF0YSwgY3VyckNiKSA6IGlzLm5vdFVuZGVmKGRhdGEgPSBhc0VmZmVjdC5yYWNlKGVmZmVjdCkpID8gcnVuUmFjZUVmZmVjdChkYXRhLCBlZmZlY3RJZCwgY3VyckNiKSA6IGlzLm5vdFVuZGVmKGRhdGEgPSBhc0VmZmVjdC5jYWxsKGVmZmVjdCkpID8gcnVuQ2FsbEVmZmVjdChkYXRhLCBlZmZlY3RJZCwgY3VyckNiKSA6IGlzLm5vdFVuZGVmKGRhdGEgPSBhc0VmZmVjdC5jcHMoZWZmZWN0KSkgPyBydW5DUFNFZmZlY3QoZGF0YSwgY3VyckNiKSA6IGlzLm5vdFVuZGVmKGRhdGEgPSBhc0VmZmVjdC5mb3JrKGVmZmVjdCkpID8gcnVuRm9ya0VmZmVjdChkYXRhLCBlZmZlY3RJZCwgY3VyckNiKSA6IGlzLm5vdFVuZGVmKGRhdGEgPSBhc0VmZmVjdC5qb2luKGVmZmVjdCkpID8gcnVuSm9pbkVmZmVjdChkYXRhLCBjdXJyQ2IpIDogaXMubm90VW5kZWYoZGF0YSA9IGFzRWZmZWN0LmNhbmNlbChlZmZlY3QpKSA/IHJ1bkNhbmNlbEVmZmVjdChkYXRhLCBjdXJyQ2IpIDogaXMubm90VW5kZWYoZGF0YSA9IGFzRWZmZWN0LnNlbGVjdChlZmZlY3QpKSA/IHJ1blNlbGVjdEVmZmVjdChkYXRhLCBjdXJyQ2IpIDogaXMubm90VW5kZWYoZGF0YSA9IGFzRWZmZWN0LmFjdGlvbkNoYW5uZWwoZWZmZWN0KSkgPyBydW5DaGFubmVsRWZmZWN0KGRhdGEsIGN1cnJDYikgOiBpcy5ub3RVbmRlZihkYXRhID0gYXNFZmZlY3QuZmx1c2goZWZmZWN0KSkgPyBydW5GbHVzaEVmZmVjdChkYXRhLCBjdXJyQ2IpIDogaXMubm90VW5kZWYoZGF0YSA9IGFzRWZmZWN0LmNhbmNlbGxlZChlZmZlY3QpKSA/IHJ1bkNhbmNlbGxlZEVmZmVjdChkYXRhLCBjdXJyQ2IpIDogLyogYW55dGhpbmcgZWxzZSByZXR1cm5lZCBhcyBpcyAgICAgICAgKi9jdXJyQ2IoZWZmZWN0KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZShwcm9taXNlLCBjYikge1xuICAgIHZhciBjYW5jZWxQcm9taXNlID0gcHJvbWlzZVtDQU5DRUxdO1xuICAgIGlmICh0eXBlb2YgY2FuY2VsUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IuY2FuY2VsID0gY2FuY2VsUHJvbWlzZTtcbiAgICB9XG4gICAgcHJvbWlzZS50aGVuKGNiLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBjYihlcnJvciwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNvbHZlSXRlcmF0b3IoaXRlcmF0b3IsIGVmZmVjdElkLCBuYW1lLCBjYikge1xuICAgIHByb2MoaXRlcmF0b3IsIHN1YnNjcmliZSwgZGlzcGF0Y2gsIGdldFN0YXRlLCBvcHRpb25zLCBlZmZlY3RJZCwgbmFtZSwgY2IpO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuVGFrZUVmZmVjdChfcmVmMiwgY2IpIHtcbiAgICB2YXIgY2hhbm5lbCA9IF9yZWYyLmNoYW5uZWwsXG4gICAgICAgIHBhdHRlcm4gPSBfcmVmMi5wYXR0ZXJuLFxuICAgICAgICBtYXliZSA9IF9yZWYyLm1heWJlO1xuXG4gICAgY2hhbm5lbCA9IGNoYW5uZWwgfHwgc3RkQ2hhbm5lbDtcbiAgICB2YXIgdGFrZUNiID0gZnVuY3Rpb24gdGFrZUNiKGlucCkge1xuICAgICAgcmV0dXJuIGlucCBpbnN0YW5jZW9mIEVycm9yID8gY2IoaW5wLCB0cnVlKSA6IGlzRW5kKGlucCkgJiYgIW1heWJlID8gY2IoQ0hBTk5FTF9FTkQpIDogY2IoaW5wKTtcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjaGFubmVsLnRha2UodGFrZUNiLCBtYXRjaGVyKHBhdHRlcm4pKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBjYihlcnIsIHRydWUpO1xuICAgIH1cbiAgICBjYi5jYW5jZWwgPSB0YWtlQ2IuY2FuY2VsO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuUHV0RWZmZWN0KF9yZWYzLCBjYikge1xuICAgIHZhciBjaGFubmVsID0gX3JlZjMuY2hhbm5lbCxcbiAgICAgICAgYWN0aW9uID0gX3JlZjMuYWN0aW9uLFxuICAgICAgICBzeW5jID0gX3JlZjMuc3luYztcblxuICAgIC8qKlxyXG4gICAgICBTY2hlZHVsZSB0aGUgcHV0IGluIGNhc2UgYW5vdGhlciBzYWdhIGlzIGhvbGRpbmcgYSBsb2NrLlxyXG4gICAgICBUaGUgcHV0IHdpbGwgYmUgZXhlY3V0ZWQgYXRvbWljYWxseS4gaWUgbmVzdGVkIHB1dHMgd2lsbCBleGVjdXRlIGFmdGVyXHJcbiAgICAgIHRoaXMgcHV0IGhhcyB0ZXJtaW5hdGVkLlxyXG4gICAgKiovXG4gICAgYXNhcChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gKGNoYW5uZWwgPyBjaGFubmVsLnB1dCA6IGRpc3BhdGNoKShhY3Rpb24pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGNoYW5uZWwgb3IgYHB1dC5zeW5jYCB3YXMgdXNlZCB0aGVuIGJ1YmJsZSB1cCB0aGUgZXJyb3IuXG4gICAgICAgIGlmIChjaGFubmVsIHx8IHN5bmMpIHJldHVybiBjYihlcnJvciwgdHJ1ZSk7XG4gICAgICAgIGxvZygnZXJyb3InLCAndW5jYXVnaHQgYXQgJyArIG5hbWUsIGVycm9yLnN0YWNrIHx8IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3luYyAmJiBpcy5wcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgcmVzb2x2ZVByb21pc2UocmVzdWx0LCBjYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2IocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBQdXQgZWZmZWN0cyBhcmUgbm9uIGNhbmNlbGxhYmxlc1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuQ2FsbEVmZmVjdChfcmVmNCwgZWZmZWN0SWQsIGNiKSB7XG4gICAgdmFyIGNvbnRleHQgPSBfcmVmNC5jb250ZXh0LFxuICAgICAgICBmbiA9IF9yZWY0LmZuLFxuICAgICAgICBhcmdzID0gX3JlZjQuYXJncztcblxuICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG4gICAgLy8gY2F0Y2ggc3luY2hyb25vdXMgZmFpbHVyZXM7IHNlZSAjMTUyXG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gaXMucHJvbWlzZShyZXN1bHQpID8gcmVzb2x2ZVByb21pc2UocmVzdWx0LCBjYikgOiBpcy5pdGVyYXRvcihyZXN1bHQpID8gcmVzb2x2ZUl0ZXJhdG9yKHJlc3VsdCwgZWZmZWN0SWQsIGZuLm5hbWUsIGNiKSA6IGNiKHJlc3VsdCk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5DUFNFZmZlY3QoX3JlZjUsIGNiKSB7XG4gICAgdmFyIGNvbnRleHQgPSBfcmVmNS5jb250ZXh0LFxuICAgICAgICBmbiA9IF9yZWY1LmZuLFxuICAgICAgICBhcmdzID0gX3JlZjUuYXJncztcblxuICAgIC8vIENQUyAoaWUgbm9kZSBzdHlsZSBmdW5jdGlvbnMpIGNhbiBkZWZpbmUgdGhlaXIgb3duIGNhbmNlbGxhdGlvbiBsb2dpY1xuICAgIC8vIGJ5IHNldHRpbmcgY2FuY2VsIGZpZWxkIG9uIHRoZSBjYlxuXG4gICAgLy8gY2F0Y2ggc3luY2hyb25vdXMgZmFpbHVyZXM7IHNlZSAjMTUyXG4gICAgdHJ5IHtcbiAgICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjcHNDYiA9IGZ1bmN0aW9uIGNwc0NiKGVyciwgcmVzKSB7XG4gICAgICAgICAgcmV0dXJuIGlzLnVuZGVmKGVycikgPyBjYihyZXMpIDogY2IoZXJyLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQoY3BzQ2IpKTtcbiAgICAgICAgaWYgKGNwc0NiLmNhbmNlbCkge1xuICAgICAgICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjcHNDYi5jYW5jZWwoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2IoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkZvcmtFZmZlY3QoX3JlZjYsIGVmZmVjdElkLCBjYikge1xuICAgIHZhciBjb250ZXh0ID0gX3JlZjYuY29udGV4dCxcbiAgICAgICAgZm4gPSBfcmVmNi5mbixcbiAgICAgICAgYXJncyA9IF9yZWY2LmFyZ3MsXG4gICAgICAgIGRldGFjaGVkID0gX3JlZjYuZGV0YWNoZWQ7XG5cbiAgICB2YXIgdGFza0l0ZXJhdG9yID0gY3JlYXRlVGFza0l0ZXJhdG9yKHsgY29udGV4dDogY29udGV4dCwgZm46IGZuLCBhcmdzOiBhcmdzIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIHN1c3BlbmQoKTtcbiAgICAgIHZhciBfdGFzayA9IHByb2ModGFza0l0ZXJhdG9yLCBzdWJzY3JpYmUsIGRpc3BhdGNoLCBnZXRTdGF0ZSwgb3B0aW9ucywgZWZmZWN0SWQsIGZuLm5hbWUsIGRldGFjaGVkID8gbnVsbCA6IG5vb3ApO1xuXG4gICAgICBpZiAoZGV0YWNoZWQpIHtcbiAgICAgICAgY2IoX3Rhc2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRhc2tJdGVyYXRvci5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgdGFza1F1ZXVlLmFkZFRhc2soX3Rhc2spO1xuICAgICAgICAgIGNiKF90YXNrKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXNrSXRlcmF0b3IuX2Vycm9yKSB7XG4gICAgICAgICAgdGFza1F1ZXVlLmFib3J0KHRhc2tJdGVyYXRvci5fZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNiKF90YXNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBmbHVzaCgpO1xuICAgIH1cbiAgICAvLyBGb3JrIGVmZmVjdHMgYXJlIG5vbiBjYW5jZWxsYWJsZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkpvaW5FZmZlY3QodCwgY2IpIHtcbiAgICBpZiAodC5pc1J1bm5pbmcoKSkge1xuICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGpvaW5lciA9IHsgdGFzazogdGFzaywgY2I6IGNiIH07XG4gICAgICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcmVtb3ZlKHQuam9pbmVycywgam9pbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdC5qb2luZXJzLnB1c2goam9pbmVyKTtcbiAgICAgIH0pKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHQuaXNBYm9ydGVkKCkgPyBjYih0LmVycm9yKCksIHRydWUpIDogY2IodC5yZXN1bHQoKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuQ2FuY2VsRWZmZWN0KHRhc2ssIGNiKSB7XG4gICAgaWYgKHRhc2suaXNSdW5uaW5nKCkpIHtcbiAgICAgIHRhc2suY2FuY2VsKCk7XG4gICAgfVxuICAgIGNiKCk7XG4gICAgLy8gY2FuY2VsIGVmZmVjdHMgYXJlIG5vbiBjYW5jZWxsYWJsZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBhcmFsbGVsRWZmZWN0KGVmZmVjdHMsIGVmZmVjdElkLCBjYikge1xuICAgIGlmICghZWZmZWN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjYihbXSk7XG4gICAgfVxuXG4gICAgdmFyIGNvbXBsZXRlZENvdW50ID0gMDtcbiAgICB2YXIgY29tcGxldGVkID0gdm9pZCAwO1xuICAgIHZhciByZXN1bHRzID0gQXJyYXkoZWZmZWN0cy5sZW5ndGgpO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tFZmZlY3RFbmQoKSB7XG4gICAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGNiKHJlc3VsdHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGlsZENicyA9IGVmZmVjdHMubWFwKGZ1bmN0aW9uIChlZmYsIGlkeCkge1xuICAgICAgdmFyIGNoQ2JBdElkeCA9IGZ1bmN0aW9uIGNoQ2JBdElkeChyZXMsIGlzRXJyKSB7XG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRXJyIHx8IGlzRW5kKHJlcykgfHwgcmVzID09PSBDSEFOTkVMX0VORCB8fCByZXMgPT09IFRBU0tfQ0FOQ0VMKSB7XG4gICAgICAgICAgY2IuY2FuY2VsKCk7XG4gICAgICAgICAgY2IocmVzLCBpc0Vycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0c1tpZHhdID0gcmVzO1xuICAgICAgICAgIGNvbXBsZXRlZENvdW50Kys7XG4gICAgICAgICAgY2hlY2tFZmZlY3RFbmQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoQ2JBdElkeC5jYW5jZWwgPSBub29wO1xuICAgICAgcmV0dXJuIGNoQ2JBdElkeDtcbiAgICB9KTtcblxuICAgIGNiLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGNoaWxkQ2JzLmZvckVhY2goZnVuY3Rpb24gKGNoQ2IpIHtcbiAgICAgICAgICByZXR1cm4gY2hDYi5jYW5jZWwoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmLCBpZHgpIHtcbiAgICAgIHJldHVybiBydW5FZmZlY3QoZWZmLCBlZmZlY3RJZCwgaWR4LCBjaGlsZENic1tpZHhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blJhY2VFZmZlY3QoZWZmZWN0cywgZWZmZWN0SWQsIGNiKSB7XG4gICAgdmFyIGNvbXBsZXRlZCA9IHZvaWQgMDtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGVmZmVjdHMpO1xuICAgIHZhciBjaGlsZENicyA9IHt9O1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBjaENiQXRLZXkgPSBmdW5jdGlvbiBjaENiQXRLZXkocmVzLCBpc0Vycikge1xuICAgICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRXJyKSB7XG4gICAgICAgICAgLy8gUmFjZSBBdXRvIGNhbmNlbGxhdGlvblxuICAgICAgICAgIGNiLmNhbmNlbCgpO1xuICAgICAgICAgIGNiKHJlcywgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzRW5kKHJlcykgJiYgcmVzICE9PSBDSEFOTkVMX0VORCAmJiByZXMgIT09IFRBU0tfQ0FOQ0VMKSB7XG4gICAgICAgICAgY2IuY2FuY2VsKCk7XG4gICAgICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICBjYihfZGVmaW5lUHJvcGVydHkoe30sIGtleSwgcmVzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaENiQXRLZXkuY2FuY2VsID0gbm9vcDtcbiAgICAgIGNoaWxkQ2JzW2tleV0gPSBjaENiQXRLZXk7XG4gICAgfSk7XG5cbiAgICBjYi5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBwcmV2ZW50cyB1bm5lY2Vzc2FyeSBjYW5jZWxsYXRpb25cbiAgICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkQ2JzW2tleV0uY2FuY2VsKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcnVuRWZmZWN0KGVmZmVjdHNba2V5XSwgZWZmZWN0SWQsIGtleSwgY2hpbGRDYnNba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5TZWxlY3RFZmZlY3QoX3JlZjcsIGNiKSB7XG4gICAgdmFyIHNlbGVjdG9yID0gX3JlZjcuc2VsZWN0b3IsXG4gICAgICAgIGFyZ3MgPSBfcmVmNy5hcmdzO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciBzdGF0ZSA9IHNlbGVjdG9yLmFwcGx5KHVuZGVmaW5lZCwgW2dldFN0YXRlKCldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpKTtcbiAgICAgIGNiKHN0YXRlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY2IoZXJyb3IsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkNoYW5uZWxFZmZlY3QoX3JlZjgsIGNiKSB7XG4gICAgdmFyIHBhdHRlcm4gPSBfcmVmOC5wYXR0ZXJuLFxuICAgICAgICBidWZmZXIgPSBfcmVmOC5idWZmZXI7XG5cbiAgICB2YXIgbWF0Y2ggPSBtYXRjaGVyKHBhdHRlcm4pO1xuICAgIG1hdGNoLnBhdHRlcm4gPSBwYXR0ZXJuO1xuICAgIGNiKGV2ZW50Q2hhbm5lbChzdWJzY3JpYmUsIGJ1ZmZlciB8fCBidWZmZXJzLmZpeGVkKCksIG1hdGNoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5DYW5jZWxsZWRFZmZlY3QoZGF0YSwgY2IpIHtcbiAgICBjYighIW1haW5UYXNrLmlzQ2FuY2VsbGVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkZsdXNoRWZmZWN0KGNoYW5uZWwsIGNiKSB7XG4gICAgY2hhbm5lbC5mbHVzaChjYik7XG4gIH1cblxuICBmdW5jdGlvbiBuZXdUYXNrKGlkLCBuYW1lLCBpdGVyYXRvciwgY29udCkge1xuICAgIHZhciBfZG9uZSwgX3JlZjksIF9tdXRhdG9yTWFwO1xuXG4gICAgaXRlcmF0b3IuX2RlZmVycmVkRW5kID0gbnVsbDtcbiAgICByZXR1cm4gX3JlZjkgPSB7fSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCBUQVNLLCB0cnVlKSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnaWQnLCBpZCksIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ25hbWUnLCBuYW1lKSwgX2RvbmUgPSAnZG9uZScsIF9tdXRhdG9yTWFwID0ge30sIF9tdXRhdG9yTWFwW19kb25lXSA9IF9tdXRhdG9yTWFwW19kb25lXSB8fCB7fSwgX211dGF0b3JNYXBbX2RvbmVdLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpdGVyYXRvci5fZGVmZXJyZWRFbmQpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLl9kZWZlcnJlZEVuZC5wcm9taXNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRlZiA9IGRlZmVycmVkKCk7XG4gICAgICAgIGl0ZXJhdG9yLl9kZWZlcnJlZEVuZCA9IGRlZjtcbiAgICAgICAgaWYgKCFpdGVyYXRvci5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgaXRlcmF0b3IuX2Vycm9yID8gZGVmLnJlamVjdChpdGVyYXRvci5fZXJyb3IpIDogZGVmLnJlc29sdmUoaXRlcmF0b3IuX3Jlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlO1xuICAgICAgfVxuICAgIH0sIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ2NvbnQnLCBjb250KSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnam9pbmVycycsIFtdKSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnY2FuY2VsJywgY2FuY2VsKSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAnaXNSdW5uaW5nJywgZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLl9pc1J1bm5pbmc7XG4gICAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ2lzQ2FuY2VsbGVkJywgZnVuY3Rpb24gaXNDYW5jZWxsZWQoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IuX2lzQ2FuY2VsbGVkO1xuICAgIH0pLCBfZGVmaW5lUHJvcGVydHkoX3JlZjksICdpc0Fib3J0ZWQnLCBmdW5jdGlvbiBpc0Fib3J0ZWQoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IuX2lzQWJvcnRlZDtcbiAgICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWY5LCAncmVzdWx0JywgZnVuY3Rpb24gcmVzdWx0KCkge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLl9yZXN1bHQ7XG4gICAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmOSwgJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3IuX2Vycm9yO1xuICAgIH0pLCBfZGVmaW5lRW51bWVyYWJsZVByb3BlcnRpZXMoX3JlZjksIF9tdXRhdG9yTWFwKSwgX3JlZjk7XG4gIH1cbn0iXX0=