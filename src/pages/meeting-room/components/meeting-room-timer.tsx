/* eslint-disable no-console */
import clockOverIcon from '@assets/icons/clock-over.svg';
import clockIcon from '@assets/icons/clock.svg';
import styled from 'styled-components';
import useMeetingRoomTimer from '../hooks/use-meeting-room-timer';
import { formatDurationFromSeconds } from '../utils/format-duration-from-seconds';

interface TimerProps {
  startDate: string;
  endDate: string;
}

const MeetingRoomTimer = ({ startDate, endDate }: TimerProps) => {
  const { currElapsedSeconds, isDurationOver } = useMeetingRoomTimer(startDate, endDate);

  if (!currElapsedSeconds) return <S.CalculateNotice>시간을 계산중...</S.CalculateNotice>;

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
  CalculateNotice: styled.div`
    display: flex;
    align-items: center;
    color: var(--gray01);
  `,
};
