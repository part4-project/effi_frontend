import { device } from '@styles/breakpoints';
import styled, { keyframes, css } from 'styled-components';

interface TMeetingBoxProps {
  onClick?: () => void;
  src: string;
  title: string;
  comments: string;
  liveComments?: string;
  meetingComments?: string;
  isLiveMeetingBox?: boolean;
  isMeetingData?: boolean;
  children?: React.ReactElement;
}

const MeetingBox = ({
  onClick,
  src,
  title,
  comments,
  liveComments = '',
  meetingComments = '',
  isLiveMeetingBox = false,
  isMeetingData = false,
  children,
}: TMeetingBoxProps) => {
  return (
    <S.Container onClick={onClick}>
      <S.CharacterImage src={src} $isLiveMeetingBox={isLiveMeetingBox} />
      {children}
      <S.MeetingBoxContent>
        <S.MeetingBoxTitle $isLiveMeetingBox={isLiveMeetingBox} $isMeetingData={isMeetingData}>
          {title}
        </S.MeetingBoxTitle>
        <S.MeetingBoxComment>
          <S.MeetingBoxComments>
            {comments} <span>{liveComments}</span>
          </S.MeetingBoxComments>
          <S.MeetingBoxLiveComments>{liveComments}</S.MeetingBoxLiveComments>
        </S.MeetingBoxComment>
        <S.MeetingBoxMeetingComments>{meetingComments}</S.MeetingBoxMeetingComments>
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
    background-color: ${(props) => props.theme.theme06};
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
      width: 100%;
      min-width: 230px;
      max-width: 360px;
      height: 114px;
      flex-direction: row;
      justify-content: space-around;
      gap: 10px;
      padding: 0 12px;
    }
  `,

  CharacterImage: styled.img<{ $isLiveMeetingBox: boolean }>`
    width: 70px;
    height: 70px;
    object-fit: contain;
    @media ${device.mobile} {
      width: 60px;
      height: 60px;
    }
  `,

  MeetingBoxContent: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  MeetingBoxTitle: styled.div<{ $isLiveMeetingBox: boolean; $isMeetingData: boolean }>`
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

    ${({ $isLiveMeetingBox }) =>
      $isLiveMeetingBox &&
      css`
        animation: ${heartbeat} 1.5s infinite;
      `};

    @media ${device.mobile} {
      margin: 4px 0;
      width: 120px;
      font-size: 14px;
    }
  `,

  MeetingBoxComment: styled.div`
    white-space: nowrap;

    span {
      display: inline;
      @media ${device.mobile} {
        display: none;
      }
    }
  `,

  MeetingBoxComments: styled.p`
    width: 100%;
    font-size: 16px;
    color: var(--gray01);
    text-align: center;
    line-height: 24px;
    white-space: pre-line;

    @media ${device.mobile} {
      font-size: 14px;
    }
  `,

  MeetingBoxLiveComments: styled.p`
    width: 100%;
    font-size: 16px;
    color: var(--gray01);
    text-align: center;
    line-height: 24px;
    display: none;

    @media ${device.mobile} {
      font-size: 14px;
      display: inline;
    }
  `,

  MeetingBoxMeetingComments: styled.p`
    width: 100%;
    font-size: 16px;
    color: var(--gray01);
    text-align: center;
    line-height: 24px;

    @media ${device.mobile} {
      display: none;
    }
  `,
};
