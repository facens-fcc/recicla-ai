import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ec2-3-15-235-43.us-east-2.compute.amazonaws.com:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
