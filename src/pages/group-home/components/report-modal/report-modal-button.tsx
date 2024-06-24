import { useState } from 'react';
import ReportModal from '@pages/group-home/components/report-modal/report-modal';

interface ReportModalProps {
  children: React.ReactNode;
  groupId: number;
  meetingId: number;
}

const ReportModalButton = ({ children, groupId, meetingId }: ReportModalProps) => {
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
      <ReportModal isOpen={isOpen} onClose={handleModalClose} groupId={groupId} meetingId={meetingId} />
    </>
  );
};

export default ReportModalButton;
