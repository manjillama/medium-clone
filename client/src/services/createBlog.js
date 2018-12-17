import axios from 'axios';

export function writePost(formData, token){
  const headers = {'authorization': token};
  return axios.post('http://localhost:5000/blog/create-blog',formData, { headers });
}

export function fetchPost(id, token){
  const headers = {'authorization': token};
  return axios.get('http://localhost:5000/blog/action/edit/'+id, { headers });
}
