//app.js
const {Provider} = require('./libs/wechat-weapp-redux.js');
const configureStore = require('./configureStore.js');

App(Provider(configureStore())({
  onLaunch: function () {
    console.log("onLaunch")
  }
}))