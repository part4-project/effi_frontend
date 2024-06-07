import styled from 'styled-components';

interface ModalButtonProp {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'primary' | 'secondary' | 'disable';
}

const ModalButton = ({ children, onClick, type }: ModalButtonProp) => {
  return (
    <S.Button $type={type} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default ModalButton;

const S = {
  Button: styled.button<{ $type: 'primary' | 'secondary' | 'disable' }>`
    width: 132px;
    border-radius: 30px;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    ${({ $type }) => {
      switch ($type) {
        case 'primary':
          return `
            color: var(--white);
            background-color: var(--blue01);
            border: 1px solid transparent;
            `;
        case 'secondary':
          return `
            background-color: var(--white);
            color: var(--blue01);
            border: 1px solid var(--blue01);
          `;
        case 'disable':
          return `
            color: var(--white);
            background-color: var(--gray01, #9E9E9E);
            border: 1px solid transparent;
            `;
      }
    }};
  `,
};
