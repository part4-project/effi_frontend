import { useState } from 'react';
import Modal from '@components/modal/modal';
import GroupModify from './group-modify';

interface GroupModalProps {
  children: React.ReactNode;
}

const GroupModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  //const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={handleCloseClick}>
        <GroupModify />
      </Modal>
    </button>
  );
};

export default GroupModal;
