import {
  STORE_SEARCH_RESULT,
  STORE_COLLECTION
} from '../actions/books';



const initialState = {
  searchResult: null
};

export default function books(state = initialState, action) {
  switch(action.type) {
    case STORE_SEARCH_RESULT:
      return Object.assign({}, state, {
        searchResult: action.payload.searchResult
      });

    case STORE_COLLECTION:
      return Object.assign({}, state, {
        collection: action.payload.collection
      });

    default:
      return state;
  }
}
