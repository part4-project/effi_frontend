import { groupListHeight } from '@pages/side-bar/utils/group-list-constants';
import { useState, useEffect } from 'react';
import { useGroupQuery } from '@hooks/react-query/use-query-group';
import GroupListSkeleton from '@pages/side-bar/components/group-list-skeleton';
import { useGroupStore } from '@stores/group';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GroupItem from './group-item';

interface GroupListProps {
  sideBarHeight: number;
}

const GroupList = ({ sideBarHeight }: GroupListProps) => {
  const navigate = useNavigate();
  const { groupId, setGroupId } = useGroupStore((state) => ({
    groupId: state.groupId,
    setGroupId: state.setGroupId,
  }));
  const { data: groupData, isLoading, isError } = useGroupQuery();
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleGroupClick = (groupId: number) => {
    setGroupId(groupId); // store
    navigate('/group-home');
  };

  useEffect(() => {
    setScrollHeight(groupListHeight(sideBarHeight));
  }, [sideBarHeight]);

  if (isLoading) return <GroupListSkeleton sideBarHeight={sideBarHeight} />;

  if (isError) return 'Error...';

  return (
    <S.GroupListWrap $scrollHeight={scrollHeight}>
      {groupData?.map((group) => (
        <div key={group.groupId} onClick={() => handleGroupClick(group.groupId)}>
          <GroupItem selectGroupId={groupId} {...group} />
        </div>
      ))}
    </S.GroupListWrap>
  );
};

export default GroupList;

const S = {
  GroupListWrap: styled.div<{ $scrollHeight: number }>`
    display: flex;
    flex-direction: column;
    gap: 9px;
    ${({ $scrollHeight }) => $scrollHeight && `height: ${$scrollHeight}px;`}
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
    }
  `,
};
