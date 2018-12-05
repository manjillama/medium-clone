import { GET_BLOGGER, ERROR } from '../actions/types';

const INITIAL_STATE = {
  info: null
}

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case GET_BLOGGER:
      return {...state, info: action.payload};
    case ERROR:
      return {...state, info: action.payload};
    default:
      return state;
  }
}
