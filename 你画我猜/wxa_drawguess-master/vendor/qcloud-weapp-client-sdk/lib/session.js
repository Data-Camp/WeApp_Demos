var constants = require('./constants');
var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID;

var Session = {
    get: function () {
        return wx.getStorageSync(SESSION_KEY) || null;
    },

    set: function (session) {
        wx.setStorageSync(SESSION_KEY, session);
    },

    clear: function () {
        wx.removeStorageSync(SESSION_KEY);
    },
};

module.exports = Session;