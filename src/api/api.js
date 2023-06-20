import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-18-223-195-43.us-east-2.compute.amazonaws.com:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
