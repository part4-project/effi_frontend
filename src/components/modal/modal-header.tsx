/* eslint-disable no-unused-vars */
import styled, { useTheme } from 'styled-components';
// import xCircle from '@/assets/icons/x-circle.svg';

interface ReportHeaderProps {
  headerTitle?: string;
  onClose?: () => void;
}

const ModalHeader = ({ headerTitle, onClose }: ReportHeaderProps) => {
  const theme = useTheme();

  return (
    headerTitle && (
      <S.HeaderContainer>
        <S.ModalTitle>{headerTitle}</S.ModalTitle>
        <button onClick={onClose}>
          <img src={theme.xCircle} alt="x" />
        </button>
      </S.HeaderContainer>
    )
  );
};

const S = {
  HeaderContainer: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  `,
  ModalTitle: styled.p`
    color: ${(props) => props.theme.text06};
    font-size: 26px;
    line-height: 36px;
    font-weight: 900;
  `,
};

export default ModalHeader;
