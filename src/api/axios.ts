import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.39.128.29:8080/api',
  // baseURL: 'http://192.168.0.76:8080/api', // 이서 데스크탑
  // baseURL: 'http://192.168.4.197:8080/api', // KOSA (703, 706 데스크탑)
  // baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export default axiosInstance;
