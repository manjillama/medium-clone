import { AUTH_USER, AUTH_ERROR } from '../actions/types';
/*
* state structure
{
  authenticated: {
    token: '',
    user: {}
  }
}
*/
const INITIAL_STATE = {
  authenticated: null
}
export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: action.payload};
    case AUTH_ERROR:
      return {...state, authenticated: action.payload};
    default:
      return state;
  }
}
