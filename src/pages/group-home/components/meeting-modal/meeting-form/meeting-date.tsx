/* eslint-disable no-unused-vars */
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef } from 'react';
import { formatDateToString } from '@pages/group-home/utils/format-date-to-string';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

interface MeetingDateProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

const DatePickerCustomInput = forwardRef<HTMLButtonElement, { onClick?: () => void }>(({ onClick }, ref) => (
  <S.SelectCustomButton onClick={onClick} ref={ref}>
    회의 일시
  </S.SelectCustomButton>
));

const MeetingDate = ({ selectedDate, onChange }: MeetingDateProps) => {
  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();

  const isToday = selectedDate && selectedDate.toDateString() === currentDateTime.toDateString();
  const minTime = isToday
    ? currentHour === 23
      ? new Date()
      : new Date(currentDateTime.setHours(currentHour, currentMinute))
    : new Date(currentDateTime.setHours(0, 0, 0, 0));
  const maxTime = new Date(currentDateTime.setHours(23, 59));

  return (
    <S.MeetingDateContainer>
      <DatePicker
        selected={selectedDate}
        dateFormat="yyyy/MM/dd - aa h:mm"
        onChange={onChange}
        showTimeSelect
        timeIntervals={15}
        minDate={new Date()}
        minTime={minTime}
        maxTime={maxTime}
        customInput={<DatePickerCustomInput />}
        timeCaption="시간 선택"
        timeFormat="aa h:mm"
        locale={ko}
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
      />
      <S.SelectedValue>{formatDateToString(selectedDate)}</S.SelectedValue>
    </S.MeetingDateContainer>
  );
};

export default MeetingDate;

const S = {
  CustomHeaderContainer: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  CustomHeaderDate: styled.div`
    color: ${(props) => props.theme.scheduleText};
    font-weight: 700;
    font-size: 20px;
    padding-inline: 5px;
    display: flex;
    align-items: center;
  `,
  CustomHeaderButtonBox: styled.div`
    display: flex;
  `,
  MeetingDateContainer: styled.div`
    display: flex;
    align-items: center;

    .react-datepicker {
      width: 450px;
      height: 100%;
      padding: 8% 5%;
      font-family: 'Pretendard';
      font-size: 16px;
      background-color: ${(props) => props.theme.schedule};
      border: none;
      border-radius: 10px;
      display: flex;
      text-align: center;
      border: 1px solid var(--gray01);
    }

    .react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
      fill: ${(props) => props.theme.schedule};
      color: ${(props) => props.theme.schedule};
    }

    .react-datepicker-popper .react-datepicker__triangle {
      stroke: var(--gray01);
    }

    .react-datepicker__navigation {
      top: auto;
      padding: 0;
    }

    .react-datepicker__navigation-icon {
      width: auto;
      &::before {
        position: static;
      }
    }

    .react-datepicker__navigation--previous {
      position: static;
    }

    .react-datepicker__navigation--next {
      position: static;
    }

    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
    }

    .react-datepicker__current-month,
    .react-datepicker-year-header {
      margin-top: 0;
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.scheduleText};
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 0;
    }

    .react-datepicker__time-container {
      float: right;
      border-left: 1px solid var(--gray01);
      width: 100px;
      background-color: ${(props) => props.theme.schedule};
    }

    .react-datepicker-time__header {
      /* margin-top: 0; */
      color: ${(props) => props.theme.scheduleText};
      font-weight: 700;
      font-size: 15px;
      text-align: center;
      /* margin-bottom: 0; */
      /* border-bottom: 1px solid gray; */
      /* padding-top: 2px; */
      /* padding: 2px; */
    }

    .react-datepicker__day--disabled,
    .react-datepicker__month-text--disabled,
    .react-datepicker__quarter-text--disabled,
    .react-datepicker__year-text--disabled {
      opacity: 0.4;
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item {
      height: 30px;
      font-size: 12px;
      /* padding: 10px; */
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.theme.schedule};
      color: ${(props) => props.theme.scheduleText};
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item:hover {
      background-color: ${(props) => props.theme.theme02};
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--disabled {
      color: var(--gray05);
    }
    .react-datepicker__header {
      text-align: start;
      background-color: ${(props) => props.theme.schedule};
      border-bottom: none;
      border-top-left-radius: 0.3rem;
      padding: 0;
      position: relative;
      display: grid;
      grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
      /* height: 32px; */
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
      color: ${(props) => props.theme.scheduleText};
      display: inline-block;
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

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item--selected {
      background-color: ${(props) => props.theme.theme01};
      color: var(--white);
    }
    .react-datepicker__day:hover,
    .react-datepicker__month-text:hover,
    .react-datepicker__quarter-text:hover,
    .react-datepicker__year-text:hover {
      border-radius: 100%;
      background-color: ${(props) => props.theme.theme02};
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
      background-color: ${(props) => props.theme.theme01};
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
      background-color: ${(props) => props.theme.text02};
      color: ${(props) => props.theme.schedule};
    }

    .react-datepicker__day--keyboard-selected,
    .react-datepicker__month-text--keyboard-selected,
    .react-datepicker__quarter-text--keyboard-selected,
    .react-datepicker__year-text--keyboard-selected {
      border-radius: 100%;
      background-color: ${(props) => props.theme.schedule};
    }
  `,
  SelectedValue: styled.p`
    color: ${(props) => props.theme.text11};
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    margin-left: 12px;
  `,

  SelectCustomButton: styled.button`
    color: ${(props) => props.theme.text11};
    font-weight: 700;
    line-height: 24px;
    text-decoration-line: underline;
  `,
};
