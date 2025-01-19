import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:5000/api/';

const getPosts = () => {
  return axios.get(API_URL + 'posts');
};

const createPost = (title, description, tags) => {
  const user = AuthService.getCurrentUser();
  return axios.post(API_URL + 'posts', { title, description, tags }, {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
};

const likePost = (postId) => {
  const user = AuthService.getCurrentUser();
  return axios.patch(API_URL + `posts/${postId}/like`, {}, {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
};

const addComment = (postId, text) => {
  const user = AuthService.getCurrentUser();
  return axios.post(API_URL + `posts/${postId}/comment`, { text }, {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
};

export default {
  getPosts,
  createPost,
  likePost,
  addComment,
};