import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://coursesbackend-fbnbxfykr-yash-jains-projects.vercel.app/', // Update with your backend base URL
});

export default axiosInstance;
