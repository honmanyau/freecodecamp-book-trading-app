import firebase from '../firebase';



export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

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

export function signIn(email, password) {
  return function(dispatch) {
    // Additional checks before submitting
    if (email.match(/.+?@.+?\..+/) && password.length > 6) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => dispatch(signInError(error.message)));
    }
  }
}

export function signOut() {
  return function(dispatch) {
    firebase.auth().signOut();
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

export function signInError(errorMessage) {
  return {
    type: SIGN_IN_ERROR,
    payload: {
      errorMessage
    }
  }
}
