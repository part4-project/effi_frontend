import ModalButton from '@components/modal/modal-button';
import styled from 'styled-components';

interface MeetingSubmitButtonBoxProps {
  isEditMode: boolean;
  isConfirm: boolean;
  onSubmit?: () => void;
  onDelete?: () => void;
}

const MeetingSubmitButtonBox = ({ isEditMode, isConfirm, onSubmit, onDelete }: MeetingSubmitButtonBoxProps) => {
  return (
    <S.SubmitBox>
      {isEditMode ? (
        <>
          <ModalButton type="secondary" onClick={onDelete}>
            삭제하기
          </ModalButton>
          <ModalButton type={isConfirm ? 'primary' : 'disable'} onClick={onSubmit}>
            수정하기
          </ModalButton>
        </>
      ) : (
        <ModalButton type={isConfirm ? 'primary' : 'disable'} onClick={onSubmit}>
          회의 생성하기
        </ModalButton>
      )}
    </S.SubmitBox>
  );
};

export default MeetingSubmitButtonBox;

const S = {
  SubmitBox: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
  `,
};
