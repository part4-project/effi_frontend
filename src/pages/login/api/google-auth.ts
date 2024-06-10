import { userStore } from '@stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const { login, logout } = userStore();

  const loginMutation = useMutation({
    mutationFn: (code: string) => {
      return axios.get(`${import.meta.env.VITE_SERVER_URL}/user/login?code=${code}`);
    },
    onSuccess: (response) => {
      console.log(`response = ${response}`);
      const data = response.data;
      setCookie('accessToken', data.accessToken);
      login();
      //navigate('/');
    },
    onError: (error) => {
      console.error(error);
      logout();
      navigate('/login');
    },
  });

  return loginMutation;
};

export default GoogleOAuth;
