import { useEffect, useState } from 'react';
import { TCalendarMeetingFetchInfo } from '@api/meeting/meeting-request.type';
import EmptyNotice from '@components/empty-notice';
import { useCalendarMeetingQuery } from '@hooks/react-query/use-query-meeting';
import { commonCalendarStyle, scheduleCalendarStyle } from '@styles/calendar';
import { addMonths, format, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import DropDownBox from './dropdown-box';
import ScheduleListItem from './schedule-list-item';
import ScheduleListItemSkeleton from './skeleton/schedule-list-item-skeleton';
import { addScheduleDot } from '../utils/add-schedule-dot';
import { filterSchedule } from '../utils/filter-schedule';

const ScheduleCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currMonthDate, setCurrMonthDate] = useState(new Date());
  const { data: scheduleMeetings, isLoading } = useCalendarMeetingQuery(
    format(subMonths(currMonthDate, 1), 'yyyy-MM'),
    format(addMonths(currMonthDate, 1), 'yyyy-MM'),
  );

  const [filterdScheduleList, setFilterdScheduleList] = useState<TCalendarMeetingFetchInfo[]>([]);

  useEffect(() => {
    if (scheduleMeetings) {
      setFilterdScheduleList(filterSchedule(selectedDate, scheduleMeetings));
    }
  }, [scheduleMeetings, selectedDate]);

  useEffect(() => {
    if (scheduleMeetings) {
      addScheduleDot(scheduleMeetings);
    }
  }, [scheduleMeetings, currMonthDate]);

  return (
    <S.Container>
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        minDate={new Date('2000-01-01')}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setFilterdScheduleList(filterSchedule(date, scheduleMeetings));
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <S.CustomHeaderContainer>
            <S.CustomHeaderDate>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</S.CustomHeaderDate>
            <S.CustomHeaderButtonBox>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="react-datepicker__navigation react-datepicker__navigation--previous"
              >
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"></span>
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="react-datepicker__navigation react-datepicker__navigation--next"
              >
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next"></span>
              </button>
            </S.CustomHeaderButtonBox>
          </S.CustomHeaderContainer>
        )}
        onMonthChange={(date) => setCurrMonthDate(date)}
        inline
        showDisabledMonthNavigation
        autoFocus={false}
      />
      <DropDownBox type="schedule-calendar" isDropdownOpen={true}>
        {isLoading ? (
          new Array(3).fill(0).map((_, i) => <ScheduleListItemSkeleton key={i} />)
        ) : filterdScheduleList.length ? (
          filterdScheduleList.map((meeting) => (
            <ScheduleListItem
              key={meeting.id}
              groupId={meeting.groupId}
              groupName={meeting.groupName}
              startDate={meeting.startDate}
              meetingTitle={meeting.meetingTitle}
            />
          ))
        ) : (
          <S.EmptyNoticeContainer>
            <EmptyNotice borderType="none">금일 스케줄이 없습니다.</EmptyNotice>
          </S.EmptyNoticeContainer>
        )}
      </DropDownBox>
    </S.Container>
  );
};

export default ScheduleCalendar;

const S = {
  CustomHeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  CustomHeaderDate: styled.div`
    color: ${(props) => props.theme.scheduleText};
    font-weight: 700;
    font-size: 24px;
    padding-inline: 5px;
  `,
  CustomHeaderButtonBox: styled.div`
    display: flex;
  `,
  Container: styled.div`
    width: 100%;
    height: 70%;
    position: relative;
    ${commonCalendarStyle}
    ${scheduleCalendarStyle}
  `,
  EmptyNoticeContainer: styled.div`
    height: 15vh;
  `,
};
