import {
  STORE_SEARCH_RESULT,
  STORE_COLLECTION,
  FETCHING_COLLECTION
} from '../actions/books';



const initialState = {
  searchResult: null,
  collection: null,
  fetchingCollection: true
};

export default function books(state = initialState, action) {
  switch(action.type) {
    case FETCHING_COLLECTION:
    return Object.assign({}, state, {
      fetchingCollection: action.payload.fetchingCollection
    });

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
