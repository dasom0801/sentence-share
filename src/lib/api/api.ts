import axios from 'axios';
import { getBearerToken } from '../utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAPI = async <T>(
  url: string,
  init: RequestInit = {},
): Promise<T> => {
  const token = await getBearerToken();
  let headers = {};
  if (token) {
    headers = { Authorization: token };
  }
  init = { ...init, headers };
  try {
    const response = await fetch(`${BASE_URL}${url}`, init);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.interceptors.request.use(async (config) => {
  const authorization = await getBearerToken();
  if (authorization) {
    config.headers.Authorization = authorization;
  }
  return config;
});

export default axiosInstance;
