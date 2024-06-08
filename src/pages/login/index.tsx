import Logo from '@assets/logo.svg';
import styled from 'styled-components';
import GoogleLoginButton from './components/google-login-button';

const Login = () => {
  return (
    <S.LoginPageWrapper>
      <S.TopBox>
        <S.LogoBox>
          <img src={Logo} alt="logo" />
        </S.LogoBox>
        <S.Title>EFFI</S.Title>
        <S.Caption>에피 설명 문구</S.Caption>
      </S.TopBox>
      <GoogleLoginButton />
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
    background-color: var(--blue02);
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
    color: var(--blue05);
  `,
  Caption: styled.p`
    font-weight: 700;
    color: var(--blue05);
  `,
};
