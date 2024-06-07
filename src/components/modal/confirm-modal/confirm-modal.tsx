import { useState } from 'react';
import Modal from '@components/modal/modal';
import styled from 'styled-components';

interface ConfirmModalProps {
  children: React.ReactNode;
}

const ConfirmModal = ({ children }: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={handleOpenButtonClick}>{children}</button>
      <Modal isOpen={isOpen} onClose={handleModalClose} isConfirmModal>
        <S.ConfirmModalContent>
          <S.CommentsContainer>
            <S.MainComment>잠깐만요!</S.MainComment>
            <S.SubComment>{`삭제하시게 되면\n되돌릴 수 없습니다!`}</S.SubComment>
          </S.CommentsContainer>

          <S.ButtonsContainer>
            <S.DeleteButton>삭제하기</S.DeleteButton>
            <S.ConfirmButton>유지하기</S.ConfirmButton>
          </S.ButtonsContainer>
        </S.ConfirmModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmModal;

const S = {
  ConfirmModalContent: styled.div`
    overflow: hidden;

    z-index: 9999;
  `,

  CommentsContainer: styled.div`
    padding: 40px 95px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  `,

  MainComment: styled.p`
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--blue01);
  `,

  SubComment: styled.p`
    white-space: pre-line;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--black);
  `,

  ButtonsContainer: styled.div`
    display: flex;
    border-top: 1px solid var(--blue01);

    justify-content: center;

    button {
      width: 100%;
      padding: 20px 0;
      font-weight: 700;
      font-size: 16px;
    }
  `,

  DeleteButton: styled.button`
    color: var(--blue05);
  `,
  ConfirmButton: styled.button`
    background-color: var(--blue01);
    color: var(--white);
    border-bottom-right-radius: 20px;
  `,
};
