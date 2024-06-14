import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { useGroupMemberQuery } from '@hooks/react-query/use-query-group';
import { useGroupStore } from '@stores/group';
import styled from 'styled-components';
import GroupMemberInfo from './group-member-info';

const GroupMemberList = () => {
  const { data: groupData, isError, isLoading } = useGroupMemberQuery(useGroupStore((state) => state.groupId));

  if (isLoading) return 'Loading...';
  if (isError) return 'Error...';

  return (
    <div>
      <S.MemberListTitle>현재 맴버</S.MemberListTitle>
      <S.MemberListBox>
        {groupData.memberList.map((member: TGroupFetchMemberInfo) => {
          return <GroupMemberInfo key={member.id} {...member} />;
        })}
      </S.MemberListBox>
    </div>
  );
};

export default GroupMemberList;

const S = {
  MemberListTitle: styled.p`
    color: var(--gray06);
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  `,
  MemberListBox: styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 14px;
    overflow-y: auto;
    max-height: 17vh;
  `,
};
