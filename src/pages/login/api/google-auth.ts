import instance from '@api/axios-instance';
import { userStore } from '@stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';
import { useNavigate } from 'react-router-dom';

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const { login } = userStore();

  const loginMutation = useMutation({
    mutationFn: (code: string) => {
      return instance.post('/login', {
        body: {
          code: code,
        },
      });
    },
    onSuccess: (response) => {
      const data = response.data;
      setCookie('accessToken', data.accessToken);
      login({ email: data.email });
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      navigate('/login');
    },
  });

  return loginMutation;
};

export default GoogleOAuth;
