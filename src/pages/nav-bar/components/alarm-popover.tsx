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
    background-color: ${(props) => props.theme.theme07};
    z-index: ${zIndex.popOver};
    position: absolute;
    left: -200px;
    top: 60px;
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0px 4px 6.8px 0px ${(props) => props.theme.theme02};
    &:after {
      background: url('${(props) => props.theme.polygonTopWhite}');
      content: '';
      width: 13px;
      height: 14px;
      position: absolute;
      top: -2.5%;
      left: 68%;
    }
  `,
};
