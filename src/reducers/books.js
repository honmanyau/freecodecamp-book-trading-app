import {
  STORE_SEARCH_RESULT
} from '../actions/books';



const initialState = {
  searchResult: null
};

export default function books(state = initialState, action) {
  switch(action.type) {
    case STORE_SEARCH_RESULT:
    console.log(action.payload.searchResult)
      return Object.assign({}, state, {
        searchResult: action.payload.searchResult
      });

    default:
      return state;
  }
}
