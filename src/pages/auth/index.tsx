import { useEffect } from 'react';
import { setCookie } from '@utils/cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  const handleSetCookie = async (code: string | null) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/login?code=${code}`);
    if (response.status === 200) {
      const accessToken = response.headers?.authorization.split(' ')[1];
      setCookie('accessToken', accessToken);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    handleSetCookie(code);
  }, [code]);

  return <div>로그인 중~</div>;
};

export default Auth;
