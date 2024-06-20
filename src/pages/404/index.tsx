import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <S.NotFoundContainer>
      <S.NotFoundTitle>
        <strong>404</strong> Not Found
      </S.NotFoundTitle>
      <S.NotFoundContent>
        {` 페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.\n입력하신 주소가 정확한지 다시 한 번 확인해주세요.`}
      </S.NotFoundContent>
      <S.HomeLink>
        <Link to="/">홈 화면으로</Link>
      </S.HomeLink>
    </S.NotFoundContainer>
  );
};

export default NotFound;

const S = {
  NotFoundContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    height: 100vh;
    background-color: ${(props) => props.theme.theme02};
  `,

  NotFoundTitle: styled.h1`
    color: ${(props) => props.theme.text02};
    font-size: 44px;
    font-weight: 800;
    strong {
      color: ${(props) => props.theme.red};
      font-size: 48px;
      font-weight: 900;
    }
  `,

  NotFoundContent: styled.h2`
    white-space: pre-line;
    color: ${(props) => props.theme.text02};
    font-size: 24px;
    font-weight: 900;
    text-align: center;
  `,

  HomeLink: styled.div`
    cursor: pointer;
    background-color: ${(props) => props.theme.button03};
    border-radius: 8px;
    width: 140px;
    height: 40px;
    padding: 10px 20px;
    color: ${(props) => props.theme.theme02};
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  `,
};
