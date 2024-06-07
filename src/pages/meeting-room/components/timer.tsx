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
    <S.Container $isTimeOver={isDurationOver}>
      <S.Img src={isDurationOver ? clockOverIcon : clockIcon} alt="타이머" />
      <p>{isDurationOver ? '초과시간' : '시작시간'}</p>
      <p>{formatDurationFromSeconds(currElapsedSeconds)}</p>
    </S.Container>
  );
};

export default Timer;

const S = {
  Container: styled.div<{ $isTimeOver: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      color: ${({ $isTimeOver }) => ($isTimeOver ? '#F9667B ' : 'var(--gray01)')};
      text-align: center;
      font-weight: 700;
      line-height: 28px; /* 175% */
      letter-spacing: -0.6px;
    }
  `,
  Img: styled.img`
    width: 24px;
    height: 24px;
  `,
};
