import { useState } from 'react';
import GroupCreateModal from '@pages/side-bar/components/modal/group-create-modal';

interface GroupModalProps {
  children: React.ReactNode;
}

const GroupCreateModalButton = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenModalButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleOpenModalButtonClick}>{children}</button>
      <GroupCreateModal isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default GroupCreateModalButton;
