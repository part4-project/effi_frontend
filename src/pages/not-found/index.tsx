import { device } from '@styles/breakpoints';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <S.NotFoundContainer>
      <S.NotFoundTitleImage src={theme.icon404} alt="404_title" />
      <S.NotFoundContentImage src={theme.door404} alt="404_content" />
      <S.LinkButton onClick={() => navigate(-1)}>이전페이지로 돌아가기</S.LinkButton>
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
    gap: 24px;
    height: 100vh;
    background-color: ${(props) => props.theme.theme02};
  `,

  NotFoundTitleImage: styled.img`
    max-width: 60px;
    width: 100%;
    height: auto;

    @media ${device.mobile} {
      max-width: 40px;
    }
  `,

  NotFoundContentImage: styled.img`
    max-width: 281px;
    width: 100%;
    height: auto;

    @media ${device.mobile} {
      margin-top: -12px;
      max-width: 175px;
    }
  `,

  LinkButton: styled.button`
    cursor: pointer;
    background-color: ${(props) => props.theme.button03};
    border-radius: 8px;
    width: 375px;
    height: 55px;
    color: ${(props) => props.theme.text14};
    font-size: 20px;
    font-weight: 700;
    text-align: center;

    @media ${device.mobile} {
      margin-top: 48px;
      width: 312px;
    }
  `,
};
