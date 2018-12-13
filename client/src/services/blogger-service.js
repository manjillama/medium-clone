import axios from 'axios';

export const fetchBlogger = async username => {
  const response = await axios.get(`http://localhost:5000/api/user/get-user/${username}`);
  return response.data;
}
