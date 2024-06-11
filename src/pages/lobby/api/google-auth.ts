import { useMutation } from '@tanstack/react-query';
import { setCookie } from '@utils/cookie';

import axios from 'axios';

const GoogleOAuth = () => {
  const loginMutation = useMutation({
    mutationFn: async (code: string) => {
      return await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/login?code=${code}`);
    },
    onSuccess: (response) => {
      console.log(response.headers);
      // const accessToken = response.headers.authorization.split[' '][1];
      // console.log(accessToken);
      // setCookie('accessToken', accessToken);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return loginMutation;
};

export default GoogleOAuth;
