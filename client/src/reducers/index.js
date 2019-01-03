import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import blogger from './blogger';
import loginModal from './loginModal';

export default combineReducers({
  auth,
  form: formReducer,
  blogger,
  loginModal
});
