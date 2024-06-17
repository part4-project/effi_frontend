import { useState } from 'react';
import ProfileModal from '@components/modal/profile-modal/profile-modal';

interface ProfileModalButtonProps {
  children: React.ReactNode;
}

const ProfileModalButton = ({ children }: ProfileModalButtonProps) => {
  const [isOpen, setIsOpen] = useState({
    profile: false,
    confirm: false,
  });

  const handleProfileModalClose = () => {
    //confirm 모달이 열려있으면 닫힘 방지
    if (!isOpen.confirm) {
      setIsOpen((prev) => ({
        ...prev,
        profile: false,
      }));
    }
  };

  const handleProfileModalOpen = () => {
    setIsOpen((prev) => ({
      ...prev,
      profile: true,
    }));
  };

  const handleConfirmModalClose = () => {
    setIsOpen((prev) => ({
      ...prev,
      confirm: false,
    }));
  };

  const handleConfirmModalOpen = () => {
    setIsOpen((prev) => ({
      ...prev,
      confirm: true,
    }));
  };

  return (
    <>
      <button onClick={handleProfileModalOpen}>{children}</button>
      <ProfileModal
        isOpen={isOpen}
        onProfileClose={handleProfileModalClose}
        onConfirmClose={handleConfirmModalClose}
        onConfirmOpen={handleConfirmModalOpen}
      />
    </>
  );
};

export default ProfileModalButton;
