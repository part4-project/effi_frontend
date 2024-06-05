import instance from '@api/axios-instance';
import { userStore } from '@stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';
import { useNavigate } from 'react-router-dom';

const useGoogleOauth = () => {
  const navigate = useNavigate();

  const { setAuth } = userStore();

  const loginMutation = useMutation({
    mutationFn: (code: string) => {
      return instance.post('/login', {
        body: {
          client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_SECRET,
          code: code,
          redirect_uri: import.meta.env.VITE_BASE_URL,
          grant_type: 'authorization_code',
        },
      });
    },
    onSuccess: (response) => {
      setAuth(true);
      setCookie('accessToken', response.data);
      userStore.setState({ userData: response.data });
    },
    onError: () => {
      setAuth(true);
      userStore.setState({ userData: { email: 'test' } });
      navigate('/');
    },
  });

  return loginMutation;
};

export default useGoogleOauth;
