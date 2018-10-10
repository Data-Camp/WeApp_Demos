const {createStore, compose} = require('./libs/redux.js');
// const devTools = require('./libs/remote-redux-devtools.js').default;
const reducer = require('./reducers/index.js')

function configureStore() {
  return createStore(reducer);
}
// function configureStore() {
//   return createStore(reducer, compose(devTools({
//     hostname: 'localhost',
//     port: 5678,
//     secure: false
//   })));
// }

module.exports = configureStore;
