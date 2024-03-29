import axios from 'axios';
import { getBearerToken } from '../utils';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.interceptors.request.use((config) => {
  const authorization = getBearerToken();
  config.headers.Authorization = authorization;
  return config;
});

export default axiosInstance;
