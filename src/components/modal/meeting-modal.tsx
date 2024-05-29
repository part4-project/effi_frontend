import { useState } from 'react';
import Modal from './modal';

interface GroupModalProps {
  children: React.ReactNode;
}

const MeetingModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        회의 생성 / 수정
        {/* 내용 작성 예정 */}
      </Modal>
    </button>
  );
};

export default MeetingModal;
