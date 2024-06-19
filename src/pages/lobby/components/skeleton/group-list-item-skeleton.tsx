import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const GroupListItemSkeleton = () => {
  return (
    <S.Container>
      <S.FileImg />
    </S.Container>
  );
};

export default GroupListItemSkeleton;

const S = {
  Container: styled.div`
    width: 100px;
    height: 120px;
    margin: 9px 0 19px;
  `,
  FileImg: styled.div`
    height: 100%;
    position: relative;
    clip-path: polygon(30px 0, 100% 0, 100% 100%, 0 100%, 0 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    ${skeleton}
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      aspect-ratio: 1 / 1;
      background: linear-gradient(315deg, ${(props) => props.theme.theme02} 50%, transparent 50%);
      ${skeletonAnimation}
    }
  `,
};
