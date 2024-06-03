import editMeetingIcon from '@assets/icons/kebab.svg';
import onLiveCharacter from '@assets/icons/meeting-live-character.svg';
import onScheduledCharacter from '@assets/icons/meeting-reserve-chracter.svg';
import { MEETING_ROOM, TOPIC } from '@constants/mockdata';
import { TMyScheduleItem } from '@constants/mockdata.type';
import MeetingModal from '@pages/group-home/components/meeting-modal/meeting-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TMeetingProps {
  scheduledMeeting: TMyScheduleItem;
}

const Meetings = ({ scheduledMeeting }: TMeetingProps) => {
  const navigate = useNavigate();

  const handleMeetingClick = () => {
    navigate('/meeting-room');
  };

  return (
    <S.Container>
      <S.Meetings>
        <S.MeetingOnLive onClick={handleMeetingClick}>
          <S.CharacterImage src={onLiveCharacter} />
          <S.MeetingContainerTitle>LIVE ON</S.MeetingContainerTitle>
          <S.MeetingContainerComments>
            Live 중입니다!
            <br /> 얼른 참여하세요!
          </S.MeetingContainerComments>
        </S.MeetingOnLive>

        <S.MeetingOnScheduled>
          <S.CharacterImage src={onScheduledCharacter} />
          <S.StyledModal>
            <MeetingModal title="회의 수정" data={MEETING_ROOM} topicData={TOPIC}>
              <S.EditIcon src={editMeetingIcon} />
            </MeetingModal>
          </S.StyledModal>

          <S.MeetingContainerTitle>{scheduledMeeting.start_date}</S.MeetingContainerTitle>
          <S.MeetingContainerComments>
            '{scheduledMeeting.title}'
            <br /> 회의가 진행됩니다.
          </S.MeetingContainerComments>
        </S.MeetingOnScheduled>
      </S.Meetings>
    </S.Container>
  );
};

export default Meetings;

const MeetingBase = styled.div`
  background-color: white;
  border-radius: 20px;
  aspect-ratio: 14/9;
  width: 560px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const S = {
  Container: styled.div``,

  Meetings: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-bottom: 112px;
  `,

  MeetingOnLive: styled(MeetingBase)`
    cursor: pointer;
  `,
  MeetingOnScheduled: styled(MeetingBase)`
    position: relative;
  `,

  StyledModal: styled.div`
    border-radius: 10px;
    position: absolute;
    right: 40px;
    top: 30px;
  `,

  EditIcon: styled.img`
    width: 40px;
  `,

  CharacterImage: styled.img`
    width: 115px;
    height: fit-content;
    object-fit: contain;
  `,

  MeetingContainerTitle: styled.div`
    margin: 16px 0;
    padding: 0 39px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--blue01);
    border-radius: 10px;
    font-size: 26px;
    font-weight: 900;
    color: white;
  `,

  MeetingContainerComments: styled.p`
    font-size: 20px;
    color: #9e9e9e;
    text-align: center;
    line-height: 1.5;
  `,
};
