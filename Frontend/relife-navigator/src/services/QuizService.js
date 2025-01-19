import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:5000/api/quiz/';

const getQuestions = () => {
  return axios.get(API_URL + 'questions');
};

const submitAnswers = (answers) => {
  const user = AuthService.getCurrentUser();
  return axios.post(API_URL + 'submit', { answers }, {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
};

export default {
  getQuestions,
  submitAnswers,
};