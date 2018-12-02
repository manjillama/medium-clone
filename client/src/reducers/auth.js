import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: null,
  errorMessage: null
}
export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: {
        token: action.payload.token,
        user: action.payload.user
      }};
    case AUTH_ERROR:
      return {...state, errorMessage: action.payload};
    default:
      return state;
  }
}
