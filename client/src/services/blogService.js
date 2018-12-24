import axios from 'axios';
import config from 'config.js';

export function writePost(formData, token){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/create-blog',formData, { headers });
}

export function publishPost(token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/action/publish/'+blogId, null, { headers });
}

export function fetchPost(id, token){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'auth/blog/action/edit/'+id, { headers });
}

export function getUserStoriesCount(token){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'auth/blog/get/blog-count/', { headers });
}

export function getUserPost(token, status){
  const headers = {'authorization': token};
  return axios.get(config.SERVER_URL+'auth/api/user/blogs/'+status, { headers });
}

export function uploadStoryImage(formData, token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/action/upload-thumbnail/'+blogId, formData, { headers });
}

export function removeStoryImage(token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/action/remove-thumbnail/'+blogId, null, { headers });
}

export function deleteStory(token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/action/delete/'+blogId, null, { headers });
}
