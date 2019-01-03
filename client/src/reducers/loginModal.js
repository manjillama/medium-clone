import { OPEN_L_MODAL, CLOSE_L_MODAL } from 'actions/types';

const INITIAL_STATE = {
  openModal: false
}
export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case OPEN_L_MODAL:
      return {...state, openModal: true};
    case CLOSE_L_MODAL:
      return {...state, openModal: false};
    default:
      return state;
  }
}
