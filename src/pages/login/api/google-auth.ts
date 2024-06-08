import instance from '@api/axios-instance';
import { userStore } from '@stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';
import { useNavigate } from 'react-router-dom';

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const { login, logout } = userStore();

  const loginMutation = useMutation({
    mutationFn: (code: string) => {
      return instance.post('/user/login', {
        body: {
          code: code,
        },
      });
    },
    onSuccess: (response) => {
      const data = response.data;
      setCookie('accessToken', data.accessToken);
      login();
      navigate('/');
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
