import { TMeetingInfo } from '@api/meeting/meeting-request.type';
import Modal from '@components/modal/modal';
import MeetingForm from './meeting-form/meeting-form';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data?: TMeetingInfo;
}

const MeetingModal = ({ isOpen, onClose, title, data }: MeetingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle={title}>
      <MeetingForm onClose={onClose} data={data} />
    </Modal>
  );
};

export default MeetingModal;
