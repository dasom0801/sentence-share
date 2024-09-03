import axios from 'axios';
import { getBearerToken } from '../utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAPI = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const token = await getBearerToken();
  let headers = {};
  if (token) {
    headers = { Authorization: token };
  }
  if (init) {
    init = { ...init, ...headers };
  }
  try {
    const response = await fetch(`${BASE_URL}${url}`, init);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('요청에 실패했습니다');
    }
  } catch (error) {
    throw error;
  }
};

const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.interceptors.request.use((config) => {
  const authorization = getBearerToken();
  config.headers.Authorization = authorization;
  return config;
});

export default axiosInstance;
