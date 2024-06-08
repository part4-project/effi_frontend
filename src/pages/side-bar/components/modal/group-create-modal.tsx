import { useState } from 'react';
import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import styled from 'styled-components';

const primaryBtn = 'primary';
const disableBtn = 'disable';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupCreateModal = ({ isOpen, onClose }: GroupModalProps) => {
  const [btnType, setBtnType] = useState<'disable' | 'primary' | 'secondary'>(disableBtn);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setBtnType(primaryBtn) : setBtnType(disableBtn);
  };

  const handleCreateGroupClick = () => {
    btnType === primaryBtn ? onClose() : null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="그룹생성">
      <S.ModalWrap>
        <S.ModalContent>
          <S.GroupNameInput type="text" placeholder="그룹 이름을 작성하세요" onInput={handleNameInput} />
          <ModalButton type={btnType} onClick={handleCreateGroupClick}>
            생성
          </ModalButton>
        </S.ModalContent>
      </S.ModalWrap>
    </Modal>
  );
};

const S = {
  ModalWrap: styled.div`
    width: 400px;
  `,
  ModalContent: styled.div`
    margin-top: 14px;
    padding-inline: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  `,
  GroupNameInput: styled.input`
    background-color: var(--gray03);
    border: 1px solid var(--gray01);
    border-radius: 5px;
    padding: 12px 15px;
    width: 100%;
    &::placeholder {
      color: var(--gray02);
      font-size: 14px;
      font-weight: 500;
    }
  `,
};

export default GroupCreateModal;
