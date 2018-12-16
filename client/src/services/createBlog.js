import axios from 'axios';

export function createBlog(formData, token){
  console.log("reducer",formData.get('post'));
  const headers = {'authorization': token};
  return axios.post('http://localhost:5000/blog/create-blog',formData, { headers })
}
