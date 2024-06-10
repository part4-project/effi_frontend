import { useState } from 'react';
import ReportModal from '@pages/group-home/components/report-modal/report-modal';

interface ReportModalProps {
  children: React.ReactNode;
}

const ReportModalButton = ({ children }: ReportModalProps) => {
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
      <ReportModal isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default ReportModalButton;
