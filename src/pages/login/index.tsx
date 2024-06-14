import GoogleLoginButton from '@pages/login/components/google-login-button';
import styled, { useTheme } from 'styled-components';

const Login = () => {
  const theme = useTheme();

  return (
    <S.LoginPageWrapper>
      <S.TopBox>
        <S.LogoBox>
          <img src={theme.logo} alt="logo" />
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
    background-color: ${(props) => props.theme.theme02};
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
    color: ${(props) => props.theme.text03};
  `,
  Caption: styled.p`
    font-weight: 700;
    color: ${(props) => props.theme.text03};
  `,
};
