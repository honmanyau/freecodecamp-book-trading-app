import firebase from '../firebase';



export const FETCHING_COLLECTION = 'FETCHING_COLLECTION';
export const STORE_SEARCH_RESULT = 'STORE_SEARCH_RESULT';
export const STORE_COLLECTION = 'STORE_COLLECTION';
export const STORE_LISTED = 'STORE_LISTED';
export const FETCHING_LISTED = 'FETCHING_LISTED';
export const FETCHING_REQUESTS = 'FETCHING_REQUESTS';
export const STORE_REQUESTS = 'STORE_REQUESTS';

export function searchForBooks(searchString) {
  return function(dispatch) {
    fetch(`https://freecodecamp-lesen.glitch.me/api/search/${searchString}`)
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((data) => {
              dispatch(storeSearchResult(data.items))
            });
        }
      })
      .catch((error) => console.log('Error when fetching books data.'));
  }
}

export function fetchCollection(uid) {
  return function(dispatch) {
    dispatch(fetchingCollection(true));

    firebase.database().ref(`/book-app/users/${uid}/books`).on('value', (snapshot) => {
        dispatch(storeCollcetion(snapshot.val()));
        dispatch(fetchingCollection(false));
      }, (error) => console.log('Error occured when fetching from collection.'));
  }
}

export function addBookToCollection(uid, book) {
  return function(dispatch) {
    firebase.database().ref(`/book-app/users/${uid}/books`).update(book)
      .catch((error) => console.log('Error occured when attempting to add a book to the collection.'))

  }
}

export function removeBookFromCollection(uid, book) {
  return function(dispatch) {
    const updates = {
      [`/book-app/users/${uid}/books/${book.id}`]: null,
      [`/book-app/listed/${uid + book.id}`]: {listed: false, id: book.id},
      [`/book-app/listed/${uid + book.id}`]: Object.assign({}, book, {listed: null, offered: null})
    };

    if (book.offered) {
      updates[`/book-app/users/${Object.keys(book.offered)[0]}/requests/${book.uid + book.id}`] = null;
    }

    firebase.database().ref().update(updates)
      .catch((error) => console.log('Error occured when removing a book from the collection.'));
  }
}

export function listBook(uid, book, listed) {
  return function(dispatch) {
    const updates = {
      [`/book-app/users/${uid}/books/${book.id}/trading`]: listed,
      [`/book-app/users/${uid}/books/${book.id}/offered`]: null,
      [`/book-app/listed/${uid + book.id}`]: Object.assign({}, book, {listed, offered: null})
    };

    if (book.offered) {
      updates[`/book-app/users/${Object.keys(book.offered)[0]}/requests/${book.uid + book.id}`] = null;
    }

    firebase.database().ref().update(updates)
      .catch((error) => console.log('Error occured when listing a book.'));
  }
}

export function fetchListed() {
  return function(dispatch) {
    dispatch(fetchingListed(true));

    firebase.database().ref('/book-app/listed').on('value', (snapshot) => {
      dispatch(storeListed(snapshot.val()));
      dispatch(fetchingListed(false));
    }, (error) => {
      console.log('Error occured while reading listed books.')
    });
  }
}

export function makeOffer(uid, book, offer) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/book-app/listed/${book.uid + book.id}/offered/${uid}`]: offer ? true : null,
      [`/book-app/users/${book.uid}/books/${book.id}/offered/${uid}`]: offer ? true : null,
      [`/book-app/users/${uid}/requests/${book.uid + book.id}`]: offer ? book : null
    })
      .catch((error) => console.log('Error occured when making an offer.'));
  }
}

export function acceptTrade(uid, book, trade) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/book-app/listed/${book.uid + book.id}/accepted`]: trade,
      [`/book-app/users/${book.uid}/books/${book.id}/accepted`]: trade
    })
      .catch((error) => console.log('Error occured when accepting an offer.'));
  }
}

export function fetchRequests(uid) {
  return function(dispatch) {
    dispatch(fetchingRequests(true));

    firebase.database().ref(`/book-app/users/${uid}/requests`).on('value', (snapshot) => {
      dispatch(storeRequests(snapshot.val()));
      dispatch(fetchingRequests(false));
    }, (error) => console.log('Error occured when fetching requests.'))
  }
}

export function fetchingListed(fetchingListed) {
  return {
    type: FETCHING_LISTED,
    payload: {
      fetchingListed
    }
  }
}

export function fetchingCollection(fetchingCollection) {
  return {
    type: FETCHING_COLLECTION,
    payload: {
      fetchingCollection
    }
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

export function storeCollcetion(collection) {
  return {
    type: STORE_COLLECTION,
    payload: {
      collection
    }
  }
}

export function storeListed(listed) {
  return {
    type: STORE_LISTED,
    payload: {
      listed
    }
  }
}

export function storeRequests(requests) {
  return {
    type: STORE_REQUESTS,
    payload: {
      requests
    }
  }
}

export function fetchingRequests(fetchingRequests) {
  return {
    type: FETCHING_REQUESTS,
    payload: {
      fetchingRequests
    }
  }
}
