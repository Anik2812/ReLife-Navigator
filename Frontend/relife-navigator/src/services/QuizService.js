import axios from 'axios';
import AuthService from './AuthService';

const API_URL = process.env.REACT_APP_API_URL;

const getQuestions = async () => {
  const response = await axios.get(`${API_URL}/quiz/questions`);
  return response.data;
};

const submitAnswers = async (answers) => {
  const user = AuthService.getCurrentUser();
  if (!user) throw new Error('User is not authenticated');

  const response = await axios.post(`${API_URL}/quiz/submit`, { answers }, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response.data;
};

const QuizService = {
  getQuestions,
  submitAnswers,
};

export default QuizService;