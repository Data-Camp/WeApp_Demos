"use strict";var exports=module.exports={};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmcuanMiXSwibmFtZXMiOlsid2FybmluZyIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZXJyb3IiLCJFcnJvciIsImUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU13QkEsTztBQU54Qjs7Ozs7O0FBTWUsU0FBU0EsT0FBVCxDQUFpQkMsT0FBakIsRUFBMEI7QUFDdkM7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0MsT0FBT0EsUUFBUUMsS0FBZixLQUF5QixVQUEvRCxFQUEyRTtBQUN6RUQsWUFBUUMsS0FBUixDQUFjRixPQUFkO0FBQ0Q7QUFDRDtBQUNBLE1BQUk7QUFDRjtBQUNBO0FBQ0E7QUFDQSxVQUFNLElBQUlHLEtBQUosQ0FBVUgsT0FBVixDQUFOO0FBQ0E7QUFDRCxHQU5ELENBTUUsT0FBT0ksQ0FBUCxFQUFVLENBQUU7QUFDZDtBQUNEIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufSJdfQ==