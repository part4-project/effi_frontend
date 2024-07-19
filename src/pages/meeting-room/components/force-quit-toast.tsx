/* eslint-disable no-console */
import { useEffect } from 'react';
import styled from 'styled-components';
import useForceQuitToastTimer from '../hooks/use-force-quit-toast-timer';
import { formatDurationFromSeconds } from '../utils/format-duration-from-seconds';

interface ForceQuitToastProps {
  isToastOpen: boolean;
  isToastAnimClose: boolean;
}

const ForceQuitToast = ({ isToastOpen, isToastAnimClose }: ForceQuitToastProps) => {
  const { currElapsedSeconds, isDurationOver, resetTimer } = useForceQuitToastTimer(300);

  useEffect(() => {
    if (isToastOpen) resetTimer();
  }, [isToastOpen]);

  if (!isToastOpen) return;

  return (
    <S.Container $isToastAnimClose={isToastAnimClose}>
      <S.WarningText>
        (⊙x⊙;)
        <br />
        저런! 혼자 남으셨군요!
        <br />
        당신의 전기세를 위해, 5분 뒤 회의가 종료됩니다.
      </S.WarningText>
      <S.Timer>{isDurationOver ? '종료!' : formatDurationFromSeconds(currElapsedSeconds)}</S.Timer>
    </S.Container>
  );
};
export default ForceQuitToast;

const S = {
  Container: styled.div<{ $isToastAnimClose: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 15px;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 20px;
    left: calc(50% - 180px);
    width: 360px;
    height: 140px;
    border-radius: 5px;
    background-color: #4d4f4e;
    @keyframes slideIn {
      from {
        transform: translateY(-200%);
      }
      to {
        transform: translateY(0%);
      }
    }

    @keyframes slideOut {
      from {
        transform: translateY(0%);
      }
      to {
        transform: translateY(-200%);
      }
    }
    animation: slideIn 0.5s ease-in-out forwards;
    animation: ${({ $isToastAnimClose }) => $isToastAnimClose && 'slideOut 0.5s ease-in-out forwards'};
  `,
  WarningText: styled.p`
    color: var(--white);
    font-size: 15px;
    font-weight: 700;
  `,
  Timer: styled.div`
    margin-top: 20px;
    color: #f9667b;
    font-size: 20px;
    font-weight: 700;
  `,
};
