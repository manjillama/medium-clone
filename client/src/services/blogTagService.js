import axios from 'axios';
import config from 'config.js';

export function addBlogTag(formData, token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'blog/action/publish/add-tag/'+blogId, formData, { headers });
}

export function removeBlogTag(formData, token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'blog/action/publish/remove-tag/'+blogId, formData, { headers });
}

export function getBlogTag(token, blogId){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'blog/action/publish/get-tag/'+blogId, { headers });
}
