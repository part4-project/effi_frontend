import ConfirmModal from '@components/modal/confirm-modal/confirm-modal';
import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import InvitedList from '@components/modal/profile-modal/invited-list';
import NicknameInput from '@components/modal/profile-modal/nickname-input';
import { deleteCookie } from '@utils/cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImageInput from './profile-image-input';
interface ProfileModalProps {
  isOpen: {
    profile: boolean;
    confirm: boolean;
  };
  onProfileClose: () => void;
  onConfirmClose: () => void;
  onConfirmOpen: () => void;
}

const ProfileModal = ({ isOpen, onProfileClose, onConfirmClose, onConfirmOpen }: ProfileModalProps) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    deleteCookie('accessToken');
    navigate('/login');
  };

  const handleDeleteButtonClick = () => {
    //회원 탈퇴 api 작성

    //일단 로그인 페이지로 이동하게 작성
    navigate('/login');
  };

  return (
    <Modal isOpen={isOpen.profile} onClose={onProfileClose} headerTitle="내 정보">
      <div>
        <ProfileImageInput />
        <NicknameInput />
        <InvitedList />
      </div>
      <S.ModalFooter>
        <S.WithdrawButton onClick={onConfirmOpen}>탈퇴하기</S.WithdrawButton>
        <ModalButton type="secondary" onClick={handleLogoutClick}>
          <span>로그아웃</span>
        </ModalButton>
      </S.ModalFooter>
      <ConfirmModal
        isOpen={isOpen.confirm}
        onClose={onConfirmClose}
        onDeleteButton={handleDeleteButtonClick}
        content={{
          comment: '회원을 탈퇴하시게 되면\n되돌릴 수 없습니다!',
          deleteButton: '탈퇴하기',
          confirmButton: '유지하기',
        }}
      />
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
