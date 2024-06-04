/* eslint-disable no-console */
import { useEffect } from 'react';
import styled from 'styled-components';
import useTimer from '../hooks/use-timer';

interface ForceQuitToastProps {
  isToastOpen: boolean;
  isToastAnimClose: boolean;
}

const ForceQuitToast = ({ isToastOpen, isToastAnimClose }: ForceQuitToastProps) => {
  const { currElapsedSeconds, formatDurationFromSeconds, isDurationOver, resetTimer } = useTimer(30);

  useEffect(() => {
    if (isDurationOver) console.log('방 폭파 함수 넣기!');
  }, [isDurationOver]);

  useEffect(() => {
    if (isToastOpen) resetTimer();
  }, [isToastOpen]);

  if (!isToastOpen) return;

  return (
    <S.Container $isToastAnimClose={isToastAnimClose}>
      <p>(⊙x⊙;) 저런!</p>
      <p> 혼자 남으셨군요! </p>
      <p>당신의 전기세를 위해, 5분 뒤 회의가 종료됩니다.</p>
      <S.Timer>{formatDurationFromSeconds(currElapsedSeconds)}</S.Timer>
    </S.Container>
  );
};
export default ForceQuitToast;

const S = {
  Container: styled.div<{ $isToastAnimClose: boolean }>`
    padding: 40px;
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

    p {
      color: #fff;
      text-align: center;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  `,
  Timer: styled.div`
    margin-top: 20px;
    color: #f9667b;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};
