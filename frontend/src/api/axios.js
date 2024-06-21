import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://coursesbackend.vercel.app/', // Update with your backend base URL
});

export default axiosInstance;
