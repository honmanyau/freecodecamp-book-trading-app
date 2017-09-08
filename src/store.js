import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';



function temp(state = 0, action) {
  switch(action.type) {
    case 'TEMP':
      return Object.assign({}, state, action.value);

    default:
      return state;
  }
}

const store = createStore(
  temp,
  applyMiddleware(thunk)
);

console.log('STORE: ', store.getState())

export default store;
