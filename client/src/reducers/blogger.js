import { GET_BLOGGER } from '../actions/types';

const INITIAL_STATE = {
  info: null
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case GET_BLOGGER:
      return {...state, info: action.payload};
    default:
      return state;
  }
}
