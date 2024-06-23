/* eslint-disable no-unused-vars */
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef } from 'react';
import { formatDateToString } from '@pages/group-home/utils/format-date-to-string';
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
      />
      <S.SelectedValue>{formatDateToString(selectedDate)}</S.SelectedValue>
    </S.MeetingDateContainer>
  );
};

export default MeetingDate;

const S = {
  MeetingDateContainer: styled.div`
    display: flex;
    align-items: center;
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
