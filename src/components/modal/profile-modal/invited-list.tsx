import inviteAcceptIcon from '@assets/icons/invite-check.svg';
import inviteRejectIcon from '@assets/icons/invite-reject.svg';
import {
  useInvitedGroupAcceptMutation,
  useInvitedGroupQuery,
  useInvitedGroupRejectMutation,
} from '@hooks/react-query/use-query-group';
import { useToast } from '@hooks/use-toast';
import styled, { css } from 'styled-components';

const InvitedList = () => {
  const { data: invitedGroupList, isLoading, isError } = useInvitedGroupQuery();
  const { mutate: acceptInvitedGroupMutate } = useInvitedGroupAcceptMutation();
  const { mutate: rejectInvitedGroupMutate } = useInvitedGroupRejectMutation();
  const { toast } = useToast();

  const handleAcceptButtonClick = (groupId: number) => {
    acceptInvitedGroupMutate(groupId, {
      onSuccess: () => toast('그룹 초대를 수락했습니다.'),
      onError: () => toast('그룹 초대 수락에 실패했습니다'),
    });
  };

  const handleRejectButtonClick = (groupId: number) => {
    rejectInvitedGroupMutate(groupId, {
      onSuccess: () => toast('그룹 초대를 거절했습니다.'),
      onError: () => toast('그룹 초대 거절에 실패했습니다'),
    });
  };

  if (isLoading) return 'Loading...';

  if (isError) return 'Error...';

  return (
    <S.Container>
      <S.InvitedListLabel>초대받은 그룹</S.InvitedListLabel>
      <S.InvitedList>
        {invitedGroupList && invitedGroupList.length ? (
          invitedGroupList.map((group) => (
            <S.InvitedGroup key={group.groupId}>
              <S.Inviter>{`${group.invitorName}님이\n초대를 보냈습니다.`}</S.Inviter>
              <S.GroupInfo>
                <S.GroupName>{group.groupName}</S.GroupName>
                <S.GroupCode>#{group.code}</S.GroupCode>
              </S.GroupInfo>

              <S.InvitedGroupButtons>
                <div onClick={() => handleAcceptButtonClick(group.groupId)}>
                  <S.AcceptButton src={inviteAcceptIcon} alt="Accepted" />
                </div>
                <div onClick={() => handleRejectButtonClick(group.groupId)}>
                  <S.RejectButton src={inviteRejectIcon} alt="Reject" />
                </div>
              </S.InvitedGroupButtons>
            </S.InvitedGroup>
          ))
        ) : (
          <S.EmptyInvitedGroup>초대받은 그룹이 없습니다!</S.EmptyInvitedGroup>
        )}
      </S.InvitedList>
    </S.Container>
  );
};

export default InvitedList;

const BaseButton = css`
  width: 30px;
  cursor: pointer;
`;

const S = {
  Container: styled.section`
    margin-top: 48px;
    width: 100%;
  `,

  InvitedListLabel: styled.p`
    font-size: 16px;
    font-weight: bold;
    color: var(--blue05);
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

  InvitedGroup: styled.li`
    border: 2px solid var(--blue02);
    padding: 10px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
      border: 2px solid var(--blue01);
      transform: translateY(-4px);
    }
  `,

  Inviter: styled.p`
    white-space: pre-line;
    font-size: 12px;
    color: var(--blue04);
    margin-bottom: 10px;
  `,

  GroupInfo: styled.div`
    border: 1px solid var(--blue02);
    border-radius: 5px;
    min-width: 110px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
  `,

  GroupName: styled.span`
    color: var(--blue01);
    font-weight: 700;
    margin-right: 5px;
  `,

  GroupCode: styled.span`
    color: var(--gray02);
    font-weight: 700;
    font-size: 12px;
  `,

  InvitedGroupButtons: styled.div`
    display: flex;
    justify-content: end;
    padding-right: 8px;
    gap: 23px;
  `,

  AcceptButton: styled.img`
    ${BaseButton}
  `,
  RejectButton: styled.img`
    ${BaseButton}
  `,
  EmptyInvitedGroup: styled.div`
    width: 100%;
    height: 143px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
