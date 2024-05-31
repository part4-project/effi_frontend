import { MEETING_ROOM } from '@constants/mockdata';
import { TimeCaculate, DateSetUp } from '@pages/group-home/utils/time-calculate';
import styled from 'styled-components';

const ReportTime = () => {
  const startDate = DateSetUp(MEETING_ROOM.start_date);
  const endDateAct = DateSetUp(MEETING_ROOM.actual_end_date);
  const endDateExp = DateSetUp(MEETING_ROOM.expected_end_date);
  const allTime = TimeCaculate(startDate, endDateAct);
  const overTime = TimeCaculate(endDateExp, endDateAct);

  return (
    <>
      <p>회의 시간</p>
      <S.TimeContent>
        <S.TimeBox>
          <S.Timer>{allTime}</S.Timer>
          <S.TimeTitle>전체 회의 시간</S.TimeTitle>
        </S.TimeBox>
        <S.TimeBox>
          {overTime ? <S.Timer>{overTime}</S.Timer> : <S.Timer>X</S.Timer>}
          <S.TimeTitle>초과된 시간</S.TimeTitle>
        </S.TimeBox>
      </S.TimeContent>
    </>
  );
};

export default ReportTime;

const S = {
  TimeContent: styled.ul`
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 10px;
    width: 100%;
  `,

  TimeBox: styled.li`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 24px;
  `,

  TimeTitle: styled.strong``,

  Timer: styled.p``,
};
