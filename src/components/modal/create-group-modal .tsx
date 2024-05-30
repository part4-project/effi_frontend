import { useState } from 'react';
import Modal from './modal';

interface GroupModalProps {
  children: React.ReactNode;
}

const CreateGroupModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        그룹 생성
        {/* 내용 작성 예정 */}
      </Modal>
    </button>
  );
};

export default CreateGroupModal;
