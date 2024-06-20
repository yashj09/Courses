import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', // Update with your backend base URL
});

export default axiosInstance;
