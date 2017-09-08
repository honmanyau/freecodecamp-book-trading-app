import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';



const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

console.log('STORE: ', store.getState())

export default store;