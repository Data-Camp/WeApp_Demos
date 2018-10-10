import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

// import loginReducer from './login';
// import userReducer from './user';
// import todosReducer from './todos';
import cartsReducer from './cart';


function createStore() {
  const rootReducer = combineReducers({
    cart: cartsReducer
    // login: loginReducer,
    // user: userReducer,
    // todos: todosReducer
  });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
