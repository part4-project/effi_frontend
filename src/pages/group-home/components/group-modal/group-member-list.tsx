import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { useGroupMemberQuery } from '@hooks/react-query/use-query-group';
import { useGroupStore } from '@stores/group';
import styled from 'styled-components';
import GroupMemberInfo from './group-member-info';

interface GroupMemberListProps {
  // eslint-disable-next-line no-unused-vars
  onAddExileMember: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  onRemoveExileMember: (id: number) => void;
}

const GroupMemberList = ({ onAddExileMember, onRemoveExileMember }: GroupMemberListProps) => {
  const { data: groupData, isError, isLoading } = useGroupMemberQuery(useGroupStore((state) => state.groupId));

  if (isLoading) return 'Loading...';
  if (isError) return 'Error...';

  return (
    <div>
      <S.MemberListTitle>현재 맴버</S.MemberListTitle>
      <S.MemberListBox>
        {groupData.memberList.map((member: TGroupFetchMemberInfo) => {
          return (
            <GroupMemberInfo
              key={member.id}
              {...member}
              onAddExileMember={onAddExileMember}
              onRemoveExileMember={onRemoveExileMember}
            />
          );
        })}
      </S.MemberListBox>
    </div>
  );
};

export default GroupMemberList;

const S = {
  MemberListTitle: styled.p`
    color: ${(props) => props.theme.text09};
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
