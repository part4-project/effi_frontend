import editMeetingIcon from '@assets/icons/kebab.svg';
import onLiveCharacter from '@assets/icons/meeting-live-character.svg';
import noDataCharacter from '@assets/icons/meeting-no-data-character.svg';
import onScheduledCharacter from '@assets/icons/meeting-reserve-chracter.svg';
import { MEETING_ROOM, TOPIC } from '@constants/mockdata';
import { TMyScheduleItem } from '@constants/mockdata.type';
import MeetingBox from '@pages/group-home/components/meeting-box';
import MeetingModal from '@pages/group-home/components/meeting-modal/meeting-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TMeetingProps {
  isOnLive: boolean;
  isAdmin: boolean;
  scheduledMeeting: TMyScheduleItem;
}

const Meetings = ({ isOnLive, isAdmin, scheduledMeeting }: TMeetingProps) => {
  const navigate = useNavigate();

  const handleMeetingClick = () => {
    navigate('/meeting-room');
  };

  const liveMeetingProps = {
    isLiveMeetingBox: isOnLive,
    isMeetingData: isOnLive,
    onClick: isOnLive ? handleMeetingClick : undefined,
    src: isOnLive ? onLiveCharacter : noDataCharacter,
    title: isOnLive ? 'LIVE ON' : 'LIVE OFF',
    comments: isOnLive ? 'Live 중입니다!\n얼른 참여하세요!' : '현재 진행중인\n회의가 없습니다.',
  };

  const scheduledMeetingProps = {
    isMeetingData: !!scheduledMeeting,
    src: scheduledMeeting ? onScheduledCharacter : noDataCharacter,
    title: scheduledMeeting ? scheduledMeeting.start_date : 'NOT YET',
    comments: scheduledMeeting ? `'${scheduledMeeting.title}'\n회의가 진행됩니다.` : `현재 예정인\n회의가 없습니다.`,
  };

  return (
    <S.Container>
      {/* 진행중인 회의 */}
      <MeetingBox {...liveMeetingProps} />

      {/* 예약된 회의 */}
      <MeetingBox {...scheduledMeetingProps}>
        {scheduledMeeting && (
          <S.StyledModal>
            {isAdmin && (
              <MeetingModal title="회의 수정" data={MEETING_ROOM} topicData={TOPIC}>
                <S.EditIcon src={editMeetingIcon} />
              </MeetingModal>
            )}
          </S.StyledModal>
        )}
      </MeetingBox>
    </S.Container>
  );
};

export default Meetings;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 90px;
  `,

  StyledModal: styled.div`
    border-radius: 10px;
    position: absolute;
    right: 28px;
    top: 25px;
  `,

  EditIcon: styled.img`
    width: 20px;
  `,
};
