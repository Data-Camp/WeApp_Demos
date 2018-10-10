import immutable from 'seamless-immutable';

export default{
  out(raw) {
    return immutable(raw);
  },
  in(state) {
    return state.asMutable ? state.asMutable({ deep: true }) : state;
  }
};
