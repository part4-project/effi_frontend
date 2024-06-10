import { useEffect, useState } from 'react';
import GoogleOAuth from '@pages/login/api/google-auth';
import { navBarHeight } from '@styles/subsection-size';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MakeMeetingButton from './components/make-meeting-button';
import MyCalendar from './components/my-calendar';
import MyScheduleList from './components/my-schedule-list';
import UserInfoButton from './components/user-info-button';
import { CalendarValue } from './types/type';

const Lobby = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(today);

  const loginMutation = GoogleOAuth();
  const navigate = useNavigate();

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      //로그인 인증 api 호출
      loginMutation.mutate(code);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <S.LobbyPageWrapper>
      <S.ButtonBox>
        <MakeMeetingButton />
        <UserInfoButton />
      </S.ButtonBox>
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
    background: var(--blue02);
    padding: 77px;
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
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
};
