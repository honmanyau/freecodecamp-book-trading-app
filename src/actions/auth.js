import firebase from '../firebase';

import { fetchCollection, fetchRequests } from './books';



export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const SIGNING_IN = 'SIGNING_IN';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_REDIRECT = 'SIGN_IN_REDIRECT';
export const FETCHING_PROFILE = 'FETCHING_PROFILE';
export const STORE_PROFILE = 'STORE_PROFILE';

// Dispatched in store.js for listening changes in auth state
export function authListener() {
  return function(dispatch) {
    dispatch(signingIn(true));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(signedIn(user));
        dispatch(signingIn(false));
        dispatch(fetchProfile(user.uid));
        dispatch(fetchCollection(user.uid));
        dispatch(fetchRequests(user.uid));
      }
      else {
        dispatch(signedIn(null));
        dispatch(signingIn(false));
      }
    });
  }
}

export function register(email, password, username) {
  return function(dispatch) {
    // Additional checks before submitting
    if (email.match(/.+?@.+?\..+/) && password.length > 6 && username.length > 3) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.updateProfile({displayName: username})
            .catch((error) => dispatch(registrationError('Error occured when updating display name.')));
        })
        .catch((error) => dispatch(registrationError(error.message)));
    }
  }
}

export function updateProfile(uid, profile) {
  return function(dispatch) {
    firebase.database().ref(`/book-app/users/${uid}/profile`).update(profile)
      .then(() => dispatch(fetchProfile(uid)))
      .catch((error) => console.log('Error occured while updating profile.'));
  }
}

export function fetchProfile(uid) {
  return function(dispatch) {
    dispatch(fetchingProfile(true));

    firebase.database().ref(`/book-app/users/${uid}/profile`).once('value')
      .then((snapshot) => {
        dispatch(storeProfile(snapshot.val()))
        dispatch(fetchingProfile(false));
      })
      .catch((erorr) => console.log('Error when fetching profile.'));
  }
}

export function updatePassword(user, newPassword) {
  return function(dispatch) {
    user.updatePassword(newPassword)
      .then(() => console.log('Successfully updated password.'))
      .catch(error => console.log('Error occured when updating password.'));
  }
}

export function signIn(email, password) {
  return function(dispatch) {
    // Additional checks before submitting
    if (email.match(/.+?@.+?\..+/) && password.length > 6) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => dispatch(signInRedirect()))
        .catch((error) => dispatch(signInError(error.message)));
    }
  }
}

export function signOut() {
  return function(dispatch) {
    firebase.auth().signOut();
  }
}

export function registrationError(errorMessage) {
  return {
    type: REGISTRATION_ERROR,
    payload: {
      errorMessage
    }
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

export function signInRedirect(redirect) {
  return {
    type: SIGN_IN_REDIRECT,
    payload: {
      redirect
    }
  }
}

export function fetchingProfile(fetchingProfile) {
  return {
    type: FETCHING_PROFILE,
    payload: {
      fetchingProfile
    }
  }
}

export function storeProfile(profile) {
  return {
    type: STORE_PROFILE,
    payload: {
      profile
    }
  }
}
