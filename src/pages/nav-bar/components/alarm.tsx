import useDropdown from '@pages/lobby/hooks/use-dropdown';
import styled, { useTheme } from 'styled-components';
import AlarmPopOver from './alarm-popover';

const Alarm = () => {
  const theme = useTheme();
  const { ref, isDropdownOpen, handleDropdownClick } = useDropdown();

  return (
    <S.AlarmWrap ref={ref}>
      <div onClick={handleDropdownClick}>
        <S.AlarmImg src={theme.alarmActive} alt="alarm" />
      </div>
      {isDropdownOpen && <AlarmPopOver />}
    </S.AlarmWrap>
  );
};

export default Alarm;

const S = {
  AlarmWrap: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  AlarmImg: styled.img`
    height: initial;
  `,
};
