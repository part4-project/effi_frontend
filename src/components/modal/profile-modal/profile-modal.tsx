import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import InvitedList from '@components/modal/profile-modal/invited-list';
import NicknameInput from '@components/modal/profile-modal/nickname-input';
import { userStore } from '@stores/user-store';
import { deleteCookie } from '@utils/cookie';
import styled from 'styled-components';
import ProfileImageInput from './profile-image-input';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { logout } = userStore();

  const handleResignClick = () => {
    onClose();
  };

  const handleLogoutClick = () => {
    deleteCookie('accessToken');
    logout();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="내 정보">
      <div>
        <ProfileImageInput />
        <NicknameInput />
        <InvitedList />
      </div>
      <S.ModalFooter>
        <S.WithdrawButton onClick={handleResignClick}>탈퇴하기</S.WithdrawButton>
        <ModalButton type="secondary" onClick={handleLogoutClick}>
          <span>로그아웃</span>
        </ModalButton>
      </S.ModalFooter>
    </Modal>
  );
};

export default ProfileModal;

const S = {
  ModalFooter: styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
  `,

  WithdrawButton: styled.div`
    cursor: pointer;
    color: var(--gray01);
    font-weight: 500;
    text-decoration: underline;
  `,
};
