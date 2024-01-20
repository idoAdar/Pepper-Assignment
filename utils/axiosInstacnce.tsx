import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.npoint.io/',
});

axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    return false;
  },
);

export default axiosInstance;
