import Modal from '@components/modal/modal';
import styled from 'styled-components';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteButton: () => void;
  content: {
    comment: string;
    deleteButton: string;
    confirmButton: string;
  };
}

const ConfirmModal = ({ isOpen, onClose, onDeleteButton, content }: ConfirmModalProps) => {
  const handleConfirmButtonClick = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isConfirmModal>
      <S.ConfirmModalContent>
        <S.CommentsContainer>
          <S.MainComment>잠깐만요!</S.MainComment>
          <S.SubComment>{content.comment}</S.SubComment>
        </S.CommentsContainer>
        <S.ButtonsContainer>
          <S.DeleteButton onClick={onDeleteButton}>{content.deleteButton}</S.DeleteButton>
          <S.ConfirmButton onClick={handleConfirmButtonClick}>{content.confirmButton}</S.ConfirmButton>
        </S.ButtonsContainer>
      </S.ConfirmModalContent>
    </Modal>
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
    color: ${(props) => props.theme.text06};
  `,

  SubComment: styled.p`
    white-space: pre-line;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${(props) => props.theme.scheduleText};
  `,

  ButtonsContainer: styled.div`
    display: flex;
    border-top: 1px solid ${(props) => props.theme.text06};

    justify-content: center;

    button {
      width: 100%;
      padding: 20px 0;
      font-weight: 700;
      font-size: 16px;
    }
  `,

  DeleteButton: styled.button`
    color: ${(props) => props.theme.text08};
  `,
  ConfirmButton: styled.button`
    background-color: ${(props) => props.theme.text06};
    color: ${(props) => props.theme.text07};
    border-bottom-right-radius: 20px;
  `,
};
