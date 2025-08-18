import Config from 'react-native-config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
