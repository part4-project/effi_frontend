import { useState, useEffect } from 'react';
import noDataCharacter from '@assets/icons/meeting-no-data-character.svg';
import { useMeetingListQuery, useMeetingQuery } from '@hooks/react-query/use-query-meeting';
import MeetingBox from '@pages/group-home/components/meeting-box';
import { useGroupStore } from '@stores/group';
import { device } from '@styles/breakpoints';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import MeetingModal from './meeting-modal/meeting-modal';
import MeetingsSkeleton from './skeleton/meetings-skeleton';
import useCheckMinuteTime from '../hooks/use-check-minute-time';
import {
  withinIntervalDate,
  checkScheduledMeetingDataTitle,
  checkScheduledMeetingDataComment,
  checkScheduledMeetingData,
} from '../utils/meeting-box-constants';

interface TMeetingProps {
  isAdmin: boolean;
}

const Meetings = ({ isAdmin }: TMeetingProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const checkMinuteTime = useCheckMinuteTime();
  const {
    data: meetingData,
    isLoading,
    isError,
    refetch,
  } = useMeetingListQuery(useGroupStore((state) => state.groupId));
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);

  const { data: selectedMeetingData, isLoading: isMeetingLoading } = useMeetingQuery(selectedMeetingId);
  const [isOnLive, setIsOnLive] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const liveMeetingDateTitle = isLoading || (meetingData !== '' && meetingData[0].meetingTitle);

  const handleMeetingClick = () => {
    navigate('/meeting-loading');
  };
  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedMeetingId(null);
  };
  const handleModalOpen = (meetingId: number) => {
    setSelectedMeetingId(meetingId);
    setIsOpen(true);
  };
  const liveMeetingProps = {
    isLiveMeetingBox: isOnLive,
    isMeetingData: isOnLive,
    onClick: isOnLive ? handleMeetingClick : undefined,
    src: isOnLive ? theme.onLiveCharacter : noDataCharacter,
    title: isOnLive ? 'LIVE ON' : 'LIVE OFF',
    comments: isOnLive ? `'${liveMeetingDateTitle}'` : '현재 진행중인\n회의가 없습니다.',
    liveComments: isOnLive ? 'Live 중입니다!' : '',
    meetingComments: isOnLive ? '얼른 참여하세요!' : '',
  };

  const scheduledMeetingProps = {
    isMeetingData: checkScheduledMeetingData(meetingData, isOnLive),
    src: checkScheduledMeetingData(meetingData, isOnLive) ? theme.onScheduledCharacter : noDataCharacter,
    title: checkScheduledMeetingDataTitle(meetingData, isOnLive),
    comments: checkScheduledMeetingDataComment(meetingData, isOnLive),
  };

  useEffect(() => {
    refetch();
    if (meetingData && meetingData.length > 0) {
      setIsOnLive(withinIntervalDate(meetingData[0].startDate, meetingData[0].expectedEndDate));
    } else {
      setIsOnLive(false);
    }
  }, [checkMinuteTime, meetingData, refetch]);

  if (isLoading) return <MeetingsSkeleton />;
  if (isError) return 'Error...';

  const isEdit = isAdmin && meetingData;

  return (
    <>
      {isOpen && !isMeetingLoading && (
        <MeetingModal title="회의 수정" onClose={handleModalClose} isOpen={isOpen} data={selectedMeetingData} />
      )}
      <S.Container>
        <MeetingBox {...liveMeetingProps} />
        <MeetingBox {...scheduledMeetingProps}>
          <S.StyledModal>
            {isEdit && (
              <S.EditIcon
                src={theme.editIcon}
                onClick={() => {
                  if (meetingData.length == 1) {
                    handleModalOpen(meetingData[0]?.id);
                  } else {
                    if (isOnLive) {
                      handleModalOpen(meetingData[1]?.id);
                    } else {
                      handleModalOpen(meetingData[0]?.id);
                    }
                  }
                }}
              />
            )}
          </S.StyledModal>
        </MeetingBox>
      </S.Container>
    </>
  );
};

export default Meetings;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 90px;
    @media ${device.tablet} {
      margin-bottom: 60px;
    }
    @media ${device.mobile} {
      flex-direction: column;
      margin-bottom: 30px;
    }
  `,

  StyledModal: styled.div`
    border-radius: 10px;
    position: absolute;
    right: 28px;
    top: 25px;

    @media ${device.mobile} {
      left: 14px;
      top: 10px;
    }
  `,

  EditIcon: styled.img`
    cursor: pointer;
    width: 20px;

    @media ${device.mobile} {
      width: 16px;
    }
  `,
};
