import { TGroupFetchInfo } from '@api/group/group-request.type';
import EmptyGroupNotice from './empty-group-notice';
import GroupListItem from './group-list-item';
import GroupListItemSkeleton from './skeleton/group-list-item-skeleton';
import { checkGroupNameLong } from '../utils/check-group-name-long';

interface MyGroupListProps {
  isLoading: boolean;
  onClick: () => void;
  groupData?: TGroupFetchInfo[];
}

const MyGroupList = ({ isLoading, onClick, groupData }: MyGroupListProps) => {
  if (isLoading) return new Array(3).fill(1).map((_, i) => <GroupListItemSkeleton key={i} />);

  if (!groupData?.length) return <EmptyGroupNotice />;

  return groupData
    .filter((group) => !!group.admin)
    .map((group) => (
      <GroupListItem
        key={group.groupId}
        groupId={group.groupId}
        groupName={group.groupName}
        onClick={onClick}
        groupNameLength={checkGroupNameLong(group.groupName)}
      />
    ));
};

export default MyGroupList;
