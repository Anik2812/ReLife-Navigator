import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  // Static login for testing
  if (email === 'test@example.com' && password === 'password123') {
    return { token: 'static-token-for-testing' };
  }

  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getCurrentUser = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  return { token };
};

const AuthService = {
  register,
  login,
  getProfile,
  getCurrentUser,
};

export default AuthService;