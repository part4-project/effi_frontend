/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import styled from 'styled-components';

const primaryBtn = 'primary';
const disableBtn = 'disable';

interface GroupCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string | undefined) => void;
}

const GroupCreateModal = ({ isOpen, onClose, onSubmit }: GroupCreateModalProps) => {
  const [btnType, setBtnType] = useState<'disable' | 'primary' | 'secondary'>(disableBtn);
  const groupNameRef = useRef<HTMLInputElement>(null);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setBtnType(primaryBtn) : setBtnType(disableBtn);
  };

  const handleCreateGroupClick = () => {
    btnType === primaryBtn ? onSubmit(groupNameRef.current?.value) : null;
  };

  useEffect(() => {
    setBtnType(disableBtn);
  }, [onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="그룹 생성하기">
      <S.ModalWrap>
        <S.ModalContent>
          <S.GroupNameBox>
            <S.GroupNameInput ref={groupNameRef} type="text" placeholder="그룹명" onInput={handleNameInput} />
          </S.GroupNameBox>
          <ModalButton type={btnType} onClick={handleCreateGroupClick}>
            생성하기
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
    align-items: end;
    gap: 24px;
  `,
  GroupNameBox: styled.div`
    width: 100%;
    border-bottom: 1px solid var(--gray01);
    padding: 10px;
  `,
  GroupNameInput: styled.input`
    background: ${(props) => props.theme.modalBg};
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    line-height: 35px;
    color: ${(props) => props.theme.text08};
    &::placeholder {
      color: var(--gray02);
      font-size: 32px;
      font-weight: 700;
    }
  `,
};

export default GroupCreateModal;
