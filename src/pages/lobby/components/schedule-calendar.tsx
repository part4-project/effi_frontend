import { useEffect, useRef, useState } from 'react';
import { MY_SCHEDULE_LIST } from '@constants/mockdata';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import DropDownBox from './dropdown-box';
import ScheduleListItem from './schedule-list-item';
import { useCalendarDropdown } from '../hooks/use-calendar-dropdown';
import { ScheduleList } from '../types/type';
import { addScheduleDot } from '../utils/add-schedule-dot';
import { filterSchedule } from '../utils/filter-schedule';

const ScheduleCalendar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [filterdScheduleList, setFilterdScheduleList] = useState<ScheduleList[]>(
    filterSchedule(MY_SCHEDULE_LIST, selectedDate),
  );
  const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
  const { isDropdownOpen, handleDropdownOpen, handleDropdownClose } = useCalendarDropdown();

  const handleCalendarReset = () => {
    if (selectedDate) {
      setSelectedDate(null);
      setFilterdScheduleList([]);
    }
  };

  const handleCalendarOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      handleCalendarReset();
    }
  };

  useEffect(() => {
    addScheduleDot(MY_SCHEDULE_LIST);
  }, [currMonth]);

  useEffect(() => {
    if (filterdScheduleList.length) return handleDropdownOpen();
    return handleDropdownClose();
  }, [filterdScheduleList, handleDropdownOpen, handleDropdownClose]);

  useEffect(() => {
    const navigationButtons = document.querySelectorAll('.react-datepicker__navigation');
    navigationButtons.forEach((button) => {
      button.addEventListener('click', handleCalendarReset);
    });

    return () => {
      navigationButtons.forEach((button) => {
        button.removeEventListener('click', handleCalendarReset);
      });
    };
  }, []);

  return (
    <S.Container ref={ref}>
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        minDate={new Date('2000-01-01')}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setFilterdScheduleList(filterSchedule(MY_SCHEDULE_LIST, date));
        }}
        onMonthChange={(date) => setCurrMonth(date.getMonth() + 1)}
        onClickOutside={handleCalendarOutsideClick}
        inline
        showDisabledMonthNavigation
        autoFocus={false}
      />
      <DropDownBox type="schedule-calendar" isDropdownOpen={isDropdownOpen}>
        {filterdScheduleList.map((schedule, idx) => (
          <ScheduleListItem key={idx} groupId={schedule.id} groupName={schedule.group} meetingTitle={schedule.title} />
        ))}
      </DropDownBox>
    </S.Container>
  );
};

export default ScheduleCalendar;

const S = {
  Container: styled.div`
    width: 100%;
    height: 70%;
    position: relative;

    .react-datepicker {
      width: 100%;
      height: 100%;
      padding: 10% 8%;
      font-family: 'Pretendard';
      font-size: 16px;
      background-color: var(--white);
      border: none;
      border-radius: 10px;
    }

    .react-datepicker__navigation {
      top: auto;
      padding: 0;
    }

    .react-datepicker__navigation--previous {
      left: auto;
      right: 12%;
    }

    .react-datepicker__navigation--next {
      right: 6%;
    }

    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
    }

    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
      margin-top: 0;
      color: var(--black);
      font-weight: 700;
      font-size: 24px;
      margin-bottom: 0;
    }

    .react-datepicker__header {
      text-align: start;
      background-color: var(--white);
      border-bottom: none;
      border-top-left-radius: 0.3rem;
      padding: 0;
      position: relative;
      display: grid;
      grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
      height: 25%;
    }

    .react-datepicker__header__dropdown,
    .react-datepicker__header__dropdown--scroll {
      display: none;
    }

    .react-datepicker__day-names {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      justify-items: center;
      white-space: nowrap;
      margin-bottom: 0;
      font-size: 16px;
      font-weight: 700;
    }

    .react-datepicker__day-names :first-child {
      color: var(--red01);
    }

    .react-datepicker__month {
      margin: 0;
      text-align: center;
      width: 100%;
      height: 75%;
      display: grid;
      grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
      flex-grow: 1;
    }

    .react-datepicker__week {
      white-space: nowrap;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      justify-items: center;
    }

    .react-datepicker__day--outside-month {
      opacity: 0.4;
    }

    .react-datepicker__week :first-child {
      color: var(--red01);
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      color: var(--black);
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: center;
      text-align: center;
      margin: 0;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: center;
      position: relative;
    }

    .react-datepicker__day:hover,
    .react-datepicker__month-text:hover,
    .react-datepicker__quarter-text:hover,
    .react-datepicker__year-text:hover {
      border-radius: 100%;
      background-color: var(--blue02);
    }

    .react-datepicker__day--selected:hover,
    .react-datepicker__day--in-selecting-range:hover,
    .react-datepicker__day--in-range:hover,
    .react-datepicker__month-text--selected:hover,
    .react-datepicker__month-text--in-selecting-range:hover,
    .react-datepicker__month-text--in-range:hover,
    .react-datepicker__quarter-text--selected:hover,
    .react-datepicker__quarter-text--in-selecting-range:hover,
    .react-datepicker__quarter-text--in-range:hover,
    .react-datepicker__year-text--selected:hover,
    .react-datepicker__year-text--in-selecting-range:hover,
    .react-datepicker__year-text--in-range:hover {
      background-color: var(--blue01);
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range,
    .react-datepicker__year-text--selected,
    .react-datepicker__year-text--in-selecting-range,
    .react-datepicker__year-text--in-range {
      border-radius: 100%;
      background-color: var(--blue01);
      color: var(--white);
    }

    .react-datepicker__day--keyboard-selected,
    .react-datepicker__month-text--keyboard-selected,
    .react-datepicker__quarter-text--keyboard-selected,
    .react-datepicker__year-text--keyboard-selected {
      border-radius: 100%;
      background-color: var(--white);
    }

    .dot-container {
      position: absolute;
      top: 120%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 4px;
    }

    .dot {
      width: 4px;
      height: 4px;
      background-color: var(--blue01);
      border-radius: 100%;
    }
  `,
};
