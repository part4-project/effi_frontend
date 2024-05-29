import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  return (
    <S.LoginPageWrapper>
      <S.LogoBox>로고</S.LogoBox>
      <S.SocialLoginButton
        onClick={() => {
          navigate('/');
        }}
      >
        소셜로그인
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
  `,
  LogoBox: styled.div`
    width: 208px;
    height: 208px;
    border: 1px solid black;
  `,
  SocialLoginButton: styled.button`
    width: 388px;
    height: 84px;
    border: 1px solid black;
  `,
};
