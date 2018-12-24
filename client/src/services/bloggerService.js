import axios from 'axios';
import config from 'config.js';

export function fetchBlogger(username){
  return axios.get(config.SERVER_URL+'api/user/get-user/'+username);
}
