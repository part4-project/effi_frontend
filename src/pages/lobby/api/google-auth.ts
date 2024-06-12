import { useQuery } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleOAuth = (code: string | null) => {
  const navigate = useNavigate();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/login?code=${code}`);
        const accessToken = response.headers?.authorization.split(' ')[1];
        setCookie('accessToken', accessToken);
        navigate('/');
        return response.data;
      } catch (error) {
        navigate('/login');
        throw error;
      }
    },
  });
};

export default GoogleOAuth;
