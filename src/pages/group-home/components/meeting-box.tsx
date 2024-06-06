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
      <S.MeetingBoxTitle $isMeetingData={isMeetingData}>{title}</S.MeetingBoxTitle>
      <S.MeetingBoxComments>{comments}</S.MeetingBoxComments>
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
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    cursor: ${({ $isLiveMeetingBox }) => $isLiveMeetingBox && 'pointer'};
  `,

  CharacterImage: styled.img`
    width: 70px;
    height: 70px;
    object-fit: contain;
  `,

  MeetingBoxTitle: styled.div<{ $isMeetingData: boolean }>`
    margin: 16px 0;
    padding: 8px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ $isMeetingData }) => ($isMeetingData ? 'var(--blue01)' : '#9e9e9e')};
    border-radius: 10px;
    font-size: 20px;
    font-weight: 900;
    color: var(--white);
  `,

  MeetingBoxComments: styled.p`
    font-size: 16px;
    color: #9e9e9e;
    text-align: center;
    line-height: 24px;
    white-space: pre-line;
  `,
};
