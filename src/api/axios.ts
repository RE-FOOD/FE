import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.76:8080/api', // 이서 데스크탑
  // baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export default axiosInstance;
