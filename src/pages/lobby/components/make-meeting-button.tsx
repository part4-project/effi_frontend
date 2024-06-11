import styled from 'styled-components';
import DropDownBox from './dropdown-box';
import EmptyGroupNotice from './empty-group-notice';
import GroupListItem from './group-list-item';
import QuickButton from './quick-button';
import useDropdown from '../hooks/use-dropdown';
import { checkGroupNameLong } from '../utils/check-group-name-long';

const groupList: string[] = ['그룹1', '그룹1', '그룹2', '그룹3', '그룹45678add', '그룹4', '그룹4', '그룹4'];

const MakeMeetingButton = () => {
  const { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose } = useDropdown();

  return (
    <S.Container ref={ref}>
      <QuickButton onClick={handleDropdownClick} type="make-meeting" />
      <DropDownBox type="make-meeting" isDropdownOpen={isDropdownOpen}>
        {groupList.length ? (
          groupList.map((group, idx) => (
            <GroupListItem
              key={idx}
              groupName={group}
              onClick={handleDropdownClose}
              groupNameLength={checkGroupNameLong(group)}
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
