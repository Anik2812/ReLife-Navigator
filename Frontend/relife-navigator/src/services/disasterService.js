import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ensure the URL matches your backend

const getDisasters = async () => {
  const response = await axios.get(`${API_URL}/disasters`);
  return response.data;
};

const DisasterService = {
  getDisasters,
};

export default DisasterService;