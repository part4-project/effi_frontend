import React from 'react';
import styled from 'styled-components';
import DropDownBox from './dropdown-box';
import GroupListItem from './group-list-item';
import QuickButton from './quick-button';
import useDropdown from '../hooks/use-dropdown';
import { checkGroupNameLong } from '../utils/check-group-name-long';

interface MakeMeetingButtonProps {}

const groupList = ['그룹1', '그룹2', '그룹3', '그룹45678adfdfdffd', '그룹4', '그룹4', '그룹4'];

const MakeMeetingButton: React.FC<MakeMeetingButtonProps> = () => {
  const { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose } = useDropdown();

  return (
    <S.Container ref={ref}>
      <QuickButton onClick={handleDropdownClick} type="make-meeting" />
      <DropDownBox isDropdownOpen={isDropdownOpen}>
        {groupList.map((group) => (
          <GroupListItem groupName={group} onClick={handleDropdownClose} groupNameLength={checkGroupNameLong(group)} />
        ))}
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
