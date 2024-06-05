import { useState } from 'react';
import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import ModalHeader from '@components/modal/modal-header';
import styled from 'styled-components';
import GroupInvite from './group-invite';
import GroupMemberList from './group-member-list';

interface GroupModalProps {
  children: React.ReactNode;
}

const GroupModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <button onClick={handleOpenButtonClick}>
      {children}
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <S.ModalWrap>
          <ModalHeader headerTitle="그룹관리" onClose={handleCloseButtonClick} />
          <S.ModalContent>
            <GroupInvite />
            <GroupMemberList />
          </S.ModalContent>
          <S.ModalFooter>
            <S.GroupDisbandment>그룹 해체하기</S.GroupDisbandment>
            <ModalButton type="primary">저장하기</ModalButton>
          </S.ModalFooter>
        </S.ModalWrap>
      </Modal>
    </button>
  );
};

export default GroupModal;

const S = {
  ModalWrap: styled.div`
    width: 500px;
  `,
  ModalContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 40px 20px;
  `,
  ModalHeader: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  ModalTitle: styled.div``,
  CloseBtn: styled.button``,
  ModalFooter: styled.div`
    margin-top: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  GroupDisbandment: styled.div`
    cursor: pointer;
    color: #e74133;
    font-weight: 500;
    text-decoration: underline;
  `,
};
