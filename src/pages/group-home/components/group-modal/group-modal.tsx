import { useState } from 'react';
import ConfirmModal from '@components/modal/confirm-modal/confirm-modal';
import Modal from '@components/modal/modal';
import ModalButton from '@components/modal/modal-button';
import { useExileGroupMemberMutation } from '@hooks/react-query/use-query-group';
import GroupInvite from '@pages/group-home/components/group-modal/group-invite';
import GroupMemberList from '@pages/group-home/components/group-modal/group-member-list';
import { useGroupStore } from '@stores/group';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface GroupModalProps {
  isOpen: {
    group: boolean;
    confirm: boolean;
  };
  onGroupClose: () => void;
  onConfirmClose: () => void;
  onConfirmOpen: () => void;
}

const GroupModal = ({ isOpen, onGroupClose, onConfirmClose, onConfirmOpen }: GroupModalProps) => {
  const navigate = useNavigate();
  const { mutate: exileGroupMemberMutate } = useExileGroupMemberMutation(useGroupStore((state) => state.groupId));
  const [exileMemberList, setExileMemberList] = useState<number[]>([]);

  const handleAddExileMemberButtonClick = (id: number) => {
    setExileMemberList((prev) => [...prev, id]);
  };

  const handleRemoveExileMemberButtonClick = (id: number) => {
    setExileMemberList((prev) => prev.filter((memberId) => memberId !== id));
  };

  const handleSaveGroupClick = () => {
    exileGroupMemberMutate(exileMemberList);
    onGroupClose();
  };

  const handleDeleteButtonClick = () => {
    //그룹 삭제 api 작성

    navigate('/');
  };

  return (
    <Modal isOpen={isOpen.group} onClose={onGroupClose} headerTitle="그룹관리">
      <S.ModalWrap>
        <S.ModalContent>
          <GroupInvite />
          <GroupMemberList
            onAddExileMember={handleAddExileMemberButtonClick}
            onRemoveExileMember={handleRemoveExileMemberButtonClick}
          />
        </S.ModalContent>
        <S.ModalFooter>
          <S.GroupDisbandment onClick={onConfirmOpen}>그룹 해체하기</S.GroupDisbandment>
          <ModalButton type={exileMemberList.length ? 'primary' : 'disable'} onClick={handleSaveGroupClick}>
            저장하기
          </ModalButton>
        </S.ModalFooter>
      </S.ModalWrap>
      <ConfirmModal
        isOpen={isOpen.confirm}
        onClose={onConfirmClose}
        onDeleteButton={handleDeleteButtonClick}
        content={{
          comment: '그룹을 삭제하시게 되면\n되돌릴 수 없습니다!',
          deleteButton: '삭제하기',
          confirmButton: '유지하기',
        }}
      />
    </Modal>
  );
};

export default GroupModal;

const S = {
  ModalWrap: styled.div`
    width: 500px;
  `,
  ModalContent: styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 40px 20px;
  `,
  ModalFooter: styled.div`
    margin-top: 8px;
    display: flex;
    align-items: end;
    justify-content: space-between;
  `,
  GroupDisbandment: styled.div`
    color: var(--gray01);
    font-weight: 500;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.red};
    }
  `,
};
