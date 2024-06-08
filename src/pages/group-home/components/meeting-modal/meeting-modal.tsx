import { useState } from 'react';
import Modal from '@components/modal/modal';
import ModalHeader from '@components/modal/modal-header';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import MeetingForm from './meeting-form/meeting-form';

interface GroupModalProps {
  children: React.ReactNode;
  title: string;
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingModal = ({ children, title, data, topicData }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <button onClick={handleOpenButtonClick}>
      {children}
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalHeader headerTitle={title} onClose={handleCloseButtonClick} />
        <MeetingForm data={data} topicData={topicData} />
      </Modal>
    </button>
  );
};

export default MeetingModal;
