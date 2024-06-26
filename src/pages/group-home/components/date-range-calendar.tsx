import { useEffect } from 'react';
import { device } from '@styles/breakpoints';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import styled, { useTheme } from 'styled-components';

interface TDateRangeCalendarProps {
  dateRange: Date[];
  // eslint-disable-next-line no-unused-vars
  setDateRange: (dateRange: Date[]) => void;
  currentMonthRange: Date[];
  refetch: () => void;
}

const DateRangeCalendar = ({ dateRange, setDateRange, currentMonthRange, refetch }: TDateRangeCalendarProps) => {
  const theme = useTheme();

  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      setTimeout(() => refetch(), 0);
    }
  }, [endDate, refetch, startDate]);

  const handleClickCalendarRefreshButton = () => {
    setDateRange(currentMonthRange);
    refetch();
  };

  const handleDateChange = (dates: Date[]) => {
    const [start, end] = dates;
    if (end) {
      const endOfDay = new Date(end);
      endOfDay.setHours(23, 59, 59, 999);
      setDateRange([start, endOfDay]);
    } else {
      setDateRange([start, end]);
    }
  };

  return (
    <S.Container>
      <S.DatepickerWrapper>
        <S.StyledDatePicker
          locale={ko}
          portalId="root-portal"
          placeholderText="일자 선택"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          dateFormat="yy-MM-dd"
          onChange={handleDateChange}
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
        <S.CalendarIcon src={theme.calendar} />
        <S.ArrowIcon src={theme.arrowRight} />
      </S.DatepickerWrapper>
      <S.RefreshButton src={theme.refreshIcon} onClick={handleClickCalendarRefreshButton} />
    </S.Container>
  );
};

export default DateRangeCalendar;

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
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,

  DatepickerWrapper: styled.div`
    position: relative;
    // 달력 커스텀
  `,

  StyledDatePicker: styled(DatePicker)`
    background-color: var(--white);
    color: ${(props) => props.theme.theme04};
    font-size: 14px;
    border-radius: 10px;
    gap: 21px;
    padding: 10px 55px 10px 10px;
    cursor: pointer;
    @media ${device.tablet} {
      width: 200px;
      font-size: 11px;
    }
  `,

  CalendarIcon: styled.img`
    position: absolute;
    top: calc(50% - 9px);
    right: 30px;
    width: 18px;
    height: 18px;
    pointer-events: none;
  `,

  ArrowIcon: styled.img`
    position: absolute;
    top: calc(50% - 12px);
    right: 6px;
    width: 24px;
    height: 24px;
    pointer-events: none;
  `,

  RefreshButton: styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
  `,
};
