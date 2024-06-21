import { useEffect } from 'react';
import { setCookie } from '@utils/cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const Auth = () => {
  const theme = useTheme();
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

  return (
    <S.AuthContainer>
      <img src={theme.effiPhone} alt="effi_phone_icon" />
      <h1>로그인 중입니다.</h1>
    </S.AuthContainer>
  );
};

export default Auth;

const S = {
  AuthContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100vh;
    background-color: ${(props) => props.theme.theme02};

    img {
      max-width: 64px;
      width: 100%;
      height: auto;
    }

    h1 {
      color: ${(props) => props.theme.button03};
      font-size: 28px;
    }
  `,
};
