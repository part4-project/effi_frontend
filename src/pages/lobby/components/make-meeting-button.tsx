import { TGroupFetchInfo } from '@api/group/group-request.type';
import { useGroupQuery } from '@hooks/react-query/use-query-group';
import styled from 'styled-components';
import DropDownBox from './dropdown-box';
import EmptyGroupNotice from './empty-group-notice';
import GroupListItem from './group-list-item';
import QuickButton from './quick-button';
import useDropdown from '../hooks/use-dropdown';
import { checkGroupNameLong } from '../utils/check-group-name-long';

const MakeMeetingButton = () => {
  const { data: groupData, isLoading, isError } = useGroupQuery();
  const { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose } = useDropdown();

  if (isLoading) return 'Loading...';

  if (isError) return 'Error...';

  return (
    <S.Container ref={ref}>
      <QuickButton onClick={handleDropdownClick} type="make-meeting" />
      <DropDownBox type="make-meeting" isDropdownOpen={isDropdownOpen}>
        {groupData.length ? (
          groupData.map((group: TGroupFetchInfo) => (
            <GroupListItem
              key={group.groupId}
              groupName={group.groupName}
              onClick={handleDropdownClose}
              groupNameLength={checkGroupNameLong(group.groupName)}
            />
          ))
        ) : (
          <EmptyGroupNotice />
        )}
      </DropDownBox>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    position: relative;
  `,
};

export default MakeMeetingButton;
