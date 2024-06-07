import DatePicker from 'react-datepicker';
import styled from 'styled-components';

interface TDateRangeCalendarProps {
  dateRange: [Date | null, Date | null];
  // eslint-disable-next-line no-unused-vars
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
}

const DateRangeCalendar = ({ dateRange, setDateRange }: TDateRangeCalendarProps) => {
  const [startDate, endDate] = dateRange;

  return (
    <S.DatepickerWrapper>
      <S.StyledDatePicker
        placeholderText="일자 선택"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        dateFormat="yy-MM-dd"
        onChange={(date) => {
          setDateRange(date as [Date | null, Date | null]);
        }}
      />
    </S.DatepickerWrapper>
  );
};

export default DateRangeCalendar;

const S = {
  DatepickerWrapper: styled.div`
    // 여기서 달력 커스텀
  `,

  StyledDatePicker: styled(DatePicker)`
    background-color: var(--white);
    color: var(--blue01);
    font-size: 14px;
    border-radius: 10px;
    gap: 21px;
    padding: 9px 6px 9px 17px;
    cursor: pointer;
    width: 160px;
  `,
};
