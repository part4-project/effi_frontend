import { useState } from 'react';
import { TGroupFetchMemberInfo, TGroupMemberFetchRes } from '@api/group/group-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useWithdrawGroupMutation } from '@hooks/react-query/use-query-group';
import GroupLeaveModalButton from '@pages/group-home/components/sidebar/group-leave-modal-button';
import GroupNameInput from '@pages/group-home/components/sidebar/group-name-input';
import { useGroupStore } from '@stores/group';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

interface TGroupHomeSideBarProps {
  isAdmin: boolean;
}

const GroupHomeSideBar = ({ isAdmin }: TGroupHomeSideBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const groupData = useQueryClient().getQueryData<TGroupMemberFetchRes>([
    QUERY_KEY.groupInfo,
    useGroupStore((state) => state.groupId),
  ]);

  const { mutate: WithdrawGroupMutate, isSuccess } = useWithdrawGroupMutation(useGroupStore((state) => state.groupId));

  const handleLeaveGroupTextClick = () => {
    WithdrawGroupMutate();
    setIsOpen(false);
  };

  if (isSuccess) navigate('/');

  return (
    <S.Container>
      <GroupNameInput groupName={groupData!.groupName} groupCode={groupData!.code} isAdmin={isAdmin} />

      <S.GroupMemberLists>
        {groupData!.memberList.map((member: TGroupFetchMemberInfo) => (
          <S.GroupMemberList key={member.id}>
            <S.MemberProfileImage src={member.profileImageUrl} />
            <span>{member.nickname}</span>
            {member.admin && <S.AdminIcon src={theme.groupLeaderBadge} />}
          </S.GroupMemberList>
        ))}
      </S.GroupMemberLists>
      <GroupLeaveModalButton isOpen={isOpen} setIsOpen={setIsOpen} onDeleteButton={handleLeaveGroupTextClick}>
        <S.LeaveGroupText>그룹 탈퇴하기</S.LeaveGroupText>
      </GroupLeaveModalButton>
    </S.Container>
  );
};

export default GroupHomeSideBar;

const S = {
  Container: styled.div`
    background-color: ${(props) => props.theme.theme06};
    border-left: 4px solid ${(props) => props.theme.theme03};
    width: 240px;
    padding: 33px 28px;
    position: relative;
    border-radius: 0 20px 20px 0;
    color: ${(props) => props.theme.text05};
  `,

  GroupMemberLists: styled.ul`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  `,

  GroupMemberList: styled.li`
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  MemberProfileImage: styled.img`
    width: 20px;
    height: 20px;
    border: 1px solid var(--gray02);
    border-radius: 50px;
  `,

  AdminIcon: styled.img`
    width: 14px;
  `,

  LeaveGroupText: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.button01};
    color: ${(props) => props.theme.theme01};
    font-size: 12px;
    font-weight: bold;
    width: 125px;
    height: 31px;
    border-radius: 50px;
    position: absolute;
    bottom: 40px;
    left: calc(50% - 125px / 2);
  `,
};
