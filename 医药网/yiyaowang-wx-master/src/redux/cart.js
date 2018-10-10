import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const ADD = 'ADD';

export const INITIAL_STATE = immutable([]);

export const add = createAction(ADD, (todos) => (todos));

export default handleActions({

  [ADD]: (state, { payload }) => state.map((todo) => (
    todo.id === payload.id ? todo.merge({ number: payload.sellStatus + 1 }) : todo))
}, INITIAL_STATE);
