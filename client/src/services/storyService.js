import axios from 'axios';
import config from 'config.js';

export function fetchStory(storyId){
  return axios.get(config.SERVER_URL+'api/story/'+storyId);
}

export function fetchUserStories(bloggerId){
  return axios.get(config.SERVER_URL+'api/user/get-stories/'+bloggerId);
}
