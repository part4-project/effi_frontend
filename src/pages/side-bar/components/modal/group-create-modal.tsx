import { useState } from 'react';
import Modal from '@components/modal/modal';
import styled from 'styled-components';

interface GroupModalProps {
  children: React.ReactNode;
}

const GroupCreateModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <S.GroupCreateModalTitle>그룹 생성</S.GroupCreateModalTitle>
        <S.GroupNameInput type="text" placeholder="그룹 이름을 작성하세요" />
        <S.GroupCreateButton>생성</S.GroupCreateButton>
      </Modal>
    </button>
  );
};

const S = {
  GroupCreateModalTitle: styled.span`
    font-size: 24px;
  `,

  GroupNameInput: styled.input`
    background-color: rgba(0, 0, 0, 0.08);
    width: 200px;
    padding: 15px 10px;
    border-radius: 6px;
    margin: 20px 0 30px;
  `,

  GroupCreateButton: styled.button`
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    border-radius: 6px;
  `,
};

export default GroupCreateModal;
