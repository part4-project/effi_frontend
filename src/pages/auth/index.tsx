import { useEffect } from 'react';
import GoogleOAuth from '@pages/login/api/google-auth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const loginMutation = GoogleOAuth();
  const navigate = useNavigate();

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      //로그인 인증 api 호출
      loginMutation.mutate(code);
    } else {
      //navigate('/login');
    }
  }, [code]);

  return (
    <div>
      <p>로그인중입니다...</p>
    </div>
  );
};

export default Auth;
