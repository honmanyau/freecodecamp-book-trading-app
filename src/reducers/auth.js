import {
  REGISTRATION_ERROR,
  SIGNING_IN,
  SIGNED_IN,
  SIGN_IN_ERROR,
  SIGN_IN_REDIRECT,
  FETCHING_PROFILE,
  STORE_PROFILE
} from '../actions/auth';



const initialState = {
  registrationError: false,
  inProgress: true,
  user: null,
  signInError: null,
  signInRedirect: false,
  fetchingProfile: true,
  profile: null
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case REGISTRATION_ERROR:
      return Object.assign({}, state, {
        registrationError: action.payload.progress
      });

    case SIGNING_IN:
      return Object.assign({}, state, {
        inProgress: action.payload.progress
      });

    case SIGNED_IN:
      return Object.assign({}, state, {
        user: action.payload.user
      });

    case SIGN_IN_ERROR:
      return Object.assign({}, state, {
        signInError: action.payload.errorMessage
      });

    case SIGN_IN_REDIRECT:
      return Object.assign({}, state, {
        signInRedirect: action.payload.redirect
      });

    case FETCHING_PROFILE:
      return Object.assign({}, state, {
        profile: action.payload.fetchingProfile
      });

    case STORE_PROFILE:
      return Object.assign({}, state, {
        profile: action.payload.profile
      });

    default:
      return state;
  }
}
