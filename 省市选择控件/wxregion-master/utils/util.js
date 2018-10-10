import _Promise from 'bluebird';

/**
 * 封装Promise
 *
 * @param {Function} fn 网络接口
 * @param {Object} options 接口参数
 *
 * @return {Promise} Promise对象
 */
function Promise(fn, options) {
    options = options || {};

    return new _Promise((resolve, reject) => {
        if (typeof fn !== 'function') {
            reject();
        }

        options.success = resolve;
        options.fail = reject;
        fn(options);
    });
}

module.exports = {
    Promise: Promise,
}
