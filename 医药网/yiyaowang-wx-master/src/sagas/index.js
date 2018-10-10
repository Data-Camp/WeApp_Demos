import { takeLatest } from 'redux-saga';
import { ADD } from '../redux/cart';
import * as cartSaga from './cart';

// 当action触发时，执行特定saga
export default function* root() {
  yield [
    takeLatest(ADD, cartSaga.addSaga)

  ];
}
