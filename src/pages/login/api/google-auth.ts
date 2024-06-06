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
          client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET,
          code: code,
          redirect_uri: `${import.meta.env.VITE_BASE_URL}/auth`,
          grant_type: 'authorization_code',
        },
      });
    },
    onSuccess: (response) => {
      const data = response.data;
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
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
