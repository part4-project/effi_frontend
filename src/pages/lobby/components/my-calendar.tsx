import { MY_SCHEDULE_LIST } from '@constants/mockdata';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { CalendarValue } from '../types/type';
import { formatDate } from '../utils/format-date';
import 'react-calendar/dist/Calendar.css';

interface MyCalendarProps {
  DateValue: CalendarValue;
  onChangeDate: (value: CalendarValue) => void;
}

const MyCalendar = ({ DateValue, onChangeDate }: MyCalendarProps) => {
  return (
    <S.MyCalender>
      <Calendar
        calendarType="gregory" // 일 월 화 ~ 토 순서로 요일 정렬
        // showNeighboringMonth={false} // 인접한 이전,이후 월에 해당하는 일자 숨기기
        formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })} // 일자 숫자만 보이게
        next2Label={null} // 이후년도 이동 화살표 제거
        prev2Label={null} // 이전년도 이동 화살표 제거
        onChange={onChangeDate}
        value={DateValue}
        tileContent={({ date, view }) => {
          const html = [];
          // if (view === 'month' && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
          //   html.push(<S.StyledToday key={'today'}>오늘</S.StyledToday>);
          // }
          if (MY_SCHEDULE_LIST.find(({ start_date }) => start_date.startsWith(formatDate(date)))) {
            html.push(<S.StyledDot key={date.toLocaleString()} />);
          }
          return <>{html}</>;
        }}
      />
    </S.MyCalender>
  );
};

export default MyCalendar;

const S = {
  MyCalender: styled.div`
    width: 100%;
    height: 400px;
    border: 1px solid black;

    // 전체 캘린더
    .react-calendar {
      width: 100%;
      height: 100%;
    }

    // 상단 요일 부분
    .react-calendar__month-view__weekdays abbr {
      text-decoration: none;
      font-weight: 800;
      font-size: 16px;
    }
    // 오늘 날짜 표시 커스텀
    .react-calendar__tile--now {
      background-color: #ffb6c1;
      border-radius: 16px;
    }

    // 상단 년월 커스텀
    .react-calendar__navigation__label > span {
      font-size: 16px;
      font-weight: 800;
    }
    // 일자 타일 커스텀
    .react-calendar__tile {
      font-size: 16px;
      padding: 15px;
      position: relative;
    }

    // 날짜 hover, focus 시 타일
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: #d3d3d3 !important;
      border-radius: 16px;
    }

    // 선택된 날짜 타일
    .react-calendar__tile--active {
      background-color: #d3d3d3 !important;
      border-radius: 16px;
    }
  `,

  // 오늘 날짜에 '오늘' 텍스트 스타일
  // StyledToday: styled.div`
  //   font-size: 12px;
  //   color: red;
  //   position: absolute;
  //   top: 60%;
  //   left: 50%;
  //   transform: translateX(-50%);
  // `,

  // 일정이 있는 일자에 점 표시 스타일
  StyledDot: styled.div`
    background-color: blue;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
  `,
};
