import { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  return (
    <S.MyCalender>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <p>선택된 데이트 객체 {selectedDate?.toLocaleString()}</p>
    </S.MyCalender>
  );
};

export default MyCalendar;

const S = {
  MyCalender: styled.div`
    width: 544px;
    height: 400px;
    border: 1px solid black;
  `,
};
