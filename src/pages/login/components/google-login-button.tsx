import GoogleLogo from '@assets/icons/google_logo.svg';
import styled from 'styled-components';

const GoogleLoginButton = () => {
  //구글 로그인 리다이렉트
  const handleLoginClick = () => {
    //redirect_uri 수정 해야함
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?' +
      `client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}&` +
      `redirect_uri=http://api.effi.club/user/login&` +
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
    position: relative;
    background-color: var(--white);
    border-radius: 100px;
    font-weight: 700;
    line-height: 19px;
    width: 320px;
    padding-block: 18px;
    p {
      font-size: 16px;
      color: var(--blue05);
    }
  `,
  GoogleLogoBox: styled.div`
    position: absolute;
    top: 5%;
    left: 4%;
  `,
};
