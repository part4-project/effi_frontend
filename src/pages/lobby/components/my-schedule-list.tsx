import { MY_SCHEDULE_LIST } from '@constants/mockdata';
import styled from 'styled-components';
import { CalendarValue } from '../types/type';
import { formatDate } from '../utils/format-date';

interface MyScheduleListProps {
  selectedDate: CalendarValue;
}

const MyScheduleList = ({ selectedDate }: MyScheduleListProps) => {
  const todaySchedule = MY_SCHEDULE_LIST.filter(({ start_date }) => start_date.startsWith(formatDate(selectedDate)));

  return (
    <S.MyScheduleList>
      <h2>Schedule List</h2>
      <ul>
        {todaySchedule.map((scheduleItem) => (
          <li key={scheduleItem.id}>
            <div>Title: {scheduleItem.title}</div>
            <div>Group: {scheduleItem.group}</div>
            <div>Start Date: {scheduleItem.start_date}</div>
            <div>Expected End Date: {scheduleItem.expected_end_date}</div>
          </li>
        ))}
      </ul>
    </S.MyScheduleList>
  );
};

export default MyScheduleList;

const S = {
  MyScheduleList: styled.div`
    width: 100%;
    height: 470px;
    border: 1px solid black;
  `,
};
