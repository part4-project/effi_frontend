/* eslint-disable no-console */
import { useEffect } from 'react';
import { TOPIC } from '@constants/mockdata';
import { useMeetingStore } from '@stores/meeting';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Chatting from './components/chatting';
import KurentoCameras from './components/kurento-cameras';
import MeetingRoomTimer from './components/meeting-room-timer';
import Topics from './components/topics';
import useHistoryBackBlock from './hooks/use-history-back-block';
import useReloadBlock from './hooks/use-reload-block';

const MeetingRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const memberList = useMeetingStore((state) => state.memberList);
  const { id, meetingTitle, startDate, expectedEndDate } = location.state;
  useEffect(() => {
    if (memberList.length == 0) {
      navigate('/meeting-loading');
    }
  });

  useHistoryBackBlock();
  useReloadBlock();

  return (
    <S.Container>
      <S.LeftSection>
        <S.Nav className="nav">
          <S.Title>{meetingTitle}</S.Title>
          <MeetingRoomTimer startDate={startDate} endDate={expectedEndDate} />
        </S.Nav>

        <KurentoCameras roomId={id} startDate={startDate} endDate={expectedEndDate} />
      </S.LeftSection>

      <S.RightSection>
        <Topics topicList={TOPIC.topic_list} />
        <Chatting roomId={id} />
      </S.RightSection>
    </S.Container>
  );
};

export default MeetingRoom;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #212322;
  `,

  LeftSection: styled.div`
    flex: 1 1 75%;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    &:hover {
      & > .nav,
      & > .room-button-container {
        visibility: visible;
        opacity: 1;
      }
    }
  `,
  Nav: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0.3s,
      opacity 0.3s;
    position: absolute;
    top: 0;
    z-index: 10;
  `,
  Title: styled.div`
    max-width: 400px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray05);
    font-size: 26px;
    font-style: normal;
    font-weight: 900;
    line-height: 35px;
  `,

  RightSection: styled.div`
    flex: 1 1 25%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px;
  `,
};
