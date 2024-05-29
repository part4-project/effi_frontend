import arrowLeft from '@assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = () => {
  return (
    <S.Container>
      <S.Link as={Link} to="/">
        <img src={arrowLeft} alt="뒤로가기" />
      </S.Link>
      <S.Title>제목</S.Title>
    </S.Container>
  );
};

export default Title;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
  `,
  Link: styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Title: styled.div`
    width: 149px;
    height: 40px;
    opacity: 0.4;
    background: #c1c1c1;
  `,
};
