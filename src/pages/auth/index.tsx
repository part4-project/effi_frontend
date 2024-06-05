import { useEffect } from 'react';
import useGoogleOauth from '@hooks/use-google-oauth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const loginMutation = useGoogleOauth();
  const navigate = useNavigate();

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  // 로그인 성공
  const handleLobbyPage = () => {
    navigate('/');
    window.location.reload();
  };

  // 로그인 실패
  const handleLoginPage = () => {
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    if (code) {
      loginMutation.mutate(code);
      handleLobbyPage();
    } else {
      handleLoginPage();
    }
  }, [code, navigate]);

  return (
    <div>
      <p>로그인중입니다...</p>
    </div>
  );
};

export default Auth;
