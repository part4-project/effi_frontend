import { navBarHeight } from '@styles/subsection-size';
import styled from 'styled-components';
import MakeMeetingButton from './components/make-meeting-button';
import ScheduleCalendar from './components/schedule-calendar';
import UserInfoButton from './components/user-info-button';

const Lobby = () => {
  return (
    <S.LobbyPageWrapper>
      <S.ButtonBox>
        <MakeMeetingButton />
        <UserInfoButton />
      </S.ButtonBox>
      <S.MyScheduleBox>
        <ScheduleCalendar />
      </S.MyScheduleBox>
    </S.LobbyPageWrapper>
  );
};

export default Lobby;

const S = {
  LobbyPageWrapper: styled.div`
    width: 100%;
    background: ${(props) => props.theme.theme02};
    padding: 52px 77px;
    display: flex;
    height: calc(100vh - ${navBarHeight.desktop});
  `,
  ButtonBox: styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    position: relative;
  `,
  MyScheduleBox: styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};
