import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { authListener } from './actions/auth';


const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.dispatch(authListener());

export default store;
