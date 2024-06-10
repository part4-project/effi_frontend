import { useState } from 'react';
import ProfileModal from '@components/modal/profile-modal/profile-modal';

interface ProfileModalButtonProps {
  children: React.ReactNode;
}

const ProfileModalButton = ({ children }: ProfileModalButtonProps) => {
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
      <ProfileModal isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default ProfileModalButton;
