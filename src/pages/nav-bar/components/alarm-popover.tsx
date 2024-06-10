import { zIndex } from '@styles/z-index';
import styled from 'styled-components';
import AlarmList from './alarm-list';

const AlarmPopOver = () => {
  return (
    <S.PopOverWrap>
      <AlarmList />
    </S.PopOverWrap>
  );
};

export default AlarmPopOver;

const S = {
  PopOverWrap: styled.div`
    width: 300px;
    background-color: var(--blue03, #edf7f8);
    z-index: ${zIndex.popOver};
    position: absolute;
    left: -200px;
    top: 60px;
    padding: 30px 12px 0 21px;
    border-radius: 10px;
    &:after {
      background: url('/polygon-top-white.svg');
      content: '';
      width: 13px;
      height: 14px;
      position: absolute;
      top: -2%;
      left: 68%;
    }
  `,
};
