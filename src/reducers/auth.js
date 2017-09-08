import {
  SIGNING_IN,
  SIGNED_IN
} from '../actions/auth';



const initialState = {
  inProgress: false,
  user: null
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
      })

    default:
      return state;
  }
}
