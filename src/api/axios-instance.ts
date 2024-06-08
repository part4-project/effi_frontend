import { getCookie } from '@utils/cookie';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 쿠키에서 accessToken 있으면 header에 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/*
리프레쉬 토큰 관련

// 인증 유효하지 않으면 accessToken 재발급
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        // 아직 경로 모름
        const response = await axios.get(`경로 입력 예정`);

        const newAccessToken = response.data.accessToken;
        setCookie('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (error) {
        console.error(error);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);
*/

export default instance;
