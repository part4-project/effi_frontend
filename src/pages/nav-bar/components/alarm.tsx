import useAlarmSocket from '@hooks/socket/use-alarm-socket';
import useDropdown from '@pages/lobby/hooks/use-dropdown';
import styled, { useTheme } from 'styled-components';
import AlarmPopOver from './alarm-popover';

const Alarm = () => {
  const theme = useTheme();
  const { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose } = useDropdown();
  const { alarmSocketList } = useAlarmSocket();

  return (
    <S.AlarmWrap ref={ref}>
      <div onClick={handleDropdownClick}>
        <S.AlarmImg src={alarmSocketList.length ? theme.alarmActive : theme.alarm} alt="alarm" />
      </div>
      {isDropdownOpen && <AlarmPopOver alarmSocketList={alarmSocketList} handleDropdownClose={handleDropdownClose} />}
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
    cursor: pointer;
  `,
  AlarmImg: styled.img`
    height: initial;
  `,
};
