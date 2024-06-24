import { useState } from 'react';
import { useMeetingQuery } from '@hooks/react-query/use-query-meeting';
import { useLobbyGroupStore } from '@stores/lobby-group';
import MeetingModal from '@/pages/group-home/components/meeting-modal/meeting-modal';

interface MeetingModalButtonProps {
  children: React.ReactNode;
  title: string;
}

const MeetingModalButton = ({ children, title }: MeetingModalButtonProps) => {
  const { lobbyGroupId, initLobbyGroupId } = useLobbyGroupStore((state) => ({
    lobbyGroupId: state.lobbyGroupId,
    initLobbyGroupId: state.initLobbyGroupId,
  }));
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
    if (lobbyGroupId) initLobbyGroupId();
  };

  const handleOpenModalButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleOpenModalButtonClick}>{children}</button>
      <MeetingModal isOpen={isOpen} onClose={handleModalClose} title={title} />
    </>
  );
};

export default MeetingModalButton;
