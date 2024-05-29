import { useState } from 'react';
import Modal from './modal';

interface GroupModalProps {
  children: React.ReactNode;
}

const UserInfoModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        내 정보
        {/* 내용 작성 예정 */}
      </Modal>
    </button>
  );
};

export default UserInfoModal;
