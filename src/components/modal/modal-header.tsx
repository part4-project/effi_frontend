/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import xCircle from '@/assets/icons/x-circle.svg';

interface ReportHeaderProps {
  headerTitle?: string;
  onClose?: () => void;
}

const ModalHeader = ({ headerTitle, onClose }: ReportHeaderProps) => {
  return (
    headerTitle && (
      <S.HeaderContainer>
        <S.ModalTitle>{headerTitle}</S.ModalTitle>
        <S.CloseButton onClick={onClose}>
          <S.CloseIcon src={xCircle} alt="x" />
        </S.CloseButton>
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
    color: var(--blue01);
    font-size: 26px;
    line-height: 36px;
    font-weight: 900;
  `,
  CloseButton: styled.button``,
  CloseIcon: styled.img``,
};

export default ModalHeader;
