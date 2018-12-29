import axios from 'axios';
import config from 'config.js';

export function addBlogTag(formData, token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/action/publish/add-tag/'+blogId, formData, { headers });
}

export function removeBlogTag(tagId, token, blogId){
  const headers = {'authorization': token};
  return axios.delete(config.SERVER_URL+`auth/blog/action/publish/remove-tag/${blogId}/${tagId}`, { headers });
}

export function getBlogTag(token, blogId){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'auth/blog/action/publish/get-tag/'+blogId, { headers });
}
