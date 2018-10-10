const noop = () => 0;

let onOpen, onClose, onMessage, onError;

function listen(listener) {
    if (listener) {
        onOpen = listener.onOpen;
        onClose = listener.onClose;
        onMessage = listener.onMessage;
        onError = listener.onError;
    } else {
        onOpen = noop;
        onClose = noop;
        onMessage = noop;
        onError = noop;
    }
}

listen(null);

wx.onSocketOpen(result => onOpen(result));
wx.onSocketClose(result => onClose(result));
wx.onSocketMessage(result => onMessage(result));
wx.onSocketError(error => onError(error));

module.exports = { listen };