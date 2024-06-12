import { TGroupFetchInfo } from '@api/group/group-request.type';
import { useGroupQuery } from '@hooks/react-query/use-query-group';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GroupItem from './group-item';

const GroupList = () => {
  const { data: groupData, isLoading, isError } = useGroupQuery();

  if (isLoading) return 'Loading...';

  if (isError) return 'Error...';

  return (
    <S.GroupListWrap>
      {groupData.map((group: TGroupFetchInfo) => (
        <Link to={'/group-home'} key={group.groupId}>
          <GroupItem {...group} />
        </Link>
      ))}
    </S.GroupListWrap>
  );
};

export default GroupList;

const S = {
  GroupListWrap: styled.div`
    display: flex;
    flex-direction: column;
    gap: 9px;
  `,
};
