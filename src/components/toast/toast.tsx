import { ReactNode, useEffect } from 'react';
import { zIndex } from '@styles/z-index';
import { playSound } from '@utils/play-sound';
import styled, { css, keyframes } from 'styled-components';

interface TToastProps {
  children: ReactNode;
  show: boolean;
  error: boolean;
}

function Toast({ children, show, error }: TToastProps) {
  console.log(error);
  useEffect(() => {
    if (error) {
      playSound('toastError');
    } else {
      playSound('toast');
    }
  }, []);
  return (
    <S.Container $show={show} $error={error}>
      {children}
    </S.Container>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);

    }
    to {
      opacity: 0.8;
      transform: translateY(0); 
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.8;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
`;

const S = {
  Container: styled.div<{ $show: boolean; $error: boolean }>`
    position: fixed;
    left: calc(50% - 364px / 2);
    top: 70px;
    display: ${({ $show }) => ($show ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background-color: ${({ $error, theme }) => ($error ? 'var(--red01)' : theme.text08)};
    color: ${(props) => props.theme.text01};
    opacity: 0.8;
    width: 364px;
    height: 50px;
    z-index: ${zIndex.toast};
    border-radius: 10px;
    font-weight: bold;
    ${({ $show }) =>
      $show &&
      css`
        animation: ${css`
          ${fadeIn} 0.2s ease-in-out, ${fadeOut} 0.2s 2.8s ease-in-out forwards
        `};
      `}
  `,
};
export default Toast;
