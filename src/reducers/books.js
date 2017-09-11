import {
  STORE_SEARCH_RESULT,
  FETCHING_COLLECTION,
  STORE_COLLECTION,
  FETCHING_LISTED,
  STORE_LISTED,
  FETCHING_REQUESTS,
  STORE_REQUESTS
} from '../actions/books';



const initialState = {
  searchResult: null,
  fetchingCollection: true,
  collection: null,
  fetchingListed: true,
  listed: null,
  fetchingRequests: true,
  requests: null
};

export default function books(state = initialState, action) {
  switch(action.type) {
    case STORE_SEARCH_RESULT:
      return Object.assign({}, state, {
        searchResult: action.payload.searchResult
      });

    case FETCHING_COLLECTION:
    return Object.assign({}, state, {
      fetchingCollection: action.payload.fetchingCollection
    });

    case STORE_COLLECTION:
      return Object.assign({}, state, {
        collection: action.payload.collection
      });

    case FETCHING_LISTED:
      return Object.assign({}, state, {
        fetchingListed: action.payload.fetchingListed
      });

    case STORE_LISTED:
      return Object.assign({}, state, {
        listed: action.payload.listed
      });

    case FETCHING_REQUESTS:
      return Object.assign({}, state, {
        fetchingRequests: action.payload.fetchingRequests
      });

    case STORE_REQUESTS:
      return Object.assign({}, state, {
        requests: action.payload.requests
      });

    default:
      return state;
  }
}
