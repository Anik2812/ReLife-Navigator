import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

const createPost = async (post) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/posts`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const likePost = async (postId) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`${API_URL}/posts/${postId}/like`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addComment = async (postId, comment) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/posts/${postId}/comment`, { text: comment }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addReaction = async (postId, reaction) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`${API_URL}/posts/${postId}/reaction`, { reaction }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.reactions;
};

const PostService = {
  getPosts,
  createPost,
  likePost,
  addComment,
  addReaction,
};

export default PostService;