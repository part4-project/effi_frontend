import AlarmImg from '@assets/icons/alarm-active.svg';
import useDropdown from '@pages/lobby/hooks/use-dropdown';
import styled from 'styled-components';
import AlarmPopOver from './alarm-popover';

const Alarm = () => {
  const { ref, isDropdownOpen, handleDropdownClick } = useDropdown();

  return (
    <S.AlarmWrap ref={ref}>
      <div onClick={handleDropdownClick}>
        <S.AlarmImg src={AlarmImg} alt="alarm" />
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
