import Modal from '@components/modal/modal';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import MeetingForm from './meeting-form/meeting-form';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingModal = ({ isOpen, onClose, title, data, topicData }: GroupModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle={title}>
      <MeetingForm data={data} topicData={topicData} />
    </Modal>
  );
};

export default MeetingModal;
