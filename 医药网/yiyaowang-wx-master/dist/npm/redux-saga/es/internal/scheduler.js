"use strict";var exports=module.exports={};"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asap = asap;
exports.suspend = suspend;
exports.flush = flush;

var queue = [];
/**
  Variable to hold a counting semaphore
  - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
    already suspended)
  - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
    triggers flushing the queued tasks.
**/
var semaphore = 0;

/**
  Executes a task 'atomically'. Tasks scheduled during this execution will be queued
  and flushed after this task has finished (assuming the scheduler endup in a released
  state).
**/
function exec(task) {
  try {
    suspend();
    task();
  } finally {
    flush();
  }
}

/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/
function asap(task) {
  if (!semaphore) {
    exec(task);
  } else {
    queue.push(task);
  }
}

/**
  Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
  scheduler is released.
**/
function suspend() {
  semaphore++;
}

/**
  Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
**/
function flush() {
  semaphore--;
  if (!semaphore && queue.length) {
    exec(queue.shift());
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjaGVkdWxlci5qcyJdLCJuYW1lcyI6WyJhc2FwIiwic3VzcGVuZCIsImZsdXNoIiwicXVldWUiLCJzZW1hcGhvcmUiLCJleGVjIiwidGFzayIsInB1c2giLCJsZW5ndGgiLCJzaGlmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUE0QmdCQSxJLEdBQUFBLEk7UUFZQUMsTyxHQUFBQSxPO1FBT0FDLEssR0FBQUEsSzs7QUE5Q2hCLElBQUlDLFFBQVEsRUFBWjtBQUNBOzs7Ozs7O0FBT0EsSUFBSUMsWUFBWSxDQUFoQjs7QUFFQTs7Ozs7QUFLQSxTQUFTQyxJQUFULENBQWNDLElBQWQsRUFBb0I7QUFDbEIsTUFBSTtBQUNGTDtBQUNBSztBQUNELEdBSEQsU0FHVTtBQUNSSjtBQUNEO0FBQ0Y7O0FBRUQ7OztBQUdPLFNBQVNGLElBQVQsQ0FBY00sSUFBZCxFQUFvQjtBQUN6QixNQUFJLENBQUNGLFNBQUwsRUFBZ0I7QUFDZEMsU0FBS0MsSUFBTDtBQUNELEdBRkQsTUFFTztBQUNMSCxVQUFNSSxJQUFOLENBQVdELElBQVg7QUFDRDtBQUNGOztBQUVEOzs7O0FBSU8sU0FBU0wsT0FBVCxHQUFtQjtBQUN4Qkc7QUFDRDs7QUFFRDs7O0FBR08sU0FBU0YsS0FBVCxHQUFpQjtBQUN0QkU7QUFDQSxNQUFJLENBQUNBLFNBQUQsSUFBY0QsTUFBTUssTUFBeEIsRUFBZ0M7QUFDOUJILFNBQUtGLE1BQU1NLEtBQU4sRUFBTDtBQUNEO0FBQ0YiLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIlxudmFyIHF1ZXVlID0gW107XG4vKipcclxuICBWYXJpYWJsZSB0byBob2xkIGEgY291bnRpbmcgc2VtYXBob3JlXHJcbiAgLSBJbmNyZW1lbnRpbmcgYWRkcyBhIGxvY2sgYW5kIHB1dHMgdGhlIHNjaGVkdWxlciBpbiBhIGBzdXNwZW5kZWRgIHN0YXRlIChpZiBpdCdzIG5vdFxyXG4gICAgYWxyZWFkeSBzdXNwZW5kZWQpXHJcbiAgLSBEZWNyZW1lbnRpbmcgcmVsZWFzZXMgYSBsb2NrLiBaZXJvIGxvY2tzIHB1dHMgdGhlIHNjaGVkdWxlciBpbiBhIGByZWxlYXNlZGAgc3RhdGUuIFRoaXNcclxuICAgIHRyaWdnZXJzIGZsdXNoaW5nIHRoZSBxdWV1ZWQgdGFza3MuXHJcbioqL1xudmFyIHNlbWFwaG9yZSA9IDA7XG5cbi8qKlxyXG4gIEV4ZWN1dGVzIGEgdGFzayAnYXRvbWljYWxseScuIFRhc2tzIHNjaGVkdWxlZCBkdXJpbmcgdGhpcyBleGVjdXRpb24gd2lsbCBiZSBxdWV1ZWRcclxuICBhbmQgZmx1c2hlZCBhZnRlciB0aGlzIHRhc2sgaGFzIGZpbmlzaGVkIChhc3N1bWluZyB0aGUgc2NoZWR1bGVyIGVuZHVwIGluIGEgcmVsZWFzZWRcclxuICBzdGF0ZSkuXHJcbioqL1xuZnVuY3Rpb24gZXhlYyh0YXNrKSB7XG4gIHRyeSB7XG4gICAgc3VzcGVuZCgpO1xuICAgIHRhc2soKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBmbHVzaCgpO1xuICB9XG59XG5cbi8qKlxyXG4gIEV4ZWN1dGVzIG9yIHF1ZXVlcyBhIHRhc2sgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiB0aGUgc2NoZWR1bGVyIChgc3VzcGVuZGVkYCBvciBgcmVsZWFzZWRgKVxyXG4qKi9cbmV4cG9ydCBmdW5jdGlvbiBhc2FwKHRhc2spIHtcbiAgaWYgKCFzZW1hcGhvcmUpIHtcbiAgICBleGVjKHRhc2spO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlLnB1c2godGFzayk7XG4gIH1cbn1cblxuLyoqXHJcbiAgUHV0cyB0aGUgc2NoZWR1bGVyIGluIGEgYHN1c3BlbmRlZGAgc3RhdGUuIFNjaGVkdWxlZCB0YXNrcyB3aWxsIGJlIHF1ZXVlZCB1bnRpbCB0aGVcclxuICBzY2hlZHVsZXIgaXMgcmVsZWFzZWQuXHJcbioqL1xuZXhwb3J0IGZ1bmN0aW9uIHN1c3BlbmQoKSB7XG4gIHNlbWFwaG9yZSsrO1xufVxuXG4vKipcclxuICBSZWxlYXNlcyB0aGUgY3VycmVudCBsb2NrLiBFeGVjdXRlcyBhbGwgcXVldWVkIHRhc2tzIGlmIHRoZSBzY2hlZHVsZXIgaXMgaW4gdGhlIHJlbGVhc2VkIHN0YXRlLlxyXG4qKi9cbmV4cG9ydCBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgc2VtYXBob3JlLS07XG4gIGlmICghc2VtYXBob3JlICYmIHF1ZXVlLmxlbmd0aCkge1xuICAgIGV4ZWMocXVldWUuc2hpZnQoKSk7XG4gIH1cbn0iXX0=