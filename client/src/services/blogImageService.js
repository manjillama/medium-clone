import axios from 'axios';
import config from 'config.js';

export function uploadStoryImage(formData, token, blogId){
  const headers = {'authorization': token};
  return axios.post(config.SERVER_URL+'auth/blog/action/upload-image/'+blogId, formData, { headers });
}
