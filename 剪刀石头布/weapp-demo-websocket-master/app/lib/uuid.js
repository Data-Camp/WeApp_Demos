module.exports = function uuid() {
    return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
};