import { useState } from 'react';
import Modal from './modal';

interface GroupModalProps {
  children: React.ReactNode;
}

const GroupModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        그룹 관리
        {/* 내용 작성 예정 */}
      </Modal>
    </button>
  );
};

export default GroupModal;
