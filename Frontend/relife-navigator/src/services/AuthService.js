import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass the token as Bearer token
    },
  });
  return response.data;
};

const AuthService = {
  register,
  login,
  getProfile,
};

export default AuthService;
