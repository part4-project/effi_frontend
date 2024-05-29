import { ReactNode } from 'react';
import styled from 'styled-components';

interface QuickButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const QuickButton: React.FC<QuickButtonProps> = ({ children, onClick }) => {
  return <S.QuickButton onClick={onClick}>{children}</S.QuickButton>;
};

export default QuickButton;

const S = {
  QuickButton: styled.button`
    width: 229px;
    height: 229px;
    border: 1px solid black;
  `,
};
