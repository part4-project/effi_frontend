/* eslint-disable no-console */
import { useEffect } from 'react';
import clockOverIcon from '@assets/icons/clock-over.svg';
import clockIcon from '@assets/icons/clock.svg';
import styled from 'styled-components';
import useMeetingRoomTimer from '../hooks/use-meeting-room-timer';
import { formatDurationFromSeconds } from '../utils/format-duration-from-seconds';

interface TimerProps {
  startDate: string;
  endDate: string;
  isMeetingFinished: boolean;
}

const MeetingRoomTimer = ({ startDate, endDate, isMeetingFinished }: TimerProps) => {
  const { currElapsedSeconds, targetDuration, isDurationOver } = useMeetingRoomTimer(startDate, endDate);

  useEffect(() => {
    if (isMeetingFinished) {
      const totalTime = formatDurationFromSeconds(
        isDurationOver ? currElapsedSeconds + targetDuration : currElapsedSeconds,
        'api',
      );
      const overTime = formatDurationFromSeconds(isDurationOver ? currElapsedSeconds : 0, 'api');
      console.log('total: ', totalTime, 'over', overTime); //api 전송 데이터
    }
  }, [isMeetingFinished]);

  if (!currElapsedSeconds) return <S.CalculteNotice>시간을 계산중...</S.CalculteNotice>;

  return (
    <S.Container>
      <S.TimerImg src={isDurationOver ? clockOverIcon : clockIcon} alt="타이머" />
      <S.TimerText $isDurationOver={isDurationOver}>{isDurationOver ? '초과시간' : '시작시간'}</S.TimerText>
      <S.TimerText $isDurationOver={isDurationOver}>{formatDurationFromSeconds(currElapsedSeconds)}</S.TimerText>
    </S.Container>
  );
};

export default MeetingRoomTimer;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  TimerImg: styled.img`
    width: 24px;
    height: 24px;
  `,
  TimerText: styled.p<{ $isDurationOver: boolean }>`
    color: ${({ $isDurationOver }) => ($isDurationOver ? '#F9667B' : 'var(--gray01)')};
    text-align: center;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
  CalculteNotice: styled.div`
    display: flex;
    align-items: center;
    color: var(--gray01);
  `,
};
