import { getCookie } from '@utils/cookie';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.effi.club/',
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');

    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
