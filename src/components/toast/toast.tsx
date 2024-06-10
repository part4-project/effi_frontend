import { ReactNode } from 'react';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';

interface TToastProps {
  children: ReactNode;
  show: boolean;
}

function Toast({ children, show }: TToastProps) {
  return <S.Container $show={show}>{children}</S.Container>;
}

const S = {
  Container: styled.div<{ $show: boolean }>`
    position: fixed;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
    display: ${({ $show }) => ($show ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    background-color: var(--blue05);
    color: var(--white);
    opacity: 0.8;
    width: 364px;
    height: 50px;
    z-index: ${zIndex.toast};
    border-radius: 10px;
    font-weight: bold;
  `,
};
export default Toast;
