import axios from 'axios';
import config from 'config.js';

export function fetchStories(query){
  return axios.get(config.SERVER_URL+'api/search/stories/'+query);
}
