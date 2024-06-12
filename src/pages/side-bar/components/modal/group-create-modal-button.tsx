import { useState } from 'react';
import { useGroupCreateMutation } from '@hooks/react-query/use-query-group';
import { useToast } from '@hooks/use-toast';
import GroupCreateModal from '@pages/side-bar/components/modal/group-create-modal';

interface GroupCreateModalButtonProps {
  children: React.ReactNode;
}

const GroupCreateModalButton = ({ children }: GroupCreateModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { mutateAsync } = useGroupCreateMutation();

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenModalButtonClick = () => {
    setIsOpen(true);
  };

  const handleSubmitBtnClick = async (groupName: string | undefined) => {
    if (groupName) {
      try {
        await mutateAsync(groupName);
        toast('그룹이 생성되었습니다.');
        setIsOpen(false);
      } catch (error) {
        toast('그룹 생성에 실패했습니다.');
        setIsOpen(false);
      }
    } else {
      toast('그룹 이름을 입력하세요.');
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
