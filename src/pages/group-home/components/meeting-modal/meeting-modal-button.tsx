import { useState } from 'react';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import { useLobbyGroupStore } from '@stores/lobby-group';
import MeetingModal from '@/pages/group-home/components/meeting-modal/meeting-modal';

interface MeetingModalButtonProps {
  children: React.ReactNode;
  title: string;
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingModalButton = ({ children, title, data, topicData }: MeetingModalButtonProps) => {
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
      <MeetingModal isOpen={isOpen} onClose={handleModalClose} title={title} data={data} topicData={topicData} />
    </>
  );
};

export default MeetingModalButton;
