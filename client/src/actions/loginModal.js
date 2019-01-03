
import { OPEN_L_MODAL, CLOSE_L_MODAL } from './types';

export const openModal = () => dispatch => {
  dispatch({type: OPEN_L_MODAL, payload: null});
};

export const closeModal = () => dispatch => {
  dispatch({type: CLOSE_L_MODAL, payload: null});
};
