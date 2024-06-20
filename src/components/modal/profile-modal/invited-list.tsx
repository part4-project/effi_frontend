import {
  useInvitedGroupAcceptMutation,
  useInvitedGroupQuery,
  useInvitedGroupRejectMutation,
} from '@hooks/react-query/use-query-group';
import styled from 'styled-components';
import GroupListItems from './group-list-items';

const InvitedList = () => {
  const { data: invitedGroupList, isLoading, isError } = useInvitedGroupQuery();
  const { mutate: acceptInvitedGroupMutate } = useInvitedGroupAcceptMutation();
  const { mutate: rejectInvitedGroupMutate } = useInvitedGroupRejectMutation();

  const handleAcceptButtonClick = (groupId: number) => {
    acceptInvitedGroupMutate(groupId);
  };

  const handleRejectButtonClick = (groupId: number) => {
    rejectInvitedGroupMutate(groupId);
  };

  if (isError) return 'Error...';

  return (
    <S.Container>
      <S.InvitedListLabel>초대받은 그룹</S.InvitedListLabel>
      <S.InvitedList>
        <GroupListItems
          isLoading={isLoading}
          invitedGroupList={invitedGroupList}
          onAcceptButtonClick={handleAcceptButtonClick}
          onRejectButtonClick={handleRejectButtonClick}
        />
      </S.InvitedList>
    </S.Container>
  );
};

export default InvitedList;

const S = {
  Container: styled.section`
    margin-top: 48px;
    width: 100%;
  `,

  InvitedListLabel: styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.text08};
  `,

  InvitedList: styled.ul`
    display: flex;
    gap: 12px;
    width: 505px;
    overflow: auto;
    white-space: nowrap;
    padding: 12px 0 11px;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 50px;
    }
  `,
};
