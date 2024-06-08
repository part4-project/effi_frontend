/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import clockOverIcon from '@assets/icons/clock-over.svg';
import clockIcon from '@assets/icons/clock.svg';
import styled from 'styled-components';
import useTimer from '../hooks/use-timer';

interface TimerProps {
  targetDurationInSeconds: number;
  isMeetingFinished: boolean;
  onMeetingTotalTimeChange: (time: string) => void;
  onMeetingOverTimeChange: (time: string) => void;
}

const Timer = ({
  targetDurationInSeconds,
  isMeetingFinished,
  onMeetingTotalTimeChange,
  onMeetingOverTimeChange,
}: TimerProps) => {
  const { currElapsedSeconds, formatDurationFromSeconds, isDurationOver } = useTimer(targetDurationInSeconds);

  useEffect(() => {
    if (isMeetingFinished) {
      const overTime = isDurationOver ? currElapsedSeconds : 0;
      onMeetingOverTimeChange(formatDurationFromSeconds(overTime));
      const totalTime = isDurationOver ? currElapsedSeconds + targetDurationInSeconds : currElapsedSeconds;
      onMeetingTotalTimeChange(formatDurationFromSeconds(totalTime));
    }
  }, [isMeetingFinished]);

  return (
    <S.Container>
      <S.TimerImg src={isDurationOver ? clockOverIcon : clockIcon} alt="타이머" />
      <S.TimerText $isDurationOver={isDurationOver}>{isDurationOver ? '초과시간' : '시작시간'}</S.TimerText>
      <S.TimerText $isDurationOver={isDurationOver}>{formatDurationFromSeconds(currElapsedSeconds)}</S.TimerText>
    </S.Container>
  );
};

export default Timer;

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
    color: ${({ $isDurationOver }) => ($isDurationOver ? '#F9667B ' : 'var(--gray01)')};
    text-align: center;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
};
