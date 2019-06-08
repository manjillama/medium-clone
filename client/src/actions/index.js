import { AUTH_USER, AUTH_ERROR } from './types';
import config from 'config';
import axios from 'axios';

export const signUp = (formProps, callback) => async dispatch => {
  try{
    const response = await axios.post(config.SERVER_URL+'signup', formProps);
    if(response.data.error)
      throw new Error('Email already taken');

    dispatch({type: AUTH_USER, payload: response.data});
    // Persisting login state, so that authentication is not lost when refreshing the page.
    localStorage.setItem('token', response.data.token);
    callback(false);
  }catch(e){
    dispatch({type: AUTH_ERROR, payload: null});
    callback(e.message);
  }
};


export const signIn = (formProps, callback) => async dispatch => {
  try{
    const response = await axios.post(config.SERVER_URL+'signin', formProps);
    if(response.data.error)
      throw new Error('Incorrect username or password');

    dispatch({type: AUTH_USER, payload: response.data});

    // Persisting login state, so that authentication is not lost when refreshing the page.
    localStorage.setItem('token', response.data.token);
    callback(false);
  }catch(e){
    dispatch({type: AUTH_ERROR, payload: null});
    callback(e.message);
  }
};

export const getUser = (token, callback) => async dispatch => {
  try{
    const headers = {'authorization': token};
    const response = await axios.get(config.SERVER_URL+'auth/api/user/get-user', { headers })
    const payload = {token, user: response.data.user};
    dispatch({type: AUTH_USER, payload});
  }catch(e){
    if(e.message !== "Network Error")
      localStorage.removeItem('token');

    dispatch({type: AUTH_ERROR, payload: null});
  }finally{
    callback();
  }
};

export const signOut = (callback) => dispatch => {
  localStorage.removeItem('token');
  dispatch({type: AUTH_USER, payload:null});
  callback();
}
