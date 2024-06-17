import { MEETING_ROOM } from '@constants/mockdata';
import { DateSetUpMock, TimeCalculate, TimeString } from '@pages/group-home/utils/time-calculate';
import styled from 'styled-components';

const ReportTime = () => {
  const startDate = DateSetUpMock(MEETING_ROOM.start_date);
  const endDateAct = DateSetUpMock(MEETING_ROOM.actual_end_date);
  const endDateExp = DateSetUpMock(MEETING_ROOM.expected_end_date);
  const allTime = TimeString(TimeCalculate(startDate, endDateAct));
  const overTime = TimeString(TimeCalculate(endDateExp, endDateAct));
  return (
    <S.Container>
      <S.TimeContent>
        <S.TimeBox>
          <S.TimeTitle>전체 회의 시간</S.TimeTitle>
          <S.Timer>{allTime}</S.Timer>
        </S.TimeBox>
        <S.TimeBox>
          <S.TimeTitle>초과된 시간</S.TimeTitle>
          {overTime ? <S.Timer $overTime={!!overTime}>{overTime}</S.Timer> : <S.Timer>-</S.Timer>}
        </S.TimeBox>
      </S.TimeContent>
    </S.Container>
  );
};

export default ReportTime;

const S = {
  Container: styled.div`
    grid-area: time;
    display: flex;
    border-radius: 10px;
    border: 2px solid ${(props) => props.theme.box};
    height: 180px;
    padding: 10px;
    background: ${(props) => props.theme.theme10};
  `,

  TimeContent: styled.ul`
    display: flex;
    padding: 10px;
    width: 100%;
    height: 100%;
    gap: 30px;
  `,

  TimeBox: styled.li`
    padding: 24px;
    width: 50%;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 0;
      right: -20px;
      width: 2px;
      height: 100%;
      background-color: ${(props) => props.theme.box};
    }
  `,

  TimeTitle: styled.p`
    color: ${(props) => props.theme.text11};
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
  `,

  Timer: styled.p<{ $overTime?: boolean }>`
    color: ${({ $overTime, theme }) => ($overTime ? theme.red : theme.text02)};
    text-align: center;
    font-size: 30px;
    font-weight: 900;
  `,
};
