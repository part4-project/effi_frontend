import { getCookie } from '@utils/cookie';
import axios from 'axios';

export interface TAxiosError {
  errorMessage: string;
  errorCode: string;
  statusCode: number;
}

const instance = axios.create({
  baseURL: 'https://api.effi.club/',
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    } else {
      window.location.href = '/login';
      return config;
    }
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (config) => {
    const token = getCookie('accessToken');
    if (!token) {
      window.location.href = '/login';
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
