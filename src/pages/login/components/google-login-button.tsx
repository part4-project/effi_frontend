import GoogleLogo from '@assets/icons/google_logo.svg';
import styled from 'styled-components';

const GoogleLoginButton = () => {
  //구글 로그인 리다이렉트
  const handleLoginClick = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?' +
      `client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}&` +
      `redirect_uri=http://localhost:5173/auth&` +
      'response_type=code&' +
      'scope=email profile';
  };

  return (
    <S.GoogleLoginButton onClick={() => handleLoginClick()}>
      <S.GoogleLogoBox>
        <img src={GoogleLogo} alt="google" />
      </S.GoogleLogoBox>
      <p>구글로 로그인</p>
    </S.GoogleLoginButton>
  );
};

export default GoogleLoginButton;

const S = {
  GoogleLoginButton: styled.button`
    cursor: pointer;
    position: relative;
    background-color: #ffffff;
    border-radius: 100px;
    border: 10px solid #000000;
    font-weight: 700;
    line-height: 19px;
    width: 320px;
    padding-block: 8px;
    p {
      font-size: 16px;
      color: #1e1f22;
    }
  `,
  GoogleLogoBox: styled.div`
    position: absolute;
    top: 11%;
    left: 4%;
  `,
};
