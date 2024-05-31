import { useState } from 'react';
import UserInfoModal from '@components/modal/user-info-modal';
import { navBarHeight } from '@styles/subsection-size';
import styled from 'styled-components';
import DropdownButton from './components/dropdown-button';
import MyCalendar from './components/my-calendar';
import MyScheduleList from './components/my-schedule-list';
import QuickButton from './components/quick-button';
import { CalendarValue } from './types/type';

const Lobby = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(today);
  return (
    <S.LobbyPageWrapper>
      <S.QuickButtonBox>
        <DropdownButton>회의 생성</DropdownButton>
        <UserInfoModal>
          <QuickButton>내 정보</QuickButton>
        </UserInfoModal>
      </S.QuickButtonBox>
      <S.MyScheduleBox>
        <MyCalendar DateValue={selectedDate} onChangeDate={setSelectedDate} />
        <MyScheduleList selectedDate={selectedDate} />
      </S.MyScheduleBox>
    </S.LobbyPageWrapper>
  );
};

export default Lobby;

const S = {
  LobbyPageWrapper: styled.div`
    width: 100%;
    border: 1px solid black;
    padding: 20px;
    display: flex;
    height: calc(100vh - ${navBarHeight.desktop});
  `,
  QuickButtonBox: styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    border: 1px solid black;
  `,
  MyScheduleBox: styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};
