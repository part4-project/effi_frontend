import arrowLeft from '@assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <S.Container>
      <S.Link as={Link} to="/">
        <img src={arrowLeft} alt="뒤로가기" />
      </S.Link>
      <S.Title>{title}</S.Title>
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
    width: 180px;
    height: 40px;
    opacity: 0.4;
    background: #c1c1c1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
