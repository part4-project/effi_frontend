import { useRef } from 'react';
import useCloseModal from '@hooks/use-close-modal';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';
import Portal from './portal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef(null);
  useCloseModal(isOpen, onClose, modalRef);

  return (
    isOpen && (
      <Portal>
        <S.ModalBackground>
          <S.ModalBox ref={modalRef}>{children}</S.ModalBox>
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: ${zIndex.modal};
  `,

  ModalBox: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 24px;
    padding: 24px 48px;
    background: #ffffff;
    border-radius: 8px;
  `,
};
