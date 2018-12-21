import axios from 'axios';
import config from 'config.js';

export function writePost(formData, token){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'blog/create-blog',formData, { headers });
}

export function publishPost(formData, token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'blog/action/publish/'+blogId, formData, { headers });
}

export function fetchPost(id, token){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'blog/action/edit/'+id, { headers });
}

export function getUserPost(token, status){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'api/user/blogs/'+status, { headers });
}
