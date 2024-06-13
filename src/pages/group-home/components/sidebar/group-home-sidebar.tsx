import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import groupLeaderBadge from '@assets/icons/group-leader-badge.svg';
import { useGroupMemberQuery } from '@hooks/react-query/use-query-group';
import GroupNameInput from '@pages/group-home/components/sidebar/group-name-input';
import { useGroupStore } from '@stores/group';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TGroupHomeSideBarProps {
  isAdmin: boolean;
}

const GroupHomeSideBar = ({ isAdmin }: TGroupHomeSideBarProps) => {
  const { data: groupData, isError, isLoading } = useGroupMemberQuery(useGroupStore((state) => state.groupId));
  const navigate = useNavigate();
  const handleLeaveGroupButtonClick = () => {
    navigate('/');
  };

  if (isLoading) return 'Loading...';
  if (isError) return 'Error...';

  return (
    <S.Container>
      <GroupNameInput groupName={groupData.groupName} isAdmin={isAdmin} />

      <S.GroupMemberLists>
        {groupData.memberList.map((member: TGroupFetchMemberInfo) => (
          <S.GroupMemberList key={member.id}>
            <span>{member.nickname}</span>
            {member.admin && <S.AdminIcon src={groupLeaderBadge} />}
          </S.GroupMemberList>
        ))}
      </S.GroupMemberLists>

      <S.LeaveGroupButton onClick={handleLeaveGroupButtonClick}>그룹 나가기</S.LeaveGroupButton>
    </S.Container>
  );
};

export default GroupHomeSideBar;

const S = {
  Container: styled.div`
    background-color: var(--white);
    border-left: 4px solid var(--blue03);
    width: 180px;
    padding: 33px 28px;
    position: relative;
    border-radius: 0 20px 20px 0;
    color: var(--gray06);
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

  AdminIcon: styled.img`
    width: 14px;
  `,

  LeaveGroupButton: styled.button`
    background-color: var(--blue02);
    color: var(--blue01);
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
