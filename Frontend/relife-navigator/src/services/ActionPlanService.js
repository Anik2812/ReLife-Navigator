import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:5000/api/';

const saveActionPlan = (tasks, progress) => {
  const user = AuthService.getCurrentUser();
  return axios.post(API_URL + 'action-plan', { tasks, progress }, {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
};

const getActionPlan = () => {
  const user = AuthService.getCurrentUser();
  return axios.get(API_URL + 'action-plan', {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
};

export default {
  saveActionPlan,
  getActionPlan,
};