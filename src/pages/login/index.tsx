import GoogleLogo from '@assets/icons/google_logo.svg';
import Logo from '@assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/');
  };
  return (
    <S.LoginPageWrapper>
      <S.TopBox>
        <S.LogoBox>
          <img src={Logo} alt="logo" />
        </S.LogoBox>
        <S.Title>EFFI</S.Title>
        <S.Caption>에피 설명 문구</S.Caption>
      </S.TopBox>
      <S.SocialLoginButton onClick={handleLoginClick}>
        <S.SocialLogoBox>
          <img src={GoogleLogo} alt="google" />
        </S.SocialLogoBox>
        <p>구글로 로그인</p>
      </S.SocialLoginButton>
    </S.LoginPageWrapper>
  );
};

export default Login;

const S = {
  LoginPageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 100vh;
    background-color: #f4f8f7;
  `,
  TopBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  `,
  LogoBox: styled.div``,
  Title: styled.h1`
    font-family: 'Rammetto One', sans-serif;
    font-weight: 400;
    font-size: 30px;
    margin: 0;
    color: #1e1f22;
  `,
  Caption: styled.p`
    font-weight: 700;
    color: #1e1f22;
  `,
  SocialLogoBox: styled.div`
    position: absolute;
    top: 5%;
    left: 4%;
  `,
  SocialLoginButton: styled.button`
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
};
