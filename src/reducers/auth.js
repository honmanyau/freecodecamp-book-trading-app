import {
  SIGNING_IN,
  SIGNED_IN,
  SIGN_IN_ERROR,
  SIGN_IN_REDIRECT
} from '../actions/auth';



const initialState = {
  inProgress: false,
  user: null,
  signInError: null,
  signInRedirect: false
};

export default function auth(state = initialState, action) {
  switch(action.type) {
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

    default:
      return state;
  }
}
