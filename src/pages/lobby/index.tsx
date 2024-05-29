import styled from 'styled-components';
import DropdownButton from './components/dropdown-button';
import MyCalendar from './components/my-calendar';
import MyScheduleList from './components/my-schedule-list';
import QuickButton from './components/quick-button';

const Lobby = () => {
  return (
    <S.LobbyPageWrapper>
      <S.QuickButtonBox>
        <DropdownButton>회의 생성</DropdownButton>
        <QuickButton>내 정보</QuickButton>
      </S.QuickButtonBox>
      <S.MyScheduleBox>
        <MyCalendar />
        <MyScheduleList />
      </S.MyScheduleBox>
    </S.LobbyPageWrapper>
  );
};

export default Lobby;

const S = {
  LobbyPageWrapper: styled.div`
    border: 1px solid black;
    /* margin: 76px 0 0 360px; // nav, side 가정 */
    padding: 20px;
    display: flex;
  `,
  QuickButtonBox: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    flex-grow: 3;
    border: 1px solid black;
  `,
  MyScheduleBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};
