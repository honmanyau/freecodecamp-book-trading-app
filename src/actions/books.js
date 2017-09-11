import firebase from '../firebase';



export const STORE_SEARCH_RESULT = 'STORE_SEARCH_RESULT';

export function searchByTitle(bookName) {
  return function(dispatch) {
    // FakePI call for testing
    setTimeout((response) => dispatch(storeSearchResult(response)), 200);
  }
}

export function storeSearchResult(searchResult) {
  return {
    type: STORE_SEARCH_RESULT,
    payload: {
      searchResult
    }
  }
}
