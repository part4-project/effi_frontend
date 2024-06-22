import { useState, useEffect } from 'react';
import editMeetingIcon from '@assets/icons/kebab.svg';
import noDataCharacter from '@assets/icons/meeting-no-data-character.svg';
import { MEETING_ROOM, TOPIC } from '@constants/mockdata';
import { TMyScheduleItem } from '@constants/mockdata.type';
import { useMeetingQuery } from '@hooks/react-query/use-query-meeting';
import MeetingBox from '@pages/group-home/components/meeting-box';
import { useGroupStore } from '@stores/group';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import MeetingModalButton from './meeting-modal/meeting-modal-button';
import MeetingsSkeleton from './skeleton/meetings-skeleton';
import {
  withinIntervalDate,
  checkScheduledMeetingDataTitle,
  checkScheduledMeetingDataComment,
  checkScheduledMeetingData,
} from '../utils/meeting-box-constants';

interface TMeetingProps {
  isAdmin: boolean;
  scheduledMeeting: TMyScheduleItem;
}

const Meetings = ({ isAdmin, scheduledMeeting }: TMeetingProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: meetingData, isLoading, isError } = useMeetingQuery(useGroupStore((state) => state.groupId));
  const [isOnLive, setIsOnLive] = useState(false);

  const handleMeetingClick = () => {
    navigate('/meeting-loading', { state: { roomId: 100000000040 } });
  };

  const liveMeetingProps = {
    isLiveMeetingBox: isOnLive,
    isMeetingData: isOnLive,
    onClick: isOnLive ? handleMeetingClick : undefined,
    src: isOnLive ? theme.onLiveCharacter : noDataCharacter,
    title: isOnLive ? 'LIVE ON' : 'LIVE OFF',
    comments: isOnLive ? 'Live 중입니다!\n얼른 참여하세요!' : '현재 진행중인\n회의가 없습니다.',
  };

  const scheduledMeetingProps = {
    isMeetingData: checkScheduledMeetingData(meetingData, isOnLive),
    src: checkScheduledMeetingData(meetingData, isOnLive) ? theme.onScheduledCharacter : noDataCharacter,
    title: checkScheduledMeetingDataTitle(meetingData, isOnLive),
    comments: checkScheduledMeetingDataComment(meetingData, isOnLive),
  };

  useEffect(() => {
    if (meetingData && meetingData.length > 0) {
      setIsOnLive(withinIntervalDate(meetingData[0].startDate, meetingData[0].expectedEndDate));

      const interval = setInterval(() => {
        setIsOnLive(withinIntervalDate(meetingData[0].startDate, meetingData[0].expectedEndDate));
      }, 60000); // 1분마다 확인

      return () => clearInterval(interval);
    } else {
      setIsOnLive(false);
    }
  }, [meetingData]);

  if (isLoading) return <MeetingsSkeleton />;
  if (isError) return 'Error...';

  return (
    <S.Container>
      <MeetingBox {...liveMeetingProps} />

      <MeetingBox {...scheduledMeetingProps}>
        {scheduledMeeting && (
          <S.StyledModal>
            {isAdmin && (
              <MeetingModalButton title="회의 수정" data={MEETING_ROOM} topicData={TOPIC}>
                <S.EditIcon src={editMeetingIcon} />
              </MeetingModalButton>
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
