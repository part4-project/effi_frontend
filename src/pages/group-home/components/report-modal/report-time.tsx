import { TimeCalculate, TimeString } from '@pages/group-home/utils/time-calculate';
import styled from 'styled-components';

interface TReportTime {
  startDate: string;
  expectedEndDate: string;
  actualEndDate: string;
}

const ReportTime = ({ startDate, expectedEndDate, actualEndDate }: TReportTime) => {
  const allTimeResult = TimeString(TimeCalculate(new Date(startDate), new Date(actualEndDate)));
  const expectedTimeResult = TimeString(TimeCalculate(new Date(startDate), new Date(expectedEndDate)));
  const overTime = TimeString(TimeCalculate(new Date(expectedEndDate), new Date(actualEndDate)));
  // allTimeResult가 잘못된 값인지 확인
  const allTime = allTimeResult.trim() === '' ? expectedTimeResult : allTimeResult;

  return (
    <S.Container>
      <S.TimeContent>
        <S.TimeBox>
          <S.TimeTitle>전체 회의 시간</S.TimeTitle>
          <S.Timer>{allTime}</S.Timer>
        </S.TimeBox>
        <S.TimeBox>
          <S.TimeTitle>초과된 시간</S.TimeTitle>
          {overTime.trim() !== '' ? <S.Timer $overTime={!!overTime}>{overTime}</S.Timer> : <S.Timer>-</S.Timer>}
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
    word-break: keep-all;
  `,
};
