import { useMemo, useState } from 'react';
import { MEETING_ROOM, TOPIC } from '@constants/mockdata';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Chatting from './components/chatting';
import RoomButton from './components/room-button';
import RoomCamera from './components/room-camera';
import Timer from './components/timer';
import Topics from './components/topics';

const CAMERAS = [{ user: 1 }, { user: 2 }, { user: 3 }, { user: 4 }, { user: 5 }];

const MeetingRoom = () => {
  const navigate = useNavigate();
  const [cameras, setCameras] = useState(CAMERAS);
  const BUTTONS = useMemo(
    () => [
      { type: '카메라', handleClick: () => {} },
      { type: '마이크', handleClick: () => {} },
      {
        type: '나가기',
        handleClick: () => {
          navigate('/group-home');
        },
      },
    ],
    [navigate],
  );

  const handleAddCamButtonClick = () => {
    setCameras([...cameras, { user: 1 }]);
  };

  const handleRemoveCamButtonClick = () => {
    setCameras(cameras.slice(0, cameras.length - 1));
  };
  return (
    <S.Container>
      <S.LeftSection>
        <S.Nav>
          <S.Title>{MEETING_ROOM.title}</S.Title>
          <button onClick={handleAddCamButtonClick} style={{ zIndex: 99 }}>
            AddCam +
          </button>
          <button onClick={handleRemoveCamButtonClick} style={{ zIndex: 99 }}>
            RemoveCam -
          </button>
          <Timer />
        </S.Nav>
        <S.RoomCameraContainer>
          <S.RoomCameraBox>
            {cameras.map((_, idx) => (
              <RoomCamera key={idx} cameraCount={cameras.length} />
            ))}
          </S.RoomCameraBox>
        </S.RoomCameraContainer>
        <S.RoomButtonContainer>
          {BUTTONS.map((BUTTON, idx) => (
            <RoomButton key={idx} type={BUTTON.type} onClick={BUTTON.handleClick} />
          ))}
        </S.RoomButtonContainer>
      </S.LeftSection>
      <S.RightSection>
        <Topics topicList={TOPIC.topic_list} />
        <Chatting />
      </S.RightSection>
    </S.Container>
  );
};

export default MeetingRoom;

const S = {
  Container: styled.div`
    display: flex;
    max-width: 1920px;
    width: 100%;
    height: 100vh;
  `,
  LeftSection: styled.div`
    flex: 1 1 80%;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    &:hover {
      & > div:first-child,
      & > div:last-child {
        visibility: visible;
        opacity: 1;
      }
    }
  `,
  Nav: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 40px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.3s linear;
    position: absolute;
    top: 0;
  `,
  Title: styled.div`
    width: 180px;
    height: 40px;
    opacity: 0.4;
    background: #c1c1c1;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  RoomCameraContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 40px;
  `,
  RoomCameraBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 10px;
  `,
  RoomButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 40px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.3s linear;
    position: absolute;
    bottom: 0;
  `,
  RightSection: styled.div`
    flex: 1 1 20%;
    display: flex;
    flex-direction: column;
    gap: 35px;
    margin: 30px;
  `,
};
