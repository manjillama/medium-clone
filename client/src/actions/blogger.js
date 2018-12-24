import { GET_BLOGGER } from './types';
import config from 'config';
import axios from 'axios';

export const fetchBlogger = (username, callback) => async dispatch => {
  try{
    const response = await axios.get(`${config.SERVER_URL}api/user/get-user/${username}`);
    if(response.data.error)
      throw new Error('User Not Found');
    dispatch({type: GET_BLOGGER, payload: response.data});
    callback(false);
  }catch(e){
    dispatch({type: GET_BLOGGER, payload: null});
    callback(true);
  }
}

export const updateBlogger = (token, formProps, callback) => async dispatch => {
  const headers = {'authorization': token};
  await axios.post(config.SERVER_URL+'auth/api/user/edit', formProps,  { headers });
  dispatch({type: 'UPDATE', payload: null});
  callback();
};
