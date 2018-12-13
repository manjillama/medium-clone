import { GET_BLOGGER } from './types';

import axios from 'axios';

export const fetchBlogger = (username, callback) => async dispatch => {
  try{
    const response = await axios.get(`http://localhost:5000/api/get-user/${username}`);
    if(response.data.error)
      throw new Error('User Not Found');
    dispatch({type: GET_BLOGGER, payload: response.data});
    callback(false);
  }catch(e){
    dispatch({type: GET_BLOGGER, payload: null});
    callback(true);
  }
}

export const updateBlogger = (formProps, callback) => async dispatch => {
  await axios.post('http://localhost:5000/update-user', formProps);
  dispatch({type: 'UPDATE', payload: null});
  callback();
};
