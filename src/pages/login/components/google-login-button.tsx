import GoogleLogo from '@assets/icons/google_logo.svg';
import useGoogleOauth from '@hooks/use-google-oauth';
import { useGoogleLogin } from '@react-oauth/google';
import { getCookie, setCookie } from '@utils/cookie';
import styled from 'styled-components';

const GoogleLoginButton = () => {
  const loginMutation = useGoogleOauth();

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setCookie('accessToken', response.access_token);
      loginMutation.mutate();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  console.log(getCookie('accessToken'));

  return (
    <>
      <S.GoogleLoginButton onClick={() => handleLogin()}>
        <S.GoogleLogoBox>
          <img src={GoogleLogo} alt="google" />
        </S.GoogleLogoBox>
        <p>구글로 로그인</p>
      </S.GoogleLoginButton>
    </>
  );
};

export default GoogleLoginButton;

const S = {
  GoogleLoginButton: styled.button`
    position: relative;
    background-color: #ffffff;
    border-radius: 100px;
    border: 10px solid #000000;
    font-weight: 700;
    line-height: 19px;
    width: 320px;
    padding-block: 18px;
    p {
      font-size: 16px;
      color: #1e1f22;
    }
  `,
  GoogleLogoBox: styled.div`
    position: absolute;
    top: 5%;
    left: 4%;
  `,
};
