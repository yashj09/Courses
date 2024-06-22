import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://coursesbackend.vercel.app/', 
});

export default axiosInstance;
