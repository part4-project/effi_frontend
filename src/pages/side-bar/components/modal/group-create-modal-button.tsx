import { useState } from 'react';
import { useGroupCreateMutation } from '@hooks/react-query/use-query-group';
import GroupCreateModal from '@pages/side-bar/components/modal/group-create-modal';

interface GroupCreateModalButtonProps {
  children: React.ReactNode;
}

const GroupCreateModalButton = ({ children }: GroupCreateModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useGroupCreateMutation();

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenModalButtonClick = () => {
    setIsOpen(true);
  };

  const handleSubmitBtnClick = async (groupName: string | undefined) => {
    if (groupName) {
      await mutateAsync(groupName);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button onClick={handleOpenModalButtonClick}>{children}</button>
      <GroupCreateModal isOpen={isOpen} onClose={handleModalClose} onSubmit={handleSubmitBtnClick} />
    </>
  );
};

export default GroupCreateModalButton;
