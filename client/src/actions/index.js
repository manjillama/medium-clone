import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';

export const signUp = (formProps, callback) => async dispatch => {
  try{
    const response = await axios.post('http://localhost:5000/signup', formProps);
    dispatch({type: AUTH_USER, payload: response.data});

    // Persisting login state, so that authentication is not lost when refreshing the page.
    localStorage.setItem('token', response.data.token);
    callback();
  }catch(e){
    //console.log("Error caught", e);
    dispatch({type: AUTH_ERROR, payload: 'Email already in use'});
  }
};


export const signIn = (formProps, callback) => async dispatch => {
  try{
    const response = await axios.post('http://localhost:5000/signin', formProps);
    dispatch({type: AUTH_USER, payload: response.data});

    // Persisting login state, so that authentication is not lost when refreshing the page.
    localStorage.setItem('token', response.data.token);
    callback();
  }catch(e){
    dispatch({type: AUTH_ERROR, payload: 'Email already in use'});
  }
};

export const getUser = (token) => {
  console.log(token);
}
