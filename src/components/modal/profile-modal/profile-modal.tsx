import { useState } from 'react';
import Modal from '@components/modal/modal';
import ModalHeader from '@components/modal/modal-header';
import InvitedList from '@components/modal/profile-modal/invited-list';
import UserInfo from '@components/modal/profile-modal/user-info';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalButton from '../modal-button';

interface GroupModalProps {
  children: React.ReactNode;
}

const ProfileModal = ({ children }: GroupModalProps) => {
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
        <ModalHeader headerTitle="내 정보" onClose={handleCloseButtonClick} />

        <S.MyInfoContent>
          <UserInfo />
          <InvitedList />
        </S.MyInfoContent>

        <S.ModalFooter>
          <S.WithdrawButton>탈퇴하기</S.WithdrawButton>
          <ModalButton type="secondary">
            <Link to="/login">로그아웃</Link>
          </ModalButton>
        </S.ModalFooter>
      </Modal>
    </button>
  );
};

export default ProfileModal;

const S = {
  MyInfoContent: styled.div`
    margin-top: 0px;
  `,

  ModalFooter: styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  WithdrawButton: styled.div`
    cursor: pointer;
    color: var(--gray01);
    font-weight: 500;
    text-decoration: underline;
  `,
};
