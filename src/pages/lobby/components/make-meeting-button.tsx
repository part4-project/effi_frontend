import { useGroupQuery } from '@hooks/react-query/use-query-group';
import styled from 'styled-components';
import DropDownBox from './dropdown-box';
import MyGroupList from './my-group-list';
import QuickButton from './quick-button';
import useDropdown from '../hooks/use-dropdown';

const MakeMeetingButton = () => {
  const { data: groupData, isLoading, isError } = useGroupQuery();
  const { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose } = useDropdown();

  if (isError) return 'Error...';

  return (
    <S.Container ref={ref}>
      <QuickButton onClick={handleDropdownClick} type="make-meeting" />
      <DropDownBox type="make-meeting" isDropdownOpen={isDropdownOpen}>
        <MyGroupList isLoading={isLoading} onClick={handleDropdownClose} groupData={groupData} />
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
