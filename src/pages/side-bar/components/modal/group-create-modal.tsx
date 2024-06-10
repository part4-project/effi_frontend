import { useState } from 'react';
import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import styled from 'styled-components';

const primaryBtn = 'primary';
const secondaryBtn = 'secondary';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupCreateModal = ({ isOpen, onClose }: GroupModalProps) => {
  const [btnType, setBtnType] = useState<'disable' | 'primary' | 'secondary'>(secondaryBtn);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setBtnType(primaryBtn) : setBtnType(secondaryBtn);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="그룹 생성하기">
      <S.ModalWrap>
        <S.ModalContent>
          <S.GroupNameBox>
            <S.GroupNameInput type="text" placeholder="그룹 이름을 작성하세요" onInput={handleNameInput} />
          </S.GroupNameBox>
          <ModalButton type={btnType}>생성하기</ModalButton>
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
    align-items: end;
    gap: 24px;
  `,
  GroupNameBox: styled.div`
    width: 100%;
    border-bottom: 1px solid var(--gray01);
    padding: 10px;
  `,
  GroupNameInput: styled.input`
    font-size: 32px;
    font-weight: 700;
    line-height: 35px;
    color: var(--blue05);
    &::placeholder {
      color: var(--gray02);
      font-size: 32px;
      font-weight: 700;
    }
  `,
};

export default GroupCreateModal;
