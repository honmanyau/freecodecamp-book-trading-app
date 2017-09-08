import firebase from '../firebase';



export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN = 'SIGNED_IN';

// Dispatched in store.js for listening changes in auth state
export function authListener() {
  return function(dispatch) {
    dispatch(signingIn(true));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signedIn(user));
      }
      else {
        dispatch(signedIn(null));
      }

      dispatch(signingIn(false));
    });
  }
}

export function signingIn(progress) {
  return {
    type: SIGNING_IN,
    payload: {
      progress
    }
  }
}

export function signedIn(user) {
  return {
    type: SIGNED_IN,
    payload: {
      user
    }
  }
}
