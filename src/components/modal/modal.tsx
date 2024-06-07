import { useRef } from 'react';
import useCloseModal from '@hooks/use-close-modal';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';
import Portal from './portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isConfirmModal?: boolean;
}

const Modal = ({ isOpen, onClose, children, isConfirmModal = false }: ModalProps) => {
  const modalRef = useRef(null);
  useCloseModal(isOpen, onClose, modalRef);

  return (
    isOpen && (
      <Portal>
        <S.ModalBackground>
          <S.ModalBox ref={modalRef} $isConfirmModal={isConfirmModal}>
            {children}
          </S.ModalBox>
        </S.ModalBackground>
      </Portal>
    )
  );
};

export default Modal;

const S = {
  ModalBackground: styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: ${zIndex.modal};
  `,

  ModalBox: styled.div<{ $isConfirmModal: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 24px;
    padding: 24px 34px;
    background: var(--white);
    border-radius: 20px;
    box-shadow: 0px 4px 16px 0px #073327;

    ${(props) =>
      props.$isConfirmModal &&
      `
      padding: 0;
      `}

    ::-webkit-scrollbar {
      display: block;
    }

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #d6d6d7;
      border-radius: 16px;
    }

    ::-webkit-scrollbar-track {
      background: var(--gray03);
    }
  `,
};
