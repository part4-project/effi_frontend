import styled from 'styled-components';
import Chatting from './components/chatting';
import RoomButton from './components/room-button';
import RoomCamera from './components/room-camera';
import Timer from './components/timer';
import Title from './components/title';
import Topics from './components/topics';

const BUTTONS = [{ type: '카메라' }, { type: '마이크' }, { type: '나가기' }];
const CAMERAS = [{ user: 1 }, { user: 2 }, { user: 3 }, { user: 4 }, { user: 5 }];

const MeetingRoom = () => {
  return (
    <S.Container>
      <S.LeftSection>
        <S.Nav>
          <Title />
          <Timer />
        </S.Nav>
        <S.RoomCameraContainer>
          {CAMERAS.map((_, idx) => (
            <RoomCamera key={idx} cameraCount={CAMERAS.length} />
          ))}
        </S.RoomCameraContainer>
        <S.RoomButtonContainer>
          {BUTTONS.map((BUTTON, idx) => (
            <RoomButton key={idx} type={BUTTON.type} />
          ))}
        </S.RoomButtonContainer>
      </S.LeftSection>
      <S.RightSection>
        <Topics />
        <Chatting />
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
  `,
  LeftSection: styled.div`
    width: 1491px;
    display: flex;
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
    padding: 43px 47px 59px 53px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.3s linear;
  `,
  RoomCameraContainer: styled.div`
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 30px;
    padding-left: 101px;
    padding-right: 47px;
  `,
  RoomButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 59px 47px 48px 101px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0s,
      opacity 0.3s linear;
  `,
  RightSection: styled.div`
    width: 429px;
    display: flex;
    flex-direction: column;
    gap: 35px;
    margin: 30px 21px 24px 0;
  `,
};
