import axios from 'axios';
import config from 'config.js';

export function checkAvaiblity(formData, token){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/api/user/username-check', formData, { headers });
}

export function changeUsername(formData, token){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/api/user/change-username', formData, { headers });
}
