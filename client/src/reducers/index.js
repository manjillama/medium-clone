import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import blogger from './blogger';

export default combineReducers({
  auth,
  form: formReducer,
  blogger
});
