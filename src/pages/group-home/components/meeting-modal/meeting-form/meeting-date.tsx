/* eslint-disable no-unused-vars */
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef } from 'react';
import { formatDateToString } from '@pages/group-home/utils/format-date-to-string';
import { commonCalendarStyle, meetingDateStyle } from '@styles/calendar';
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
    margin-bottom: 10px;
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
    ${commonCalendarStyle}
    ${meetingDateStyle}
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
