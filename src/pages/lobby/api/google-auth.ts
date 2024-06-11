import { useMutation } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const GoogleOAuth = () => {
  //const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (code: string) => {
      return await axios.get(`${import.meta.env.VITE_SERVER_URL}///////user/login?code=${code}`);
    },
    onSuccess: (response) => {
      // console.log(response);
      const accessToken = response.headers['authorization'];
      console.log(accessToken);
      setCookie('accessToken', accessToken);
      //navigate('/');
    },
    onError: (error) => {
      console.error(error);
      //navigate('/login');
    },
  });

  return loginMutation;
};

export default GoogleOAuth;
