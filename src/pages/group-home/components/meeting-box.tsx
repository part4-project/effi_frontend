import { device } from '@styles/breakpoints';
import styled from 'styled-components';

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
    <S.Container onClick={onClick} $isLiveMeetingBox={isLiveMeetingBox}>
      <S.CharacterImage src={src} />
      {children}
      <S.MeetingBoxContent>
        <S.MeetingBoxTitle $isMeetingData={isMeetingData}>{title}</S.MeetingBoxTitle>
        <S.MeetingBoxComments>{comments}</S.MeetingBoxComments>
      </S.MeetingBoxContent>
    </S.Container>
  );
};

export default MeetingBox;

const S = {
  Container: styled.div<{ $isLiveMeetingBox: boolean }>`
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
    cursor: ${({ $isLiveMeetingBox }) => $isLiveMeetingBox && 'pointer'};
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

  CharacterImage: styled.img`
    width: 70px;
    height: 70px;
    object-fit: contain;
  `,

  MeetingBoxContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  MeetingBoxTitle: styled.div<{ $isMeetingData: boolean }>`
    margin: 16px 0;
    padding: 8px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    background-color: ${({ $isMeetingData, theme }) => ($isMeetingData ? theme.theme01 : 'var(--gray01)')};
    border-radius: 10px;
    font-size: 20px;
    font-weight: 900;
    color: var(--white);
    @media ${device.tablet} {
      padding: 8px 10px;
    }
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
