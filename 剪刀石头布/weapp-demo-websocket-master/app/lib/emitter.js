
module.exports = {
    setup(target) {
        let listeners = [];

        Object.assign(target, {
            on(type, handle) {
                if (typeof handle == 'function') {
                    listeners.push([type, handle]);
                }
            },
            fire(type, ...params) {
                listeners.forEach(([listenType, handle]) => type == listenType && handle(...params));
            },
            removeAllListeners() {
                listeners = [];
            }
        })
    }
}