import { GET_BLOGGER, ERROR } from './types';

import axios from 'axios';

export const fetchBlogger = (username, callback) => async dispatch => {
  try{
    const response = await axios.get(`http://localhost:5000/api/get-user/${username}`);
    if(response.data.error)
      throw new Error('User Not Found');
    dispatch({type: GET_BLOGGER, payload: response.data});
    callback(false);
  }catch(e){
    dispatch({type: ERROR, payload: null});
    callback(true);
  }
}


export const updateBlogger = (formProps) => {
  axios.post('http://localhost:5000/update-user', formProps);
};
