import AlarmImg from '@assets/icons/alarm-active.svg';
import styled from 'styled-components';

const Alarm = () => {
  return (
    <S.AlarmBox>
      <img src={AlarmImg} alt="alarm" />
    </S.AlarmBox>
  );
};

export default Alarm;

const S = {
  AlarmBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: initial;
    }
  `,
};
