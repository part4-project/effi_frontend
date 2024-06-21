import { useEffect, useRef, useState } from 'react';
import ModalHeader from '@components/modal/modal-header';
import Portal from '@components/modal/portal';
import useCloseModal from '@hooks/use-close-modal';
import { zIndex } from '@styles/z-index';
import styled, { keyframes } from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  headerTitle?: string;
  isConfirmModal?: boolean;
}

const Modal = ({ children, isOpen, onClose, headerTitle, isConfirmModal = false }: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  const modalRef = useRef(null);
  useCloseModal(isOpen, onClose, modalRef);
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    shouldRender && (
      <Portal>
        <S.ModalBackground $isVisible={isVisible}>
          <S.ModalBox ref={modalRef} $isConfirmModal={isConfirmModal}>
            <ModalHeader headerTitle={headerTitle} onClose={onClose} />
            {children}
          </S.ModalBox>
        </S.ModalBackground>
      </Portal>
    )
  );
};

export default Modal;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const S = {
  ModalBackground: styled.div<{ $isVisible: boolean }>`
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100% + 10px);
    background: rgba(0, 0, 0, 0.6);
    animation: ${({ $isVisible }) => ($isVisible ? fadeIn : fadeOut)} 0.3s ease-in-out;
    z-index: ${zIndex.modal};
  `,

  ModalBox: styled.div<{ $isConfirmModal: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 24px;
    padding: 24px 34px;
    background: ${(props) => props.theme.modalBg};
    border-radius: 20px;
    box-shadow: 0px 4px 16px 0px ${(props) => props.theme.modalShadow};

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
      background: var(--dark07);
      border-radius: 16px;
    }

    ::-webkit-scrollbar-track {
      background: ${(props) => props.theme.box};
    }
  `,
};
