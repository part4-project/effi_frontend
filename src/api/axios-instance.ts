import { userStore } from '@stores/user-store';
import { getCookie, setCookie } from '@utils/cookie';
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

//인증 유효하지 않으면 accessToken 재발급
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized : 만료되었거나 올바르지 않은 토큰 형식
    if (error.response.status === 401 && !originalRequest._retry) {
      // 재시도 플래그 설정
      originalRequest._retry = true;

      try {
        // 경로 입력 예정
        const response = await axios.get(`경로 입력 예정`);

        const newAccessToken = response.data.accessToken;
        setCookie('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (error) {
        const { logout } = userStore();

        console.error(error);

        logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
