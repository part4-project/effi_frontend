import instance from '@api/axios-instance';
import { userStore } from '@stores/user-store';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from '@utils/cookie';
import { useNavigate } from 'react-router-dom';

const useGoogleOauth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => {
      const accessToken = getCookie('accessToken');
      return instance.post('/auth', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: (response) => {
      userStore.setState({ userData: response.data });
      navigate('/');
    },
    onError: (error) => {
      console.error(error);
      userStore.setState({ userData: { email: 'error' } });
    },
  });

  return loginMutation;
};

export default useGoogleOauth;
