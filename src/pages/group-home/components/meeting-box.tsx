import { device } from '@styles/breakpoints';
import styled, { keyframes, css } from 'styled-components';

interface TMeetingBoxProps {
  onClick?: () => void;
  src: string;
  title: string;
  comments: string;
  isLiveMeetingBox?: boolean;
  isMeetingData?: boolean;
  children?: React.ReactElement;
}

const MeetingBox = ({
  onClick,
  src,
  title,
  comments,
  isLiveMeetingBox = false,
  isMeetingData = false,
  children,
}: TMeetingBoxProps) => {
  return (
    <S.Container onClick={onClick}>
      <S.CharacterImage src={src} $isLiveMeetingBox={isLiveMeetingBox} />
      {children}
      <S.MeetingBoxContent $isLiveMeetingBox={isLiveMeetingBox}>
        <S.MeetingBoxTitle $isMeetingData={isMeetingData}>{title}</S.MeetingBoxTitle>
        <S.MeetingBoxComments>{comments}</S.MeetingBoxComments>
      </S.MeetingBoxContent>
    </S.Container>
  );
};

export default MeetingBox;

const heartbeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const S = {
  Container: styled.div`
    position: relative;
    background-color: var(--white);
    border-radius: 20px;
    aspect-ratio: 7/4;
    width: 472px;
    height: 274px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: ${({ onClick }) => onClick && 'pointer'};
    @media ${device.mobile} {
      min-width: 228px;
      width: 100%;
      height: 114px;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;
      padding: 0 12px;
    }
  `,

  CharacterImage: styled.img<{ $isLiveMeetingBox: boolean }>`
    width: 70px;
    height: 70px;
    object-fit: contain;
    ${({ $isLiveMeetingBox }) =>
      $isLiveMeetingBox &&
      css`
        animation: ${heartbeat} 1.5s infinite;
      `};
  `,

  MeetingBoxContent: styled.div<{ $isLiveMeetingBox: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${({ $isLiveMeetingBox }) =>
      $isLiveMeetingBox &&
      css`
        animation: ${heartbeat} 1.5s infinite;
      `};
  `,

  MeetingBoxTitle: styled.div<{ $isMeetingData: boolean }>`
    margin: 16px 0;
    padding: 8px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    background-color: ${({ $isMeetingData, theme }) => ($isMeetingData ? theme.theme01 : 'var(--gray01)')};
    border-radius: 10px;
    font-size: 20px;
    font-weight: 900;
    color: var(--white);
    @media ${device.mobile} {
      margin: 4px 0;
    }
  `,

  MeetingBoxComments: styled.p`
    font-size: 16px;
    color: var(--gray01);
    text-align: center;
    line-height: 24px;
    white-space: pre-line;
  `,
};
