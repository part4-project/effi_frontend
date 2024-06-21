import { Dispatch, SetStateAction } from 'react';
import ConfirmModal from '@components/modal/confirm-modal/confirm-modal';

interface GroupLeaveModalButtonProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onDeleteButton: () => void;
}

const GroupLeaveModalButton = ({ children, isOpen, setIsOpen, onDeleteButton }: GroupLeaveModalButtonProps) => {
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenModalButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleOpenModalButtonClick}>{children}</button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={handleModalClose}
        onDeleteButton={onDeleteButton}
        content={{
          comment: `그룹을 탈퇴하면\n되돌릴 수 없습니다!`,
          deleteButton: '그룹 탈퇴하기',
          confirmButton: '유지하기',
        }}
      />
    </>
  );
};

export default GroupLeaveModalButton;
